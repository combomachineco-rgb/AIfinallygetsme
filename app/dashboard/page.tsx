'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, createClient } from '@/lib/supabase'

interface CustomPrompt {
  id: string
  user_id: string
  prompt_type: 'custom_instructions' | 'persona'
  prompt_name: string
  full_prompt: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [customInstructions, setCustomInstructions] = useState<CustomPrompt | null>(null)
  const [personas, setPersonas] = useState<CustomPrompt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPrompts() {
      try {
        setLoading(true)
        setError(null)
        
        // Get authenticated user
        const user = await getUser()
        if (!user) {
          router.push('/login')
          return
        }
        
        // Fetch all prompts for this user
        const supabase = createClient()
        const { data, error: fetchError } = await supabase
          .from('custom_prompts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
        
        if (fetchError) throw fetchError
        
        if (!data || data.length === 0) {
          // No prompts yet - redirect to questions
          router.push('/questions')
          return
        }
        
        // Separate custom instructions from personas
        const customInst = data.find(p => p.prompt_type === 'custom_instructions')
        const personaList = data.filter(p => p.prompt_type === 'persona')
        
        setCustomInstructions(customInst || null)
        setPersonas(personaList)
        
      } catch (err) {
        console.error('Error fetching prompts:', err)
        setError(err instanceof Error ? err.message : 'Failed to load prompts')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPrompts()
  }, [router])

  const handleCopy = async (promptId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(promptId)
      // Clear copied state after 2 seconds
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Your Custom AI Prompts</h1>
        <p className="text-gray-600 mb-8">
          Copy and use these in ChatGPT, Claude, or any AI tool
        </p>
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading your prompts...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {/* Content */}
        {!loading && !error && (
          <div className="space-y-8">
            
            {/* SECTION 1: Custom Instructions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Custom Instructions</h2>
                  <p className="text-sm text-gray-600">
                    Paste this in ChatGPT Settings → Custom Instructions or Claude Settings → Personal Preferences
                  </p>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Max 1500 chars
                </span>
              </div>
              
              {customInstructions ? (
                <>
                  <div className="bg-gray-50 rounded p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto border border-gray-200">
                    {customInstructions.full_prompt}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCopy(customInstructions.id, customInstructions.full_prompt)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                    >
                      {copiedId === customInstructions.id ? '✓ Copied!' : 'Copy Instructions'}
                    </button>
                    <span className="text-xs text-gray-500">
                      {customInstructions.full_prompt.length} characters
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 italic">No custom instructions generated yet</p>
              )}
            </div>
            
            {/* SECTION 2: Expert Personas */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your 2 Expert Personas</h2>
              <p className="text-sm text-gray-600 mb-4">
                Copy and paste these when you need specialized help. They build on your custom instructions.
              </p>
              
              {personas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personas.map((persona) => (
                    <div
                      key={persona.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                    >
                      <h3 className="text-lg font-semibold mb-3 capitalize">
                        {persona.prompt_name.replace(/-/g, ' ')}
                      </h3>
                      
                      <div className="bg-gray-50 rounded p-4 mb-4 font-mono text-xs whitespace-pre-wrap max-h-48 overflow-y-auto border border-gray-200">
                        {persona.full_prompt}
                      </div>
                      
                      <button
                        onClick={() => handleCopy(persona.id, persona.full_prompt)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                      >
                        {copiedId === persona.id ? '✓ Copied!' : `Copy ${persona.prompt_name.replace(/-/g, ' ')}`}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No personas generated yet</p>
              )}
            </div>
            
            {/* Instructions Footer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">How to Use</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Step 1:</strong> Copy your Custom Instructions and paste in ChatGPT/Claude settings (one time)</p>
                <p><strong>Step 2:</strong> When you need specialized help, copy the relevant persona and paste at the start of your conversation</p>
                <p className="text-xs text-gray-600 mt-3">
                  💡 <strong>Pro tip:</strong> ChatGPT Plus and Claude Pro users can save personas as Custom GPTs or Projects for instant access
                </p>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  )
}
