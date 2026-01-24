import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

interface SearchResult {
    _id: string
    _type: 'article' | 'post' | 'creditCard'
    title?: string
    name?: string
    slug: {
        current: string
    }
}

interface GroupedResults {
    articles: SearchResult[]
    posts: SearchResult[]
    creditCards: SearchResult[]
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.trim().length === 0) {
        return NextResponse.json({ articles: [], posts: [], creditCards: [] })
    }

    try {
        // GROQ query to search across articles, posts, and credit cards
        // Using match operator for partial text matching
        const searchQuery = `*[
      _type in ["article", "post", "creditCard"] && 
      (
        title match $searchTerm ||
        name match $searchTerm ||
        metaDescription match $searchTerm
      )
    ] | order(_type asc) {
      _id,
      _type,
      title,
      name,
      slug
    }[0...30]`

        const results: SearchResult[] = await client.fetch(searchQuery, {
            searchTerm: `*${query}*`,
        })

        // Group results by type
        const grouped: GroupedResults = {
            articles: [],
            posts: [],
            creditCards: [],
        }

        for (const result of results) {
            if (result._type === 'article' && grouped.articles.length < 10) {
                grouped.articles.push(result)
            } else if (result._type === 'post' && grouped.posts.length < 10) {
                grouped.posts.push(result)
            } else if (result._type === 'creditCard' && grouped.creditCards.length < 10) {
                grouped.creditCards.push(result)
            }
        }

        return NextResponse.json(grouped)
    } catch (error) {
        console.error('Search error:', error)
        return NextResponse.json(
            { error: 'Failed to perform search' },
            { status: 500 }
        )
    }
}
