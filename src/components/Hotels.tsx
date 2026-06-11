import { BedDouble, MapPin, Star, ExternalLink, Trophy, KeyRound, PartyPopper, X } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { hotels, hotelAreaCompare } from '../data/hotels'
import { useTrip } from '../store/TripStore'

const accentText: Record<string, string> = {
  gold: 'text-gold',
  pink: 'text-blush',
  violet: 'text-violet',
  teal: 'text-teal',
}

const rankBadge = ['🥇 第1候補', '🥈 第2候補', '🥉 第3候補']

// 「ここに泊まる」決定ボタン
function DecideButton({ id }: { id: string }) {
  const { hotelId, decideHotel } = useTrip()
  const decided = hotelId === id
  return (
    <button
      onClick={() => decideHotel(decided ? null : id)}
      className={`mt-4 w-full inline-flex items-center justify-center gap-2 text-[13px] font-bold px-4 py-3 rounded-2xl border transition-all duration-300 active:scale-95 ${
        decided
          ? 'bg-gradient-to-r from-gold to-blush text-night border-transparent shadow-lg shadow-gold/30'
          : 'bg-white/4 text-cream/80 border-white/15 hover:border-gold/60 hover:text-gold'
      }`}
    >
      {decided ? (
        <>
          <PartyPopper size={15} /> ここに泊まる！（決定済み）
        </>
      ) : (
        <>
          <KeyRound size={15} /> ここに泊まる
        </>
      )}
    </button>
  )
}

