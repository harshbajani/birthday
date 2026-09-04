export default function FilmGrainOverlay() {
  return <div className="film-grain" aria-hidden="true" />
}

export function DustMotes() {
  const motes = [
    { top: '12%', left: '18%', delay: '0s' },
    { top: '28%', left: '72%', delay: '3s' },
    { top: '46%', left: '34%', delay: '7s' },
    { top: '63%', left: '81%', delay: '1.5s' },
    { top: '78%', left: '22%', delay: '5s' },
    { top: '22%', left: '52%', delay: '9s' },
    { top: '88%', left: '64%', delay: '4s' },
    { top: '8%', left: '88%', delay: '11s' },
  ]

  return (
    <div className="dust-motes" aria-hidden="true">
      {motes.map((mote) => (
        <span
          key={`${mote.top}-${mote.left}`}
          style={{ top: mote.top, left: mote.left, animationDelay: mote.delay }}
        />
      ))}
    </div>
  )
}
