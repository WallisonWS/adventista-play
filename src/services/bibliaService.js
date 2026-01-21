// Serviço para acessar a API da Bíblia
// Carrega a Bíblia completa e extrai capítulos localmente para melhor performance

const BASE_URL = 'https://raw.githubusercontent.com/maatheusgois/bible/main/versions'
import { bibliaExemplo } from '../data/biblia-exemplo'
import { bibliaVersoes } from '../data/biblia-versoes'

// Configurações de Cache
const CACHE_KEY_PREFIX = 'biblia_v3_cache_';
const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 dias
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

// Mapeamento de abreviações dos livros (mantido para compatibilidade)
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

// Carregar Bíblia completa (uma vez por versão)
async function carregarBibliaCompleta(versao) {
  const cacheKey = `biblia_completa_${versao}`;

  // Tentar cache
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}/pt-br/${versao}.json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Versão ${versao} não encontrada`);
    }

    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Erro ao carregar Bíblia:', error);
    throw error;
  }
}

// Buscar capítulo completo
export async function buscarCapitulo(versao, livro, capitulo) {
  try {
    const biblia = await carregarBibliaCompleta(versao);
    const abrev = abreviacoesLivros[livro];

    if (!abrev) {
      throw new Error('Livro não encontrado');
    }

    // Encontrar o livro na Bíblia
    const livroData = biblia.find(l => l.id === abrev);

    if (!livroData) {
      throw new Error('Livro não encontrado na Bíblia');
    }

    // Capítulos são arrays indexados a partir de 0
    const capituloIndex = capitulo - 1;
    const versiculos = livroData.chapters[capituloIndex];

    if (!versiculos) {
      throw new Error('Capítulo não encontrado');
    }

    // Converter para o formato esperado pelo componente
    return {
      book: livro,
      chapter: capitulo,
      verses: versiculos.map((text, index) => ({
        number: index + 1,
        text: text
      }))
    };
  } catch (error) {
    console.warn('⚠️ Falha na API/Cache, tentando dados locais:', error);

    // TENTATIVA DE FALLBACK LOCAL
    const abrev = abreviacoesLivros[livro];
    const chave = `${abrev}-${capitulo}`;

    // 1. Tentar na bibliaVersoes (ACF/NVI)
    // A estrutura do arquivo bibliaVersoes.js é bibliaVersoes[VERSAO][chave]
    if (bibliaVersoes && bibliaVersoes[versao] && bibliaVersoes[versao][chave]) {
      console.log(`✅ Recuperado do fallback local (${versao}):`, chave);
      const capituloData = bibliaVersoes[versao][chave];

      return {
        book: { name: livro, id: abrev },
        chapter: { number: capitulo },
        verses: capituloData.verses
      };
    }

    // 2. Tentar bibliaVersoes em outra versão (ACF é a mais completa geralmente)
    if (bibliaVersoes && bibliaVersoes['ACF'] && bibliaVersoes['ACF'][chave]) {
      console.log(`✅ Recuperado do fallback local (ACF alternative):`, chave);
      const capituloData = bibliaVersoes['ACF'][chave];

      return {
        book: { name: livro, id: abrev },
        chapter: { number: capitulo },
        verses: capituloData.verses
      };
    }

    // 3. Tentar bibliaExemplo (último recurso)
    if (bibliaExemplo && bibliaExemplo[chave]) {
      console.log('✅ Recuperado de biblia-exemplo:', chave);
      const capituloData = bibliaExemplo[chave];

      return {
        book: { name: livro, id: abrev },
        chapter: { number: capitulo },
        verses: capituloData.verses
      };
    }

    // Se tudo falhar
    console.error('❌ Falha total ao carregar capítulo');
    return {
      book: { name: livro },
      chapter: { number: capitulo },
      verses: [
        { number: 1, text: 'Não foi possível carregar este capítulo. Verifique sua conexão ou tente outro livro.' }
      ]
    };
  }
}

// Buscar versículo específico
export async function buscarVersiculo(versao, livro, capitulo, versiculo) {
  try {
    const capituloData = await buscarCapitulo(versao, livro, capitulo);
    const versiculoEncontrado = capituloData.verses?.find(v => v.number === versiculo);
    return versiculoEncontrado || null;
  } catch (error) {
    console.error('Erro ao buscar versículo:', error);
    return null;
  }
}

// Buscar livro completo
export async function buscarLivro(versao, livro) {
  try {
    const biblia = await carregarBibliaCompleta(versao);
    const abrev = abreviacoesLivros[livro];

    if (!abrev) {
      throw new Error('Livro não encontrado');
    }

    const livroData = biblia.find(l => l.id === abrev);
    return livroData || null;
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    return null;
  }
}

// Pesquisar texto na Bíblia (busca local simplificada)
export function pesquisarTexto(texto, versiculos) {
  if (!texto || !versiculos) return [];

  const termoLower = texto.toLowerCase();
  return versiculos.filter(v =>
    v.text?.toLowerCase().includes(termoLower)
  );
}
