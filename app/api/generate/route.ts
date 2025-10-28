import { NextRequest, NextResponse } from 'next/server'

function generateSEOBlogPost(
  topic: string,
  keywords: string,
  tone: string,
  length: string
): string {
  const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k)

  const lengthGuide = {
    short: { paragraphs: 4, wordsPerParagraph: 100 },
    medium: { paragraphs: 7, wordsPerParagraph: 120 },
    long: { paragraphs: 10, wordsPerParagraph: 130 }
  }

  const config = lengthGuide[length as keyof typeof lengthGuide] || lengthGuide.medium

  const toneIntros: Record<string, string> = {
    professional: `In today's rapidly evolving digital landscape, understanding ${topic.toLowerCase()} has become increasingly crucial for businesses and individuals alike.`,
    casual: `Hey there! Let's talk about ${topic.toLowerCase()} and why it's something you should definitely know about.`,
    friendly: `Welcome! Today, we're diving into the fascinating world of ${topic.toLowerCase()}, and I'm excited to share some insights with you.`,
    authoritative: `${topic} represents a critical component in modern business strategy, backed by extensive research and industry best practices.`,
    conversational: `So, you're curious about ${topic.toLowerCase()}? Great! Let me break it down for you in a way that actually makes sense.`
  }

  const intro = toneIntros[tone] || toneIntros.professional

  let content = `# ${topic}\n\n`

  // Meta description suggestion
  content += `> **Meta Description:** Discover everything you need to know about ${topic.toLowerCase()}. `
  if (keywordList.length > 0) {
    content += `Learn about ${keywordList.slice(0, 3).join(', ')}, and more. `
  }
  content += `Expert insights and actionable tips.\n\n`

  // Introduction
  content += `## Introduction\n\n${intro}\n\n`

  content += `This comprehensive guide explores the essential aspects of ${topic.toLowerCase()}, providing you with actionable insights and expert perspectives. `

  if (keywordList.length > 0) {
    content += `We'll cover key areas including ${keywordList.slice(0, 2).join(' and ')}, ensuring you have a complete understanding of this important topic.\n\n`
  } else {
    content += `By the end of this article, you'll have a thorough understanding that you can apply immediately.\n\n`
  }

  // Main sections
  const sections = [
    {
      title: `Understanding ${topic}`,
      content: `At its core, ${topic.toLowerCase()} encompasses several critical components that work together to create meaningful outcomes. Understanding these fundamentals is essential for anyone looking to leverage this effectively in their work or personal life.\n\nThe key principles revolve around strategic implementation, continuous optimization, and measurable results. ${keywordList.length > 0 ? `Factors such as ${keywordList[0]} play a significant role in determining success.` : 'Success depends on careful planning and execution.'}`
    },
    {
      title: 'Key Benefits and Advantages',
      content: `Implementing ${topic.toLowerCase()} properly can yield significant benefits:\n\n- **Improved Efficiency**: Streamline processes and reduce unnecessary overhead\n- **Cost Effectiveness**: Optimize resource allocation and maximize ROI\n- **Scalability**: Build solutions that grow with your needs\n- **Competitive Edge**: Stay ahead in an increasingly competitive market\n\nOrganizations that embrace these principles consistently outperform their peers by significant margins.`
    },
    {
      title: 'Best Practices and Implementation',
      content: `Successful implementation requires a systematic approach. Start by assessing your current situation and identifying specific goals. ${keywordList.length > 0 ? `Consider how ${keywordList[Math.min(1, keywordList.length - 1)]} aligns with your objectives.` : 'Align your strategy with clear, measurable objectives.'}\n\nDevelop a phased implementation plan that allows for testing and refinement. Monitor key performance indicators throughout the process and be prepared to adjust your approach based on real-world results.`
    },
    {
      title: 'Common Challenges and Solutions',
      content: `While ${topic.toLowerCase()} offers substantial benefits, organizations often face certain challenges during implementation. These typically include resource constraints, resistance to change, and technical complexities.\n\nThe most successful approaches involve:\n\n1. Clear communication of goals and benefits to all stakeholders\n2. Adequate training and support systems\n3. Incremental rollout with continuous feedback loops\n4. Regular evaluation and optimization cycles`
    },
    {
      title: 'Future Trends and Considerations',
      content: `The landscape of ${topic.toLowerCase()} continues to evolve rapidly. Emerging technologies, changing market dynamics, and shifting user expectations are reshaping how organizations approach this area.\n\nStaying informed about these trends and maintaining flexibility in your strategy will be crucial for long-term success. ${keywordList.length > 1 ? `Innovations in ${keywordList[keywordList.length - 1]} are particularly worth monitoring.` : 'Keep an eye on industry developments and be ready to adapt.'}`
    }
  ]

  sections.slice(0, Math.min(sections.length, Math.ceil(config.paragraphs / 1.5))).forEach((section, idx) => {
    content += `## ${section.title}\n\n${section.content}\n\n`
  })

  // Conclusion
  content += `## Conclusion\n\n`
  content += `${topic} represents a significant opportunity for those willing to invest the time and resources to implement it effectively. `
  content += `By understanding the core principles, following best practices, and staying adaptable to change, you can achieve remarkable results.\n\n`

  if (keywordList.length > 0) {
    content += `Whether you're focusing on ${keywordList[0]}${keywordList.length > 1 ? ` or ${keywordList[1]}` : ''}, `
  }
  content += `the key is to start with a solid foundation and build incrementally. Take action today, and you'll be well-positioned for success tomorrow.\n\n`

  // Call to action
  content += `---\n\n`
  content += `**Ready to get started?** Share your thoughts in the comments below, and don't forget to subscribe for more expert insights!\n\n`

  // Keywords footer
  if (keywordList.length > 0) {
    content += `*Keywords: ${keywordList.join(', ')}*\n`
  }

  return content
}

function calculateSEOMetrics(content: string) {
  const words = content.split(/\s+/).length
  const headings = (content.match(/^#{1,6}\s/gm) || []).length
  const paragraphs = content.split(/\n\n/).filter(p => p.trim() && !p.startsWith('#')).length

  let readability = 'Good'
  if (words > 1200) readability = 'Excellent'
  else if (words < 500) readability = 'Fair'

  return {
    wordCount: words,
    headings,
    paragraphs,
    readability
  }
}

export async function POST(request: NextRequest) {
  try {
    const { topic, keywords, tone, length } = await request.json()

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))

    const content = generateSEOBlogPost(topic, keywords || '', tone || 'professional', length || 'medium')
    const seoMetrics = calculateSEOMetrics(content)

    return NextResponse.json({
      content,
      seoMetrics
    })
  } catch (error) {
    console.error('Error generating blog:', error)
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    )
  }
}
