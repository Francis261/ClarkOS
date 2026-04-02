import { useState } from 'react'
import { Globe, Search, ArrowLeft, ArrowRight, Refresh, Star, Menu } from 'lucide-react'

export function WebBrowser() {
  const [url, setUrl] = useState('')
  const [currentUrl, setCurrentUrl] = useState('https://example.com')
  const [isLoading, setIsLoading] = useState(false)

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault()
    let finalUrl = url
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = url.includes('.') ? `https://${url}` : `https://www.google.com/search?q=${encodeURIComponent(url)}`
    }
    setIsLoading(true)
    setCurrentUrl(finalUrl)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center gap-2 p-2 bg-gray-100 border-b border-gray-200">
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <ArrowRight className="w-4 h-4 text-gray-600" />
        </button>
        <button 
          onClick={() => setIsLoading(true)}
          className="p-2 rounded-lg hover:bg-gray-200"
        >
          <Refresh className={`w-4 h-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        <form onSubmit={handleNavigate} className="flex-1 flex items-center">
          <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
            <Globe className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search or enter URL"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="ml-2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <Star className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <Menu className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        {isLoading ? (
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="text-center">
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{currentUrl}</p>
            <p className="text-sm text-gray-400 mt-2">
              Web content would render here in production
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
