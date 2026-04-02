import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { invoke } from '@tauri-apps/api/core'
import { WindowState } from '../stores/windowStore'
import { WindowControls } from './WindowControls'
import { AppContent } from './AppContent'

interface WindowManagerProps {
  window: WindowState
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  onPositionChange: (pos: { x: number; y: number }) => void
  onSizeChange: (size: { width: number; height: number }) => void
}

export function WindowManager({
  window,
  onClose,
  onMinimize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowManagerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 })

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.screenX - dragStart.current.x
      const dy = e.screenY - dragStart.current.y
      onPositionChange({
        x: window.position.x + dx,
        y: window.position.y + dy,
      })
      dragStart.current = { x: e.screenX, y: e.screenY }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, onPositionChange])

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.screenX - resizeStart.current.x
      const dy = e.screenY - resizeStart.current.y
      onSizeChange({
        width: Math.max(400, resizeStart.current.w + dx),
        height: Math.max(300, resizeStart.current.h + dy),
      })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, onSizeChange])

  const handleDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.no-drag')) return
    setIsDragging(true)
    dragStart.current = { x: e.screenX, y: e.screenY }
    invoke('start_dragging').catch(console.error)
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    resizeStart.current = {
      x: e.screenX,
      y: e.screenY,
      w: window.size.width,
      h: window.size.height,
    }
  }

  if (window.minimized) return null

  return (
    <motion.div
      ref={windowRef}
      className="absolute bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col"
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.focused ? 100 : 10,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.15 }}
      onMouseDown={onFocus}
    >
      <div onMouseDown={handleDragStart}>
        <WindowControls title={window.title} />
      </div>
      <div className="flex-1 overflow-hidden bg-white">
        <AppContent appId={window.appId} />
      </div>
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize no-drag"
        onMouseDown={handleResizeStart}
      />
    </motion.div>
  )
}
