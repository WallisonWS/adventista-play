// Serviço para integração com API da Bíblia
// Usando Bible API do GitHub (https://github.com/MaatheusGois/bible)
// API gratuita, sem limites, com múltiplas versões em português

const API_BASE_URL = 'https://raw.githubusercontent.com/MaatheusGois/bible/main/versions/pt-br'

// Cache local para melhorar performance
const cache = new Map()

// Mapeamento de versões
export const versoesDisponiveis = [
  { id: 'arc', nome: 'Almeida Revista e Corrigida (ARC)', sigla: 'ARC' },
  { id: 'acf', nome: 'Almeida Corrigida Fiel (ACF)', sigla: 'ACF' },
  { id: 'nvi', nome: 'Nova Versão Internacional (NVI)', sigla: 'NVI' }
]

const versoesMap = {
  'ARC': 'arc',
  'ACF': 'acf',
  'NVI': 'nvi'
}

// Mapeamento de IDs de livros (nosso formato -> formato da API)
const livrosMap = {
  // Antigo Testamento
  'gn': 'gn',      // Gênesis
  'ex': 'ex',      // Êxodo
  'lv': 'lv',      // Levítico
  'nm': 'nm',      // Números
  'dt': 'dt',      // Deuteronômio
  'js': 'js',      // Josué
  'jz': 'jud',     // Juízes
  'rt': 'rt',      // Rute
  '1sm': '1sm',    // 1 Samuel
  '2sm': '2sm',    // 2 Samuel
  '1rs': '1kgs',   // 1 Reis
  '2rs': '2kgs',   // 2 Reis
  '1cr': '1ch',    // 1 Crônicas
  '2cr': '2ch',    // 2 Crônicas
  'ed': 'ezr',     // Esdras
  'ne': 'ne',      // Neemias
  'et': 'et',      // Ester
  'jb': 'job',     // Jó (compatibilidade)
  'job': 'job',    // Jó
  'sl': 'ps',      // Salmos
  'pv': 'prv',     // Provérbios
  'ec': 'ec',      // Eclesiastes
  'ct': 'so',      // Cânticos (Song of Solomon)
  'is': 'is',      // Isaías
  'jr': 'jr',      // Jeremias
  'lm': 'lm',      // Lamentações
  'ez': 'ez',      // Ezequiel
  'dn': 'dn',      // Daniel
  'os': 'ho',      // Oséias
  'jl': 'jl',      // Joel
  'am': 'am',      // Amós
  'ob': 'ob',      // Obadias
  'jn': 'jn',      // Jonas
  'mq': 'mi',      // Miquéias
  'na': 'na',      // Naum
  'hc': 'hk',      // Habacuque
  'sf': 'zp',      // Sofonias
  'ag': 'hg',      // Ageu
  'zc': 'zc',      // Zacarias
  'ml': 'ml',      // Malaquias
  // Novo Testamento
  'mt': 'mt',      // Mateus
  'mc': 'mk',      // Marcos
  'lc': 'lk',      // Lucas
  'jo': 'jo',      // João
  'at': 'act',     // Atos
  'rm': 'rm',      // Romanos
  '1co': '1co',    // 1 Coríntios
  '2co': '2co',    // 2 Coríntios
  'gl': 'gl',      // Gálatas
  'ef': 'eph',     // Efésios
  'fp': 'ph',      // Filipenses
  'cl': 'cl',      // Colossenses
  '1ts': '1ts',    // 1 Tessalonicenses
  '2ts': '2ts',    // 2 Tessalonicenses
  '1tm': '1tm',    // 1 Timóteo
  '2tm': '2tm',    // 2 Timóteo
  'tt': 'tt',      // Tito
  'fm': 'phm',     // Filemom
  'hb': 'hb',      // Hebreus
  'tg': 'jm',      // Tiago
  '1pe': '1pe',    // 1 Pedro
  '2pe': '2pe',    // 2 Pedro
  '1jo': '1jo',    // 1 João
  '2jo': '2jo',    // 2 João
  '3jo': '3jo',    // 3 João
  'jd': 'jd',      // Judas
  'ap': 're'       // Apocalipse
}

