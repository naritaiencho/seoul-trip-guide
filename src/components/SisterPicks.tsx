import { Crown, Quote, BadgeCheck, MapPin, Clock, Wallet, ExternalLink, Lightbulb, Route } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { sisterPicks, sisterRouteNote } from '../data/sister'

const accentText: Record<string, string> = {
  gold: 'text-gold',
  pink: 'text-blush',
  violet: 'text-violet',
  teal: 'text-teal',
}
const accentBorder: Record<string, string> = {
  gold: 'border-gold/40',
  pink: 'border-blush/40',
  violet: 'border-violet/40',
  teal: 'border-teal/40',
}

export default function SisterPicks() {
  return (
    <section id="sister" className="relative py-20 lg:py-28">
      {/* gold ambient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, #E5C374, transparent)' }}
      />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          num="03"
          en="Sister's Selection"
          ja="妹のお墨付き"
          desc="韓国マスターの妹が「これは間違いない」と太鼓判を押した4選。全店リサーチ済み——口コミの裏付けも取れた、この旅の軸になる店たち。"
          grad="text-grad-gold"
        />

        {/* intro: sister avatar + speech bubble */}
        <Reveal>
          <div className="flex items-start gap-4 lg:gap-6 mb-12">
            <div className="relative shrink-0">
              <img
                src="/img/imouto.webp"
                alt="妹"
                className="w-16 h-16 lg:w-24 lg:h-24 rounded-full object-cover border-2 border-gold/60 shadow-lg shadow-gold/20"
                loading="lazy"
              />
              <Crown size={20} className="absolute -top-2 -right-1 text-gold rotate-12 drop-shadow-[0_0_6px_#E5C374]" />
            </div>
            <div className="relative liquid-glass rounded-3xl rounded-tl-md px-6 py-5 lg:px-8 lg:py-6">
              <Quote size={18} className="text-gold/60 mb-2" />
              <p className="font-mincho text-base lg:text-lg leading-relaxed">
                弘大は夜もお店が開いてて、ご飯屋さんもあって、空港も一本やから泊まるにはおすすめ。
                <br className="hidden lg:block" />
                ご飯はこの4つ、ぜったい外さんといて！
              </p>
              <p className="mt-2 text-xs text-cream/45 tracking-widest">— 韓国通の妹より</p>
            </div>
          </div>
        </Reveal>

        <div className="space-y-10 lg:space-y-14">
          {sisterPicks.map((p, i) => (
            <Reveal key={p.id} delay={80}>
              <article
                className={`grid lg:grid-cols-[1fr_1.15fr] ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''} gap-0 liquid-glass rounded-[28px] overflow-hidden hover:scale-[1.01] transition-all duration-500`}
              >
                <div className="relative h-64 lg:h-auto lg:min-h-[380px] [direction:ltr]">
                  <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-night/20" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full bg-gold text-night shadow-lg shadow-gold/30">
                    <Crown size={12} /> 妹のお墨付き
                  </span>
                </div>

                <div className="p-6 lg:p-9 [direction:ltr]">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-mincho font-bold text-2xl lg:text-3xl">{p.name}</h3>
                    <span className="font-kr text-cream/45 text-sm">{p.nameKr}</span>
                  </div>

                  {/* sister quote */}
                  <div className={`mt-4 border-l-2 ${accentBorder[p.accent]} pl-4 py-1`}>
                    <p className="text-sm lg:text-[15px] text-cream/85 font-mincho leading-relaxed">
                      「{p.sisterQuote}」
                    </p>
                  </div>
                  <p className="mt-2.5 flex items-start gap-1.5 text-xs text-teal/90">
                    <BadgeCheck size={14} className="shrink-0 mt-0.5" />
                    <span>リサーチで裏付け: {p.verified}</span>
                  </p>

                  <p className="mt-4 text-sm text-cream/65 leading-relaxed">{p.desc}</p>

                  <ul className="mt-4 space-y-1.5">
                    {p.must.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${accentText[p.accent]}`} style={{ background: 'currentColor', boxShadow: '0 0 8px currentColor' }} />
                        <span className="text-cream/85">{m}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-white/8 grid sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-cream/55">
                    <p className="flex items-center gap-2"><MapPin size={13} className={accentText[p.accent]} />{p.station}</p>
                    <p className="flex items-center gap-2"><Clock size={13} className={accentText[p.accent]} />{p.hours}</p>
                    <p className="flex items-center gap-2 sm:col-span-2"><Wallet size={13} className={accentText[p.accent]} />{p.budget}</p>
                  </div>

                  {p.tips && (
                    <p className="mt-4 flex items-start gap-2 text-xs lg:text-[13px] bg-white/4 rounded-2xl px-4 py-3 text-cream/75">
                      <Lightbulb size={14} className="text-gold shrink-0 mt-0.5" />
                      {p.tips}
                    </p>
                  )}

                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold ${accentText[p.accent]} hover:underline underline-offset-4`}
                    >
                      店舗情報を見る <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* route note */}
        <Reveal delay={120}>
          <div className="mt-12 liquid-glass rounded-3xl p-6 lg:p-8 flex items-start gap-4">
            <Route size={26} className="text-gold shrink-0 mt-1" />
            <div>
              <h4 className="font-mincho font-bold text-lg lg:text-xl text-grad-gold">妹ルートの黄金法則</h4>
              <p className="mt-2 text-sm text-cream/70 leading-relaxed">{sisterRouteNote}</p>
              <div className="mt-4 flex items-center gap-2 flex-wrap text-xs font-bold">
                <span className="px-3 py-1.5 rounded-full bg-violet/20 text-violet border border-violet/30">鍾路3街｜クンソンチッ</span>
                <span className="text-cream/40">→ 徒歩15分 →</span>
                <span className="px-3 py-1.5 rounded-full bg-blush/20 text-blush border border-blush/30">鍾路5街｜コプチャン・広蔵市場</span>
                <span className="text-cream/40">→ 徒歩7分 →</span>
                <span className="px-3 py-1.5 rounded-full bg-teal/20 text-teal border border-teal/30">東大門｜タッカンマリ</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
