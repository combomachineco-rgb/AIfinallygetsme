import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FinallyGetsMe - AI That Actually Talks Like You',
  description: 'Get personalized AI prompts customized to how YOU work',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="is-preload landing">
        {children}
      </body>
    </html>
  )
}

