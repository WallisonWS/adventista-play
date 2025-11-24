import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ChristianBackground3D
 * Background 3D/4D com formas geométricas cristãs animadas (SEM EMOJIS)
 * Otimizado para alto FPS usando CSS transforms e requestAnimationFrame
 */

// Componente de Cruz 3D SVG
const Cross3D = ({ x, y, size, rotation, opacity }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      opacity: opacity,
      filter: 'drop-shadow(0 4px 8px rgba(45, 64, 89, 0.3))',
    }}
    initial={{ rotate: 0, scale: 0 }}
    animate={{ 
      rotate: rotation,
      scale: [0.8, 1, 0.8],
      rotateY: [0, 180, 360]
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      ease: "easeInOut",
      repeatType: "reverse"
    }}
  >
    <defs>
      <linearGradient id={`crossGrad-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2D4059" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#507D6D" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <path
      d="M 40 10 L 60 10 L 60 40 L 90 40 L 90 60 L 60 60 L 60 90 L 40 90 L 40 60 L 10 60 L 10 40 L 40 40 Z"
      fill={`url(#crossGrad-${x}-${y})`}
      stroke="#2D4059"
      strokeWidth="2"
    />
  </motion.svg>
);

// Componente de Livro 3D SVG
const Book3D = ({ x, y, size, rotation, opacity }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      opacity: opacity,
      filter: 'drop-shadow(0 4px 8px rgba(80, 125, 109, 0.3))',
    }}
    initial={{ rotate: 0, scale: 0 }}
    animate={{ 
      rotate: rotation,
      scale: [0.9, 1.1, 0.9],
      rotateX: [0, 15, 0]
    }}
    transition={{ 
      duration: 10, 
      repeat: Infinity, 
      ease: "easeInOut",
      repeatType: "reverse"
    }}
  >
    <defs>
      <linearGradient id={`bookGrad-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#507D6D" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#EBB060" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <rect x="20" y="15" width="60" height="70" rx="3" fill={`url(#bookGrad-${x}-${y})`} stroke="#507D6D" strokeWidth="2"/>
    <line x1="50" y1="15" x2="50" y2="85" stroke="#2D4059" strokeWidth="1.5" opacity="0.5"/>
    <rect x="30" y="35" width="40" height="2" fill="#2D4059" opacity="0.3"/>
    <rect x="30" y="45" width="40" height="2" fill="#2D4059" opacity="0.3"/>
    <rect x="30" y="55" width="40" height="2" fill="#2D4059" opacity="0.3"/>
  </motion.svg>
);

// Componente de Estrela 3D SVG
const Star3D = ({ x, y, size, rotation, opacity }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      opacity: opacity,
      filter: 'drop-shadow(0 4px 8px rgba(235, 176, 96, 0.4))',
    }}
    initial={{ rotate: 0, scale: 0 }}
    animate={{ 
      rotate: rotation,
      scale: [0.8, 1.2, 0.8],
      rotateZ: [0, 360]
    }}
    transition={{ 
      duration: 12, 
      repeat: Infinity, 
      ease: "easeInOut"
    }}
  >
    <defs>
      <linearGradient id={`starGrad-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EBB060" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#F4D03F" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <path
      d="M 50 10 L 61 40 L 92 40 L 68 58 L 79 88 L 50 70 L 21 88 L 32 58 L 8 40 L 39 40 Z"
      fill={`url(#starGrad-${x}-${y})`}
      stroke="#EBB060"
      strokeWidth="2"
    />
  </motion.svg>
);

// Componente de Pomba 3D SVG (Espírito Santo)
const Dove3D = ({ x, y, size, rotation, opacity }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      opacity: opacity,
      filter: 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.5))',
    }}
    initial={{ rotate: 0, scale: 0 }}
    animate={{ 
      rotate: rotation,
      scale: [0.9, 1, 0.9],
      y: [0, -10, 0]
    }}
    transition={{ 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut",
      repeatType: "reverse"
    }}
  >
    <defs>
      <linearGradient id={`doveGrad-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#E8F4F8" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Corpo */}
    <ellipse cx="50" cy="50" rx="15" ry="20" fill={`url(#doveGrad-${x}-${y})`} stroke="#2D4059" strokeWidth="1.5"/>
    {/* Asa esquerda */}
    <path d="M 35 45 Q 15 35 10 50 Q 15 55 35 50 Z" fill={`url(#doveGrad-${x}-${y})`} stroke="#2D4059" strokeWidth="1.5"/>
    {/* Asa direita */}
    <path d="M 65 45 Q 85 35 90 50 Q 85 55 65 50 Z" fill={`url(#doveGrad-${x}-${y})`} stroke="#2D4059" strokeWidth="1.5"/>
    {/* Cabeça */}
    <circle cx="50" cy="35" r="8" fill={`url(#doveGrad-${x}-${y})`} stroke="#2D4059" strokeWidth="1.5"/>
  </motion.svg>
);

// Componente de Luz Divina (raios de luz)
const DivineLight = ({ x, y, size, opacity }) => (
  <motion.svg
    width={size * 2}
    height={size * 2}
    viewBox="0 0 200 200"
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      opacity: opacity,
    }}
    initial={{ rotate: 0, scale: 0 }}
    animate={{ 
      rotate: 360,
      scale: [0.8, 1, 0.8],
      opacity: [0.2, 0.4, 0.2]
    }}
    transition={{ 
      duration: 20, 
      repeat: Infinity, 
      ease: "linear"
    }}
  >
    <defs>
      <radialGradient id={`lightGrad-${x}-${y}`}>
        <stop offset="0%" stopColor="#F4D03F" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#EBB060" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="80" fill={`url(#lightGrad-${x}-${y})`}/>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line
        key={i}
        x1="100"
        y1="100"
        x2={100 + Math.cos(angle * Math.PI / 180) * 90}
        y2={100 + Math.sin(angle * Math.PI / 180) * 90}
        stroke="#EBB060"
        strokeWidth="2"
        opacity="0.3"
      />
    ))}
  </motion.svg>
);

