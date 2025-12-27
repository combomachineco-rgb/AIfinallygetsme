import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

interface EvaluateRequest {
  prompt: string
  userPreferences: {
    // TODO: Define user preferences structure
    responseLength?: string
    communicationStyle?: string
    useCase?: string
    frustrations?: string[]
    [key: string]: any
  }
}

interface EvaluateResponse {
  score: number
  feedback: string
  passed: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: EvaluateRequest = await request.json()
    const { prompt, userPreferences } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    })

    // Build evaluation prompt
    const evaluationPrompt = `Evaluate this AI persona prompt on a scale of 1-10.

Prompt to evaluate:
${prompt}

User Preferences:
${JSON.stringify(userPreferences, null, 2)}

Evaluation Criteria:
1. Response length preference match (1-2 points)
   // TODO: Check if prompt addresses user's preferred response length
   
2. Tone/style match (1-2 points)
   // TODO: Check if prompt matches user's communication style preference
   
3. Use case relevance (1-2 points)
   // TODO: Check if prompt is relevant to user's stated use cases
   
4. Avoidance of frustrations (1-2 points)
   // TODO: Check if prompt explicitly avoids user's stated frustrations
   
5. Overall quality and completeness (1-2 points)
   // TODO: Check prompt structure, clarity, and completeness

Return your evaluation as JSON:
{
  "score": <number 1-10>,
  "feedback": "<detailed feedback>",
  "passed": <boolean>
}`

    // Call Claude API for evaluation
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: evaluationPrompt,
        },
      ],
    })

    const responseText = response.content[0].type === 'text' 
      ? response.content[0].text 
      : ''

    // Parse JSON response
    let evaluation: EvaluateResponse
    try {
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        evaluation = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      // Fallback: try to extract score from text
      const scoreMatch = responseText.match(/score["\s:]+(\d+)/i)
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 5
      
      evaluation = {
        score,
        feedback: responseText || 'Could not parse evaluation',
        passed: score >= 8,
      }
    }

    // Ensure score is between 1-10
    evaluation.score = Math.max(1, Math.min(10, evaluation.score))
    evaluation.passed = evaluation.score >= 8

    return NextResponse.json(evaluation)
  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

