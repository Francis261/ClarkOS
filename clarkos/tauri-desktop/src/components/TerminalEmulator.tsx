import { useState, useRef, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { Terminal, Trash2 } from 'lucide-react'

export function TerminalEmulator() {
  const [commands, setCommands] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [history, setHistory] = useState<string[]>(['Welcome to ClarkOS Terminal', 'Type "help" for available commands', ''])
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight)
  }, [history])

  const executeCommand = async (cmd: string) => {
    const newHistory = [...history, `clark@clarkos:~$ ${cmd}`]
    
    try {
      const result = await invoke<string>('execute_command', { command: cmd })
      newHistory.push(result)
    } catch {
      if (cmd === 'clear') {
        setHistory([])
        return
      } else if (cmd === 'help') {
        newHistory.push('Available commands: help, clear, echo, date, whoami, uname -a')
      } else if (cmd === 'date') {
        newHistory.push(new Date().toLocaleString())
      } else if (cmd === 'whoami') {
        newHistory.push('clark')
      } else if (cmd === 'uname') {
        newHistory.push('Linux clarkos 6.1.0-clarkos #1 SMP PREEMPT Debian 6.1.0 amd64 GNU/Linux')
      } else if (cmd.startsWith('echo ')) {
        newHistory.push(cmd.slice(5))
      } else if (cmd) {
        newHistory.push(`Command not found: ${cmd}`)
      }
    }
    
    setHistory(newHistory)
    setCommands([...commands, cmd])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand)
      setCurrentCommand('')
    } else if (e.key === 'ArrowUp') {
      const cmdIndex = commands.length - 1
      if (cmdIndex >= 0) {
        setCurrentCommand(commands[cmdIndex])
        setCommands(commands.slice(0, cmdIndex))
      }
    }
  }

  return (
    <div 
      className="h-full flex flex-col bg-gray-900 text-gray-100 font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="p-3 bg-gray-800 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">clark@clarkos</span>
        </div>
        <button
          onClick={() => setHistory([])}
          className="p-1 rounded hover:bg-gray-700 text-gray-400"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div ref={outputRef} className="flex-1 overflow-y-auto p-3">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('clark@') ? 'text-green-400' : ''}>
            {line || '\u00A0'}
          </div>
        ))}
      </div>

      <div className="p-3 bg-gray-800 border-t border-gray-700 flex items-center">
        <span className="text-green-400 mr-2">clark@clarkos:~$</span>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent outline-none text-gray-100"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  )
}
