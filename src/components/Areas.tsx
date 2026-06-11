import { MapPin, Clock, TrainFront } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { areas } from '../data/areas'

const accentText: Record<string, string> = {
  gold: 'text-gold',
  pink: 'text-blush',
  violet: 'text-violet',
  teal: 'text-teal',
}

export default function Areas() {
  return (
    <section id="areas" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          num="02"
          en="Area Guide"
          ja="エリアガイド"
          desc="ソウルは「エリアごとに別の街」。弘大を拠点に、気分で選んで動けるよう8エリアを地元目線でまとめた。"
          grad="text-grad-teal"
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {areas.map((a, i) => (
            <Reveal key={a.id} delay={(i % 2) * 120}>
              <article className="group relative liquid-glass rounded-3xl overflow-hidden hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-500">
                <div className="relative h-52 lg:h-64 overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-2">
                    <div>
                      <p className={`font-display italic text-xs tracking-[0.3em] ${accentText[a.accent]}`}>
                        {a.nameEn}
                      </p>
                      <h3 className="font-mincho font-bold text-2xl lg:text-3xl mt-1">{a.name}</h3>
                    </div>
                    <span className="font-kr text-cream/50 text-sm whitespace-nowrap">{a.nameKr}</span>
                  </div>
                </div>

                <div className="p-6 lg:p-7">
                  <p className={`font-mincho font-semibold ${accentText[a.accent]}`}>「{a.catch}」</p>
                  <p className="mt-3 text-sm text-cream/70 leading-relaxed">{a.desc}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {a.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[11px] lg:text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cream/75"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/8 space-y-1.5 text-xs lg:text-[13px] text-cream/55">
                    <p className="flex items-center gap-2">
                      <TrainFront size={13} className={accentText[a.accent]} /> {a.access}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={13} className={accentText[a.accent]} /> 滞在目安: {a.stay}
                    </p>
                  </div>
                </div>

                <MapPin
                  size={20}
                  className={`absolute top-4 right-4 ${accentText[a.accent]} drop-shadow-[0_0_8px_currentColor]`}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
