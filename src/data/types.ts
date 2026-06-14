export type Accent = 'gold' | 'pink' | 'violet' | 'teal'

export interface Area {
  id: string
  name: string
  nameEn: string
  nameKr: string
  catch: string
  desc: string
  highlights: string[]
  access: string
  stay: string // 滞在目安
  img: string
  accent: Accent
}

export interface Restaurant {
  id: string
  name: string
  nameKr?: string
  category: 'imouto' | 'raw' | 'bbq' | 'soup' | 'cafe' | 'night' | 'morning'
  area: string
  station?: string
  hours?: string
  budget?: string
  must: string[]
  desc: string
  tips?: string
  img?: string
  accent: Accent
  sister?: string
  url?: string
  featured?: boolean
}

export interface Street {
  id: string
  name: string
  nameKr: string
  specialty: string // 何の専門店通りか
  area: string
  station: string
  desc: string
  foods: string[]
  img: string
  accent: Accent
}

export interface Spot {
  id: string
  name: string
  nameEn?: string
  area: string
  desc: string
  hours?: string
  fee?: string
  time?: string // 所要時間
  tip?: string
  accent: Accent
  icon: string
}

export interface Hotel {
  id: string
  name: string
  nameEn?: string
  area: string
  station: string
  price: string
  rating?: string
  points: string[]
  forUs: string
  url?: string
  accent: Accent
  pick?: boolean
}

export interface PlanItem {
  time: string
  title: string
  desc: string
  icon: string
}

export interface PlanDay {
  day: string
  date: string
  label: string
  items: PlanItem[]
}

export interface Plan {
  id: string
  name: string
  desc: string
  days: PlanDay[]
}

export interface TipCard {
  id: string
  title: string
  icon: string
  accent: Accent
  rows: { label: string; body: string }[]
}
