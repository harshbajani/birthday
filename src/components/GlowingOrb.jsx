import { useEffect, useRef } from 'react';

export default function GlowingOrb({ size = 200, color = '#667eea', top, left, delay = 0 }) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        filter: 'blur(40px)',
        animation: `float 6s ease-in-out ${delay}s infinite alternate`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
