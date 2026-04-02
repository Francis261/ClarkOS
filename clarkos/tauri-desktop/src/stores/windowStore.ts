import { create } from 'zustand'

export interface WindowState {
  id: string
  title: string
  icon: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  appId: string
  minimized: boolean
  focused: boolean
}

interface WindowStore {
  windows: WindowState[]
  addWindow: (window: WindowState) => void
  removeWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  addWindow: (win) => set((state) => ({ windows: [...state.windows, win] })),
  removeWindow: (id) => set((state) => ({ windows: state.windows.filter((w) => w.id !== id) })),
  updateWindowPosition: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, position } : w)),
    })),
  updateWindowSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    })),
  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    })),
  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, minimized: false } : w)),
    })),
  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => ({ ...w, focused: w.id === id })),
    })),
}))