export function ChristianBackground3D() {
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mousePos.current = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Elementos 3D distribuídos
  const elements = [
    // Cruzes
    { type: 'cross', x: 10, y: 15, size: 40, rotation: 15, opacity: 0.15 },
    { type: 'cross', x: 85, y: 25, size: 35, rotation: -20, opacity: 0.12 },
    { type: 'cross', x: 50, y: 80, size: 45, rotation: 10, opacity: 0.18 },
    
    // Livros
    { type: 'book', x: 20, y: 60, size: 50, rotation: -15, opacity: 0.2 },
    { type: 'book', x: 75, y: 70, size: 45, rotation: 20, opacity: 0.16 },
    
    // Estrelas
    { type: 'star', x: 30, y: 20, size: 30, rotation: 0, opacity: 0.25 },
    { type: 'star', x: 65, y: 40, size: 35, rotation: 45, opacity: 0.2 },
    { type: 'star', x: 90, y: 85, size: 28, rotation: -30, opacity: 0.18 },
    
    // Pombas
    { type: 'dove', x: 40, y: 35, size: 55, rotation: 10, opacity: 0.14 },
    { type: 'dove', x: 80, y: 55, size: 50, rotation: -10, opacity: 0.12 },
    
    // Luzes divinas
    { type: 'light', x: 15, y: 45, size: 60, opacity: 0.1 },
    { type: 'light', x: 70, y: 15, size: 70, opacity: 0.08 },
  ];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {elements.map((el, i) => {
        switch(el.type) {
          case 'cross':
            return <Cross3D key={i} {...el} />;
          case 'book':
            return <Book3D key={i} {...el} />;
          case 'star':
            return <Star3D key={i} {...el} />;
          case 'dove':
            return <Dove3D key={i} {...el} />;
          case 'light':
            return <DivineLight key={i} {...el} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

// Versão Mobile otimizada (menos elementos para melhor performance)
export function ChristianBackground3DMobile() {
  const elements = [
    { type: 'cross', x: 15, y: 20, size: 35, rotation: 15, opacity: 0.12 },
    { type: 'book', x: 75, y: 65, size: 40, rotation: -15, opacity: 0.15 },
    { type: 'star', x: 50, y: 40, size: 30, rotation: 0, opacity: 0.2 },
    { type: 'dove', x: 30, y: 75, size: 45, rotation: 10, opacity: 0.12 },
    { type: 'light', x: 60, y: 25, size: 50, opacity: 0.08 },
  ];

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {elements.map((el, i) => {
        switch(el.type) {
          case 'cross':
            return <Cross3D key={i} {...el} />;
          case 'book':
            return <Book3D key={i} {...el} />;
          case 'star':
            return <Star3D key={i} {...el} />;
          case 'dove':
            return <Dove3D key={i} {...el} />;
          case 'light':
            return <DivineLight key={i} {...el} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
