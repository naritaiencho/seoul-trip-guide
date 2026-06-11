import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface TripState {
  favs: string[]
  visited: string[]
  hotelId: string | null
  packing: Record<string, boolean>
  customPacking: string[]
}

const DEFAULT: TripState = { favs: [], visited: [], hotelId: null, packing: {}, customPacking: [] }
const KEY = 'seoul-for-two-v1'

interface TripContextValue extends TripState {
  toggleFav: (id: string) => void
  toggleVisited: (id: string) => void
  decideHotel: (id: string | null) => void
  togglePacking: (item: string) => void
  addCustomPacking: (item: string) => void
  removeCustomPacking: (item: string) => void
}

const TripContext = createContext<TripContextValue | null>(null)

export function TripProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TripState>(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT
    } catch {
      return DEFAULT
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      // localStorage不可の環境ではセッション内のみ有効
    }
  }, [state])

  const toggleIn = (arr: string[], id: string) =>
    arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]

  const value: TripContextValue = {
    ...state,
    toggleFav: (id) => setState((s) => ({ ...s, favs: toggleIn(s.favs, id) })),
    toggleVisited: (id) => setState((s) => ({ ...s, visited: toggleIn(s.visited, id) })),
    decideHotel: (id) => setState((s) => ({ ...s, hotelId: id })),
    togglePacking: (item) =>
      setState((s) => ({ ...s, packing: { ...s.packing, [item]: !s.packing[item] } })),
    addCustomPacking: (item) =>
      setState((s) =>
        s.customPacking.includes(item) ? s : { ...s, customPacking: [...s.customPacking, item] }
      ),
    removeCustomPacking: (item) =>
      setState((s) => ({
        ...s,
        customPacking: s.customPacking.filter((x) => x !== item),
        packing: Object.fromEntries(Object.entries(s.packing).filter(([k]) => k !== item)),
      })),
  }

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

export function useTrip() {
  const ctx = useContext(TripContext)
  if (!ctx) throw new Error('useTrip must be used within TripProvider')
  return ctx
}
