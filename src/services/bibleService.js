// Serviço otimizado de API da Bíblia com cache e lazy loading

const CACHE_KEY_PREFIX = 'bible_cache_';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 dias

// Cache em memória para acesso ultra-rápido
const memoryCache = new Map();

/**
 * Salva no cache (localStorage + memória)
 */
function saveToCache(key, data) {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    
    // Cache em memória
    memoryCache.set(key, cacheData);
    
    // Cache em localStorage
    localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Erro ao salvar cache:', error);
  }
}

/**
 * Busca do cache (memória primeiro, depois localStorage)
 */
function getFromCache(key) {
  try {
    // Tenta memória primeiro (mais rápido)
    if (memoryCache.has(key)) {
      const cached = memoryCache.get(key);
      if (Date.now() - cached.timestamp < CACHE_EXPIRY) {
        return cached.data;
      }
      memoryCache.delete(key);
    }
    
    // Tenta localStorage
    const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        // Restaura no cache de memória
        memoryCache.set(key, { data, timestamp });
        return data;
      }
      localStorage.removeItem(CACHE_KEY_PREFIX + key);
    }
  } catch (error) {
    console.warn('Erro ao ler cache:', error);
  }
  return null;
}

/**
 * Busca capítulo da Bíblia com cache
 */
export async function fetchChapter(book, chapter) {
  const cacheKey = `${book}_${chapter}`;
  
  // Tenta cache primeiro
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Busca da API
  try {
    const response = await fetch(
      `https://www.abibliadigital.com.br/api/verses/nvi/${book}/${chapter}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Salva no cache
    saveToCache(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar capítulo:', error);
    throw error;
  }
}

/**
 * Pré-carrega capítulos adjacentes (prefetch)
 */
export function prefetchAdjacentChapters(book, chapter, totalChapters) {
  // Pré-carrega próximo capítulo
  if (chapter < totalChapters) {
    setTimeout(() => {
      fetchChapter(book, chapter + 1).catch(() => {});
    }, 1000);
  }
  
  // Pré-carrega capítulo anterior
  if (chapter > 1) {
    setTimeout(() => {
      fetchChapter(book, chapter - 1).catch(() => {});
    }, 2000);
  }
}

/**
 * Busca lista de livros (mock - pode ser substituído por API real)
 */
export function getBibleBooks() {
  return {
    oldTestament: [
      { abbrev: 'gn', name: 'Gênesis', chapters: 50 },
      { abbrev: 'ex', name: 'Êxodo', chapters: 40 },
      { abbrev: 'lv', name: 'Levítico', chapters: 27 },
      { abbrev: 'nm', name: 'Números', chapters: 36 },
      { abbrev: 'dt', name: 'Deuteronômio', chapters: 34 },
      { abbrev: 'js', name: 'Josué', chapters: 24 },
      { abbrev: 'jz', name: 'Juízes', chapters: 21 },
      { abbrev: 'rt', name: 'Rute', chapters: 4 },
      { abbrev: '1sm', name: '1 Samuel', chapters: 31 },
      { abbrev: '2sm', name: '2 Samuel', chapters: 24 },
      { abbrev: '1rs', name: '1 Reis', chapters: 22 },
      { abbrev: '2rs', name: '2 Reis', chapters: 25 },
      { abbrev: '1cr', name: '1 Crônicas', chapters: 29 },
      { abbrev: '2cr', name: '2 Crônicas', chapters: 36 },
      { abbrev: 'ed', name: 'Esdras', chapters: 10 },
      { abbrev: 'ne', name: 'Neemias', chapters: 13 },
      { abbrev: 'et', name: 'Ester', chapters: 10 },
      { abbrev: 'job', name: 'Jó', chapters: 42 },
      { abbrev: 'sl', name: 'Salmos', chapters: 150 },
      { abbrev: 'pv', name: 'Provérbios', chapters: 31 },
      { abbrev: 'ec', name: 'Eclesiastes', chapters: 12 },
      { abbrev: 'ct', name: 'Cânticos', chapters: 8 },
      { abbrev: 'is', name: 'Isaías', chapters: 66 },
      { abbrev: 'jr', name: 'Jeremias', chapters: 52 },
      { abbrev: 'lm', name: 'Lamentações', chapters: 5 },
      { abbrev: 'ez', name: 'Ezequiel', chapters: 48 },
      { abbrev: 'dn', name: 'Daniel', chapters: 12 },
      { abbrev: 'os', name: 'Oséias', chapters: 14 },
      { abbrev: 'jl', name: 'Joel', chapters: 3 },
      { abbrev: 'am', name: 'Amós', chapters: 9 },
      { abbrev: 'ob', name: 'Obadias', chapters: 1 },
      { abbrev: 'jn', name: 'Jonas', chapters: 4 },
      { abbrev: 'mq', name: 'Miquéias', chapters: 7 },
      { abbrev: 'na', name: 'Naum', chapters: 3 },
      { abbrev: 'hc', name: 'Habacuque', chapters: 3 },
      { abbrev: 'sf', name: 'Sofonias', chapters: 3 },
      { abbrev: 'ag', name: 'Ageu', chapters: 2 },
      { abbrev: 'zc', name: 'Zacarias', chapters: 14 },
      { abbrev: 'ml', name: 'Malaquias', chapters: 4 }
    ],
    newTestament: [
      { abbrev: 'mt', name: 'Mateus', chapters: 28 },
      { abbrev: 'mc', name: 'Marcos', chapters: 16 },
      { abbrev: 'lc', name: 'Lucas', chapters: 24 },
      { abbrev: 'jo', name: 'João', chapters: 21 },
      { abbrev: 'at', name: 'Atos', chapters: 28 },
      { abbrev: 'rm', name: 'Romanos', chapters: 16 },
      { abbrev: '1co', name: '1 Coríntios', chapters: 16 },
      { abbrev: '2co', name: '2 Coríntios', chapters: 13 },
      { abbrev: 'gl', name: 'Gálatas', chapters: 6 },
      { abbrev: 'ef', name: 'Efésios', chapters: 6 },
      { abbrev: 'fp', name: 'Filipenses', chapters: 4 },
      { abbrev: 'cl', name: 'Colossenses', chapters: 4 },
      { abbrev: '1ts', name: '1 Tessalonicenses', chapters: 5 },
      { abbrev: '2ts', name: '2 Tessalonicenses', chapters: 3 },
      { abbrev: '1tm', name: '1 Timóteo', chapters: 6 },
      { abbrev: '2tm', name: '2 Timóteo', chapters: 4 },
      { abbrev: 'tt', name: 'Tito', chapters: 3 },
      { abbrev: 'fm', name: 'Filemom', chapters: 1 },
      { abbrev: 'hb', name: 'Hebreus', chapters: 13 },
      { abbrev: 'tg', name: 'Tiago', chapters: 5 },
      { abbrev: '1pe', name: '1 Pedro', chapters: 5 },
      { abbrev: '2pe', name: '2 Pedro', chapters: 3 },
      { abbrev: '1jo', name: '1 João', chapters: 5 },
      { abbrev: '2jo', name: '2 João', chapters: 1 },
      { abbrev: '3jo', name: '3 João', chapters: 1 },
      { abbrev: 'jd', name: 'Judas', chapters: 1 },
      { abbrev: 'ap', name: 'Apocalipse', chapters: 22 }
    ]
  };
}

/**
 * Limpa cache antigo
 */
export function clearOldCache() {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_KEY_PREFIX)) {
        const cached = localStorage.getItem(key);
        if (cached) {
          const { timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp >= CACHE_EXPIRY) {
            localStorage.removeItem(key);
          }
        }
      }
    });
  } catch (error) {
    console.warn('Erro ao limpar cache:', error);
  }
}

// Limpa cache antigo ao iniciar
clearOldCache();
