// Serviço para integração com API da Bíblia
// Usando API pública gratuita

const API_BASE_URL = 'https://www.abibliadigital.com.br/api'

// Cache local para melhorar performance
const cache = new Map()

export const bibliaApiService = {
  // Buscar livros da Bíblia
  async buscarLivros() {
    const cacheKey = 'livros'
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    try {
      const response = await fetch(`${API_BASE_URL}/books`)
      const data = await response.json()
      cache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error('Erro ao buscar livros:', error)
      return []
    }
  },

  // Buscar capítulo específico
  async buscarCapitulo(versao, livro, capitulo) {
    const cacheKey = `${versao}-${livro}-${capitulo}`
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    try {
      // Mapeamento de versões
      const versaoMap = {
        'ARC': 'almeida',
        'ACF': 'acf',
        'NVI': 'nvi'
      }
      
      const versaoApi = versaoMap[versao] || 'almeida'
      const response = await fetch(`${API_BASE_URL}/verses/${versaoApi}/${livro}/${capitulo}`)
      const data = await response.json()
      cache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error('Erro ao buscar capítulo:', error)
      return null
    }
  },

  // Buscar versículo específico
  async buscarVersiculo(versao, livro, capitulo, versiculo) {
    try {
      const versaoMap = {
        'ARC': 'almeida',
        'ACF': 'acf',
        'NVI': 'nvi'
      }
      
      const versaoApi = versaoMap[versao] || 'almeida'
      const response = await fetch(`${API_BASE_URL}/verses/${versaoApi}/${livro}/${capitulo}/${versiculo}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao buscar versículo:', error)
      return null
    }
  },

  // Buscar por palavra-chave
  async buscarPalavra(versao, palavra) {
    try {
      const versaoMap = {
        'ARC': 'almeida',
        'ACF': 'acf',
        'NVI': 'nvi'
      }
      
      const versaoApi = versaoMap[versao] || 'almeida'
      const response = await fetch(`${API_BASE_URL}/verses/${versaoApi}/search/${encodeURIComponent(palavra)}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao buscar palavra:', error)
      return []
    }
  },

  // Buscar versículo aleatório
  async versiculoAleatorio(versao = 'ARC') {
    try {
      const versaoMap = {
        'ARC': 'almeida',
        'ACF': 'acf',
        'NVI': 'nvi'
      }
      
      const versaoApi = versaoMap[versao] || 'almeida'
      const response = await fetch(`${API_BASE_URL}/verses/${versaoApi}/random`)
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

