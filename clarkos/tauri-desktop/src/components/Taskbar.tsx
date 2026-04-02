import { Home, Folder, Terminal, Settings, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface TaskbarProps {
  onLaunchClick: () => void
  onAppClick: (appId: string) => void
  openApps: string[]
}

const pinnedApps = [
  { id: 'files', name: 'Files', icon: Folder },
  { id: 'terminal', name: 'Terminal', icon: Terminal },
  { id: 'browser', name: 'Browser', icon: Globe },
  { id: 'settings', name: 'Settings', icon: Settings },
]

export function Taskbar({ onLaunchClick, onAppClick, openApps }: TaskbarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="h-16 bg-white/80 backdrop-blur-md border-t border-gray-200 flex items-center px-4 gap-2">
      <button
        onClick={onLaunchClick}
        className="h-10 w-10 rounded-xl bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-colors shadow-lg"
      >
        <Home className="w-5 h-5" />
      </button>

      <div className="w-px h-8 bg-gray-200 mx-2" />

      <div className="flex items-center gap-1 flex-1">
        {pinnedApps.map((app) => {
          const Icon = app.icon
          const isOpen = openApps.includes(app.id)
          return (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className={`h-10 px-3 rounded-xl flex items-center gap-2 transition-all ${
                isOpen
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium hidden lg:inline">{app.name}</span>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-10 w-10 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
      >
        {isExpanded ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </div>
  )
}