export const bibliaApiService = {
  // Buscar capítulo específico
  async buscarCapitulo(versao, livro, capitulo) {
    const cacheKey = `${versao}-${livro}-${capitulo}`
    if (cache.has(cacheKey)) {
      console.log('✅ Usando cache:', cacheKey)
      return cache.get(cacheKey)
    }

    try {
      // Converter versão e livro para o formato da API
      const versaoApi = versoesMap[versao] || 'arc'
      const livroApi = livrosMap[livro.toLowerCase()] || livro

      // URL para buscar o livro completo
      const url = `${API_BASE_URL}/${versaoApi}/${livroApi}/${livroApi}.json`

      console.log(`🔍 Buscando: ${url}`)

      // Fazer requisição para a API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        console.warn(`⚠️ API retornou status ${response.status}`)
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const data = await response.json()
      console.log('📖 Dados recebidos da API')

      // Verificar se os dados são válidos
      if (!data || !data.chapters || !Array.isArray(data.chapters) || data.chapters.length === 0) {
        console.warn('⚠️ API retornou dados vazios ou inválidos')
        throw new Error('Dados vazios da API')
      }

      // Encontrar o capítulo específico (índice começa em 0, mas capítulo começa em 1)
      const capituloIndex = capitulo - 1

      if (capituloIndex < 0 || capituloIndex >= data.chapters.length) {
        console.warn(`⚠️ Capítulo ${capitulo} não encontrado (índice ${capituloIndex})`)
        throw new Error(`Capítulo ${capitulo} não encontrado`)
      }

      const versiculosArray = data.chapters[capituloIndex]

      if (!Array.isArray(versiculosArray) || versiculosArray.length === 0) {
        console.warn(`⚠️ Capítulo ${capitulo} está vazio`)
        throw new Error(`Capítulo ${capitulo} está vazio`)
      }

      // Transformar array de strings em array de objetos com número e texto
      const verses = versiculosArray.map((texto, index) => ({
        number: index + 1,
        text: texto.trim()
      }))

      // Transformar dados para o formato esperado
      const resultado = {
        book: {
          abbrev: data.abbrev || livro,
          name: data.name || livro,
          author: data.author || '',
          group: data.group || '',
          version: versao
        },
        chapter: {
          number: capitulo,
          verses: verses.length
        },
        verses: verses
      }

      cache.set(cacheKey, resultado)
      console.log(`✅ ${resultado.verses.length} versículos carregados com sucesso!`)
      return resultado

    } catch (error) {
      console.error('❌ Erro ao buscar capítulo da API:', error.message)

      // Retornar null para que o componente use o fallback local
      return null
    }
  },

  // Buscar versículo específico
  async buscarVersiculo(versao, livro, capitulo, versiculo) {
    try {
      // Buscar o capítulo completo e filtrar o versículo
      const capituloData = await this.buscarCapitulo(versao, livro, capitulo)

      if (!capituloData || !capituloData.verses) {
        return null
      }

      const versiculoData = capituloData.verses.find(v => v.number === versiculo)

      if (!versiculoData) {
        return null
      }

      return {
        book: capituloData.book,
        chapter: capituloData.chapter,
        verse: versiculoData
      }

    } catch (error) {
      console.error('Erro ao buscar versículo:', error)
      return null
    }
  },

  // Buscar versículo aleatório
  async versiculoAleatorio(versao = 'ARC') {
    try {
      // Lista de versículos populares para escolher aleatoriamente
      const versiculosPopulares = [
        { livro: 'jo', capitulo: 3, versiculo: 16 },
        { livro: 'sl', capitulo: 23, versiculo: 1 },
        { livro: 'jr', capitulo: 29, versiculo: 11 },
        { livro: 'fp', capitulo: 4, versiculo: 13 },
        { livro: 'rm', capitulo: 8, versiculo: 28 },
        { livro: 'pv', capitulo: 3, versiculo: 5 },
        { livro: 'mt', capitulo: 6, versiculo: 33 },
        { livro: 'is', capitulo: 40, versiculo: 31 },
        { livro: 'js', capitulo: 1, versiculo: 9 },
        { livro: 'sl', capitulo: 46, versiculo: 1 }
      ]

      const aleatorio = versiculosPopulares[Math.floor(Math.random() * versiculosPopulares.length)]

      const data = await this.buscarVersiculo(
        versao,
        aleatorio.livro,
        aleatorio.capitulo,
        aleatorio.versiculo
      )

      return data

    } catch (error) {
      console.error('Erro ao buscar versículo aleatório:', error)
      return null
    }
  },

  // Limpar cache
  limparCache() {
    cache.clear()
    console.log('🗑️ Cache limpo')
  }
}

