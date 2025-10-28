import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SEO Blog Writing Agent - AI-Powered Content Generator',
  description: 'Generate SEO-optimized blog posts with AI. Create high-quality, search-engine-friendly content instantly with our intelligent blog writing agent.',
  keywords: ['SEO', 'blog writing', 'AI content', 'content generator', 'SEO optimization'],
  authors: [{ name: 'SEO Blog Agent' }],
  openGraph: {
    title: 'SEO Blog Writing Agent',
    description: 'Generate SEO-optimized blog posts with AI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </body>
    </html>
  )
}
