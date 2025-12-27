'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser } from '@/lib/supabase'

interface Answer {
  questionNumber: number
  answer: string
}

export default function QuestionsPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([])
  const [showPersonaSelection, setShowPersonaSelection] = useState(false)

  // TODO: Add 30 questions here
  const questions: Array<{ id: number; text: string; type: string }> = []

  const totalSteps = 6

  // PLACEHOLDER - will be replaced with real persona definitions
  const AVAILABLE_PERSONAS = [
    { id: 'decision-coach', name: 'Decision Coach', description: 'Help making choices and evaluating options' },
    { id: 'email-writer', name: 'Email Writer', description: 'Craft professional emails and messages' },
    { id: 'research-assistant', name: 'Research Assistant', description: 'Find and synthesize information' },
    { id: 'career-strategist', name: 'Career Strategist', description: 'Navigate career decisions and growth' },
    { id: 'financial-advisor', name: 'Financial Advisor', description: 'Understand money and investment decisions' },
    { id: 'time-manager', name: 'Time Manager', description: 'Optimize schedule and productivity' },
    { id: 'negotiation-coach', name: 'Negotiation Coach', description: 'Prepare for negotiations and discussions' },
    { id: 'learning-tutor', name: 'Learning Tutor', description: 'Understand complex topics and concepts' },
    { id: 'problem-solver', name: 'Problem Solver', description: 'Work through challenges systematically' },
    { id: 'project-planner', name: 'Project Planner', description: 'Plan and organize projects effectively' },
    { id: 'creative-writer', name: 'Creative Writer', description: 'Generate creative content and ideas' },
    { id: 'technical-explainer', name: 'Technical Explainer', description: 'Break down technical concepts simply' },
    { id: 'meeting-facilitator', name: 'Meeting Facilitator', description: 'Run productive meetings and discussions' },
    { id: 'productivity-coach', name: 'Productivity Coach', description: 'Build better work habits and systems' },
    { id: 'strategy-consultant', name: 'Strategy Consultant', description: 'Think through business and strategic decisions' },
  ]

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setIsCheckingAuth(false)
      } catch (err) {
        setError('Failed to verify authentication')
        setIsCheckingAuth(false)
      }
    }
    checkAuth()
  }, [router])

  const handleAnswer = (questionNumber: number, answer: string) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionNumber !== questionNumber)
      return [...filtered, { questionNumber, answer }]
    })
  }

  const handlePrevious = () => {
    if (showPersonaSelection) {
      setShowPersonaSelection(false)
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Last step completed, show persona selection
      setShowPersonaSelection(true)
    }
  }

  const handlePersonaToggle = (personaId: string) => {
    setSelectedPersonas(prev => {
      if (prev.includes(personaId)) {
        // Deselect
        return prev.filter(id => id !== personaId)
      } else {
        // Select only if less than 2 already selected
        if (prev.length < 2) {
          return [...prev, personaId]
        } else {
          // Already have 2 selected
          setError('You can only select 2 personas. Deselect one first.')
          setTimeout(() => setError(null), 3000)
          return prev
        }
      }
    })
  }

  const handleGeneratePrompts = async () => {
    if (selectedPersonas.length !== 2) {
      setError('Please select exactly 2 personas')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers,
          selectedPersonas: selectedPersonas
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate prompts')
      }
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const getCurrentStepQuestions = () => {
    // TODO: Return questions for current step
    // Each step has 5 questions (30 total / 6 steps = 5 per step)
    const startIndex = (currentStep - 1) * 5
    return questions.slice(startIndex, startIndex + 5)
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      {showPersonaSelection ? (
        <div className="min-h-screen p-8 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Pick Your 2 Expert Personas</h1>
          <p className="text-gray-400 mb-8">Select the 2 areas where you need specialized AI help most</p>
          
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-400 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {AVAILABLE_PERSONAS.map((persona) => {
              const isSelected = selectedPersonas.includes(persona.id)
              return (
                <div
                  key={persona.id}
                  onClick={() => handlePersonaToggle(persona.id)}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-pink-500 bg-pink-600/20' 
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // Handled by parent div click
                      className="mt-1 w-5 h-5 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-pink-500"
                    />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">{persona.name}</h3>
                      <p className="text-gray-300 text-sm">{persona.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleGeneratePrompts}
              disabled={selectedPersonas.length !== 2 || loading}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                selectedPersonas.length === 2 && !loading
                  ? 'bg-pink-600 text-white hover:bg-pink-700'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? 'Generating...' : 'Generate My Custom Prompts'}
            </button>
            <span className="text-sm text-gray-400">
              {selectedPersonas.length}/2 personas selected
            </span>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold text-white">Quiz</h1>
              <span className="text-gray-400">Step {currentStep} of {totalSteps}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-md">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Questions Form */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            {questions.length === 0 ? (
              // Placeholder when questions are not yet added
              <div className="text-center py-12">
                <p className="text-gray-400 mb-6">Questions will be added here</p>
                <button
                  onClick={() => setShowPersonaSelection(true)}
                  className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-colors"
                >
                  Questions Complete - Select Personas
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-6">
                  {getCurrentStepQuestions().map((question) => (
                    <div key={question.id}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {question.text}
                      </label>
                      <input
                        type="text"
                        value={answers.find(a => a.questionNumber === question.id)?.answer || ''}
                        onChange={(e) => handleAnswer(question.id, e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Your answer..."
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 1 || loading}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
