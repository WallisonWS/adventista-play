import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * ChristianBackground3D
 * Background 3D cristão/adventista interativo que segue o movimento do mouse
 * Otimizado para alto FPS e sem lentidão
 */
export function ChristianBackground3D() {
  const canvasRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics para movimento suave
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalizar posição do mouse (-1 a 1)
      const xPercent = (e.clientX / window.innerWidth) * 2 - 1;
      const yPercent = (e.clientY / window.innerHeight) * 2 - 1;
      
      mouseX.set(xPercent * 50); // Movimento máximo de 50px
      mouseY.set(yPercent * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Gradiente de fundo */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #f0f4f8 0%, #e8eef5 50%, #f0f4f8 100%)'
        }}
      />

      {/* Cruz 3D central com parallax */}
      <motion.div
        style={{
          x,
          y,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.03
        }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D4059" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#507D6D" stopOpacity="0.4" />
            </linearGradient>
            <filter id="shadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="10"/>
              <feOffset dx="5" dy="5" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Cruz com sombra 3D */}
          <g filter="url(#shadow)">
            <rect x="180" y="50" width="40" height="300" fill="url(#crossGradient)" rx="5"/>
            <rect x="100" y="150" width="200" height="40" fill="url(#crossGradient)" rx="5"/>
          </g>
        </svg>
      </motion.div>

      {/* Símbolos adventistas flutuantes */}
      <FloatingSymbols mouseX={x} mouseY={y} />

      {/* Partículas de luz */}
      <LightParticles />

      {/* Raios de luz suaves */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(91, 127, 219, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}

// Símbolos adventistas flutuantes
function FloatingSymbols({ mouseX, mouseY }) {
  const symbols = [
    { icon: '✝', x: 15, y: 20, scale: 1.5, delay: 0 },
    { icon: '📖', x: 85, y: 15, scale: 1.2, delay: 0.5 },
    { icon: '🕊', x: 20, y: 80, scale: 1.3, delay: 1 },
    { icon: '⭐', x: 80, y: 75, scale: 1.1, delay: 1.5 },
    { icon: '🙏', x: 50, y: 50, scale: 1.4, delay: 2 },
  ];

  return (
    <>
      {symbols.map((symbol, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.scale * 40}px`,
            opacity: 0.04,
            x: mouseX,
            y: mouseY
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 8,
            delay: symbol.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {symbol.icon}
        </motion.div>
      ))}
    </>
  );
}

// Partículas de luz otimizadas
function LightParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 3
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: 'radial-gradient(circle, rgba(235, 176, 96, 0.08) 0%, transparent 70%)',
            filter: 'blur(15px)',
            willChange: 'transform, opacity' // Otimização para GPU
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 30, 0],
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </>
  );
}

// Versão leve para mobile (menos partículas)
export function ChristianBackground3DMobile() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Gradiente de fundo */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #f0f4f8 0%, #e8eef5 50%, #f0f4f8 100%)'
        }}
      />

      {/* Cruz central estática (sem parallax para economizar recursos) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.03
        }}
      >
        <svg width="300" height="300" viewBox="0 0 300 300">
          <defs>
            <linearGradient id="crossGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D4059" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#507D6D" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect x="130" y="30" width="40" height="240" fill="url(#crossGradientMobile)" rx="5"/>
          <rect x="70" y="110" width="160" height="40" fill="url(#crossGradientMobile)" rx="5"/>
        </svg>
      </div>

      {/* Apenas 5 partículas para mobile */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 30,
            height: 30,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(235, 176, 96, 0.08) 0%, transparent 70%)',
            filter: 'blur(15px)'
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
