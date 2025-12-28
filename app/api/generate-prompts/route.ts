import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

interface GenerateRequest {
  answers: Record<string, string>
  selectedPersonas: string[] // Must be exactly 2 items
}

interface DatabasePrompt {
  user_id: string
  prompt_type: 'custom_instructions' | 'persona'
  prompt_name: string
  full_prompt: string
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

async function getAuthenticatedUser(request: NextRequest) {
  // Use cookie-based auth (standard Next.js + Supabase pattern)
  const cookieStore = await cookies()
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )
  
  // Verify user from cookies
  const { data: { user }, error } = await supabaseAuth.auth.getUser()
  
  if (error || !user) {
    throw new Error('Invalid or expired token')
  }
  
  // Create service role client for database operations
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  return { user, supabase }
}

async function generateCustomInstructions(
  answers: Record<string, string>
): Promise<string> {
  // TODO: Replace with real master prompt template
  // This is placeholder demonstrating the structure
  const systemPrompt = `You are an expert at creating personalized AI custom instructions.

Given user answers, generate custom instructions (MAXIMUM 1500 characters) covering:
1. Preferred response length (brief/detailed)
2. Communication tone (formal/casual/direct)
3. Output format preferences
4. User context
5. Things to avoid

Be concise. Every word counts toward 1500 char limit.`

  const userPrompt = `User answers:\n${JSON.stringify(answers, null, 2)}\n\nGenerate custom instructions (max 1500 chars):`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [
      { role: 'user', content: `${systemPrompt}\n\n${userPrompt}` }
    ]
  })
  
  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  
  // Strict 1500 character enforcement
  if (text.length > 1500) {
    return text.substring(0, 1500)
  }
  
  return text
}

async function generatePersona(
  answers: Record<string, string>,
  personaId: string
): Promise<string> {
  // TODO: Replace with real persona prompt templates (one per persona type)
  // This is placeholder demonstrating the structure
  const systemPrompt = `You are generating a specialized AI persona prompt.

The persona must:
- Assume custom instructions are already active
- Start with: "I have custom instructions active that define my preferences. Your role as my [PERSONA]..."
- Specialize in ${personaId} domain
- NOT repeat general preferences (those are in custom instructions)
- Focus on domain-specific behavior and expertise`

  const userPrompt = `Persona type: ${personaId}
User context: ${JSON.stringify(answers, null, 2)}

Generate the complete ${personaId} persona prompt:`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [
      { role: 'user', content: `${systemPrompt}\n\n${userPrompt}` }
    ]
  })
  
  return message.content[0].type === 'text' ? message.content[0].text : ''
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    let body: GenerateRequest
    try {
      body = await request.json()
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }
    
    const { answers, selectedPersonas } = body
    
    // Validate required fields
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Missing or invalid answers field' },
        { status: 400 }
      )
    }
    
    if (!Array.isArray(selectedPersonas) || selectedPersonas.length !== 2) {
      return NextResponse.json(
        { error: 'Must select exactly 2 personas' },
        { status: 400 }
      )
    }
    
    // Get authenticated user
    let user, supabase
    try {
      const auth = await getAuthenticatedUser(request)
      user = auth.user
      supabase = auth.supabase
    } catch (authError) {
      return NextResponse.json(
        { error: 'Unauthorized - please log in' },
        { status: 401 }
      )
    }
    
    // Check if user already has prompts generated
    const { data: existing } = await supabase
      .from('custom_prompts')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
    
    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'Prompts already generated for this user' },
        { status: 409 }
      )
    }
    
    // Generate custom instructions (1500 char max)
    let customInstructionsText: string
    try {
      customInstructionsText = await generateCustomInstructions(answers)
    } catch (genError) {
      console.error('Custom instructions generation failed:', genError)
      return NextResponse.json(
        { error: 'Failed to generate custom instructions' },
        { status: 500 }
      )
    }
    
    // Save custom instructions to database
    const { error: customInsertError } = await supabase
      .from('custom_prompts')
      .insert({
        user_id: user.id,
        prompt_type: 'custom_instructions',
        prompt_name: 'Custom Instructions',
        full_prompt: customInstructionsText
      })
    
    if (customInsertError) {
      console.error('Database insert failed (custom instructions):', customInsertError)
      return NextResponse.json(
        { error: 'Database error saving custom instructions' },
        { status: 500 }
      )
    }
    
    // Generate and save both personas
    const personaPromises = selectedPersonas.map(async (personaId) => {
      // Generate persona
      let personaText: string
      try {
        personaText = await generatePersona(answers, personaId)
      } catch (genError) {
        console.error(`Persona generation failed for ${personaId}:`, genError)
        throw new Error(`Failed to generate ${personaId}`)
      }
      
      // Save to database
      const { error: personaInsertError } = await supabase
        .from('custom_prompts')
        .insert({
          user_id: user.id,
          prompt_type: 'persona',
          prompt_name: personaId,
          full_prompt: personaText
        })
      
      if (personaInsertError) {
        console.error(`Database insert failed for ${personaId}:`, personaInsertError)
        throw new Error(`Failed to save ${personaId}`)
      }
      
      return personaId
    })
    
    // Wait for both personas to complete
    try {
      await Promise.all(personaPromises)
    } catch (personaError) {
      // If persona generation/save fails, we should clean up
      // Delete the custom instructions we already saved
      await supabase
        .from('custom_prompts')
        .delete()
        .eq('user_id', user.id)
        .eq('prompt_type', 'custom_instructions')
      
      return NextResponse.json(
        { error: personaError instanceof Error ? personaError.message : 'Persona generation failed' },
        { status: 500 }
      )
    }
    
    // Success - all 3 prompts generated and saved
    return NextResponse.json({
      success: true,
      message: 'Successfully generated 1 custom instructions + 2 personas',
      count: 3
    })
    
  } catch (error) {
    console.error('Unexpected error in generate-prompts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
