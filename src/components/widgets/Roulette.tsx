import { useEffect, useRef, useState } from 'react'
import { Dices, MapPin, Sparkles } from 'lucide-react'
import { allRestaurants } from '../../data/gourmet'
import { useTrip } from '../../store/TripStore'
import type { Restaurant } from '../../data/types'

// 「今夜どこ行く？」決められない2人のためのルーレット
export default function Roulette() {
  const { favs } = useTrip()
  const [spinning, setSpinning] = useState(false)
  const [display, setDisplay] = useState<Restaurant | null>(null)
  const [result, setResult] = useState<Restaurant | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const favRestaurants = allRestaurants.filter((r) => favs.includes(r.id))
  const pool = favRestaurants.length >= 2 ? favRestaurants : allRestaurants
  const usingFavs = favRestaurants.length >= 2

  useEffect(() => () => { if (timer.current) clearInterval(timer.current) }, [])

  const spin = () => {
    if (spinning || pool.length === 0) return
    setSpinning(true)
    setResult(null)
    let i = 0
    timer.current = setInterval(() => {
      setDisplay(pool[i % pool.length])
      i++
    }, 70)
    setTimeout(() => {
      if (timer.current) clearInterval(timer.current)
      const picked = pool[Math.floor(Math.random() * pool.length)]
      setDisplay(picked)
      setResult(picked)
      setSpinning(false)
    }, 1800)
  }

  const shown = result ?? display

  return (
    <div className="liquid-glass rounded-3xl p-6 h-full flex flex-col">
      <h4 className="font-mincho font-bold text-lg flex items-center gap-2">
        <Dices size={19} className="text-blush" /> 今夜どこ行く？ルーレット
      </h4>
      <p className="mt-1.5 text-[11px] text-cream/45">
        {usingFavs
          ? `2人の「行きたい！」${favRestaurants.length}軒から運命の1軒を抽選`
          : '全店から抽選中（♥を2軒以上つけると、お気に入り限定ルーレットに）'}
      </p>

      <div
        className={`mt-4 flex-1 min-h-[120px] rounded-2xl border flex flex-col items-center justify-center text-center px-4 py-6 transition-all duration-300 ${
          result
            ? 'border-blush/60 bg-gradient-to-br from-blush/15 to-violet/10 shadow-lg shadow-blush/20'
            : 'border-white/10 bg-white/3'
        }`}
      >
        {shown ? (
          <>
            {result && (
              <p className="flex items-center gap-1 text-[11px] font-bold text-blush tracking-[0.2em] mb-1.5">
                <Sparkles size={11} /> 運命の1軒はここ！
              </p>
            )}
            <p className={`font-mincho font-bold leading-snug ${result ? 'text-xl lg:text-2xl' : 'text-lg text-cream/70'}`}>
              {shown.name}
            </p>
            {result && (
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-cream/55">
                <MapPin size={11} className="text-teal" />
                {shown.area}
                {shown.station && `・${shown.station}`}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-cream/40">ボタンを押すと抽選スタート</p>
        )}
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className={`mt-4 w-full inline-flex items-center justify-center gap-2 font-bold text-sm px-5 py-3.5 rounded-2xl transition-all duration-300 active:scale-95 ${
          spinning
            ? 'bg-white/10 text-cream/40 cursor-wait'
            : 'bg-gradient-to-r from-blush to-violet text-night shadow-lg shadow-blush/30 hover:scale-[1.02]'
        }`}
      >
        <Dices size={16} className={spinning ? 'animate-spin' : ''} />
        {spinning ? '抽選中…' : result ? 'もう一回まわす' : 'ルーレットをまわす'}
      </button>
    </div>
  )
}
