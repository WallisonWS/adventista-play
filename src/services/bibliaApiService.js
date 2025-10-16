// Serviço para integração com API da Bíblia
// Usando Bible API (https://bible-api.com)

const API_BASE_URL = 'https://bible-api.com'

// Cache local para melhorar performance
const cache = new Map()

// Mapeamento de IDs de livros para nomes em inglês
const livrosMap = {
  'gn': 'genesis',
  'ex': 'exodus',
  'lv': 'leviticus',
  'nm': 'numbers',
  'dt': 'deuteronomy',
  'js': 'joshua',
  'jz': 'judges',
  'rt': 'ruth',
  '1sm': '1samuel',
  '2sm': '2samuel',
  '1rs': '1kings',
  '2rs': '2kings',
  '1cr': '1chronicles',
  '2cr': '2chronicles',
  'ed': 'ezra',
  'ne': 'nehemiah',
  'et': 'esther',
  'job': 'job',
  'sl': 'psalms',
  'pv': 'proverbs',
  'ec': 'ecclesiastes',
  'ct': 'song+of+solomon',
  'is': 'isaiah',
  'jr': 'jeremiah',
  'lm': 'lamentations',
  'ez': 'ezekiel',
  'dn': 'daniel',
  'os': 'hosea',
  'jl': 'joel',
  'am': 'amos',
  'ob': 'obadiah',
  'jn': 'jonah',
  'mq': 'micah',
  'na': 'nahum',
  'hc': 'habakkuk',
  'sf': 'zephaniah',
  'ag': 'haggai',
  'zc': 'zechariah',
  'ml': 'malachi',
  'mt': 'matthew',
  'mc': 'mark',
  'lc': 'luke',
  'jo': 'john',
  'at': 'acts',
  'rm': 'romans',
  '1co': '1corinthians',
  '2co': '2corinthians',
  'gl': 'galatians',
  'ef': 'ephesians',
  'fp': 'philippians',
  'cl': 'colossians',
  '1ts': '1thessalonians',
  '2ts': '2thessalonians',
  '1tm': '1timothy',
  '2tm': '2timothy',
  'tt': 'titus',
  'fm': 'philemon',
  'hb': 'hebrews',
  'tg': 'james',
  '1pe': '1peter',
  '2pe': '2peter',
  '1jo': '1john',
  '2jo': '2john',
  '3jo': '3john',
  'jd': 'jude',
  'ap': 'revelation'
}

export const bibliaApiService = {
  // Buscar capítulo específico
  async buscarCapitulo(versao, livro, capitulo) {
    const cacheKey = `${versao}-${livro}-${capitulo}`
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    try {
      // Converter ID do livro para nome em inglês
      const livroIngles = livrosMap[livro.toLowerCase()] || livro
      
      // Mapeamento de versões
      const versaoMap = {
        'ARC': 'almeida',
        'ACF': 'almeida',
        'NVI': 'almeida'
      }
      
      const versaoApi = versaoMap[versao] || 'almeida'
      
      // Fazer requisição para a API
      const response = await fetch(`${API_BASE_URL}/${livroIngles}+${capitulo}?translation=${versaoApi}`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar capítulo')
      }
      
      const data = await response.json()
      
      // Transformar dados para o formato esperado
      const resultado = {
        book: {
          abbrev: livro,
          name: data.verses[0]?.book_name || livro,
          author: '',
          group: '',
          version: versaoApi
        },
        chapter: {
          number: capitulo,
          verses: data.verses.length
        },
        verses: data.verses.map(v => ({
          number: v.verse,
          text: v.text.trim()
        }))
      }
      
      cache.set(cacheKey, resultado)
      return resultado
      
    } catch (error) {
      console.error('Erro ao buscar capítulo:', error)
      return null
    }
  },

  // Buscar versículo específico
  async buscarVersiculo(versao, livro, capitulo, versiculo) {
    try {
      const livroIngles = livrosMap[livro.toLowerCase()] || livro
      
      const versaoMap = {
        'ARC': 'almeida',
        'ACF': 'almeida',
        'NVI': 'almeida'
      }
      
      const versaoApi = versaoMap[versao] || 'almeida'
      
      const response = await fetch(`${API_BASE_URL}/${livroIngles}+${capitulo}:${versiculo}?translation=${versaoApi}`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar versículo')
      }
      
      const data = await response.json()
      return data
      
    } catch (error) {
      console.error('Erro ao buscar versículo:', error)
      return null
    }
  },

  // Buscar versículo aleatório
  async versiculoAleatorio(versao = 'ARC') {
    try {
      const versaoMap = {
        'ARC': 'almeida',
        'ACF': 'almeida',
        'NVI': 'almeida'
      }
      
      const versaoApi = versaoMap[versao] || 'almeida'
      
      // Lista de versículos populares para escolher aleatoriamente
      const versiculosPopulares = [
        'john+3:16',
        'psalms+23:1',
        'jeremiah+29:11',
        'philippians+4:13',
        'romans+8:28',
        'proverbs+3:5-6',
        'matthew+6:33',
        'isaiah+40:31',
        'joshua+1:9',
        'psalms+46:1'
      ]
      
      const versiculoAleatorio = versiculosPopulares[Math.floor(Math.random() * versiculosPopulares.length)]
      
      const response = await fetch(`${API_BASE_URL}/${versiculoAleatorio}?translation=${versaoApi}`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar versículo aleatório')
      }
      
      const data = await response.json()
      return data
      
    } catch (error) {
      console.error('Erro ao buscar versículo aleatório:', error)
      return null
    }
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

