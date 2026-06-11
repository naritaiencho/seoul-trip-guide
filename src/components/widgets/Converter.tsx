import { useState } from 'react'
import { Calculator, ArrowDownUp } from 'lucide-react'

// ウォン⇄円 かんたん電卓（レートは編集可能）
export default function Converter() {
  const [rate, setRate] = useState(110) // 1,000W あたりの円
  const [krw, setKrw] = useState('10000')

  const jpy = krw === '' ? '' : Math.round((Number(krw) * rate) / 1000).toLocaleString()

  const quick = [5000, 10000, 30000, 50000, 100000]

  return (
    <div className="liquid-glass rounded-3xl p-6 h-full">
      <h4 className="font-mincho font-bold text-lg flex items-center gap-2">
        <Calculator size={19} className="text-gold" /> ウォン⇄円 電卓
      </h4>
      <div className="mt-4 space-y-3">
        <div className="bg-white/4 rounded-2xl px-4 py-3">
          <p className="text-[10px] tracking-[0.2em] text-cream/45">KRW（ウォン）</p>
          <div className="flex items-baseline gap-2">
            <input
              type="number"
              inputMode="numeric"
              value={krw}
              onChange={(e) => setKrw(e.target.value)}
              className="w-full bg-transparent outline-none font-display font-bold text-2xl text-cream placeholder:text-cream/30"
              placeholder="10000"
            />
            <span className="text-cream/50 text-sm font-bold">₩</span>
          </div>
        </div>
        <div className="flex justify-center -my-1">
          <ArrowDownUp size={16} className="text-cream/40" />
        </div>
        <div className="bg-gradient-to-r from-gold/15 to-blush/10 border border-gold/25 rounded-2xl px-4 py-3">
          <p className="text-[10px] tracking-[0.2em] text-gold/80">JPY（日本円）だいたい</p>
          <p className="font-display font-bold text-2xl text-grad-gold">
            {jpy || '—'} <span className="text-sm">円</span>
          </p>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {quick.map((q) => (
          <button
            key={q}
            onClick={() => setKrw(String(q))}
            className="text-[11px] font-bold px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cream/65 hover:border-gold/50 hover:text-gold transition-all duration-300"
          >
            {q.toLocaleString()}W
          </button>
        ))}
      </div>

      <div className="mt-3.5 flex items-center gap-2 text-[11px] text-cream/45">
        レート: 1,000W =
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value) || 0)}
          className="w-14 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-cream text-center outline-none focus:border-gold/50"
        />
        円（タップで調整）
      </div>
    </div>
  )
}
