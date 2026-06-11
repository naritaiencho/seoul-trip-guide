import { Heart, Check } from 'lucide-react'
import { useTrip } from '../store/TripStore'

// 行きたい(ハート)・行った(チェック)のトグルボタン
export default function MarkButtons({ id }: { id: string }) {
  const { favs, visited, toggleFav, toggleVisited } = useTrip()
  const fav = favs.includes(id)
  const done = visited.includes(id)

  return (
    <div className="flex gap-1.5">
      <button
        aria-label={fav ? '行きたいを解除' : '行きたい！'}
        title={fav ? '行きたいを解除' : '行きたい！'}
        onClick={() => toggleFav(id)}
        className={`w-9 h-9 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 active:scale-90 ${
          fav
            ? 'bg-blush text-night border-blush shadow-lg shadow-blush/40 scale-105'
            : 'bg-night/55 text-cream/70 border-white/15 hover:border-blush/60 hover:text-blush'
        }`}
      >
        <Heart size={15} className={fav ? 'fill-current' : ''} />
      </button>
      <button
        aria-label={done ? '行ったを解除' : '行った！'}
        title={done ? '行ったを解除' : '行った！'}
        onClick={() => toggleVisited(id)}
        className={`w-9 h-9 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 active:scale-90 ${
          done
            ? 'bg-teal text-night border-teal shadow-lg shadow-teal/40 scale-105'
            : 'bg-night/55 text-cream/70 border-white/15 hover:border-teal/60 hover:text-teal'
        }`}
      >
        <Check size={15} strokeWidth={3} />
      </button>
    </div>
  )
}
