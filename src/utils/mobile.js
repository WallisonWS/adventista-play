// Utilitários Mobile para Adventista Play

/**
 * Detecta se está rodando em dispositivo móvel
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detecta se está rodando como PWA (instalado)
 */
export function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

/**
 * Detecta plataforma
 */
export function getPlatform() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  return 'web';
}

/**
 * Haptic Feedback (vibração)
 */
export const haptic = {
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  },
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 10]);
    }
  },
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([20, 100, 20, 100, 20]);
    }
  }
};

/**
 * Pull to Refresh
 */
export function initPullToRefresh(callback) {
  let startY = 0;
  let currentY = 0;
  let pulling = false;
  
  document.addEventListener('touchstart', (e) => {
    if (window.scrollY === 0) {
      startY = e.touches[0].pageY;
      pulling = true;
    }
  });
  
  document.addEventListener('touchmove', (e) => {
    if (!pulling) return;
    
    currentY = e.touches[0].pageY;
    const diff = currentY - startY;
    
    if (diff > 100) {
      // Trigger refresh
      pulling = false;
      callback();
    }
  });
  
  document.addEventListener('touchend', () => {
    pulling = false;
    startY = 0;
    currentY = 0;
  });
}

/**
 * Swipe Gestures
 */
export function initSwipeGestures(element, callbacks) {
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  
  element.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });
  
  element.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    
    const diffX = endX - startX;
    const diffY = endY - startY;
    
    // Horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 50 && callbacks.onSwipeRight) {
        callbacks.onSwipeRight();
      } else if (diffX < -50 && callbacks.onSwipeLeft) {
        callbacks.onSwipeLeft();
      }
    }
    // Vertical swipe
    else {
      if (diffY > 50 && callbacks.onSwipeDown) {
        callbacks.onSwipeDown();
      } else if (diffY < -50 && callbacks.onSwipeUp) {
        callbacks.onSwipeUp();
      }
    }
  });
}

/**
 * Instalar PWA
 */
export function initPWAInstall() {
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Mostrar botão de instalação
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'block';
      
      installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          
          if (outcome === 'accepted') {
            console.log('PWA instalado');
            haptic.success();
          }
          
          deferredPrompt = null;
          installButton.style.display = 'none';
        }
      });
    }
  });
  
  window.addEventListener('appinstalled', () => {
    console.log('PWA instalado com sucesso');
    haptic.success();
  });
}

/**
 * Notificações Push
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Notificações não suportadas');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
}

export function showNotification(title, options = {}) {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      vibrate: [200, 100, 200],
      ...options
    });
    
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    
    return notification;
  }
}

/**
 * Share API
 */
export async function share(data) {
  if (navigator.share) {
    try {
      await navigator.share(data);
      haptic.success();
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Erro ao compartilhar:', error);
      }
      return false;
    }
  } else {
    // Fallback: copiar para clipboard
    if (data.url) {
      await navigator.clipboard.writeText(data.url);
      haptic.success();
      return true;
    }
    return false;
  }
}

/**
 * Orientação da tela
 */
export function lockOrientation(orientation = 'portrait') {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock(orientation).catch((error) => {
      console.log('Não foi possível travar orientação:', error);
    });
  }
}

export function unlockOrientation() {
  if (screen.orientation && screen.orientation.unlock) {
    screen.orientation.unlock();
  }
}

/**
 * Fullscreen
 */
export function requestFullscreen(element = document.documentElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Keep screen awake (Wake Lock API)
 */
let wakeLock = null;

export async function keepScreenAwake() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Screen wake lock ativado');
      
      wakeLock.addEventListener('release', () => {
        console.log('Screen wake lock liberado');
      });
    }
  } catch (error) {
    console.error('Erro ao ativar wake lock:', error);
  }
}

export function releaseScreenAwake() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}

/**
 * Detecta conexão
 */
export function getConnectionInfo() {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return {
      effectiveType: connection.effectiveType, // '4g', '3g', '2g', 'slow-2g'
      downlink: connection.downlink, // Mbps
      rtt: connection.rtt, // ms
      saveData: connection.saveData // boolean
    };
  }
  return null;
}

export function isOnline() {
  return navigator.onLine;
}

/**
 * Previne zoom em inputs (iOS)
 */
export function preventInputZoom() {
  const viewport = document.querySelector('meta[name=viewport]');
  if (viewport && isMobile()) {
    viewport.setAttribute('content', 
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    );
  }
}

/**
 * Smooth scroll para elemento
 */
export function smoothScrollTo(element, offset = 0) {
  const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({
    top,
    behavior: 'smooth'
  });
}

/**
 * Inicializa todos os recursos mobile
 */
export function initMobileFeatures() {
  console.log('🚀 Inicializando recursos mobile...');
  
  // PWA Install
  initPWAInstall();
  
  // Adiciona classe mobile ao body
  if (isMobile()) {
    document.body.classList.add('is-mobile');
  }
  
  if (isPWA()) {
    document.body.classList.add('is-pwa');
  }
  
  // Adiciona classe da plataforma
  document.body.classList.add(`platform-${getPlatform()}`);
  
  // Listeners de conexão
  window.addEventListener('online', () => {
    console.log('✅ Online');
    document.body.classList.remove('is-offline');
    showNotification('Conexão Restaurada', {
      body: 'Você está online novamente!'
    });
  });
  
  window.addEventListener('offline', () => {
    console.log('❌ Offline');
    document.body.classList.add('is-offline');
    showNotification('Sem Conexão', {
      body: 'Você está offline. Algumas funcionalidades podem estar limitadas.'
    });
  });
  
  console.log('✅ Recursos mobile inicializados');
}

export default {
  isMobile,
  isPWA,
  getPlatform,
  haptic,
  initPullToRefresh,
  initSwipeGestures,
  initPWAInstall,
  requestNotificationPermission,
  showNotification,
  share,
  lockOrientation,
  unlockOrientation,
  requestFullscreen,
  exitFullscreen,
  keepScreenAwake,
  releaseScreenAwake,
  getConnectionInfo,
  isOnline,
  preventInputZoom,
  smoothScrollTo,
  initMobileFeatures
};

