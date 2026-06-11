import { useEffect, useState } from 'react'
import { BookHeart } from 'lucide-react'
import { useTrip } from '../store/TripStore'

// 画面右下に浮かぶ「しおり」ショートカット
export default function FloatingShiori() {
  const { favs } = useTrip()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#shiori"
      aria-label="ふたりのしおりへ"
      className={`fixed bottom-5 right-5 lg:bottom-8 lg:right-8 z-40 inline-flex items-center gap-2 font-bold text-[13px] text-night bg-gradient-to-r from-gold via-blush to-violet pl-4 pr-5 py-3 rounded-full shadow-xl shadow-blush/35 hover:scale-105 active:scale-95 transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <BookHeart size={17} />
      しおり
      {favs.length > 0 && (
        <span className="bg-night text-cream text-[10px] font-bold min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center">
          {favs.length}
        </span>
      )}
    </a>
  )
}
