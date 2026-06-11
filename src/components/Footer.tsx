import { Heart, Plane } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 py-14 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, #FF5C8A, transparent)' }} />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 text-center">
        <p className="font-display font-black text-4xl lg:text-6xl text-grad">SEOUL</p>
        <p className="mt-2 font-kr text-cream/55 tracking-[0.3em]">서울에서 만나요</p>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-cream/60">
          <Plane size={15} className="text-teal" />
          2026.07.04 — 07.06 / ふたりの初めての韓国
        </p>
        <p className="mt-8 text-xs text-cream/35 flex items-center justify-center gap-1.5">
          Made with <Heart size={11} className="text-blush fill-blush" /> for two travelers — 料金・営業時間は2026年6月時点の調査値。直前にNAVER Map等で最新情報の確認を。
        </p>
      </div>
    </footer>
  )
}
