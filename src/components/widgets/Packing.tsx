import { useState } from 'react'
import { Luggage, Plus, X } from 'lucide-react'
import { useTrip } from '../../store/TripStore'

// リサーチ結果から導いた持ち物プリセット
const PRESET = [
  'パスポート（残存期間チェック）',
  'eSIM購入＆設定（2人とも）',
  '日本円の現金 3〜5万円（明洞で両替）',
  '変換プラグ（SE/C/Fタイプ・丸2ピン）',
  'モバイルバッテリー',
  '折りたたみ傘 ×2（梅雨ピーク）',
  '薄手の羽織り（冷房つよい）',
  '速乾素材の服・濡れてOKな靴',
  '日焼け止め・汗拭きシート',
  '常備薬（胃腸薬は生レバーのお守りに）',
  'NAVER Map・Papago・Kakao T をインストール',
  'e-Arrival Card 申請（到着3日前〜）',
  '海外旅行保険の加入確認',
]

export default function Packing() {
  const { packing, customPacking, togglePacking, addCustomPacking, removeCustomPacking } = useTrip()
  const [draft, setDraft] = useState('')

  const all = [...PRESET, ...customPacking]
  const done = all.filter((i) => packing[i]).length
  const pct = all.length === 0 ? 0 : Math.round((done / all.length) * 100)

  const add = () => {
    const v = draft.trim()
    if (v) {
      addCustomPacking(v)
      setDraft('')
    }
  }

  return (
    <div className="liquid-glass rounded-3xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-mincho font-bold text-lg flex items-center gap-2">
          <Luggage size={19} className="text-violet" /> 持ち物チェック
        </h4>
        <span className="text-xs font-bold text-cream/55">
          {done}/{all.length}
        </span>
      </div>

      <div className="mt-3 h-2 rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet to-blush transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="mt-4 space-y-1 flex-1 overflow-y-auto max-h-72 pr-1">
        {all.map((item) => {
          const checked = !!packing[item]
          const custom = customPacking.includes(item)
          return (
            <li key={item} className="flex items-center gap-2 group">
              <button
                onClick={() => togglePacking(item)}
                className={`flex-1 flex items-center gap-2.5 text-left text-[13px] rounded-xl px-3 py-2 transition-all duration-300 ${
                  checked ? 'text-cream/40 bg-white/2' : 'text-cream/80 hover:bg-white/5'
                }`}
              >
                <span
                  className={`w-[18px] h-[18px] rounded-md border flex items-center justify-center text-[11px] shrink-0 transition-all duration-300 ${
                    checked ? 'bg-violet border-violet text-night font-black' : 'border-white/25'
                  }`}
                >
                  {checked && '✓'}
                </span>
                <span className={checked ? 'line-through' : ''}>{item}</span>
              </button>
              {custom && (
                <button
                  onClick={() => removeCustomPacking(item)}
                  aria-label="削除"
                  className="opacity-0 group-hover:opacity-100 text-cream/40 hover:text-blush transition-all"
                >
                  <X size={14} />
                </button>
              )}
            </li>
          )
        })}
      </ul>

      <div className="mt-3 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="自分の持ち物を追加…"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-[13px] text-cream outline-none focus:border-violet/60 placeholder:text-cream/30"
        />
        <button
          onClick={add}
          aria-label="追加"
          className="w-10 h-10 rounded-xl bg-violet/20 border border-violet/40 text-violet flex items-center justify-center hover:bg-violet hover:text-night transition-all duration-300"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}
