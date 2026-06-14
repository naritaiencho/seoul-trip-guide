import {
  TrainFront, Wallet, Smartphone, CloudRain, HandHeart, MessageCircleHeart, TicketsPlane, ShieldAlert, CarTaxiFront,
  type LucideIcon,
} from 'lucide-react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { tips, souvenirs } from '../data/tips'

const icons: Record<string, LucideIcon> = {
  TrainFront, Wallet, Smartphone, CloudRain, HandHeart, MessageCircleHeart, TicketsPlane, ShieldAlert, CarTaxiFront,
}

const accentText: Record<string, string> = {
  gold: 'text-gold',
  pink: 'text-blush',
  violet: 'text-violet',
  teal: 'text-teal',
}

export default function Tips() {
  return (
    <section id="tips" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          num="09"
          en="Travel Tips"
          ja="基本情報 & Tips"
          desc="初めての韓国で「知らなかった」を無くすための実用情報。出発前にこのセクションだけ2人で読み合わせておけば大丈夫。"
          grad="text-grad-violet"
        />

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {tips.map((t, i) => {
            const Icon = icons[t.icon] ?? TrainFront
            return (
              <Reveal key={t.id} delay={(i % 2) * 90} className="h-full">
                <article className="liquid-glass rounded-3xl p-6 lg:p-7 h-full hover:scale-[1.01] transition-all duration-500">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 ${accentText[t.accent]}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-mincho font-bold text-lg lg:text-xl">{t.title}</h3>
                  </div>
                  <div className="mt-5 space-y-4">
                    {t.rows.map((row) => (
                      <div key={row.label}>
                        <p className={`text-xs font-bold tracking-wider ${accentText[t.accent]}`}>{row.label}</p>
                        <p className="mt-1 text-[13px] text-cream/70 leading-relaxed">{row.body}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* souvenirs */}
        <Reveal delay={100}>
          <div className="mt-12 liquid-glass rounded-3xl p-6 lg:p-8">
            <h3 className="font-mincho font-bold text-xl lg:text-2xl">
              <span className="text-grad-pink">コンビニ&マートで買うべきお土産</span>
            </h3>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {souvenirs.map((s) => (
                <div key={s.name} className="flex items-start gap-3 bg-white/4 rounded-2xl px-4 py-3.5 hover:bg-white/8 transition-colors duration-300">
                  <span className="text-2xl">{s.emoji}</span>
                  <div>
                    <p className="font-bold text-sm">{s.name}</p>
                    <p className="text-[11px] text-gold mt-0.5">{s.price}</p>
                    <p className="text-[11px] text-cream/55 mt-1 leading-relaxed">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
