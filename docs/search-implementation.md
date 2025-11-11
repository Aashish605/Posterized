# MeiliSearch Implementation Guide for Posterized

## 1. Installation

```bash
npm install meilisearch
```

## 2. Server Setup (app/api/search/route.js)

```javascript
import { MeiliSearch } from 'meilisearch'

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_API_KEY,
})

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const filter = searchParams.get('filter')

  try {
    const results = await client.index('products').search(query, {
      filter: filter ? [`category = ${filter}`] : undefined,
      limit: 20,
      sort: ['price:asc'],
    })
    return Response.json(results)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}