import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { Wifi, Battery, Volume2, VolumeX } from 'lucide-react'

interface BatteryStatus {
  charging: boolean
  level: number
}

interface NetworkStatus {
  connected: boolean
  ssid: string | null
}

export function SystemTray() {
  const [battery, setBattery] = useState<BatteryStatus>({ charging: false, level: 100 })
  const [network, setNetwork] = useState<NetworkStatus>({ connected: true, ssid: 'ClarkOS-WiFi' })
  const [volume, setVolume] = useState(75)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const batteryStatus = await invoke<BatteryStatus>('get_battery_status')
        const networkStatus = await invoke<NetworkStatus>('get_network_status')
        setBattery(batteryStatus)
        setNetwork(networkStatus)
      } catch (e) {
        console.error('Failed to fetch system status:', e)
      }
    }
    fetchStatus()
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const isMuted = volume === 0

  return (
    <div className="absolute top-4 right-4 z-40">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setVolume(isMuted ? 75 : 0)}
          className="h-9 px-3 rounded-lg bg-white/80 backdrop-blur-md shadow-lg flex items-center gap-1 hover:bg-white/90 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-600" />
          ) : (
            <Volume2 className="w-4 h-4 text-gray-600" />
          )}
          <span className="text-xs font-medium text-gray-600">{volume}%</span>
        </button>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="h-9 px-3 rounded-lg bg-white/80 backdrop-blur-md shadow-lg flex items-center gap-1 hover:bg-white/90 transition-colors"
        >
          <Wifi className={`w-4 h-4 ${network.connected ? 'text-blue-500' : 'text-gray-400'}`} />
        </button>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="h-9 px-3 rounded-lg bg-white/80 backdrop-blur-md shadow-lg flex items-center gap-1 hover:bg-white/90 transition-colors"
        >
          <Battery className={`w-4 h-4 ${battery.charging ? 'text-green-500' : 'text-gray-600'}`} />
          <span className="text-xs font-medium text-gray-600">{battery.level}%</span>
        </button>
      </div>

      {showMenu && (
        <div className="absolute top-12 right-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">WiFi</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${network.connected ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                {network.connected ? network.ssid : 'Off'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Battery</span>
              <span className="text-xs text-gray-500">
                {battery.charging ? 'Charging' : `${battery.level}%`}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  invoke('open_app', { appId: 'settings' }).catch(console.error)
                  setShowMenu(false)
                }}
                className="w-full text-left text-sm text-blue-500 hover:text-blue-600"
              >
                Open Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
