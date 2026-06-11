import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#overview', label: '旅の概要' },
  { href: '#areas', label: 'エリア' },
  { href: '#sister', label: '妹のお墨付き' },
  { href: '#gourmet', label: 'グルメ' },
  { href: '#spots', label: '観光' },
  { href: '#hotels', label: 'ホテル' },
  { href: '#plans', label: 'プラン' },
  { href: '#tips', label: 'Tips' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-night/70 border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2 group">
          <span className="font-display font-black text-xl lg:text-2xl text-grad">SEOUL</span>
          <span className="font-display italic text-cream/70 text-xs lg:text-sm tracking-widest group-hover:text-cream transition-colors">
            for Two
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1 liquid-glass rounded-full px-2 py-1.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-1.5 rounded-full text-[13px] text-cream/75 hover:text-night hover:bg-cream transition-all duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#plans"
          className="hidden lg:inline-block text-[13px] font-bold text-night bg-gradient-to-r from-gold via-blush to-violet px-5 py-2.5 rounded-full shadow-lg shadow-blush/25 hover:shadow-blush/50 hover:scale-105 transition-all duration-300"
        >
          7.4 出発
        </a>

        <button
          className="lg:hidden text-cream p-2"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden backdrop-blur-2xl bg-night/95 border-b border-white/10">
          <nav className="px-6 py-6 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-4 rounded-xl text-cream/85 hover:bg-white/5 font-mincho text-lg"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
