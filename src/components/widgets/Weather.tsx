import { useEffect, useState } from 'react'
import { CloudSun, RefreshCw } from 'lucide-react'

interface Daily {
  date: string
  code: number
  max: number
  min: number
  rain: number // 降水確率%
}

const TRIP_DATES = ['2026-07-04', '2026-07-05', '2026-07-06']

function wmoToEmoji(code: number): { emoji: string; label: string } {
  if (code === 0) return { emoji: '☀️', label: '快晴' }
  if (code <= 2) return { emoji: '⛅', label: '晴れ時々曇り' }
  if (code === 3) return { emoji: '☁️', label: '曇り' }
  if (code === 45 || code === 48) return { emoji: '🌫️', label: '霧' }
  if (code <= 57) return { emoji: '🌦️', label: '霧雨' }
  if (code <= 67) return { emoji: '🌧️', label: '雨' }
  if (code <= 77) return { emoji: '❄️', label: '雪' }
  if (code <= 82) return { emoji: '🌦️', label: 'にわか雨' }
  return { emoji: '⛈️', label: '雷雨' }
}

function fmtDate(d: string) {
  const [, m, day] = d.split('-')
  const dow = ['日', '月', '火', '水', '木', '金', '土'][new Date(d + 'T00:00:00+09:00').getDay()]
  return `${Number(m)}/${Number(day)}(${dow})`
}

export default function Weather() {
  const [days, setDays] = useState<Daily[] | null>(null)
  const [error, setError] = useState(false)

  const load = () => {
    setError(false)
    setDays(null)
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FSeoul&forecast_days=16'
    )
      .then((r) => r.json())
      .then((j) => {
        const d: Daily[] = j.daily.time.map((t: string, i: number) => ({
          date: t,
          code: j.daily.weather_code[i],
          max: Math.round(j.daily.temperature_2m_max[i]),
          min: Math.round(j.daily.temperature_2m_min[i]),
          rain: j.daily.precipitation_probability_max?.[i] ?? 0,
        }))
        setDays(d)
      })
      .catch(() => setError(true))
  }

  useEffect(load, [])

  const tripDays = days?.filter((d) => TRIP_DATES.includes(d.date)) ?? []
  const showDays = tripDays.length > 0 ? tripDays : (days ?? []).slice(0, 3)
  const isTrip = tripDays.length > 0

  return (
    <div className="liquid-glass rounded-3xl p-6 h-full">
      <h4 className="font-mincho font-bold text-lg flex items-center gap-2">
        <CloudSun size={19} className="text-teal" /> ソウルの天気
      </h4>
      {error && (
        <div className="mt-4 text-sm text-cream/55">
          取得に失敗しました。
          <button onClick={load} className="ml-2 inline-flex items-center gap-1 text-teal font-bold">
            <RefreshCw size={12} /> 再試行
          </button>
        </div>
      )}
      {!days && !error && <p className="mt-4 text-sm text-cream/45 animate-pulse">読み込み中…</p>}
      {days && (
        <>
          <p className="mt-1.5 text-[11px] text-cream/45">
            {isTrip ? '✈️ 旅行3日間の予報（Open-Meteo・ソウル）' : '直近の実況（旅行日の予報は出発約2週間前から表示）'}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {showDays.map((d) => {
              const w = wmoToEmoji(d.code)
              return (
                <div key={d.date} className="bg-white/4 rounded-2xl px-2 py-3.5 text-center">
                  <p className="text-[11px] text-cream/55 font-bold">{fmtDate(d.date)}</p>
                  <p className="text-3xl mt-1.5" title={w.label}>{w.emoji}</p>
                  <p className="text-[10px] text-cream/50 mt-1">{w.label}</p>
                  <p className="text-xs mt-1.5 font-bold">
                    <span className="text-blush">{d.max}°</span>
                    <span className="text-cream/40 mx-0.5">/</span>
                    <span className="text-teal">{d.min}°</span>
                  </p>
                  <p className="text-[10px] text-cream/45 mt-1">☔ {d.rain}%</p>
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-[11px] text-cream/40 leading-relaxed">
            7月上旬は梅雨ピーク。傘マークが並んでも、スコール型なので雨雲レーダー(NAVER天気)でやり過ごせることが多い。
          </p>
        </>
      )}
    </div>
  )
}
