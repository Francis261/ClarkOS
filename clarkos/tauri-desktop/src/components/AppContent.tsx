import { Folder, Terminal, Settings, Globe } from 'lucide-react'
import { FileManager } from './FileManager'
import { TerminalEmulator } from './TerminalEmulator'
import { SettingsPanel } from './SettingsPanel'
import { WebBrowser } from './WebBrowser'

interface AppContentProps {
  appId: string
}

export function AppContent({ appId }: AppContentProps) {
  switch (appId) {
    case 'files':
      return <FileManager />
    case 'terminal':
      return <TerminalEmulator />
    case 'settings':
      return <SettingsPanel />
    case 'browser':
      return <WebBrowser />
    default:
      return (
        <div className="h-full flex items-center justify-center text-gray-400">
          <p>App "{appId}" not found</p>
        </div>
      )
  }
}
