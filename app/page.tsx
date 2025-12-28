'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: '#ffffff',
      padding: '2em',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        
        {/* Header */}
        <div style={{textAlign: 'center', marginBottom: '3em'}}>
          <h1 style={{fontSize: '3em', marginBottom: '0.5em'}}>AI That Actually Talks Like You</h1>
          <p style={{fontSize: '1.5em', color: '#999'}}>For everyone tired of AI that doesn't get them</p>
        </div>

        {/* Problem */}
        <div style={{marginBottom: '3em', padding: '2em', background: 'rgba(255,255,255,0.05)', borderRadius: '8px'}}>
          <p style={{fontSize: '1.2em', marginBottom: '1em'}}>You ask a question. AI dumps five paragraphs that could apply to anyone.</p>
          <p style={{fontSize: '1.2em', marginBottom: '1em'}}>You explain what you need. AI still misses the point.</p>
          <p style={{fontSize: '1.2em', marginBottom: '1em'}}>You spend more time editing than if you'd just done it yourself.</p>
          <p style={{fontSize: '1.5em', fontWeight: 'bold', marginTop: '2em'}}>What if AI understood how YOU think from the first message?</p>
        </div>

        {/* Solution */}
        <div style={{marginBottom: '3em', padding: '2em', background: 'rgba(228, 76, 101, 0.1)', borderRadius: '8px', border: '1px solid #e44c65'}}>
          <h2 style={{fontSize: '2em', marginBottom: '1em'}}>Here's What We Built</h2>
          <p style={{fontSize: '1.2em', marginBottom: '2em'}}>30 questions about how you think, work, and communicate. We generate 5-10 expert AI personas customized to YOU.</p>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2em', marginBottom: '2em'}}>
            <div>
              <h3 style={{color: '#e44c65'}}>Step 1: Tell Us About You</h3>
              <p>Answer 30 questions. Takes 8 minutes.</p>
            </div>
            <div>
              <h3 style={{color: '#e44c65'}}>Step 2: Pick Your Experts</h3>
              <p>Choose 5-10 personas customized to your needs.</p>
            </div>
            <div>
              <h3 style={{color: '#e44c65'}}>Step 3: Get Custom Prompts</h3>
              <p>Copy and paste into any AI tool. Works forever.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{textAlign: 'center', marginBottom: '3em'}}>
          <Link 
            href="/signup" 
            style={{
              display: 'inline-block',
              padding: '1em 3em',
              background: '#e44c65',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1.5em',
              fontWeight: 'bold',
              marginBottom: '1em'
            }}
          >
            Get Your Custom AI - $20
          </Link>
          <p style={{color: '#999', marginTop: '1em'}}>One-time payment • 7-day money-back guarantee</p>
        </div>

        {/* Login Link */}
        <div style={{textAlign: 'center', marginTop: '3em'}}>
          <Link href="/login" style={{color: '#999', textDecoration: 'underline'}}>Log In</Link>
        </div>

      </div>
    </div>
  )
}
