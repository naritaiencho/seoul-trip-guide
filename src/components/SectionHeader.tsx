import Reveal from './Reveal'

interface SectionHeaderProps {
  num: string
  en: string
  ja: string
  desc?: string
  grad?: 'text-grad' | 'text-grad-gold' | 'text-grad-pink' | 'text-grad-teal' | 'text-grad-violet'
}

export default function SectionHeader({ num, en, ja, desc, grad = 'text-grad' }: SectionHeaderProps) {
  return (
    <Reveal className="relative mb-12 lg:mb-16">
      <span className="section-num absolute -top-8 lg:-top-14 left-0 font-display font-black text-[88px] lg:text-[150px] leading-none select-none">
        {num}
      </span>
      <div className="relative pt-8 lg:pt-12">
        <p className={`font-display italic text-sm lg:text-base tracking-[0.35em] uppercase ${grad}`}>
          {en}
        </p>
        <h2 className="font-mincho font-bold text-3xl lg:text-5xl mt-3 leading-tight">{ja}</h2>
        {desc && (
          <p className="mt-4 text-cream/65 text-sm lg:text-base max-w-2xl leading-relaxed">{desc}</p>
        )}
      </div>
    </Reveal>
  )
}
