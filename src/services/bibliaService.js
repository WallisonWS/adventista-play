// Serviço para acessar a API da Bíblia
// Usando cache para melhor performance

const BASE_URL = 'https://raw.githubusercontent.com/MaatheusGois/bible/main/versions/pt-br'

// Configurações de Cache
const CACHE_KEY_PREFIX = 'biblia_v2_cache_';
const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 dias (o texto bíblico não muda)
const memoryCache = new Map();

// Helper de Cache
function getFromCache(key) {
  try {
    if (memoryCache.has(key)) return memoryCache.get(key);

    const item = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (item) {
      const parsed = JSON.parse(item);
      if (Date.now() - parsed.timestamp < CACHE_EXPIRY) {
        memoryCache.set(key, parsed.data);
        return parsed.data;
      }
      localStorage.removeItem(CACHE_KEY_PREFIX + key);
    }
  } catch (e) {
    console.warn('Erro ao ler cache', e);
  }
  return null;
}

function saveToCache(key, data) {
  try {
    memoryCache.set(key, data);
    localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('Erro ao salvar cache', e);
  }
}

// Mapeamento de versões disponíveis
export const versoesDisponiveis = [
  { id: 'nvi', nome: 'Nova Versão Internacional (NVI)', sigla: 'NVI' },
  { id: 'arc', nome: 'Almeida Revista e Corrigida (ARC)', sigla: 'ARC' },
  { id: 'acf', nome: 'Almeida Corrigida Fiel (ACF)', sigla: 'ACF' }
]

// Mapeamento de abreviações dos livros
export const abreviacoesLivros = {
  'Gênesis': 'gn',
  'Êxodo': 'ex',
  'Levítico': 'lv',
  'Números': 'nm',
  'Deuteronômio': 'dt',
  'Josué': 'js',
  'Juízes': 'jz',
  'Rute': 'rt',
  '1 Samuel': '1sm',
  '2 Samuel': '2sm',
  '1 Reis': '1rs',
  '2 Reis': '2rs',
  '1 Crônicas': '1cr',
  '2 Crônicas': '2cr',
  'Esdras': 'ed',
  'Neemias': 'ne',
  'Ester': 'et',
  'Jó': 'jb',
  'Salmos': 'sl',
  'Provérbios': 'pv',
  'Eclesiastes': 'ec',
  'Cantares': 'ct',
  'Isaías': 'is',
  'Jeremias': 'jr',
  'Lamentações': 'lm',
  'Ezequiel': 'ez',
  'Daniel': 'dn',
  'Oseias': 'os',
  'Joel': 'jl',
  'Amós': 'am',
  'Obadias': 'ob',
  'Jonas': 'jn',
  'Miqueias': 'mq',
  'Naum': 'na',
  'Habacuque': 'hc',
  'Sofonias': 'sf',
  'Ageu': 'ag',
  'Zacarias': 'zc',
  'Malaquias': 'ml',
  'Mateus': 'mt',
  'Marcos': 'mc',
  'Lucas': 'lc',
  'João': 'jo',
  'Atos': 'at',
  'Romanos': 'rm',
  '1 Coríntios': '1co',
  '2 Coríntios': '2co',
  'Gálatas': 'gl',
  'Efésios': 'ef',
  'Filipenses': 'fp',
  'Colossenses': 'cl',
  '1 Tessalonicenses': '1ts',
  '2 Tessalonicenses': '2ts',
  '1 Timóteo': '1tm',
  '2 Timóteo': '2tm',
  'Tito': 'tt',
  'Filemom': 'fm',
  'Hebreus': 'hb',
  'Tiago': 'tg',
  '1 Pedro': '1pe',
  '2 Pedro': '2pe',
  '1 João': '1jo',
  '2 João': '2jo',
  '3 João': '3jo',
  'Judas': 'jd',
  'Apocalipse': 'ap'
}

// Buscar capítulo completo
export async function buscarCapitulo(versao, livro, capitulo) {
  const cacheKey = `${versao}_${livro}_${capitulo}`;

  // Tentar cache
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const abrev = abreviacoesLivros[livro]
    if (!abrev) {
      throw new Error('Livro não encontrado')
    }

    const url = `${BASE_URL}/${versao}/${abrev}/${capitulo}.json`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Capítulo não encontrado')
    }

    const data = await response.json()
    saveToCache(cacheKey, data);

    // Pré-carregar próximo capítulo
    prefetchProximoCapitulo(versao, livro, capitulo);

    return data
  } catch (error) {
    console.error('Erro ao buscar capítulo:', error)
    // Fallback básico
    return {
      book: livro,
      chapter: capitulo,
      verses: [
        { number: 1, text: 'Erro ao carregar o texto bíblico. Verifique sua conexão.' }
      ]
    }
  }
}

// Prefetch simplificado
function prefetchProximoCapitulo(versao, livro, capituloAtual) {
  const proximo = capituloAtual + 1;
  // Não verificamos o limite de capítulos aqui por simplicidade, 
  // mas o browser vai apenas dar 404 se não existir, sem quebrar o app
  const url = `${BASE_URL}/${versao}/${abreviacoesLivros[livro]}/${proximo}.json`;

  // Apenas busca se não tiver no cache
  const cacheKey = `${versao}_${livro}_${proximo}`;
  if (!getFromCache(cacheKey)) {
    setTimeout(() => {
      fetch(url).then(res => {
        if (res.ok) res.json().then(data => saveToCache(cacheKey, data));
      }).catch(() => { });
    }, 1000); // Delay para não competir com a renderização inicial
  }
}

// Buscar versículo específico
export async function buscarVersiculo(versao, livro, capitulo, versiculo) {
  try {
    const capituloData = await buscarCapitulo(versao, livro, capitulo)
    const versiculoEncontrado = capituloData.verses?.find(v => v.number === versiculo)
    return versiculoEncontrado || null
  } catch (error) {
    console.error('Erro ao buscar versículo:', error)
    return null
  }
}

// Buscar livro completo
export async function buscarLivro(versao, livro) {
  try {
    const abrev = abreviacoesLivros[livro]
    if (!abrev) {
      throw new Error('Livro não encontrado')
    }

    const url = `${BASE_URL}/${versao}/${abrev}/${abrev}.json`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Livro não encontrado')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar livro:', error)
    return null
  }
}

// Pesquisar texto na Bíblia (busca local simplificada)
export function pesquisarTexto(texto, versiculos) {
  if (!texto || !versiculos) return []

  const termoLower = texto.toLowerCase()
  return versiculos.filter(v =>
    v.text?.toLowerCase().includes(termoLower)
  )
}

