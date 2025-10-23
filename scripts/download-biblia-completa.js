/**
 * Script para baixar toda a Bíblia via API e salvar localmente
 * Execução: node scripts/download-biblia-completa.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Estrutura completa da Bíblia
const livrosBiblia = {
  antigoTestamento: [
    { id: 'gn', nome: 'Gênesis', capitulos: 50 },
    { id: 'ex', nome: 'Êxodo', capitulos: 40 },
    { id: 'lv', nome: 'Levítico', capitulos: 27 },
    { id: 'nm', nome: 'Números', capitulos: 36 },
    { id: 'dt', nome: 'Deuteronômio', capitulos: 34 },
    { id: 'js', nome: 'Josué', capitulos: 24 },
    { id: 'jz', nome: 'Juízes', capitulos: 21 },
    { id: 'rt', nome: 'Rute', capitulos: 4 },
    { id: '1sm', nome: '1 Samuel', capitulos: 31 },
    { id: '2sm', nome: '2 Samuel', capitulos: 24 },
    { id: '1rs', nome: '1 Reis', capitulos: 22 },
    { id: '2rs', nome: '2 Reis', capitulos: 25 },
    { id: '1cr', nome: '1 Crônicas', capitulos: 29 },
    { id: '2cr', nome: '2 Crônicas', capitulos: 36 },
    { id: 'ed', nome: 'Esdras', capitulos: 10 },
    { id: 'ne', nome: 'Neemias', capitulos: 13 },
    { id: 'et', nome: 'Ester', capitulos: 10 },
    { id: 'job', nome: 'Jó', capitulos: 42 },
    { id: 'sl', nome: 'Salmos', capitulos: 150 },
    { id: 'pv', nome: 'Provérbios', capitulos: 31 },
    { id: 'ec', nome: 'Eclesiastes', capitulos: 12 },
    { id: 'ct', nome: 'Cânticos', capitulos: 8 },
    { id: 'is', nome: 'Isaías', capitulos: 66 },
    { id: 'jr', nome: 'Jeremias', capitulos: 52 },
    { id: 'lm', nome: 'Lamentações', capitulos: 5 },
    { id: 'ez', nome: 'Ezequiel', capitulos: 48 },
    { id: 'dn', nome: 'Daniel', capitulos: 12 },
    { id: 'os', nome: 'Oséias', capitulos: 14 },
    { id: 'jl', nome: 'Joel', capitulos: 3 },
    { id: 'am', nome: 'Amós', capitulos: 9 },
    { id: 'ob', nome: 'Obadias', capitulos: 1 },
    { id: 'jn', nome: 'Jonas', capitulos: 4 },
    { id: 'mq', nome: 'Miquéias', capitulos: 7 },
    { id: 'na', nome: 'Naum', capitulos: 3 },
    { id: 'hc', nome: 'Habacuque', capitulos: 3 },
    { id: 'sf', nome: 'Sofonias', capitulos: 3 },
    { id: 'ag', nome: 'Ageu', capitulos: 2 },
    { id: 'zc', nome: 'Zacarias', capitulos: 14 },
    { id: 'ml', nome: 'Malaquias', capitulos: 4 },
  ],
  novoTestamento: [
    { id: 'mt', nome: 'Mateus', capitulos: 28 },
    { id: 'mc', nome: 'Marcos', capitulos: 16 },
    { id: 'lc', nome: 'Lucas', capitulos: 24 },
    { id: 'jo', nome: 'João', capitulos: 21 },
    { id: 'at', nome: 'Atos', capitulos: 28 },
    { id: 'rm', nome: 'Romanos', capitulos: 16 },
    { id: '1co', nome: '1 Coríntios', capitulos: 16 },
    { id: '2co', nome: '2 Coríntios', capitulos: 13 },
    { id: 'gl', nome: 'Gálatas', capitulos: 6 },
    { id: 'ef', nome: 'Efésios', capitulos: 6 },
    { id: 'fp', nome: 'Filipenses', capitulos: 4 },
    { id: 'cl', nome: 'Colossenses', capitulos: 4 },
    { id: '1ts', nome: '1 Tessalonicenses', capitulos: 5 },
    { id: '2ts', nome: '2 Tessalonicenses', capitulos: 3 },
    { id: '1tm', nome: '1 Timóteo', capitulos: 6 },
    { id: '2tm', nome: '2 Timóteo', capitulos: 4 },
    { id: 'tt', nome: 'Tito', capitulos: 3 },
    { id: 'fm', nome: 'Filemom', capitulos: 1 },
    { id: 'hb', nome: 'Hebreus', capitulos: 13 },
    { id: 'tg', nome: 'Tiago', capitulos: 5 },
    { id: '1pe', nome: '1 Pedro', capitulos: 5 },
    { id: '2pe', nome: '2 Pedro', capitulos: 3 },
    { id: '1jo', nome: '1 João', capitulos: 5 },
    { id: '2jo', nome: '2 João', capitulos: 1 },
    { id: '3jo', nome: '3 João', capitulos: 1 },
    { id: 'jd', nome: 'Judas', capitulos: 1 },
    { id: 'ap', nome: 'Apocalipse', capitulos: 22 },
  ]
}

// Função para fazer requisição com retry
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.error(`Tentativa ${i + 1} falhou:`, error.message)
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  return null
}

// Função principal
async function downloadBiblia() {
  const bibliaCompleta = {}
  let sucessos = 0
  let falhas = 0
  let total = 0

  // Calcular total de capítulos
  const todosLivros = [...livrosBiblia.antigoTestamento, ...livrosBiblia.novoTestamento]
  todosLivros.forEach(livro => {
    total += livro.capitulos
  })

  console.log(`📖 Iniciando download de ${total} capítulos da Bíblia...`)
  console.log('⏳ Isso pode levar alguns minutos...\n')

  for (const livro of todosLivros) {
    console.log(`📚 Baixando ${livro.nome} (${livro.capitulos} capítulos)...`)
    
    for (let cap = 1; cap <= livro.capitulos; cap++) {
      const chave = `${livro.id}-${cap}`
      const url = `https://www.abibliadigital.com.br/api/verses/arc/${livro.id}/${cap}`
      
      const dados = await fetchWithRetry(url)
      
      if (dados && dados.verses) {
        bibliaCompleta[chave] = {
          book: dados.book,
          chapter: dados.chapter,
          verses: dados.verses
        }
        sucessos++
        process.stdout.write(`\r✅ Progresso: ${sucessos}/${total} (${Math.round(sucessos/total*100)}%)`)
      } else {
        falhas++
        console.log(`\n❌ Falha ao baixar ${livro.nome} ${cap}`)
      }
      
      // Delay entre requisições para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 200))
    }
  }

  console.log(`\n\n📊 Resultado:`)
  console.log(`✅ Sucessos: ${sucessos}`)
  console.log(`❌ Falhas: ${falhas}`)
  console.log(`📈 Taxa de sucesso: ${Math.round(sucessos/total*100)}%`)

  // Salvar arquivo
  const outputPath = path.join(__dirname, '../src/data/biblia-completa.js')
  const conteudo = `// Dados completos da Bíblia
// Gerado automaticamente via API
// Total de capítulos: ${sucessos}
// Data: ${new Date().toLocaleString('pt-BR')}

export const bibliaCompleta = ${JSON.stringify(bibliaCompleta, null, 2)}
`

  fs.writeFileSync(outputPath, conteudo, 'utf8')
  console.log(`\n💾 Arquivo salvo em: ${outputPath}`)
  
  // Calcular tamanho do arquivo
  const stats = fs.statSync(outputPath)
  const tamanhoMB = (stats.size / (1024 * 1024)).toFixed(2)
  console.log(`📦 Tamanho do arquivo: ${tamanhoMB} MB`)
  
  console.log('\n✨ Download concluído!')
}

// Executar
downloadBiblia().catch(console.error)

