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
 * Usando bible-api.com (API confiável e gratuita)
 */
export async function fetchChapter(book, chapter) {
  const cacheKey = `${book}_${chapter}`;
  
  // Tenta cache primeiro
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Busca da API bible-api.com
  try {
    const response = await fetch(
      `https://bible-api.com/${book}+${chapter}?translation=almeida`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Formata dados para compatibilidade com componentes
    const formattedData = {
      book: {
        abbrev: book,
        name: data.verses[0]?.book_name || book,
        version: 'almeida'
      },
      chapter: {
        number: chapter,
        verses: data.verses.length
      },
      verses: data.verses.map(v => ({
        number: v.verse,
        text: v.text.trim()
      }))
    };
    
    // Salva no cache
    saveToCache(cacheKey, formattedData);
    
    return formattedData;
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
      { abbrev: 'genesis', name: 'Gênesis', chapters: 50 },
      { abbrev: 'exodus', name: 'Êxodo', chapters: 40 },
      { abbrev: 'leviticus', name: 'Levítico', chapters: 27 },
      { abbrev: 'numbers', name: 'Números', chapters: 36 },
      { abbrev: 'deuteronomy', name: 'Deuteronômio', chapters: 34 },
      { abbrev: 'joshua', name: 'Josué', chapters: 24 },
      { abbrev: 'judges', name: 'Juízes', chapters: 21 },
      { abbrev: 'ruth', name: 'Rute', chapters: 4 },
      { abbrev: '1samuel', name: '1 Samuel', chapters: 31 },
      { abbrev: '2samuel', name: '2 Samuel', chapters: 24 },
      { abbrev: '1kings', name: '1 Reis', chapters: 22 },
      { abbrev: '2kings', name: '2 Reis', chapters: 25 },
      { abbrev: '1chronicles', name: '1 Crônicas', chapters: 29 },
      { abbrev: '2chronicles', name: '2 Crônicas', chapters: 36 },
      { abbrev: 'ezra', name: 'Esdras', chapters: 10 },
      { abbrev: 'nehemiah', name: 'Neemias', chapters: 13 },
      { abbrev: 'esther', name: 'Ester', chapters: 10 },
      { abbrev: 'job', name: 'Jó', chapters: 42 },
      { abbrev: 'psalms', name: 'Salmos', chapters: 150 },
      { abbrev: 'proverbs', name: 'Provérbios', chapters: 31 },
      { abbrev: 'ecclesiastes', name: 'Eclesiastes', chapters: 12 },
      { abbrev: 'song', name: 'Cânticos', chapters: 8 },
      { abbrev: 'isaiah', name: 'Isaías', chapters: 66 },
      { abbrev: 'jeremiah', name: 'Jeremias', chapters: 52 },
      { abbrev: 'lamentations', name: 'Lamentações', chapters: 5 },
      { abbrev: 'ezekiel', name: 'Ezequiel', chapters: 48 },
      { abbrev: 'daniel', name: 'Daniel', chapters: 12 },
      { abbrev: 'hosea', name: 'Oséias', chapters: 14 },
      { abbrev: 'joel', name: 'Joel', chapters: 3 },
      { abbrev: 'amos', name: 'Amós', chapters: 9 },
      { abbrev: 'obadiah', name: 'Obadias', chapters: 1 },
      { abbrev: 'jonah', name: 'Jonas', chapters: 4 },
      { abbrev: 'micah', name: 'Miquéias', chapters: 7 },
      { abbrev: 'nahum', name: 'Naum', chapters: 3 },
      { abbrev: 'habakkuk', name: 'Habacuque', chapters: 3 },
      { abbrev: 'zephaniah', name: 'Sofonias', chapters: 3 },
      { abbrev: 'haggai', name: 'Ageu', chapters: 2 },
      { abbrev: 'zechariah', name: 'Zacarias', chapters: 14 },
      { abbrev: 'malachi', name: 'Malaquias', chapters: 4 }
    ],
    newTestament: [
      { abbrev: 'matthew', name: 'Mateus', chapters: 28 },
      { abbrev: 'mark', name: 'Marcos', chapters: 16 },
      { abbrev: 'luke', name: 'Lucas', chapters: 24 },
      { abbrev: 'john', name: 'João', chapters: 21 },
      { abbrev: 'acts', name: 'Atos', chapters: 28 },
      { abbrev: 'romans', name: 'Romanos', chapters: 16 },
      { abbrev: '1corinthians', name: '1 Coríntios', chapters: 16 },
      { abbrev: '2corinthians', name: '2 Coríntios', chapters: 13 },
      { abbrev: 'galatians', name: 'Gálatas', chapters: 6 },
      { abbrev: 'ephesians', name: 'Efésios', chapters: 6 },
      { abbrev: 'philippians', name: 'Filipenses', chapters: 4 },
      { abbrev: 'colossians', name: 'Colossenses', chapters: 4 },
      { abbrev: '1thessalonians', name: '1 Tessalonicenses', chapters: 5 },
      { abbrev: '2thessalonians', name: '2 Tessalonicenses', chapters: 3 },
      { abbrev: '1timothy', name: '1 Timóteo', chapters: 6 },
      { abbrev: '2timothy', name: '2 Timóteo', chapters: 4 },
      { abbrev: 'titus', name: 'Tito', chapters: 3 },
      { abbrev: 'philemon', name: 'Filemom', chapters: 1 },
      { abbrev: 'hebrews', name: 'Hebreus', chapters: 13 },
      { abbrev: 'james', name: 'Tiago', chapters: 5 },
      { abbrev: '1peter', name: '1 Pedro', chapters: 5 },
      { abbrev: '2peter', name: '2 Pedro', chapters: 3 },
      { abbrev: '1john', name: '1 João', chapters: 5 },
      { abbrev: '2john', name: '2 João', chapters: 1 },
      { abbrev: '3john', name: '3 João', chapters: 1 },
      { abbrev: 'jude', name: 'Judas', chapters: 1 },
      { abbrev: 'revelation', name: 'Apocalipse', chapters: 22 }
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
