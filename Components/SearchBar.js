import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const searchProducts = async () => {
      if (!query) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`)
        setResults(response.data.hits)
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posters, stickers..."
        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
      />
      
      {loading && (
        <div className="absolute right-3 top-3">
          {/* Loading spinner */}
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg max-h-96 overflow-auto">
          {results.map((product) => (
            <div
              key={product.id}
              className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-4"
            >
              {product.imageUrl && (
                <Image 
                  src={product.imageUrl} 
                  alt={product.title}
                  width={48}
                  height={48}
                  className="object-cover rounded"
                />
              )}
              <div>
                <h3 className="font-medium">{product.title}</h3>
                <p className="text-sm text-gray-600">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}