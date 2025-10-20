import { motion } from 'framer-motion'

/**
 * Componente de Animações Cristãs para o Background
 * Inclui: Cruzes flutuantes, partículas de luz divina, brilho celestial
 */
export function ChristianAnimations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cruzes Flutuantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`cross-${i}`}
          className="absolute text-primary/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 20}px`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          ✝
        </motion.div>
      ))}

      {/* Partículas de Luz Divina */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`light-${i}`}
          className="absolute rounded-full bg-yellow-300/30"
          style={{
            width: Math.random() * 8 + 2,
            height: Math.random() * 8 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Brilho Celestial (Raios de Luz) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-0 left-1/2 w-1 bg-gradient-to-b from-yellow-200/20 via-yellow-300/10 to-transparent"
          style={{
            height: '100%',
            transformOrigin: 'top center',
            rotate: `${i * 36}deg`,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleY: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Pomba do Espírito Santo */}
      <motion.div
        className="absolute text-4xl"
        style={{
          left: '10%',
          top: '20%',
        }}
        animate={{
          x: ['0%', '80%', '0%'],
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🕊️
      </motion.div>

      {/* Ondas de Bênção */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-0 border-2 border-primary/5 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [0, 2, 3],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Estrelas Celestiais */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-300/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 16 + 8}px`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Corações de Amor Divino */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-red-300/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 24 + 12}px`,
          }}
          animate={{
            y: [0, -80, -160],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut"
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Auréola de Luz */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-radial from-yellow-200/10 via-yellow-300/5 to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Bíblia Aberta (Símbolo) */}
      <motion.div
        className="absolute text-5xl opacity-10"
        style={{
          right: '15%',
          top: '30%',
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        📖
      </motion.div>

      {/* Mãos em Oração */}
      <motion.div
        className="absolute text-4xl opacity-10"
        style={{
          left: '20%',
          bottom: '25%',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🙏
      </motion.div>

      {/* Arco-íris (Promessa de Deus) */}
      <motion.div
        className="absolute text-6xl opacity-10"
        style={{
          right: '10%',
          bottom: '20%',
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🌈
      </motion.div>
    </div>
  )
}

/**
 * Componente de Partículas Flutuantes Suaves
 * Para usar em outras páginas
 */
export function FloatingParticles({ count = 15, color = "primary" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-${color}/5`}
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

/**
 * Componente de Brilho Divino
 * Efeito de luz celestial
 */
export function DivineLightEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Luz Central */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Raios de Luz Laterais */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.05) 0%, transparent 20%, transparent 80%, rgba(251, 191, 36, 0.05) 100%)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
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
 * Componente de Estrelas Cintilantes
 * Para criar atmosfera celestial
 */
export function TwinklingStars({ count = 50 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 4px 2px rgba(251, 191, 36, 0.3)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}