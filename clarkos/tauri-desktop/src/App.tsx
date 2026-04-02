import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { WindowControls } from './components/WindowControls'
import { Taskbar } from './components/Taskbar'
import { AppLauncher } from './components/AppLauncher'
import { WindowManager } from './components/WindowManager'
import { SystemTray } from './components/SystemTray'
import { useWindowStore } from './stores/windowStore'

function App() {
  const [showLauncher, setShowLauncher] = useState(false)
  const { windows, addWindow, removeWindow, updateWindowPosition, updateWindowSize } = useWindowStore()

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showLauncher) {
        setShowLauncher(false)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [showLauncher])

  const handleLaunchApp = (appId: string) => {
    addWindow({
      id: `${appId}-${Date.now()}`,
      title: appId.charAt(0).toUpperCase() + appId.slice(1),
      icon: 'App',
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: { width: 800, height: 600 },
      appId,
      minimized: false,
      focused: true,
    })
    setShowLauncher(false)
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-100 overflow-hidden select-none">
      <div className="flex-1 relative overflow-hidden">
        {windows.map((win) => (
          <WindowManager
            key={win.id}
            window={win}
            onClose={() => removeWindow(win.id)}
            onMinimize={() => useWindowStore.getState().minimizeWindow(win.id)}
            onFocus={() => useWindowStore.getState().focusWindow(win.id)}
            onPositionChange={(pos) => updateWindowPosition(win.id, pos)}
            onSizeChange={(size) => updateWindowSize(win.id, size)}
          />
        ))}
      </div>

      <Taskbar
        onLaunchClick={() => setShowLauncher(!showLauncher)}
        onAppClick={handleLaunchApp}
        openApps={windows.map(w => w.appId)}
      />

      {showLauncher && (
        <AppLauncher
          onClose={() => setShowLauncher(false)}
          onLaunch={handleLaunchApp}
        />
      )}

      <SystemTray />
    </div>
  )
}

export default App