export default function Hotels() {
  const picks = hotels.filter((h) => h.pick)
  const others = hotels.filter((h) => !h.pick)
  const { hotelId, decideHotel } = useTrip()
  const decidedHotel = hotels.find((h) => h.id === hotelId)

  return (
    <section id="hotels" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          num="06"
          en="Stay"
          ja="ホテル候補"
          desc="予算は1人8,000〜15,000円／泊。土曜泊は高く日曜泊は安いので「2泊平均」で見るのがコツ。今は無料キャンセル可で仮押さえ→直前に最安を取り直すのが鉄則。"
          grad="text-grad-gold"
        />

        {decidedHotel && (
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl mb-8 border border-gold/40 bg-gradient-to-r from-gold/15 via-night2 to-blush/10">
              <div className="p-5 lg:p-6 flex items-center gap-4 flex-wrap">
                <PartyPopper size={28} className="text-gold shrink-0" />
                <div className="flex-1 min-w-[200px]">
                  <p className="text-[11px] tracking-[0.25em] text-gold font-bold">OUR STAY — 宿泊先 決定！</p>
                  <p className="font-mincho font-bold text-xl lg:text-2xl mt-1">{decidedHotel.name}</p>
                  <p className="text-xs text-cream/60 mt-1">{decidedHotel.station}／{decidedHotel.price}</p>
                </div>
                <button
                  onClick={() => decideHotel(null)}
                  className="inline-flex items-center gap-1.5 text-xs text-cream/55 border border-white/15 px-3.5 py-2 rounded-full hover:border-cream/40 hover:text-cream transition-all duration-300"
                >
                  <X size={12} /> 選び直す
                </button>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl mb-12">
            <img src="/img/hotel-room.webp" alt="ソウルの夜景を望むホテル" className="w-full h-52 lg:h-72 object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-7 lg:px-12">
              <div>
                <p className="font-display italic text-gold tracking-[0.3em] text-xs lg:text-sm">BASE CAMP: HONGDAE</p>
                <h3 className="mt-2 font-mincho font-bold text-2xl lg:text-4xl leading-snug">
                  結論、弘大泊が正解。
                </h3>
                <p className="mt-3 max-w-md text-sm text-cream/75 leading-relaxed">
                  空港から一本・夜は眠らない・最終日の朝まで遊べる。
                  妹の推しはリサーチでも裏付けられた。
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* top3 picks */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {picks.map((h, i) => (
            <Reveal key={h.id} delay={i * 100} className="h-full">
              <article className={`relative liquid-glass rounded-3xl p-6 lg:p-7 h-full flex flex-col hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 border-t-2 border-gold/30 ${hotelId === h.id ? 'ring-2 ring-gold shadow-2xl shadow-gold/20' : ''}`}>
                <span className="absolute -top-3.5 left-5 text-[11px] font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-gold to-blush text-night shadow-lg">
                  {rankBadge[i]}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <BedDouble size={18} className={accentText[h.accent]} />
                  <span className="text-[11px] text-cream/45 tracking-wider">{h.area}</span>
                </div>
                <h3 className="mt-2.5 font-mincho font-bold text-lg lg:text-xl leading-snug">{h.name}</h3>
                {h.nameEn && <p className="font-display italic text-[11px] text-cream/40 mt-0.5">{h.nameEn}</p>}

                <p className={`mt-3 font-bold text-sm ${accentText[h.accent]}`}>{h.price}</p>
                {h.rating && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-cream/60">
                    <Star size={11} className="text-gold fill-gold" /> {h.rating}
                  </p>
                )}

                <ul className="mt-4 space-y-1.5 flex-1">
                  {h.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[13px] text-cream/75">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-xs text-cream/60 bg-white/4 rounded-xl px-3.5 py-2.5 leading-relaxed">{h.forUs}</p>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-cream/45"><MapPin size={11} />{h.station}</p>
                {h.url && (
                  <a href={h.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:underline underline-offset-4">
                    空室をチェック <ExternalLink size={11} />
                  </a>
                )}
                <DecideButton id={h.id} />
              </article>
            </Reveal>
          ))}
        </div>

        {/* other candidates */}
        <Reveal>
          <h3 className="font-mincho font-bold text-xl lg:text-2xl mb-6 flex items-center gap-2">
            <Trophy size={20} className="text-cream/40" /> まだある候補たち
          </h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {others.map((h, i) => (
            <Reveal key={h.id} delay={(i % 3) * 80} className="h-full">
              <article className={`liquid-glass rounded-3xl p-6 h-full flex flex-col hover:scale-[1.02] transition-all duration-500 ${hotelId === h.id ? 'ring-2 ring-gold shadow-2xl shadow-gold/20' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold ${accentText[h.accent]}`}>{h.area}</span>
                  {h.rating && (
                    <span className="flex items-center gap-1 text-[11px] text-cream/55">
                      <Star size={10} className="text-gold fill-gold" />{h.rating}
                    </span>
                  )}
                </div>
                <h4 className="mt-2 font-mincho font-bold text-base lg:text-lg leading-snug">{h.name}</h4>
                <p className="mt-2 text-[13px] font-bold text-cream/85">{h.price}</p>
                <p className="mt-2.5 text-xs text-cream/60 leading-relaxed flex-1">{h.forUs}</p>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-cream/45"><MapPin size={11} />{h.station}</p>
                {h.url && (
                  <a href={h.url} target="_blank" rel="noreferrer" className={`mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold ${accentText[h.accent]} hover:underline underline-offset-4`}>
                    空室をチェック <ExternalLink size={10} />
                  </a>
                )}
                <DecideButton id={h.id} />
              </article>
            </Reveal>
          ))}
        </div>

        {/* area compare table */}
        <Reveal>
          <div className="liquid-glass rounded-3xl p-6 lg:p-8 overflow-x-auto">
            <h3 className="font-mincho font-bold text-xl mb-5">どこに泊まる？ エリア比較</h3>
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left text-cream/45 text-xs tracking-wider border-b border-white/10">
                  <th className="pb-3 pr-4">エリア</th>
                  <th className="pb-3 pr-4">空港アクセス</th>
                  <th className="pb-3 pr-4">夜の充実度</th>
                  <th className="pb-3 pr-4">グルメ</th>
                  <th className="pb-3 pr-4">相場(2人1室)</th>
                  <th className="pb-3">総合</th>
                </tr>
              </thead>
              <tbody>
                {hotelAreaCompare.map((row) => (
                  <tr key={row.area} className={`border-b border-white/5 ${row.area === '弘大' ? 'bg-gold/5' : ''}`}>
                    <td className={`py-3.5 pr-4 font-bold ${row.area === '弘大' ? 'text-gold' : ''}`}>{row.area}</td>
                    <td className="py-3.5 pr-4 text-cream/70">{row.airport}</td>
                    <td className="py-3.5 pr-4 text-cream/70">{row.night}</td>
                    <td className="py-3.5 pr-4 text-cream/70">{row.gourmet}</td>
                    <td className="py-3.5 pr-4 text-cream/70">{row.price}</td>
                    <td className={`py-3.5 font-bold ${row.area === '弘大' ? 'text-gold' : 'text-cream/70'}`}>{row.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-cream/45">
              ※ ツイン希望なら予約時に「2 single beds」を必ず確認（韓国は表記が混在しがち）。価格は2026年6月時点の実勢調査値。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
