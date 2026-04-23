import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory cache for images
const imageCache = new Map<string, { buffer: ArrayBuffer; contentType: string; timestamp: number }>()
const CACHE_TTL = 1000 * 60 * 60 // 1 hour

// Convert Google Drive URL to direct download link
function convertGoogleDriveUrl(url: string): string {
  // Handle drive.google.com/uc?export=view&id=FILE_ID format
  const ucMatch = url.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/)
  if (ucMatch) {
    return `https://lh3.googleusercontent.com/d/${ucMatch[1]}`
  }
  
  // Handle drive.google.com/file/d/FILE_ID/view format
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) {
    return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`
  }
  
  // Handle drive.google.com/open?id=FILE_ID format
  const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/)
  if (openMatch) {
    return `https://lh3.googleusercontent.com/d/${openMatch[1]}`
  }
  
  return url
}

export async function GET(request: NextRequest) {
  let url = request.nextUrl.searchParams.get('url')
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter required' }, { status: 400 })
  }

  // Validate URL
  try {
    new URL(url)
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  // Convert Google Drive URLs to direct links
  if (url.includes('drive.google.com')) {
    url = convertGoogleDriveUrl(url)
  }

  try {
    // Check in-memory cache first
    const cached = imageCache.get(url)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return new NextResponse(cached.buffer, {
        headers: {
          'Content-Type': cached.contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'X-Cache': 'HIT',
        },
      })
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/*,*/*;q=0.8',
      },
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      console.error(`[v0] Proxy failed for ${url}: ${response.status} ${response.statusText}`)
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status })
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    
    // Check if we got HTML instead of an image (common with Google Drive errors)
    if (contentType.includes('text/html')) {
      console.error(`[v0] Got HTML instead of image for ${url}`)
      return NextResponse.json({ error: 'Image source returned HTML instead of image' }, { status: 400 })
    }
    
    const buffer = await response.arrayBuffer()

    // Store in cache
    imageCache.set(url, { buffer, contentType, timestamp: Date.now() })

    // Limit cache size to prevent memory issues
    if (imageCache.size > 100) {
      const firstKey = imageCache.keys().next().value
      if (firstKey) imageCache.delete(firstKey)
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Cache': 'MISS',
      },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`[v0] Proxy error for ${url}:`, errorMessage)
    return NextResponse.json({ error: `Failed to proxy image: ${errorMessage}` }, { status: 500 })
  }
}
