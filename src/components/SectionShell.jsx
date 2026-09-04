export default function SectionShell({ children, className = '' }) {
  return (
    <section className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden ${className}`}>
      {children}
    </section>
  )
}

