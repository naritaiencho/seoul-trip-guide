import { CalendarHeart, MapPin, Users, Wallet, TrainFront, Heart } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const facts = [
  {
    icon: CalendarHeart,
    label: '日程',
    value: '7.4(土) 昼 〜 7.6(月) 昼過ぎ',
    note: '実働 Day1午後＋Day2フル＋Day3朝',
    accent: 'text-blush',
  },
  {
    icon: Users,
    label: '旅のメンバー',
    value: '35歳の彼 × 同世代の彼女',
    note: '2人とも初めての韓国',
    accent: 'text-gold',
  },
  {
    icon: MapPin,
    label: 'ベースキャンプ',
    value: '弘大（ホンデ）',
    note: '妹のお墨付き・空港から一本',
    accent: 'text-teal',
  },
  {
    icon: Wallet,
    label: 'ホテル予算',
    value: '1人 8,000〜15,000円／泊',
    note: '2人1室 約16,000〜30,000円',
    accent: 'text-violet',
  },
  {
    icon: TrainFront,
    label: '空港アクセス',
    value: "A'REXで弘大入口まで一本",
    note: '仁川から約55分・乗換なし',
    accent: 'text-teal',
  },
  {
    icon: Heart,
    label: '最重要ミッション',
    value: '彼女に生レバーを',
    note: '日本では食べられない간천엽体験',
    accent: 'text-blush',
  },
]

export default function TripOverview() {
  return (
    <section id="overview" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          num="01"
          en="The Journey"
          ja="この旅について"
          desc="2泊3日、ふたりの初ソウル。決まっているのは日程だけ。あとはこのガイドから、好きなものを好きなだけ選べばいい。"
          grad="text-grad-gold"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 90}>
              <div className="liquid-glass rounded-3xl p-6 lg:p-7 h-full hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-500 group">
                <f.icon size={26} className={`${f.accent} transition-transform duration-500 group-hover:scale-110`} />
                <p className="mt-4 text-[11px] tracking-[0.25em] text-cream/45">{f.label}</p>
                <p className="mt-1.5 font-mincho font-bold text-lg lg:text-xl leading-snug">{f.value}</p>
                <p className="mt-2 text-sm text-cream/55">{f.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 relative overflow-hidden rounded-3xl">
            <img src="/img/travelers.webp" alt="ソウルの夜へ歩き出す2人" className="w-full h-56 lg:h-80 object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
            <p className="absolute bottom-5 lg:bottom-7 left-6 lg:left-10 font-mincho text-lg lg:text-2xl font-semibold">
              さあ、ソウルの夜へ。
              <span className="block text-sm lg:text-base text-cream/65 mt-1 font-body">飛行機を降りたら、そこはもう食と光の街。</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
