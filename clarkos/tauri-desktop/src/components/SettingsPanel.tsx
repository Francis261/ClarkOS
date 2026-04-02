import { useState } from 'react'
import { Monitor, Wifi, Battery, Info, Shield, Palette } from 'lucide-react'

interface SettingsSection {
  id: string
  label: string
  icon: typeof Monitor
}

const sections: SettingsSection[] = [
  { id: 'display', label: 'Display', icon: Monitor },
  { id: 'network', label: 'Network', icon: Wifi },
  { id: 'power', label: 'Power', icon: Battery },
  { id: 'about', label: 'About', icon: Info },
  { id: 'security', label: 'Security', icon: Shield },
]

export function SettingsPanel() {
  const [activeSection, setActiveSection] = useState('display')
  const [darkMode, setDarkMode] = useState(false)
  const [autoBrightness, setAutoBrightness] = useState(true)
  const [brightness, setBrightness] = useState(80)

  return (
    <div className="h-full flex bg-gray-50">
      <div className="w-56 bg-white border-r border-gray-200 p-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
        <nav className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {activeSection === 'display' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Display Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dark Mode</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      darkMode ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Brightness</span>
                    <span className="text-sm text-gray-500">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    disabled={autoBrightness}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Auto Brightness</span>
                  <button
                    onClick={() => setAutoBrightness(!autoBrightness)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      autoBrightness ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        autoBrightness ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">C</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">ClarkOS</h3>
              <p className="text-sm text-gray-500 mt-1">Version 1.0.0</p>
              <p className="text-xs text-gray-400 mt-4">Built with Tauri + React</p>
              <div className="mt-6 pt-4 border-t border-gray-100 text-left space-y-2">
                <p className="text-sm text-gray-600">Processor: Virtual CPU</p>
                <p className="text-sm text-gray-600">Memory: 4 GB</p>
                <p className="text-sm text-gray-600">Graphics: Virtual GPU</p>
                <p className="text-sm text-gray-600">Storage: 64 GB</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'network' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">WiFi</h3>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">ClarkOS-WiFi</p>
                    <p className="text-xs text-gray-500">Connected</p>
                  </div>
                </div>
                <span className="text-xs text-green-500 font-medium">Connected</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'power' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Battery</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm text-green-500">Charging</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Level</span>
                  <span className="text-sm text-gray-700">85%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Screen Lock</span>
                  <button className="w-12 h-6 rounded-full bg-gray-200">
                    <div className="w-5 h-5 rounded-full bg-white shadow translate-x-0.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Firewall</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
