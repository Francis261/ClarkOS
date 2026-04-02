import { invoke } from '@tauri-apps/api/core'
import { Minus, Square, X, Copy } from 'lucide-react'
import { useState, useEffect } from 'react'

interface WindowControlsProps {
  title: string
}

export function WindowControls({ title }: WindowControlsProps) {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    invoke<boolean>('is_maximized').then(setIsMaximized).catch(() => {})
  }, [])

  const handleMinimize = async () => {
    await invoke('minimize_window').catch(console.error)
  }

  const handleMaximize = async () => {
    if (isMaximized) {
      await invoke('unmaximize_window').catch(console.error)
    } else {
      await invoke('maximize_window').catch(console.error)
    }
    setIsMaximized(!isMaximized)
  }

  const handleClose = async () => {
    await invoke('close_window').catch(console.error)
  }

  return (
    <div className="h-8 flex items-center justify-between bg-white border-b border-gray-200 drag-region">
      <div className="flex items-center px-3 gap-2">
        <Copy className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-700 font-medium">{title}</span>
      </div>
      <div className="flex h-full no-drag">
        <button
          onClick={handleMinimize}
          className="h-full px-4 hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={handleMaximize}
          className="h-full px-4 hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <Square className="w-3 h-3 text-gray-600" />
        </button>
        <button
          onClick={handleClose}
          className="h-full px-4 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors group"
        >
          <X className="w-4 h-4 group-hover:text-white" />
        </button>
      </div>
    </div>
  )
}
