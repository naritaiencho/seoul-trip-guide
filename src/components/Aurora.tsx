export default function Aurora() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="aurora-blob w-[55vw] h-[55vw] top-[-15%] left-[-10%] opacity-[0.16]"
        style={{
          background: 'radial-gradient(circle, #9D6BFF 0%, transparent 65%)',
          animation: 'aurora1 22s ease-in-out infinite',
        }}
      />
      <div
        className="aurora-blob w-[48vw] h-[48vw] top-[30%] right-[-12%] opacity-[0.13]"
        style={{
          background: 'radial-gradient(circle, #FF5C8A 0%, transparent 65%)',
          animation: 'aurora2 26s ease-in-out infinite',
        }}
      />
      <div
        className="aurora-blob w-[42vw] h-[42vw] bottom-[-12%] left-[22%] opacity-[0.11]"
        style={{
          background: 'radial-gradient(circle, #E5C374 0%, transparent 65%)',
          animation: 'aurora3 30s ease-in-out infinite',
        }}
      />
    </div>
  )
}
