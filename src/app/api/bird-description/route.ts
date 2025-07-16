import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const commonName = searchParams.get('commonName')
  const sciName = searchParams.get('sciName')

  if (!commonName || !sciName) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {
    // Try different search strategies
    const searchTerms = [commonName.toLowerCase(), sciName, commonName]

    for (const term of searchTerms) {
      try {
        // First try opensearch to get the correct page title
        const searchResponse = await fetch(
          `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(term)}&limit=1&format=json`
        )

        if (!searchResponse.ok) continue

        const searchData = await searchResponse.json()

        if (searchData[1] && searchData[1].length > 0) {
          const pageTitle = searchData[1][0]

          // Now get the page content
          const pageResponse = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=1&explaintext=1&titles=${encodeURIComponent(pageTitle)}`
          )

          if (!pageResponse.ok) continue

          const pageData = await pageResponse.json()

          if (pageData.query?.pages) {
            const pages = Object.values(pageData.query.pages) as Array<{
              pageid?: number
              title?: string
              extract?: string
              missing?: boolean
            }>
            const page = pages[0]

            if (page && page.extract && page.extract.trim() && !page.missing) {
              // Return first 2-3 sentences
              const sentences = page.extract.split('. ')
              const result =
                sentences.slice(0, 3).join('. ') +
                (sentences.length > 3 ? '.' : '')
              return NextResponse.json({ description: result })
            }
          }
        }
      } catch (termError) {
        console.error(`Error searching for term "${term}":`, termError)
        continue
      }
    }

    return NextResponse.json({ description: null })
  } catch (error) {
    console.error('Error fetching bird description:', error)
    return NextResponse.json(
      { error: 'Failed to fetch description' },
      { status: 500 }
    )
  }
}
