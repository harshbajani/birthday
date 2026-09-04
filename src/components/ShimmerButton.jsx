export default function ShimmerButton({ children, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '16px 40px',
        fontSize: '1.2rem',
        fontWeight: 600,
        color: '#fff',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        boxShadow: '0 4px 25px rgba(102, 126, 234, 0.4)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px) scale(1.02)';
        e.target.style.boxShadow = '0 8px 35px rgba(102, 126, 234, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0) scale(1)';
        e.target.style.boxShadow = '0 4px 25px rgba(102, 126, 234, 0.4)';
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          animation: 'shimmer 2s infinite',
        }}
      />
      {children}
    </button>
  );
}
