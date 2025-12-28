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
              <p>Answer 30 questions about your preferences, style, and needs. Takes 8 minutes.</p>
            </div>
            <div>
              <h3 style={{color: '#e44c65'}}>Step 2: Pick Your Experts</h3>
              <p>Choose 5-10 personas: Email Writer, Decision Coach, Financial Advisor, and more.</p>
            </div>
            <div>
              <h3 style={{color: '#e44c65'}}>Step 3: Get Custom Prompts</h3>
              <p>Saved in your account. Copy-paste ready. Use forever.</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div style={{textAlign: 'center', marginBottom: '3em', padding: '3em 2em', background: 'rgba(228, 76, 101, 0.2)', borderRadius: '8px', border: '2px solid #e44c65'}}>
          <h2 style={{fontSize: '2.5em', marginBottom: '0.5em'}}>⚡ Launch Pricing: $20</h2>
          <p style={{fontSize: '1.2em', marginBottom: '1em'}}>Regular price will be $49 after launch period.</p>
          <p style={{fontSize: '1.2em', marginBottom: '2em', fontWeight: 'bold'}}>Lock in $20 now. Once you buy, that's your price forever.</p>
          
          <Link href="/signup" style={{
            background: '#e44c65',
            color: 'white',
            padding: '1.2em 3em',
            textDecoration: 'none',
            borderRadius: '6px',
            display: 'inline-block',
            fontSize: '1.5em',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(228, 76, 101, 0.4)'
          }}>
            Get Your Custom AI - $20
          </Link>
          
          <p style={{marginTop: '1em', color: '#ccc'}}>Works with ChatGPT, Claude, Gemini & any AI tool</p>
          <p style={{marginTop: '0.5em', color: '#ccc'}}>✓ One-time payment • ✓ 7-day money-back guarantee • ✓ Ready in 10 minutes</p>
        </div>

        {/* Benefits */}
        <div style={{marginBottom: '3em'}}>
          <h2 style={{fontSize: '2em', marginBottom: '1em', textAlign: 'center'}}>What's Included</h2>
          <ul style={{fontSize: '1.2em', lineHeight: '2'}}>
            <li>✅ Detailed base profile with your preferences</li>
            <li>✅ 5-10 expert personas you choose</li>
            <li>✅ Works with ChatGPT, Claude, Gemini, any AI</li>
            <li>✅ Lifetime account access</li>
            <li>✅ Copy-paste ready, use immediately</li>
            <li>✅ 7-day money-back guarantee</li>
          </ul>
        </div>

        {/* Footer */}
        <div style={{textAlign: 'center', padding: '2em', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <p style={{marginBottom: '0.5em'}}>FinallyGetsMe</p>
          <p style={{color: '#999', fontStyle: 'italic'}}>AI that actually talks like you</p>
          <p style={{marginTop: '1em'}}><a href="mailto:hello@finallygetsme.com" style={{color: '#e44c65'}}>hello@finallygetsme.com</a></p>
        </div>

      </div>
    </div>
  )
}
