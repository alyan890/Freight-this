import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // Cache for 5 minutes

interface NewsItem {
  title: string
  summary: string
  link: string
  pubDate: string
}

// Decode HTML entities properly
function decodeHtmlEntities(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&#39;': "'",
    '&#8217;': "'",
  }
  
  let decoded = text
  // Replace named entities
  Object.entries(htmlEntities).forEach(([entity, char]) => {
    decoded = decoded.replace(new RegExp(entity, 'g'), char)
  })
  
  // Replace numeric entities (&#123; or &#x1A;)
  decoded = decoded.replace(/&#(\d+);/g, (_match, code) => {
    return String.fromCharCode(parseInt(code, 10))
  })
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_match, code) => {
    return String.fromCharCode(parseInt(code, 16))
  })
  
  return decoded
}

// Simple XML parsing function
function parseRSSFeed(xml: string): NewsItem[] {
  const items: NewsItem[] = []
  
  // Extract items from XML
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)
  
  for (const match of itemMatches) {
    const itemXml = match[1]
    
    const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)
    const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/)
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/)
    const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)
    
    const title = (titleMatch?.[1] || titleMatch?.[2] || '').trim()
    const description = (descMatch?.[1] || descMatch?.[2] || '').trim()
    const link = (linkMatch?.[1] || '').trim()
    const pubDate = (pubDateMatch?.[1] || '').trim()
    
    if (title && link) {
      // Decode entities and clean HTML tags from description
      const decodedTitle = decodeHtmlEntities(title)
      const cleanDesc = decodeHtmlEntities(description)
        .replace(/<[^>]*>/g, '')
        .substring(0, 150)
        .trim()
      
      items.push({
        title: decodedTitle,
        summary: cleanDesc || 'Read more...',
        link,
        pubDate,
      })
    }
    
    if (items.length >= 4) break // Limit items per feed
  }
  
  return items
}

export async function GET() {
  try {
    const feeds = [
      // Transport/logistics news (FreightWaves)
      'https://www.freightwaves.com/feed',
    ]

    const newsItems: NewsItem[] = []

    // Fetch feeds with timeout
    const fetchPromises = feeds.map(async (feedUrl) => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        
        const response = await fetch(feedUrl, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'FreightThis News Aggregator/1.0',
          },
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) return []
        
        const xml = await response.text()
        return parseRSSFeed(xml)
      } catch (error) {
        console.error(`Error fetching feed ${feedUrl}:`, error)
        return []
      }
    })

    const results = await Promise.all(fetchPromises)
    
    // Combine and sort by date
    for (const items of results) {
      newsItems.push(...items)
    }

    // Sort by date and limit to 8 items
    const sortedNews = newsItems
      .sort((a, b) => {
        const dateA = new Date(a.pubDate).getTime()
        const dateB = new Date(b.pubDate).getTime()
        return dateB - dateA
      })
      .slice(0, 8)

    return NextResponse.json({
      success: true,
      news: sortedNews,
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
