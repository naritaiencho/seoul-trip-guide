import { useEffect, useRef, useState } from 'react'
import { Plane, MapPin, Sparkles, UtensilsCrossed } from 'lucide-react'

const DEPARTURE = new Date('2026-07-04T12:00:00+09:00').getTime()

function useCountdown() {
  const [left, setLeft] = useState(DEPARTURE - Date.now())
  useEffect(() => {
    const t = setInterval(() => setLeft(DEPARTURE - Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const total = Math.max(0, left)
  return {
    days: Math.floor(total / 86400000),
    hours: Math.floor((total % 86400000) / 3600000),
    mins: Math.floor((total % 3600000) / 60000),
    secs: Math.floor((total % 60000) / 1000),
  }
}

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53 + 11) % 100}%`,
  top: `${(i * 37 + 19) % 90}%`,
  size: 3 + ((i * 7) % 6),
  delay: `${(i % 9) * 0.8}s`,
  duration: `${6 + (i % 5)}s`,
  color: ['#E5C374', '#FF5C8A', '#9D6BFF', '#3ED6C0'][i % 4],
}))

export default function Hero() {
  const { days, hours, mins, secs } = useCountdown()
  const bgRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const raf = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5
      mouse.current.y = e.clientY / window.innerHeight - 0.5
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        const { x, y } = mouse.current
        if (bgRef.current) {
          bgRef.current.style.transform = `scale(1.08) translate(${x * -18}px, ${y * -12}px)`
        }
        if (cardRef.current) {
          cardRef.current.style.transform = `perspective(1100px) rotateY(${x * 14}deg) rotateX(${y * -12}deg)`
        }
        if (glareRef.current) {
          glareRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.22), transparent 55%)`
        }
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* bg image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: 'scale(1.08)' }}
      >
        <img
          src="/img/hero-seoul.webp"
          alt=""
          className="w-full h-full object-cover opacity-60"
          draggable={false}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/35 to-night" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-transparent to-night/40" />

      {/* particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 12px ${p.color}`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full pt-28 pb-16 lg:pt-32 grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-8 items-center">
        {/* left: copy */}
        <div>
          <p
            className="flex items-center gap-2 text-gold font-display italic tracking-[0.3em] text-sm lg:text-base opacity-0 animate-[fadeUp_0.9s_ease_0.1s_forwards]"
          >
            <Sparkles size={16} /> FIRST TRIP TO KOREA · 2026
          </p>
          <h1 className="mt-4 font-display font-black uppercase leading-[0.95] text-[64px] sm:text-[88px] lg:text-[120px] opacity-0 animate-[fadeUp_0.9s_ease_0.25s_forwards]">
            <span className="text-grad">SEOUL</span>
            <span className="block font-kr text-cream/90 text-[30px] sm:text-[40px] lg:text-[52px] font-semibold tracking-wider mt-2">
              서울, ふたり旅
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-cream/75 leading-relaxed text-sm lg:text-base opacity-0 animate-[fadeUp_0.9s_ease_0.45s_forwards]">
            7月4日の昼にソウルに降り立って、7月6日の昼過ぎに帰る2泊3日。
            チキンもホルモンも生レバーも、古宮も夜景もカフェも——
            ぜんぶ詰め込んだ、ふたりのためだけの韓国ガイド。
          </p>

          {/* countdown */}
          <div className="mt-8 flex gap-3 lg:gap-4 opacity-0 animate-[fadeUp_0.9s_ease_0.6s_forwards]">
            {[
              { v: days, l: 'DAYS' },
              { v: hours, l: 'HOURS' },
              { v: mins, l: 'MIN' },
              { v: secs, l: 'SEC' },
            ].map((c) => (
              <div
                key={c.l}
                className="liquid-glass rounded-2xl px-4 py-3 lg:px-6 lg:py-4 text-center min-w-[68px] lg:min-w-[88px]"
              >
                <div className="font-display font-bold text-2xl lg:text-4xl text-grad-gold tabular-nums">
                  {String(c.v).padStart(2, '0')}
                </div>
                <div className="text-[10px] lg:text-xs tracking-[0.25em] text-cream/50 mt-1">{c.l}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-4 opacity-0 animate-[fadeUp_0.9s_ease_0.75s_forwards]">
            <a
              href="#plans"
              className="inline-flex items-center gap-2 font-bold text-night bg-gradient-to-r from-gold via-blush to-violet px-7 py-3.5 rounded-full shadow-xl shadow-blush/30 hover:shadow-blush/60 hover:scale-105 transition-all duration-300"
            >
              <Plane size={18} /> 旅のプランを見る
            </a>
            <a
              href="#gourmet"
              className="inline-flex items-center gap-2 font-bold text-cream border border-cream/30 px-7 py-3.5 rounded-full hover:bg-cream/10 hover:border-cream/60 transition-all duration-300"
            >
              <UtensilsCrossed size={18} /> グルメ図鑑へ
            </a>
          </div>
        </div>

        {/* right: tilting boarding pass */}
        <div className="hidden md:block opacity-0 animate-[fadeUp_1s_ease_0.9s_forwards]">
          <div
            ref={cardRef}
            className="relative liquid-glass rounded-3xl overflow-hidden shimmer transition-transform duration-150 ease-out will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div ref={glareRef} className="absolute inset-0 pointer-events-none z-10" />
            <div className="p-7 lg:p-8">
              <div className="flex items-center justify-between">
                <span className="font-display italic text-xs tracking-[0.3em] text-gold">
                  BOARDING PASS
                </span>
                <Plane size={18} className="text-blush" />
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="font-display font-black text-4xl lg:text-5xl">JPN</p>
                  <p className="text-cream/50 text-xs mt-1">JAPAN</p>
                </div>
                <div className="flex-1 mx-4 mb-4 relative">
                  <div className="border-t border-dashed border-cream/30" />
                  <Plane
                    size={16}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 text-gold rotate-0"
                  />
                </div>
                <div className="text-right">
                  <p className="font-display font-black text-4xl lg:text-5xl text-grad">SEL</p>
                  <p className="text-cream/50 text-xs mt-1">SEOUL, KOREA</p>
                </div>
              </div>
              <div className="ticket-divider my-6" />
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-cream/45 text-[10px] tracking-[0.2em]">DATE</p>
                  <p className="font-bold mt-1">07.04 — 07.06</p>
                </div>
                <div>
                  <p className="text-cream/45 text-[10px] tracking-[0.2em]">PASSENGERS</p>
                  <p className="font-bold mt-1">2 ADULTS</p>
                </div>
                <div>
                  <p className="text-cream/45 text-[10px] tracking-[0.2em]">CLASS</p>
                  <p className="font-bold mt-1 text-grad-gold">PREMIUM</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-cream/55">
                <MapPin size={13} className="text-teal" />
                BASE CAMP : 弘大 HONGDAE（妹のお墨付き）
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeUp_1s_ease_1.3s_forwards]">
        <span className="text-[10px] tracking-[0.35em] text-cream/40">SCROLL</span>
        <span className="w-px h-10 bg-gradient-to-b from-cream/50 to-transparent" />
      </div>
    </section>
  )
}
