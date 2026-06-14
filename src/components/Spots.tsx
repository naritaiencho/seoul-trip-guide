import {
  Landmark, Home, TowerControl, Waves, Store, Building2, Coffee, Gift, Shirt, Telescope, ShoppingBag, Camera, Clock, Ticket, Hourglass, Lightbulb,
  type LucideIcon,
} from 'lucide-react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import MarkButtons from './MarkButtons'
import { spots } from '../data/spots'

const icons: Record<string, LucideIcon> = {
  Landmark, Home, TowerControl, Waves, Store, Building2, Coffee, Gift, Shirt, Telescope, ShoppingBag, Camera,
}

const accentText: Record<string, string> = {
  gold: 'text-gold',
  pink: 'text-blush',
  violet: 'text-violet',
  teal: 'text-teal',
}

export default function Spots() {
  return (
    <section id="spots" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          num="06"
          en="Sightseeing & Experience"
          ja="観光・体験スポット"
          desc="2泊3日で全部は回れない。だから「営業時間・料金・所要時間」まで揃えた。当日の気分で取捨選択できるのが、ふたり旅のいいところ。"
          grad="text-grad-violet"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {spots.map((s, i) => {
            const Icon = icons[s.icon] ?? Landmark
            return (
              <Reveal key={s.id} delay={(i % 3) * 80} className="h-full">
                <article className="liquid-glass rounded-3xl p-6 h-full flex flex-col hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-500 group">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 ${accentText[s.accent]} group-hover:scale-110 transition-transform duration-500`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] text-cream/40">{s.area}</span>
                      <MarkButtons id={s.id} />
                    </div>
                  </div>

                  <h3 className="mt-4 font-mincho font-bold text-lg lg:text-xl">{s.name}</h3>
                  {s.nameEn && (
                    <p className={`font-display italic text-[11px] tracking-[0.2em] mt-0.5 ${accentText[s.accent]}`}>
                      {s.nameEn}
                    </p>
                  )}

                  <p className="mt-3 text-[13px] text-cream/65 leading-relaxed flex-1">{s.desc}</p>

                  <div className="mt-4 pt-3 border-t border-white/8 space-y-1.5 text-[11px] text-cream/55">
                    {s.hours && <p className="flex items-start gap-1.5"><Clock size={12} className="shrink-0 mt-0.5" />{s.hours}</p>}
                    {s.fee && <p className="flex items-start gap-1.5"><Ticket size={12} className="shrink-0 mt-0.5" />{s.fee}</p>}
                    {s.time && <p className="flex items-start gap-1.5"><Hourglass size={12} className="shrink-0 mt-0.5" />{s.time}</p>}
                  </div>

                  {s.tip && (
                    <p className="mt-3 flex items-start gap-1.5 text-[11px] text-cream/70 bg-white/4 rounded-xl px-3 py-2">
                      <Lightbulb size={12} className="text-gold shrink-0 mt-0.5" />
                      {s.tip}
                    </p>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
