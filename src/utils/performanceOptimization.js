/**
 * Utilitários de Otimização de Performance
 * Garantindo alto FPS e sem lentidão
 */

// Lazy loading de imagens
export const lazyLoadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = reject;
  });
};

// Debounce para eventos frequentes (scroll, resize, input)
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle para limitar execuções
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Request Animation Frame otimizado
export const rafThrottle = (callback) => {
  let requestId = null;
  let lastArgs;

  const later = (context) => () => {
    requestId = null;
    callback.apply(context, lastArgs);
  };

  const throttled = function(...args) {
    lastArgs = args;
    if (requestId === null) {
      requestId = requestAnimationFrame(later(this));
    }
  };

  throttled.cancel = () => {
    cancelAnimationFrame(requestId);
    requestId = null;
  };

  return throttled;
};

// Otimização de animações com will-change
export const optimizeAnimation = (element, properties) => {
  if (!element) return;
  element.style.willChange = properties.join(', ');
  
  // Remover will-change após animação para economizar recursos
  setTimeout(() => {
    element.style.willChange = 'auto';
  }, 1000);
};

// Intersection Observer para lazy loading de componentes
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Reduzir número de partículas em dispositivos móveis
export const getOptimalParticleCount = () => {
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  
  if (isMobile || isLowEnd) {
    return 5; // Poucos para mobile/low-end
  }
  return 15; // Mais para desktop
};

// Detectar se o usuário prefere movimento reduzido
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Configuração de animação baseada em preferências do usuário
export const getAnimationConfig = () => {
  if (prefersReducedMotion()) {
    return {
      duration: 0,
      transition: { duration: 0 }
    };
  }
  
  return {
    duration: 0.3,
    transition: { duration: 0.3, ease: 'easeOut' }
  };
};

// Otimizar renderização de listas grandes
export const virtualizeList = (items, viewportHeight, itemHeight) => {
  const visibleCount = Math.ceil(viewportHeight / itemHeight);
  const bufferCount = 5; // Itens extras para suavizar scroll
  
  return {
    visibleCount: visibleCount + bufferCount,
    getVisibleRange: (scrollTop) => {
      const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferCount);
      const endIndex = Math.min(items.length, startIndex + visibleCount + bufferCount);
      return { startIndex, endIndex };
    }
  };
};

// Memoização simples para evitar recálculos
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Limpar cache de imagens não utilizadas
export const clearImageCache = () => {
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        if (name.includes('image')) {
          caches.delete(name);
        }
      });
    });
  }
};

// Monitorar FPS
export const monitorFPS = (callback) => {
  let lastTime = performance.now();
  let frames = 0;

  const loop = () => {
    const currentTime = performance.now();
    frames++;

    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      callback(fps);
      frames = 0;
      lastTime = currentTime;
    }

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};

// Configurações de performance para Framer Motion
export const motionConfig = {
  // Usar GPU para transformações
  style: {
    transform: 'translateZ(0)',
    willChange: 'transform'
  },
  
  // Transições otimizadas
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 30
  },
  
  // Reduzir motion em mobile
  ...(window.innerWidth < 768 && {
    initial: false,
    animate: false
  })
};

// Preload de recursos críticos
export const preloadCriticalResources = (resources) => {
  resources.forEach(({ type, href }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = type;
    link.href = href;
    document.head.appendChild(link);
  });
};

// Otimizar scroll suave
export const smoothScroll = (target, duration = 800) => {
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

export default {
  lazyLoadImage,
  debounce,
  throttle,
  rafThrottle,
  optimizeAnimation,
  createIntersectionObserver,
  getOptimalParticleCount,
  prefersReducedMotion,
  getAnimationConfig,
  virtualizeList,
  memoize,
  clearImageCache,
  monitorFPS,
  motionConfig,
  preloadCriticalResources,
  smoothScroll
};
