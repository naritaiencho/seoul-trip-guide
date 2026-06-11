import { useState } from 'react'
import { Crown, MapPin, Clock, Wallet, ExternalLink, Lightbulb, Heart, UtensilsCrossed } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { restaurants, categories } from '../data/gourmet'
import { sisterPicks } from '../data/sister'

const accentText: Record<string, string> = {
  gold: 'text-gold',
  pink: 'text-blush',
  violet: 'text-violet',
  teal: 'text-teal',
}
const catColor: Record<string, string> = {
  imouto: 'bg-gold/15 text-gold border-gold/30',
  raw: 'bg-blush/15 text-blush border-blush/30',
  bbq: 'bg-gold/15 text-gold border-gold/30',
  soup: 'bg-teal/15 text-teal border-teal/30',
  cafe: 'bg-violet/15 text-violet border-violet/30',
  night: 'bg-gold/15 text-gold border-gold/30',
  morning: 'bg-teal/15 text-teal border-teal/30',
}
const catLabel: Record<string, string> = {
  imouto: '妹のお墨付き',
  raw: '生レバー・ユッケ',
  bbq: '焼肉・ホルモン',
  soup: '鍋・スープ・麺',
  cafe: 'カフェ・スイーツ',
  night: '夜・お酒',
  morning: '朝ごはん',
}

// 妹のお墨付きもグルメ図鑑に統合表示する
const allRestaurants = [...sisterPicks, ...restaurants]

export default function Gourmet() {
  const [cat, setCat] = useState('all')
  const filtered = cat === 'all' ? allRestaurants : allRestaurants.filter((r) => r.category === cat)

  return (
    <section id="gourmet" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          num="04"
          en="Gourmet Encyclopedia"
          ja="グルメ図鑑"
          desc={`全${allRestaurants.length}軒、すべて実在の人気店をリサーチ済み。気分とお腹の空き具合でフィルターして選ぼう。`}
          grad="text-grad-pink"
        />

        {/* raw liver spotlight */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl mb-10 border border-blush/25">
            <div className="absolute inset-0 bg-gradient-to-r from-blush/15 via-night2 to-violet/10" />
            <div className="relative p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-5">
              <Heart size={36} className="text-blush shrink-0 drop-shadow-[0_0_12px_#FF5C8A]" />
              <div className="flex-1">
                <h3 className="font-mincho font-bold text-xl lg:text-2xl">
                  <span className="text-grad-pink">生レバーラバーズへ。</span>ここが本場の答え。
                </h3>
                <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                  日本では2012年から食べられない牛の生レバーが、韓国では合法。
                  本命は<strong className="text-cream">ミシュラン掲載「富村ユッケ」の간천엽（レバー＆センマイ盛り）</strong>、
                  隠し玉は<strong className="text-cream">望遠「ファンソコプチャン」の生レバーおかわり無料</strong>の2段構え。
                  夏場なので「回転の速い有名店で、早い時間に」が鉄則。
                </p>
              </div>
              <button
                onClick={() => setCat('raw')}
                className="shrink-0 inline-flex items-center gap-2 font-bold text-night bg-gradient-to-r from-blush to-violet px-6 py-3 rounded-full shadow-lg shadow-blush/30 hover:scale-105 transition-all duration-300"
              >
                <UtensilsCrossed size={16} /> 生レバー候補を見る
              </button>
            </div>
          </div>
        </Reveal>

        {/* filter */}
        <Reveal>
          <div className="flex flex-wrap gap-2.5 mb-10">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`px-4 py-2.5 rounded-full text-[13px] font-bold border transition-all duration-300 ${
                  cat === c.id
                    ? 'bg-cream text-night border-cream shadow-lg shadow-cream/20 scale-105'
                    : 'bg-white/4 text-cream/70 border-white/10 hover:border-cream/40 hover:text-cream'
                }`}
              >
                <span className="mr-1.5">{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filtered.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 80} className="h-full">
              <article className="liquid-glass rounded-3xl overflow-hidden h-full flex flex-col hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-500 group">
                {r.img && (
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <img
                      src={r.img}
                      alt={r.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
                  </div>
                )}
                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {!('sisterQuote' in r) && (
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${catColor[r.category]}`}>
                        {catLabel[r.category]}
                      </span>
                    )}
                    {'sisterQuote' in r && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-gold text-night">
                        <Crown size={10} /> 妹認定
                      </span>
                    )}
                    {r.featured && !('sisterQuote' in r) && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blush/90 text-night">
                        ★ 本命
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-mincho font-bold text-lg leading-snug">{r.name}</h3>
                  {r.nameKr && <p className="font-kr text-cream/40 text-xs mt-0.5">{r.nameKr}</p>}

                  <p className="mt-3 text-[13px] text-cream/65 leading-relaxed flex-1">{r.desc}</p>

                  <div className="mt-3 space-y-1">
                    {r.must.slice(0, 2).map((m) => (
                      <p key={m} className="flex items-start gap-1.5 text-xs text-cream/85">
                        <span className={`mt-1 w-1 h-1 rounded-full shrink-0 ${accentText[r.accent]}`} style={{ background: 'currentColor' }} />
                        {m}
                      </p>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/8 space-y-1 text-[11px] text-cream/50">
                    {r.station && <p className="flex items-center gap-1.5"><MapPin size={11} />{r.area}・{r.station}</p>}
                    {r.hours && <p className="flex items-center gap-1.5"><Clock size={11} />{r.hours}</p>}
                    {r.budget && <p className="flex items-center gap-1.5"><Wallet size={11} />{r.budget}</p>}
                  </div>

                  {r.tips && (
                    <p className="mt-3 flex items-start gap-1.5 text-[11px] text-cream/65 bg-white/4 rounded-xl px-3 py-2">
                      <Lightbulb size={12} className="text-gold shrink-0 mt-0.5" />
                      {r.tips}
                    </p>
                  )}

                  {r.url && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-3 inline-flex items-center gap-1 text-[11px] font-bold ${accentText[r.accent]} hover:underline underline-offset-4`}
                    >
                      詳細を見る <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
