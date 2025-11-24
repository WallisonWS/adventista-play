import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * Componentes de Animações 3D Fluidas
 * Efeitos modernos com profundidade e movimento suave
 */

// Partículas flutuantes 3D no fundo
export function FloatingParticles3D({ count = 20 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: 'radial-gradient(circle, rgba(91, 127, 219, 0.15) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

// Card com efeito 3D e glassmorphism
export function Card3D({ children, className = '', ...props }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`card-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      {...props}
    >
      <div
        style={{
          transform: 'translateZ(50px)',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--border-radius-xl)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          padding: 'var(--spacing-xl)'
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Ícone 3D com animação
export function Icon3D({ icon: Icon, color = 'var(--color-primary)', size = 48 }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.2,
        rotateY: 180,
        rotateZ: 10
      }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
      style={{
        width: size * 1.5,
        height: size * 1.5,
        borderRadius: 'var(--border-radius-lg)',
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 10px 30px ${color}40`,
        transformStyle: 'preserve-3d',
        position: 'relative'
      }}
    >
      {/* Sombra 3D */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'var(--border-radius-lg)',
          background: `linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.2) 100%)`,
          transform: 'translateZ(-10px)'
        }}
      />
      
      {/* Ícone */}
      <Icon size={size} color="white" style={{ transform: 'translateZ(20px)' }} />
      
      {/* Brilho */}
      <motion.div
        animate={{
          opacity: [0, 0.5, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          inset: -10,
          borderRadius: 'var(--border-radius-lg)',
          background: `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
          filter: 'blur(15px)',
          transform: 'translateZ(-5px)'
        }}
      />
    </motion.div>
  );
}

// Card de recurso com efeito 3D
export function ResourceCard3D({ icon: Icon, title, description, link, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay,
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.05
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <a href={link} style={{ textDecoration: 'none' }}>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-xl)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            transform: 'translateZ(0)'
          }}
        >
          {/* Gradiente de fundo */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`
            }}
          />

          {/* Ícone 3D */}
          <div className="mb-4">
            <Icon3D icon={Icon} color={color} size={32} />
          </div>

          {/* Conteúdo */}
          <h3
            className="text-lg font-bold mb-2"
            style={{
              color: 'var(--color-text-primary)',
              transform: 'translateZ(20px)'
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm"
            style={{
              color: 'var(--color-text-secondary)',
              transform: 'translateZ(10px)'
            }}
          >
            {description}
          </p>

          {/* Efeito de brilho ao hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)`
            }}
          />
        </div>
      </a>
    </motion.div>
  );
}

// Efeito de onda 3D no fundo
export function Wave3D() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '200px' }}>
      <svg
        viewBox="0 0 1440 320"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <motion.path
          fill="var(--color-primary)"
          fillOpacity="0.1"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{
            d: [
              "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </svg>
    </div>
  );
}

// Botão 3D com efeito de profundidade
export function Button3D({ children, onClick, color = 'var(--color-accent)', ...props }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        rotateX: -5,
        y: -5
      }}
      whileTap={{
        scale: 0.95,
        rotateX: 5,
        y: 2
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        color: 'white',
        border: 'none',
        borderRadius: 'var(--border-radius-md)',
        padding: '12px 32px',
        fontSize: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: `0 10px 30px ${color}40`,
        transformStyle: 'preserve-3d',
        position: 'relative'
      }}
      {...props}
    >
      {/* Sombra 3D */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'var(--border-radius-md)',
          background: 'rgba(0, 0, 0, 0.2)',
          transform: 'translateZ(-10px)',
          filter: 'blur(10px)'
        }}
      />
      
      {/* Conteúdo */}
      <span style={{ transform: 'translateZ(10px)', position: 'relative', zIndex: 1 }}>
        {children}
      </span>
    </motion.button>
  );
}

// Loader 3D
export function Loader3D() {
  return (
    <div className="flex items-center justify-center" style={{ height: '100px' }}>
      <motion.div
        animate={{
          rotateY: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: 'var(--border-radius-md)',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}
      />
    </div>
  );
}
