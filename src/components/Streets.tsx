import { MapPin, Footprints, UtensilsCrossed } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { streets, streetsIntro } from '../data/streets'

const accentText: Record<string, string> = {
  gold: 'text-gold',
  pink: 'text-blush',
  violet: 'text-violet',
  teal: 'text-teal',
}
const accentChip: Record<string, string> = {
  gold: 'bg-gold/90 text-night',
  pink: 'bg-blush/90 text-night',
  violet: 'bg-violet/90 text-night',
  teal: 'bg-teal/90 text-night',
}
const accentBorder: Record<string, string> = {
  gold: 'border-gold/30',
  pink: 'border-blush/30',
  violet: 'border-violet/30',
  teal: 'border-teal/30',
}

export default function Streets() {
  return (
    <section id="streets" className="relative py-20 lg:py-28">
      {/* ambient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 30%, #FF5C8A, transparent)' }}
      />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          num="05"
          en="Specialty Streets"
          ja="韓国の専門店ストリート"
          desc="同じ料理の店だけが並ぶ「〜通り」を攻めれば、ハズレ知らずで食べ比べも自在。妹直伝の韓国式・グルメの回り方。"
          grad="text-grad-pink"
        />

        {/* sister intro line */}
        <Reveal>
          <div className="liquid-glass rounded-3xl px-6 py-5 lg:px-8 lg:py-6 mb-10 border-l-2 border-blush/50">
            <p className="font-mincho text-sm lg:text-base text-cream/80 leading-relaxed">{streetsIntro}</p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {streets.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 80} className="h-full">
              <article className="relative liquid-glass rounded-3xl overflow-hidden h-full flex flex-col hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-500 group">
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                  <span className={`absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg ${accentChip[s.accent]}`}>
                    <UtensilsCrossed size={11} /> {s.specialty}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-mincho font-bold text-xl text-cream drop-shadow-lg">{s.name}</h3>
                    <p className="font-kr text-cream/60 text-xs">{s.nameKr}</p>
                  </div>
                </div>

                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  <p className="text-[13px] text-cream/65 leading-relaxed flex-1">{s.desc}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.foods.map((f) => (
                      <span key={f} className={`text-[10px] px-2.5 py-1 rounded-full bg-white/5 border ${accentBorder[s.accent]} text-cream/75`}>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/8 space-y-1 text-[11px] text-cream/55">
                    <p className="flex items-center gap-1.5"><MapPin size={11} className={accentText[s.accent]} />{s.area}</p>
                    <p className="flex items-start gap-1.5"><Footprints size={11} className={`${accentText[s.accent]} shrink-0 mt-0.5`} />{s.station}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
