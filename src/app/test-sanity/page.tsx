import { client } from '@/lib/sanity'

export default async function TestPage() {
  let posts = []
  let error = null
  
  try {
    posts = await client.fetch('*[_type == "post"]{_id, title, slug, publishedAt}')
  } catch (e: any) {
    error = e.message
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sanity Connection Test</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Posts found: {posts.length}</h2>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(posts, null, 2)}
        </pre>
      </div>
      
      <div className="mt-4">
        <h3 className="font-bold">Environment Variables:</h3>
        <ul className="text-sm">
          <li>Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT SET'}</li>
          <li>Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET || 'NOT SET'}</li>
          <li>API Version: {process.env.NEXT_PUBLIC_SANITY_API_VERSION || 'NOT SET'}</li>
        </ul>
      </div>
    </div>
  )
}
