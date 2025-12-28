'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div id="page-wrapper">
      {/* Header */}
      <header id="header">
        <h1 id="logo">
          <Link href="/">
            <img src="/images/Finally (logo).png" alt="AI FINALLY GETS ME" style={{height: '5em', width: 'auto'}} />
          </Link>
        </h1>
        <nav id="nav" style={{textAlign: 'right'}}>
          <ul>
            <li><Link href="/login" className="button">Log In</Link></li>
          </ul>
        </nav>
      </header>

      {/* Banner */}
      <section id="banner">
        <div className="content">
          <header>
            <p>For everyone tired of AI that doesn't get them</p>
            <h2>AI That Actually Talks Like You</h2>
            <div style={{textAlign: 'center', margin: '2em auto'}}>
              <img src="/images/hero-frustrated.png" alt="Woman frustrated at computer" style={{display: 'inline-block', maxWidth: '800px', width: '100%', height: 'auto', borderRadius: 0, border: 'none'}} />
            </div>
            <p>You ask a question. AI dumps five paragraphs that could apply to anyone.</p>
            <p>You explain what you need. AI still misses the point.</p>
            <p>You spend more time editing than if you'd just done it yourself.</p>
            <p><strong>What if AI understood how YOU think from the first message?</strong></p>
          </header>
          <div style={{textAlign: 'center', margin: '2em 0'}}>
            <Link href="/signup" className="button primary" style={{display: 'inline-block', margin: '0 0.5em'}}>Get Your Custom AI - $20</Link>
            <a href="#one" className="button" style={{display: 'inline-block', margin: '0 0.5em'}}>See How It Works</a>
          </div>
          <p style={{textAlign: 'center', margin: '1em 0'}}>Works with ChatGPT, Claude, Gemini & any AI tool</p>
          <p style={{textAlign: 'center', margin: '1em 0'}}>✓ One-time payment  •  ✓ 7-day money-back guarantee  •  ✓ Ready in 10 minutes</p>
        </div>
        <a href="#one" className="goto-next scrolly">Next</a>
      </section>

      {/* One */}
      <section id="one" className="spotlight style1 bottom">
        <span className="image fit main"><img src="/images/pic02.jpg" alt="" /></span>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <header>
                  <h2>Why AI Feels Broken</h2>
                </header>
              </div>
            </div>
            <div className="row">
              <div className="col-4 col-12-medium">
                <h3>Too Generic</h3>
                <p>Ask for business advice. Get the same 10 ideas everyone else gets. Nothing specific. Nothing useful.</p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>Talks Down To You</h3>
                <p>Ask a straightforward question. Get an essay with fake enthusiasm. "Great question!" Just answer it.</p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>Wastes Your Time</h3>
                <p>Ask for help writing something. Get four paragraphs when you needed three sentences. More time editing than writing it yourself.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12" style={{textAlign: 'center'}}>
                <p><em>You just want AI that gets you.</em></p>
              </div>
            </div>
          </div>
        </div>
        <a href="#two" className="goto-next scrolly">Next</a>
      </section>

      {/* Two */}
      <section id="two" className="wrapper style1 special fade-up">
        <div className="container">
          <header className="major">
            <h2>Here's What We Built</h2>
            <p>30 questions about how you think, work, and communicate. We generate 5-10 expert AI personas customized to YOU.</p>
          </header>
          <div className="box alt">
            <div className="row gtr-uniform">
              <div className="col-4 col-12-medium">
                <h3>Step 1: Tell Us About You</h3>
                <p>Answer 30 questions:</p>
                <ul>
                  <li>Response length you prefer</li>
                  <li>Your communication style</li>
                  <li>What you use AI for</li>
                  <li>How you process information</li>
                  <li>What frustrates you about AI</li>
                </ul>
                <p>Takes 8 minutes.</p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>Step 2: Pick Your Experts</h3>
                <p>Choose 5-10 personas:</p>
                <p>Email Writer • Decision Coach • Research Assistant • Career Strategist • Financial Advisor • Time Manager • Negotiation Coach • Learning Tutor • Problem Solver • Project Planner</p>
                <p><em>+5 more options</em></p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>Step 3: Get Custom Prompts</h3>
                <div style={{textAlign: 'center', margin: '1em 0'}}>
                  <img src="/images/success.png" alt="Happy woman" style={{display: 'inline-block', maxWidth: '300px', width: '100%', height: 'auto', borderRadius: '8px'}} />
                </div>
                <p>Each persona knows:</p>
                <ul>
                  <li>Your communication preferences</li>
                  <li>Your work context</li>
                  <li>Output format you want</li>
                  <li>What to avoid</li>
                </ul>
                <p>Saved in your account. Access forever.</p>
              </div>
            </div>
          </div>
        </div>
        <a href="#three" className="goto-next scrolly">Next</a>
      </section>

      {/* Three */}
      <section id="three" className="wrapper style1 special fade-up">
        <div className="container">
          <header className="major">
            <h2>Simple. Copy. Paste. Done.</h2>
            <p>We're not building you a new AI tool. We're giving you better prompts for the AI you already use.</p>
          </header>
          <div className="box alt">
            <div className="row">
              <div className="col-12">
                <h4>Step 1: See Your Personas</h4>
                <p>Your custom personas appear in your account. Each one ready to copy.</p>
                <h4>Step 2: Copy Any Persona</h4>
                <p>Click "Copy." The full prompt copies to your clipboard.</p>
                <h4>Step 3: Paste Into Any AI</h4>
                <p>Open ChatGPT, Claude, Gemini. Start a new chat. Paste. AI now responds exactly how you want.</p>
                <p><strong>Save once, use forever:</strong><br />
                <strong>ChatGPT Plus:</strong> Save as Custom GPT<br />
                <strong>Claude Pro:</strong> Save as Project<br />
                <strong>Free versions:</strong> Paste at conversation start</p>
                <p><strong>What you need:</strong><br />
                ChatGPT, Claude, Gemini, or any AI tool (free or paid)</p>
                <p><strong>What you DON'T need:</strong><br />
                Technical skills • API keys • Our app • Monthly subscription</p>
              </div>
            </div>
          </div>
        </div>
        <a href="#four" className="goto-next scrolly">Next</a>
      </section>

      {/* Four */}
      <section id="four" className="wrapper style1 special fade-up">
        <div className="container">
          <header className="major">
            <h2>The Research Is Clear</h2>
            <p>Proper prompt engineering delivers measurable improvements:</p>
          </header>
          <div className="box alt">
            <div className="row gtr-uniform">
              <section className="col-4 col-6-medium col-12-xsmall">
                <span className="icon solid alt major fa-chart-area"></span>
                <h3 style={{fontSize: '3em', fontWeight: 'bold', margin: '0.5em 0'}}>50%</h3>
                <p>Improvement in response quality across all AI models</p>
              </section>
              <section className="col-4 col-6-medium col-12-xsmall">
                <span className="icon solid alt major fa-comment"></span>
                <h3 style={{fontSize: '3em', fontWeight: 'bold', margin: '0.5em 0'}}>20-50%</h3>
                <p>Increase in accuracy (higher for GPT-4 & advanced models)</p>
              </section>
              <section className="col-4 col-6-medium col-12-xsmall">
                <span className="icon solid alt major fa-flask"></span>
                <h3 style={{fontSize: '3em', fontWeight: 'bold', margin: '0.5em 0'}}>21 points</h3>
                <p>Accuracy boost with structured, personalized prompts</p>
              </section>
            </div>
          </div>
          <footer className="major">
            <p><em>All statistics from peer-reviewed research (sources in FAQ)</em></p>
            <p>What this means: Better answers that fit YOUR situation. Less frustration. Results you can actually use.</p>
          </footer>
        </div>
      </section>

      {/* Proof */}
      <section id="proof" className="wrapper style1 special fade-up">
        <div className="container">
          <header className="major">
            <h2>See The Difference</h2>
            <p>Same question. Completely different quality.</p>
          </header>
          
          {/* Example 1 */}
          <div className="row" style={{marginBottom: '3em'}}>
            <div className="col-12">
              <h3>EXAMPLE 1</h3>
              <p><strong>Question:</strong> "Should I take this real estate deal?"</p>
            </div>
          </div>
          <div className="row gtr-uniform" style={{marginBottom: '2em'}}>
            <div className="col-6 col-12-medium">
              <div style={{background: 'rgba(255, 255, 255, 0.1)', padding: '2em', borderRadius: '4px'}}>
                <h4 style={{color: '#999'}}>❌ Generic AI:</h4>
                <p>"That's a great question! When evaluating a real estate deal, there are several important factors to consider. First, you'll want to look at the location and market trends. Location is often considered the most important factor in real estate! Next, consider the property condition and any needed repairs. You should also think about your financial situation and investment goals. It's always a good idea to consult with a financial advisor or real estate professional who can provide personalized guidance based on your unique circumstances. Remember, every investment carries some risk, so make sure you're comfortable with the potential outcomes! Would you like me to elaborate on any of these points?"</p>
                <p><strong>Problems:</strong></p>
                <ul>
                  <li>Patronizing</li>
                  <li>Generic advice</li>
                  <li>Too long</li>
                  <li>Doesn't help you decide</li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-12-medium">
              <div style={{background: 'rgba(228, 76, 101, 0.2)', padding: '2em', borderRadius: '4px', border: '1px solid rgba(228, 76, 101, 0.5)'}}>
                <h4 style={{color: '#e44c65'}}>✅ Your Personalized AI:</h4>
                <p>"Big picture: This works if you close in 30 days and repairs stay under $15K. Market's solid.</p>
                <p>Key factors:<br />
                • Comps show 8-12% appreciation<br />
                • Your cash flow supports the mortgage<br />
                • Foundation issues—get quote first<br />
                • Timeline fits your schedule</p>
                <p>TLDR: Pursue if foundation &lt; $15K. Get estimate tomorrow."</p>
                <p><strong>Why It's Better:</strong></p>
                <ul>
                  <li>Direct</li>
                  <li>Uses YOUR context</li>
                  <li>Actionable</li>
                  <li>Respects your time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="row" style={{marginBottom: '3em'}}>
            <div className="col-12">
              <h3>EXAMPLE 2</h3>
              <p><strong>Question:</strong> "Help me write an email to a difficult client"</p>
            </div>
          </div>
          <div className="row gtr-uniform" style={{marginBottom: '2em'}}>
            <div className="col-6 col-12-medium">
              <div style={{background: 'rgba(255, 255, 255, 0.1)', padding: '2em', borderRadius: '4px'}}>
                <h4 style={{color: '#999'}}>❌ Generic AI:</h4>
                <p>"Of course! I'd be happy to help you draft a professional email. When communicating with difficult clients, it's important to maintain a respectful and empathetic tone while also being clear about boundaries and expectations. Here's a template you can customize:</p>
                <p>Dear [Client Name],</p>
                <p>I hope this message finds you well. I wanted to reach out regarding [situation]. I understand this may be frustrating, and I appreciate your patience as we work through this together..."</p>
                <p><strong>Problems:</strong></p>
                <ul>
                  <li>Obviously AI-written</li>
                  <li>Generic template</li>
                  <li>Doesn't sound like you</li>
                  <li>Client will know</li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-12-medium">
              <div style={{background: 'rgba(228, 76, 101, 0.2)', padding: '2em', borderRadius: '4px', border: '1px solid rgba(228, 76, 101, 0.5)'}}>
                <h4 style={{color: '#e44c65'}}>✅ Your Personalized AI:</h4>
                <p>"Here's it in your voice—direct but not cold:</p>
                <p>'Hi [Name], Quick update. I know the timeline's been frustrating. Here's where we're at: [update]. Next steps: [actions]. Pushing to wrap by [date]. Questions?'</p>
                <p>Why this works: Acknowledges frustration without over-apologizing. Concrete info. Shows you're handling it.</p>
                <p>TLDR: Direct, factual, moves forward—your style."</p>
                <p><strong>Why It's Better:</strong></p>
                <ul>
                  <li>Sounds like YOU</li>
                  <li>Matches your style</li>
                  <li>Authentic</li>
                  <li>Includes strategy</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12" style={{textAlign: 'center', marginTop: '2em'}}>
              <p><em>$20 gets you AI that knows how you work.</em></p>
            </div>
          </div>
        </div>
      </section>

      {/* Scarcity */}
      <section id="scarcity" className="wrapper style2 special fade">
        <div className="container">
          <div style={{background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)', padding: '3em 2em', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', border: '2px solid #e44c65'}}>
            <h2 style={{fontSize: '2.5em', marginBottom: '0.5em', color: '#ffffff'}}>⚡ Launch Pricing: $20</h2>
            <p style={{fontSize: '1.25em', margin: '1em 0', color: '#ffffff'}}>Regular price will be $49 after launch period.</p>
            <p style={{fontSize: '1.25em', margin: '1em 0', color: '#ffffff', fontWeight: 'bold'}}>Lock in $20 now. Once you buy, that's your price forever.</p>
            <p style={{fontSize: '0.9em', marginTop: '1.5em', color: 'rgba(255, 255, 255, 0.9)'}}><em>Limited to first 500 customers</em></p>
          </div>
        </div>
      </section>

      {/* Five */}
      <section id="five" className="wrapper style2 special fade" style={{background: '#1e1e1e'}}>
        <div className="container">
          <header>
            <h2>Get AI That Actually Gets You</h2>
          </header>
          <div style={{textAlign: 'center', margin: '2em 0'}}>
            <p style={{fontSize: '1.25em', margin: '0.5em 0'}}>Stop explaining yourself every conversation.</p>
            <p style={{fontSize: '1.25em', margin: '0.5em 0'}}>Stop getting generic answers that don't fit.</p>
            <p style={{fontSize: '1.25em', margin: '0.5em 0'}}>Stop editing AI responses for 10 minutes.</p>
            <p style={{fontSize: '1.5em', margin: '1.5em 0', fontWeight: 'bold'}}>For $20, get AI customized to how YOU work.</p>
          </div>
          
          <div className="row" style={{margin: '2em 0'}}>
            <div className="col-6 col-12-medium" style={{margin: '0 auto'}}>
              <h3>What's Included:</h3>
              <ul style={{textAlign: 'left', listStyle: 'none', padding: 0}}>
                <li style={{margin: '0.75em 0'}}>✅ Detailed base profile with your preferences</li>
                <li style={{margin: '0.75em 0'}}>✅ 5-10 expert personas you choose</li>
                <li style={{margin: '0.75em 0'}}>✅ Works with ChatGPT, Claude, Gemini, any AI</li>
                <li style={{margin: '0.75em 0'}}>✅ Lifetime account access</li>
                <li style={{margin: '0.75em 0'}}>✅ Copy-paste ready, use immediately</li>
                <li style={{margin: '0.75em 0'}}>✅ 7-day money-back guarantee</li>
              </ul>
            </div>
          </div>

          <div style={{textAlign: 'center', margin: '2em 0'}}>
            <p style={{fontSize: '1.5em', margin: '0.5em 0'}}>
              <span style={{textDecoration: 'line-through', color: '#999'}}>$49</span> 
              <span style={{fontSize: '2em', fontWeight: 'bold', color: '#e44c65', marginLeft: '0.5em'}}>$20</span>
            </p>
            <p style={{fontSize: '0.9em', color: '#999', margin: '0.5em 0'}}><em>Launch pricing - limited to first 500</em></p>
            <p style={{margin: '0.5em 0'}}>One-time payment. No subscription.</p>
          </div>

          <div style={{textAlign: 'center', margin: '2em 0'}}>
            <Link href="/signup" className="button primary large" style={{fontSize: '1.5em', padding: '1em 3em'}}>Get Your Custom AI - $20</Link>
            <p style={{fontSize: '0.9em', marginTop: '1em', color: '#999'}}>✓ Secure payment via Stripe  ✓ Takes 8 minutes  ✓ Access immediately</p>
          </div>

          <div style={{background: 'rgba(255, 255, 255, 0.1)', padding: '2em', borderRadius: '4px', margin: '2em auto', maxWidth: '600px', textAlign: 'center'}}>
            <p style={{fontWeight: 'bold', marginBottom: '0.5em'}}>Not sure? Try risk-free.</p>
            <p>Don't think it's worth $20? Full refund within 7 days. Keep the personas either way.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="wrapper style1 special fade-up">
        <div className="container">
          <header className="major">
            <h2>Questions You Probably Have</h2>
          </header>
          <div className="box alt">
            <div className="row">
              <div className="col-12">
                <h3>Can't I just tell ChatGPT how I want it to respond?</h3>
                <p>You can—and you'll explain yourself every single conversation.</p>
                <p>Our personas are pre-built with everything: context, preferences, style, constraints. Copy once. Use forever.</p>
                
                <h3>Will this work with my AI tool?</h3>
                <p>Yes. Works with ChatGPT (free & Plus), Claude (free & Pro), Gemini, Perplexity, and any AI accepting text prompts.</p>
                
                <h3>Do I need ChatGPT Plus or Claude Pro?</h3>
                <p>Nope. Works with free versions.</p>
                <p>Free versions: Paste at start of each chat (5 seconds)<br />
                Paid versions: Save once as Custom GPT or Project, never paste again</p>
                
                <h3>Do I paste this every time?</h3>
                <p><strong>Free AI tools:</strong> Yes, paste at conversation start. Takes 5 seconds.<br />
                <strong>Paid AI tools:</strong> Save once, then never again.</p>
                
                <h3>What if I don't like it?</h3>
                <p>Email us within 7 days for full refund. No questions asked. Keep the personas.</p>
                
                <h3>Is this a subscription?</h3>
                <p>No. <strong>$20 one-time.</strong></p>
                <p>You get: Base profile • 5-10 custom personas • Lifetime account access • Future updates free</p>
                <p>No hidden fees. No monthly charges.</p>
                
                <h3>How is this different from Custom GPTs?</h3>
                <p>Custom GPTs only work in ChatGPT Plus ($20/month required).</p>
                <p>Our personas work everywhere—free ChatGPT, Claude, Gemini, any AI. Plus we're way more detailed. 30 questions understanding exactly how YOU work.</p>
                
                <h3>Can I generate different personas later?</h3>
                <p>Yes. Come back anytime. Retake quiz, generate new personas. Account stays active forever.</p>
                
                <h3>Are these improvement claims real?</h3>
                <p>Yes. Every stat comes from peer-reviewed research:</p>
                <p><strong>Quality & Accuracy:</strong><br />
                • 50% quality improvement: PromptHub Study, 2024<br />
                • 20-50% accuracy increase: PromptHub Principles, 2024<br />
                • 21.62 point accuracy boost: MDPI Electronics Journal, Feb 2025<br />
                • 17.9% reasoning improvement: arXiv Systematic Survey, 2024</p>
                <p>We don't make up numbers. Real results from academic studies testing thousands of prompts.</p>
                <p><strong>Research links:</strong><br />
                • PromptHub Prompt Engineering Principles: <a href="https://www.prompthub.us/blog/prompt-engineering-principles-for-2024" target="_blank" rel="noopener noreferrer">https://www.prompthub.us/blog/prompt-engineering-principles-for-2024</a><br />
                • MDPI LLM Chatbot Effectiveness: <a href="https://www.mdpi.com/2079-9292/14/5/888" target="_blank" rel="noopener noreferrer">https://www.mdpi.com/2079-9292/14/5/888</a><br />
                • arXiv Systematic Survey: <a href="https://arxiv.org/html/2402.07927v1" target="_blank" rel="noopener noreferrer">https://arxiv.org/html/2402.07927v1</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div style={{textAlign: 'center', marginBottom: '2em'}}>
          <h3 style={{marginBottom: '0.5em'}}>FinallyGetsMe</h3>
          <p style={{fontStyle: 'italic', color: '#999'}}>AI that actually talks like you</p>
        </div>
        <ul className="icons" style={{textAlign: 'center', marginBottom: '1em'}}>
          <li><a href="#two">How It Works</a></li>
          <li style={{margin: '0 0.5em'}}>|</li>
          <li><a href="#faq">FAQ</a></li>
          <li style={{margin: '0 0.5em'}}>|</li>
          <li><a href="mailto:hello@finallygetsme.com">Contact</a></li>
        </ul>
        <ul className="icons" style={{textAlign: 'center', marginBottom: '1em'}}>
          <li><a href="#">Privacy Policy</a></li>
          <li style={{margin: '0 0.5em'}}>|</li>
          <li><a href="#">Terms</a></li>
          <li style={{margin: '0 0.5em'}}>|</li>
          <li><a href="#">Refund Policy</a></li>
        </ul>
        <div style={{textAlign: 'center', marginBottom: '1em'}}>
          <p><a href="mailto:hello@finallygetsme.com">hello@finallygetsme.com</a></p>
        </div>
        <ul className="copyright">
          <li>&copy; 2024 FinallyGetsMe. All rights reserved.</li>
        </ul>
      </footer>
    </div>
  )
}

