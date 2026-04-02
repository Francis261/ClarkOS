import { useState } from 'react'
import { Home, Folder, File, ChevronRight, ArrowLeft, Search } from 'lucide-react'

export function FileManager() {
  const [currentPath, setCurrentPath] = useState('/home/clark')
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const files = [
    { name: 'Documents', type: 'folder', size: '-', modified: 'Today' },
    { name: 'Downloads', type: 'folder', size: '-', modified: 'Today' },
    { name: 'Pictures', type: 'folder', size: '-', modified: 'Yesterday' },
    { name: 'readme.txt', type: 'file', size: '2 KB', modified: 'Today' },
  ]

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const navigateToFolder = (folder: string) => {
    setCurrentPath(`${currentPath}/${folder}`)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4 text-gray-500" />
          </button>
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <Folder className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 flex-1">{currentPath}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-4 gap-2">
          {filteredFiles.map((file) => (
            <button
              key={file.name}
              onClick={() => file.type === 'folder' ? navigateToFolder(file.name) : setSelectedFile(file.name)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                selectedFile === file.name ? 'bg-blue-50' : 'hover:bg-white'
              }`}
            >
              {file.type === 'folder' ? (
                <Folder className="w-10 h-10 text-blue-500" />
              ) : (
                <File className="w-10 h-10 text-gray-400" />
              )}
              <span className="text-xs text-gray-700 text-center truncate w-full">
                {file.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-white border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
        <span>{filteredFiles.length} items</span>
        <span>Free: 45.2 GB</span>
      </div>
    </div>
  )
}
