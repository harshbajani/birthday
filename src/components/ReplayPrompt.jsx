export default function ReplayPrompt({ onReplay }) {
  return (
    <button
      type="button"
      onClick={onReplay}
      className="min-h-11 px-4 py-3 font-body text-sm tracking-[0.28em] text-text-muted uppercase touch-manipulation"
    >
      Replay
    </button>
  )
}
