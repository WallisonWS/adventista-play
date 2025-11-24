import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition - Componente para transições suaves entre páginas
 * Usa React Router e Framer Motion para criar experiência fluida
 */

// Variantes de transição
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

// Variante alternativa: slide
const slideVariants = {
  initial: {
    opacity: 0,
    x: '-100%'
  },
  in: {
    opacity: 1,
    x: 0
  },
  out: {
    opacity: 0,
    x: '100%'
  }
};

// Variante alternativa: fade
const fadeVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

// Variante alternativa: scale
const scaleVariants = {
  initial: {
    opacity: 0,
    scale: 0.95
  },
  in: {
    opacity: 1,
    scale: 1
  },
  out: {
    opacity: 0,
    scale: 1.05
  }
};

export function PageTransition({ children, variant = 'fade' }) {
  const location = useLocation();

  const variants = {
    fade: fadeVariants,
    slide: slideVariants,
    scale: scaleVariants,
    default: pageVariants
  }[variant] || pageVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={pageTransition}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * RouteTransition - Wrapper para rotas individuais
 */
export function RouteTransition({ children, variant = 'fade' }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variant === 'fade' ? fadeVariants : pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hook para detectar mudança de rota
 */
export function useRouteChange(callback) {
  const location = useLocation();
  
  React.useEffect(() => {
    callback(location);
  }, [location, callback]);
}
