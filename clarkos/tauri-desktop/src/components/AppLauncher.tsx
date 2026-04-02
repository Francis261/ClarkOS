import { motion } from 'framer-motion'
import { X, Folder, Terminal, Settings, Globe, Search, Clock, Calculator, Camera } from 'lucide-react'

interface AppLauncherProps {
  onClose: () => void
  onLaunch: (appId: string) => void
}

const allApps = [
  { id: 'files', name: 'Files', icon: Folder, category: 'Utilities' },
  { id: 'terminal', name: 'Terminal', icon: Terminal, category: 'Developer' },
  { id: 'settings', name: 'Settings', icon: Settings, category: 'System' },
  { id: 'browser', name: 'Web Browser', icon: Globe, category: 'Internet' },
  { id: 'calculator', name: 'Calculator', icon: Calculator, category: 'Utilities' },
  { id: 'camera', name: 'Camera', icon: Camera, category: 'Utilities' },
]

const recentApps = ['files', 'browser', 'terminal']

export function AppLauncher({ onClose, onLaunch }: AppLauncherProps) {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="w-[640px] h-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search apps..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent
            </h3>
            <div className="flex gap-2">
              {recentApps.map((appId) => {
                const app = allApps.find((a) => a.id === appId)
                if (!app) return null
                const Icon = app.icon
                return (
                  <button
                    key={app.id}
                    onClick={() => onLaunch(app.id)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{app.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              All Apps
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {allApps.map((app) => {
                const Icon = app.icon
                return (
                  <button
                    key={app.id}
                    onClick={() => onLaunch(app.id)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{app.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Press ESC to close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
