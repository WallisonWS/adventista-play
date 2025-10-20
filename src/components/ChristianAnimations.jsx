import { motion } from 'framer-motion'

/**
 * Componente de Animações Cristãs OTIMIZADO para o Background
 * Reduzido para melhor performance
 */
export function ChristianAnimations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cruzes Flutuantes - REDUZIDO de 8 para 3 */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`cross-${i}`}
          className="absolute text-primary/10"
          style={{
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`,
            fontSize: `${30 + i * 10}px`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ✝
        </motion.div>
      ))}

      {/* Partículas de Luz Divina - REDUZIDO de 30 para 10 */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`light-${i}`}
          className="absolute rounded-full bg-yellow-300/20"
          style={{
            width: 4,
            height: 4,
            left: `${i * 10}%`,
            top: `${80 + Math.random() * 20}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -150],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Pomba do Espírito Santo - SIMPLIFICADO */}
      <motion.div
        className="absolute text-3xl opacity-20"
        style={{
          left: '10%',
          top: '15%',
          willChange: 'transform',
        }}
        animate={{
          x: ['0%', '70%'],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        🕊️
      </motion.div>

      {/* Estrelas Celestiais - REDUZIDO de 20 para 8 */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-300/30"
          style={{
            left: `${10 + i * 12}%`,
            top: `${10 + (i % 3) * 30}%`,
            fontSize: `${12 + (i % 3) * 4}px`,
            willChange: 'opacity, transform',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Bíblia Aberta - SIMPLIFICADO */}
      <motion.div
        className="absolute text-4xl opacity-10"
        style={{
          right: '15%',
          top: '25%',
          willChange: 'transform',
        }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        📖
      </motion.div>

      {/* Mãos em Oração - SIMPLIFICADO */}
      <motion.div
        className="absolute text-3xl opacity-10"
        style={{
          left: '15%',
          bottom: '20%',
          willChange: 'transform',
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🙏
      </motion.div>
    </div>
  )
}

/**
 * Componente de Brilho Divino OTIMIZADO
 * Efeito de luz celestial com melhor performance
 */
export function DivineLightEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Luz Central - SIMPLIFICADO */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.08) 0%, transparent 60%)',
          willChange: 'opacity',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

/**
 * Componente de Estrelas Cintilantes OTIMIZADO
 * Reduzido para melhor performance
 */
export function TwinklingStars({ count = 20 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full"
          style={{
            left: `${(i * 5) % 100}%`,
            top: `${(i * 7) % 100}%`,
            boxShadow: '0 0 2px 1px rgba(251, 191, 36, 0.2)',
            willChange: 'opacity',
          }}
          animate={{
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

/**
 * Componente de Partículas Flutuantes OTIMIZADO
 * Para usar em outras páginas
 */
export function FloatingParticles({ count = 8, color = "primary" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-${color}/5`}
          style={{
            width: 60 + i * 10,
            height: 60 + i * 10,
            left: `${i * 12}%`,
            top: `${(i * 15) % 80}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}