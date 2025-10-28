'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Home() {
  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [tone, setTone] = useState('professional')
  const [length, setLength] = useState('medium')
  const [loading, setLoading] = useState(false)
  const [blogPost, setBlogPost] = useState('')
  const [seoMetrics, setSeoMetrics] = useState<any>(null)

  const generateBlog = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic')
      return
    }

    setLoading(true)
    setBlogPost('')
    setSeoMetrics(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          keywords,
          tone,
          length,
        }),
      })

      const data = await response.json()
      setBlogPost(data.content)
      setSeoMetrics(data.seoMetrics)
    } catch (error) {
      console.error('Error generating blog:', error)
      alert('Failed to generate blog post')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blogPost)
    alert('Copied to clipboard!')
  }

  const downloadAsMarkdown = () => {
    const blob = new Blob([blogPost], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            🚀 SEO Blog Writing Agent
          </h1>
          <p className="text-xl text-gray-700">
            Generate SEO-optimized blog posts powered by AI
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Configure Your Blog
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Topic *
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Benefits of Cloud Computing"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Keywords
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="cloud, scalability, cost-effective"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Comma-separated keywords for SEO
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="friendly">Friendly</option>
                    <option value="authoritative">Authoritative</option>
                    <option value="conversational">Conversational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Length
                  </label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="short">Short (~500 words)</option>
                    <option value="medium">Medium (~1000 words)</option>
                    <option value="long">Long (~1500+ words)</option>
                  </select>
                </div>

                <button
                  onClick={generateBlog}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    '✨ Generate Blog Post'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2">
            {seoMetrics && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 SEO Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{seoMetrics.wordCount}</div>
                    <div className="text-sm text-gray-600">Words</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{seoMetrics.headings}</div>
                    <div className="text-sm text-gray-600">Headings</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{seoMetrics.paragraphs}</div>
                    <div className="text-sm text-gray-600">Paragraphs</div>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">{seoMetrics.readability}</div>
                    <div className="text-sm text-gray-600">Readability</div>
                  </div>
                </div>
              </div>
            )}

            {blogPost && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Generated Blog Post</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={downloadAsMarkdown}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      💾 Download
                    </button>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {blogPost}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {!blogPost && !loading && (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Ready to Create Amazing Content?
                </h3>
                <p className="text-gray-600">
                  Fill in the form and click "Generate Blog Post" to get started
                </p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Powered by AI • SEO-Optimized • Ready to Publish
          </p>
        </footer>
      </div>
    </main>
  )
}
