import { useState } from 'react'
import {
  Plane, BedDouble, ShoppingBag, TowerControl, Flame, Landmark, Soup, Gift, Beef, CookingPot, Sparkles, Drumstick, Sunrise, Camera, Luggage, Coffee, Store, Martini, CloudRain, Sun, TrainFront, Wallet,
  type LucideIcon,
} from 'lucide-react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { plans, planNotes } from '../data/plans'

const icons: Record<string, LucideIcon> = {
  Plane, BedDouble, ShoppingBag, TowerControl, Flame, Landmark, Soup, Gift, Beef, CookingPot, Sparkles, Drumstick, Sunrise, Camera, Luggage, Coffee, Store, Martini, CloudRain, Sun, TrainFront, Wallet,
}

const dayAccent = ['text-gold', 'text-blush', 'text-teal']
const dayDot = ['bg-gold', 'bg-blush', 'bg-teal']

// 旅行当日（7/4〜7/6 KST）はその日のカードにTODAYバッジを出す
const TRIP_DAY_DATES = ['2026-07-04', '2026-07-05', '2026-07-06']
function todayIndex(): number {
  const now = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10)
  return TRIP_DAY_DATES.indexOf(now)
}

export default function Plans() {
  const [active, setActive] = useState(plans[0].id)
  const plan = plans.find((p) => p.id === active) ?? plans[0]

  return (
    <section id="plans" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          num="07"
          en="Model Plans"
          ja="ゆるっとモデルプラン"
          desc="ガチガチに固めない、でも迷わない。2パターン用意したので、当日の天気と気分でいいとこ取りしてOK。"
          grad="text-grad-teal"
        />

        {/* plan switcher */}
        <Reveal>
          <div className="flex flex-wrap gap-3 mb-10">
            {plans.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 border ${
                  active === p.id
                    ? 'bg-gradient-to-r from-teal/90 to-violet/90 text-night border-transparent shadow-lg shadow-teal/25 scale-105'
                    : 'bg-white/4 text-cream/70 border-white/10 hover:border-cream/40'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal key={plan.id}>
          <p className="text-sm text-cream/65 leading-relaxed max-w-3xl mb-10">{plan.desc}</p>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-7">
            {plan.days.map((d, di) => (
              <div
                key={d.day}
                className={`liquid-glass rounded-3xl p-6 lg:p-7 ${todayIndex() === di ? 'ring-2 ring-blush shadow-2xl shadow-blush/20' : ''}`}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className={`font-display font-black text-2xl ${dayAccent[di]} flex items-center gap-2`}>
                    {d.day}
                    {todayIndex() === di && (
                      <span className="text-[10px] font-body font-bold tracking-[0.2em] bg-blush text-night px-2.5 py-1 rounded-full animate-pulse">
                        TODAY
                      </span>
                    )}
                  </h3>
                  <span className="font-display italic text-sm text-cream/45 tracking-widest">{d.date}</span>
                </div>
                <p className="font-mincho font-semibold text-cream/85 mb-6">{d.label}</p>

                <div className="relative pl-1">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-white/25 to-transparent" />
                  <div className="space-y-5">
                    {d.items.map((item) => {
                      const Icon = icons[item.icon] ?? Sparkles
                      return (
                        <div key={item.time + item.title} className="relative pl-7">
                          <span className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full ${dayDot[di]} ring-4 ring-night flex items-center justify-center`} style={{ boxShadow: '0 0 10px currentColor' }} />
                          <p className="text-[11px] font-bold tracking-widest text-cream/45">{item.time}</p>
                          <p className="mt-0.5 font-bold text-[15px] flex items-center gap-2">
                            <Icon size={15} className={dayAccent[di]} />
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-cream/60 leading-relaxed">{item.desc}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* notes */}
        <div className="grid sm:grid-cols-2 gap-5 mt-10">
          {planNotes.map((n, i) => {
            const Icon = icons[n.icon] ?? Sun
            return (
              <Reveal key={n.title} delay={i * 80}>
                <div className="liquid-glass rounded-2xl p-5 lg:p-6 flex items-start gap-4 h-full">
                  <Icon size={22} className="text-teal shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">{n.title}</h4>
                    <p className="mt-1.5 text-xs text-cream/60 leading-relaxed">{n.body}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
