import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

/**
 * Componente ScrollReveal
 * Revela elementos com animação suave quando entram no viewport
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conteúdo a ser revelado
 * @param {string} props.animation - Tipo de animação: 'fade', 'slide-up', 'slide-left', 'slide-right', 'scale'
 * @param {number} props.delay - Delay da animação em segundos
 * @param {number} props.duration - Duração da animação em segundos
 * @param {boolean} props.once - Se true, anima apenas uma vez
 */
export function ScrollReveal({ 
  children, 
  animation = 'fade',
  delay = 0,
  duration = 0.6,
  once = true 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const controls = useAnimation();

  // Variantes de animação
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    'slide-up': {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    'slide-down': {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 }
    },
    'slide-left': {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    'slide-right': {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[animation]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] // Cubic bezier para suavidade
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Componente StaggerChildren
 * Anima filhos em sequência (stagger effect)
 */
export function StaggerChildren({ children, staggerDelay = 0.1, ...props }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      {...props}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}

/**
 * Componente ParallaxScroll
 * Efeito parallax suave ao rolar
 */
export function ParallaxScroll({ children, speed = 0.5, ...props }) {
  const ref = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const offset = (scrolled - elementTop) * speed;
        setOffsetY(offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} {...props}>
      <motion.div
        style={{
          y: offsetY,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Hook personalizado para detectar quando elemento está visível
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.once) {
            observer.disconnect();
          }
        } else if (!options.once) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.3,
        rootMargin: options.rootMargin || '0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.once, options.threshold, options.rootMargin]);

  return [ref, isVisible];
}