// Serviço de histórico de leitura
export const historicoService = {
  salvarLeitura(livro, capitulo) {
    const historico = this.obterHistorico()
    const novaLeitura = {
      livro,
      capitulo,
      data: new Date().toISOString(),
      timestamp: Date.now()
    }

    // Adicionar no início e limitar a 50 itens
    historico.unshift(novaLeitura)
    const historicoLimitado = historico.slice(0, 50)

    localStorage.setItem('biblia_historico', JSON.stringify(historicoLimitado))
  },

  obterHistorico() {
    const historico = localStorage.getItem('biblia_historico')
    return historico ? JSON.parse(historico) : []
  },

  limparHistorico() {
    localStorage.removeItem('biblia_historico')
  }
}

// Serviço de marcadores
export const marcadoresService = {
  salvarMarcador(livro, capitulo, versiculo, texto) {
    const marcadores = this.obterMarcadores()
    const novoMarcador = {
      id: `${livro}-${capitulo}-${versiculo}`,
      livro,
      capitulo,
      versiculo,
      texto,
      data: new Date().toISOString()
    }

    // Verificar se já existe
    const existe = marcadores.find(m => m.id === novoMarcador.id)
    if (!existe) {
      marcadores.push(novoMarcador)
      localStorage.setItem('biblia_marcadores', JSON.stringify(marcadores))
    }
  },

  removerMarcador(id) {
    const marcadores = this.obterMarcadores()
    const filtrados = marcadores.filter(m => m.id !== id)
    localStorage.setItem('biblia_marcadores', JSON.stringify(filtrados))
  },

  obterMarcadores() {
    const marcadores = localStorage.getItem('biblia_marcadores')
    return marcadores ? JSON.parse(marcadores) : []
  },

  isMarcado(livro, capitulo, versiculo) {
    const marcadores = this.obterMarcadores()
    return marcadores.some(m => m.livro === livro && m.capitulo === capitulo && m.versiculo === versiculo)
  }
}

// Serviço de notas
export const notasService = {
  salvarNota(livro, capitulo, versiculo, nota) {
    const notas = this.obterNotas()
    const id = `${livro}-${capitulo}-${versiculo}`

    const novaNota = {
      id,
      livro,
      capitulo,
      versiculo,
      nota,
      data: new Date().toISOString()
    }

    // Atualizar se já existe
    const index = notas.findIndex(n => n.id === id)
    if (index >= 0) {
      notas[index] = novaNota
    } else {
      notas.push(novaNota)
    }

    localStorage.setItem('biblia_notas', JSON.stringify(notas))
  },

  obterNota(livro, capitulo, versiculo) {
    const notas = this.obterNotas()
    const id = `${livro}-${capitulo}-${versiculo}`
    return notas.find(n => n.id === id)
  },

  obterNotas() {
    const notas = localStorage.getItem('biblia_notas')
    return notas ? JSON.parse(notas) : []
  },

  removerNota(id) {
    const notas = this.obterNotas()
    const filtradas = notas.filter(n => n.id !== id)
    localStorage.setItem('biblia_notas', JSON.stringify(filtradas))
  }
}

