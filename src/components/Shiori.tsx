import { useMemo, useState } from 'react'
import {
  BookHeart, Heart, Check, MapPin, Copy, ClipboardCheck, BedDouble, UtensilsCrossed, Landmark, Trash2, ArrowRight,
} from 'lucide-react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import Weather from './widgets/Weather'
import Converter from './widgets/Converter'
import Packing from './widgets/Packing'
import Roulette from './widgets/Roulette'
import { allRestaurants, catLabel, categories } from '../data/gourmet'
import { spots } from '../data/spots'
import { hotels } from '../data/hotels'
import { useTrip } from '../store/TripStore'

const SITE_URL = 'https://seoul-trip-guide.vercel.app'

export default function Shiori() {
  const { favs, visited, hotelId, toggleFav, toggleVisited } = useTrip()
  const [copied, setCopied] = useState(false)

  const favRestaurants = allRestaurants.filter((r) => favs.includes(r.id))
  const favSpots = spots.filter((s) => favs.includes(s.id))
  const stay = hotels.find((h) => h.id === hotelId)

  const totalFav = favRestaurants.length + favSpots.length
  const doneCount = [...favRestaurants, ...favSpots].filter((x) => visited.includes(x.id)).length
  const pct = totalFav === 0 ? 0 : Math.round((doneCount / totalFav) * 100)

  // カテゴリ順にグルメお気に入りをグルーピング
  const grouped = useMemo(() => {
    return categories
      .filter((c) => c.id !== 'all')
      .map((c) => ({
        cat: c,
        items: favRestaurants.filter((r) => r.category === c.id),
      }))
      .filter((g) => g.items.length > 0)
  }, [favRestaurants])

  const buildShareText = () => {
    const lines: string[] = []
    lines.push('🇰🇷 SEOUL for Two しおり（7/4〜7/6）')
    lines.push('')
    lines.push(`🏨 宿: ${stay ? stay.name : '未定'}`)
    for (const g of grouped) {
      lines.push('')
      lines.push(`${g.cat.emoji} ${g.cat.label}`)
      for (const r of g.items) {
        lines.push(`  ${visited.includes(r.id) ? '✅' : '・'}${r.name}（${r.area}）`)
      }
    }
    if (favSpots.length > 0) {
      lines.push('')
      lines.push('📍 観光・体験')
      for (const s of favSpots) {
        lines.push(`  ${visited.includes(s.id) ? '✅' : '・'}${s.name}（${s.area}）`)
      }
    }
    lines.push('')
    lines.push(`📖 詳細: ${SITE_URL}`)
    return lines.join('\n')
  }

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // クリップボード不可の環境では何もしない
    }
  }

  const ItemRow = ({
    id, name, sub,
  }: {
    id: string
    name: string
    sub: string
  }) => {
    const done = visited.includes(id)
    return (
      <li className="flex items-center gap-2.5 bg-white/3 rounded-2xl px-3.5 py-2.5 group">
        <button
          onClick={() => toggleVisited(id)}
          aria-label="行ったに切り替え"
          className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 active:scale-90 ${
            done ? 'bg-teal border-teal text-night' : 'border-white/25 text-cream/40 hover:border-teal/60 hover:text-teal'
          }`}
        >
          <Check size={13} strokeWidth={3} />
        </button>
        <div className="flex-1 min-w-0">
          <p className={`text-[13px] font-bold truncate ${done ? 'text-cream/45 line-through' : ''}`}>{name}</p>
          <p className="text-[11px] text-cream/45 truncate flex items-center gap-1">
            <MapPin size={9} /> {sub}
          </p>
        </div>
        <button
          onClick={() => toggleFav(id)}
          aria-label="お気に入りから外す"
          title="お気に入りから外す"
          className="opacity-40 lg:opacity-0 group-hover:opacity-100 text-cream/50 hover:text-blush transition-all shrink-0"
        >
          <Trash2 size={14} />
        </button>
      </li>
    )
  }

  return (
    <section id="shiori" className="relative py-20 lg:py-28">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 25%, #FF5C8A, transparent)' }}
      />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          num="09"
          en="Trip Booklet"
          ja="ふたりのしおり"
          desc="♥をつけた店・スポットと決めた宿が、ここに自動で集まる。コピーしてLINEで共有もできる、ふたり専用の旅のダッシュボード。"
          grad="text-grad-pink"
        />

        {/* stats */}
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="liquid-glass rounded-3xl p-5 text-center">
              <Heart size={18} className="mx-auto text-blush" />
              <p className="font-display font-black text-3xl mt-2 text-grad-pink">{totalFav}</p>
              <p className="text-[11px] text-cream/50 mt-1 tracking-widest">行きたい！</p>
            </div>
            <div className="liquid-glass rounded-3xl p-5 text-center">
              <Check size={18} className="mx-auto text-teal" />
              <p className="font-display font-black text-3xl mt-2 text-grad-teal">{doneCount}</p>
              <p className="text-[11px] text-cream/50 mt-1 tracking-widest">制覇した！</p>
            </div>
            <div className="liquid-glass rounded-3xl p-5 col-span-2">
              <div className="flex items-baseline justify-between">
                <p className="text-[11px] text-cream/50 tracking-widest">ソウル制覇率</p>
                <p className="font-display font-black text-2xl text-grad-gold">{pct}%</p>
              </div>
              <div className="mt-3 h-3 rounded-full bg-white/8 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold via-blush to-violet transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2.5 text-[11px] text-cream/40">
                {totalFav === 0
                  ? 'まずは気になる店に ♥ をつけるところから'
                  : pct === 100
                    ? '完全制覇！おつかれさま🎉 また来ようね'
                    : '旅行中は「行った！」チェックでゲージが伸びる'}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 mb-6 items-start">
          {/* favorites list */}
          <Reveal className="h-full">
            <div className="liquid-glass rounded-3xl p-6 lg:p-7 h-full">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h4 className="font-mincho font-bold text-lg flex items-center gap-2">
                  <BookHeart size={19} className="text-blush" /> 行きたいリスト
                </h4>
                <button
                  onClick={copyShare}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-all duration-300 ${
                    copied
                      ? 'bg-teal text-night border-teal'
                      : 'bg-white/4 text-cream/75 border-white/15 hover:border-teal/60 hover:text-teal'
                  }`}
                >
                  {copied ? <ClipboardCheck size={13} /> : <Copy size={13} />}
                  {copied ? 'コピーした！LINEで共有してね' : 'しおりをコピー'}
                </button>
              </div>

              {/* hotel */}
              <div className="mt-5">
                <p className="text-[11px] font-bold tracking-[0.2em] text-gold flex items-center gap-1.5 mb-2">
                  <BedDouble size={12} /> 宿
                </p>
                {stay ? (
                  <div className="bg-gradient-to-r from-gold/12 to-transparent border border-gold/25 rounded-2xl px-4 py-3">
                    <p className="font-bold text-sm">{stay.name}</p>
                    <p className="text-[11px] text-cream/50 mt-0.5">{stay.station}</p>
                  </div>
                ) : (
                  <a href="#hotels" className="block bg-white/3 border border-dashed border-white/15 rounded-2xl px-4 py-3 text-[13px] text-cream/50 hover:border-gold/40 hover:text-gold transition-all duration-300">
                    まだ未定 — ホテル候補から「ここに泊まる」を選ぼう <ArrowRight size={12} className="inline" />
                  </a>
                )}
              </div>

              {/* gourmet favs */}
              <div className="mt-5">
                <p className="text-[11px] font-bold tracking-[0.2em] text-blush flex items-center gap-1.5 mb-2">
                  <UtensilsCrossed size={12} /> グルメ（{favRestaurants.length}）
                </p>
                {grouped.length === 0 ? (
                  <a href="#gourmet" className="block bg-white/3 border border-dashed border-white/15 rounded-2xl px-4 py-3 text-[13px] text-cream/50 hover:border-blush/40 hover:text-blush transition-all duration-300">
                    グルメ図鑑で気になる店に ♥ をつけよう <ArrowRight size={12} className="inline" />
                  </a>
                ) : (
                  <div className="space-y-3">
                    {grouped.map((g) => (
                      <div key={g.cat.id}>
                        <p className="text-[11px] text-cream/45 mb-1.5">
                          {g.cat.emoji} {catLabel[g.cat.id]}
                        </p>
                        <ul className="space-y-1.5">
                          {g.items.map((r) => (
                            <ItemRow key={r.id} id={r.id} name={r.name} sub={`${r.area}${r.station ? `・${r.station}` : ''}`} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* spot favs */}
              <div className="mt-5">
                <p className="text-[11px] font-bold tracking-[0.2em] text-violet flex items-center gap-1.5 mb-2">
                  <Landmark size={12} /> 観光・体験（{favSpots.length}）
                </p>
                {favSpots.length === 0 ? (
                  <a href="#spots" className="block bg-white/3 border border-dashed border-white/15 rounded-2xl px-4 py-3 text-[13px] text-cream/50 hover:border-violet/40 hover:text-violet transition-all duration-300">
                    観光スポットからも ♥ で追加できる <ArrowRight size={12} className="inline" />
                  </a>
                ) : (
                  <ul className="space-y-1.5">
                    {favSpots.map((s) => (
                      <ItemRow key={s.id} id={s.id} name={s.name} sub={s.area} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>

          {/* roulette */}
          <Reveal delay={100} className="h-full">
            <Roulette />
          </Reveal>
        </div>

        {/* utility widgets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Reveal className="h-full">
            <Weather />
          </Reveal>
          <Reveal delay={80} className="h-full">
            <Converter />
          </Reveal>
          <Reveal delay={160} className="h-full md:col-span-2 lg:col-span-1">
            <Packing />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
