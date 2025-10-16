import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx'
import { Button } from './ui/button.jsx'
import { Badge } from './ui/badge.jsx'
import { Calendar, BookOpen, ChevronLeft, ChevronRight, Heart } from 'lucide-react'

// Devocionais de Ellen White (13 livros com 366 meditações cada)
const devocionais = [
  {
    id: 1,
    titulo: 'Maravilhosa Graça',
    descricao: 'Meditações diárias sobre a graça transformadora de Deus',
    cor: 'from-blue-500 to-indigo-600',
    imagem: '📖'
  },
  {
    id: 2,
    titulo: 'Filhos e Filhas de Deus',
    descricao: 'Reflexões sobre nossa identidade como filhos de Deus',
    cor: 'from-purple-500 to-pink-600',
    imagem: '👨‍👩‍👧‍👦'
  },
  {
    id: 3,
    titulo: 'Nos Lugares Celestiais',
    descricao: 'Meditações sobre a vida cristã vitoriosa',
    cor: 'from-cyan-500 to-blue-600',
    imagem: '☁️'
  },
  {
    id: 4,
    titulo: 'Minha Consagração Hoje',
    descricao: 'Chamados diários à consagração total',
    cor: 'from-orange-500 to-red-600',
    imagem: '🔥'
  },
  {
    id: 5,
    titulo: 'Este Dia com Deus',
    descricao: 'Começando cada dia na presença de Deus',
    cor: 'from-green-500 to-emerald-600',
    imagem: '🌅'
  },
  {
    id: 6,
    titulo: 'Para Conhecê-Lo',
    descricao: 'Conhecendo mais profundamente o caráter de Deus',
    cor: 'from-yellow-500 to-orange-600',
    imagem: '💡'
  },
  {
    id: 7,
    titulo: 'Nossa Alta Vocação',
    descricao: 'Vivendo à altura do chamado de Deus',
    cor: 'from-indigo-500 to-purple-600',
    imagem: '⭐'
  },
  {
    id: 8,
    titulo: 'Fé Pela Qual Eu Vivo',
    descricao: 'Fortalecendo a fé dia após dia',
    cor: 'from-rose-500 to-pink-600',
    imagem: '🛡️'
  },
  {
    id: 9,
    titulo: 'Olhando Para o Alto',
    descricao: 'Mantendo os olhos fixos em Jesus',
    cor: 'from-teal-500 to-cyan-600',
    imagem: '👀'
  },
  {
    id: 10,
    titulo: 'A Fé Pela Qual Eu Vivo',
    descricao: 'Princípios de fé para a vida diária',
    cor: 'from-amber-500 to-yellow-600',
    imagem: '🌟'
  },
  {
    id: 11,
    titulo: 'Refletindo a Cristo',
    descricao: 'Tornando-se mais semelhante a Jesus',
    cor: 'from-violet-500 to-purple-600',
    imagem: '✨'
  },
  {
    id: 12,
    titulo: 'Exaltai-O',
    descricao: 'Exaltando a Cristo em tudo',
    cor: 'from-red-500 to-rose-600',
    imagem: '🙌'
  },
  {
    id: 13,
    titulo: 'Receberei Poder',
    descricao: 'O poder do Espírito Santo na vida diária',
    cor: 'from-lime-500 to-green-600',
    imagem: '⚡'
  }
]

// Meditações de exemplo (em produção, viria de um banco de dados)
const meditacoesExemplo = {
  1: { // Janeiro 1
    titulo: 'Começando o Ano com Deus',
    versiculo: 'Salmos 90:12',
    texto: 'Ensina-nos a contar os nossos dias, de tal maneira que alcancemos corações sábios.',
    meditacao: `
Ao iniciarmos um novo ano, somos convidados a refletir sobre o valor do tempo. Cada dia é uma dádiva preciosa de Deus, uma oportunidade única de crescer em graça e conhecimento.

O salmista nos ensina que a verdadeira sabedoria não está em acumular anos, mas em viver cada dia com propósito e significado. Contar nossos dias significa reconhecer que o tempo é limitado e precioso.

Como você usará este ano? Que decisões tomará? Que hábitos cultivará? Deus deseja que cada dia seja vivido em Sua presença, sob Sua direção.

Que este ano seja marcado por um relacionamento mais profundo com Deus, por crescimento espiritual e por serviço abnegado ao próximo. Entregue cada dia nas mãos de Deus e permita que Ele o guie.

**Oração:** Senhor, ensina-me a valorizar cada dia como uma dádiva Tua. Que eu possa viver este ano para Tua glória. Amém.
    `
  },
  2: { // Janeiro 2
    titulo: 'A Graça Transformadora',
    versiculo: '2 Coríntios 5:17',
    texto: 'Se alguém está em Cristo, é nova criatura; as coisas antigas já passaram; eis que se fizeram novas.',
    meditacao: `
A graça de Deus não apenas perdoa, mas transforma. Quando aceitamos a Cristo, não recebemos apenas perdão dos pecados passados, mas também poder para viver uma nova vida.

Esta transformação não é superficial ou temporária. É profunda e permanente. O Espírito Santo trabalha em nós, moldando nosso caráter à semelhança de Cristo.

As "coisas antigas" - velhos hábitos, pensamentos pecaminosos, atitudes egoístas - são substituídas por novos valores, novos desejos, nova perspectiva de vida.

Você tem experimentado esta transformação? Sua vida reflete a novidade que Cristo traz? Permita que o Espírito Santo continue Sua obra em você.

**Oração:** Senhor, transforma-me completamente. Que eu seja verdadeiramente uma nova criatura em Ti. Amém.
    `
  }
}

export function DevocionaisEllenWhite() {
  const [devocionalSelecionado, setDevocionalSelecionado] = useState(null)
  const [dataAtual, setDataAtual] = useState(new Date())
  const [favoritos, setFavoritos] = useState([])

  // Obter dia do ano (1-366)
  const getDiaDoAno = (data) => {
    const inicio = new Date(data.getFullYear(), 0, 0)
    const diff = data - inicio
    const umDia = 1000 * 60 * 60 * 24
    return Math.floor(diff / umDia)
  }

  const diaDoAno = getDiaDoAno(dataAtual)

  // Navegar entre dias
  const irParaDiaAnterior = () => {
    const novaData = new Date(dataAtual)
    novaData.setDate(novaData.getDate() - 1)
    setDataAtual(novaData)
  }

  const irParaProximoDia = () => {
    const novaData = new Date(dataAtual)
    novaData.setDate(novaData.getDate() + 1)
    setDataAtual(novaData)
  }

  const irParaHoje = () => {
    setDataAtual(new Date())
  }

  // Adicionar/remover favoritos
  const toggleFavorito = () => {
    const chave = `${devocionalSelecionado.id}-${diaDoAno}`
    if (favoritos.includes(chave)) {
      setFavoritos(favoritos.filter(f => f !== chave))
    } else {
      setFavoritos([...favoritos, chave])
    }
  }

  const isFavorito = devocionalSelecionado && favoritos.includes(`${devocionalSelecionado.id}-${diaDoAno}`)

  // Obter meditação do dia
  const meditacaoDoDia = meditacoesExemplo[diaDoAno] || {
    titulo: 'Meditação do Dia',
    versiculo: 'Salmos 119:105',
    texto: 'Lâmpada para os meus pés é a tua palavra e, luz para os meus caminhos.',
    meditacao: `
Esta é uma meditação de exemplo. Em produção, cada dia teria sua própria meditação específica do livro devocional selecionado.

A Palavra de Deus é nossa guia diária. Ela ilumina nosso caminho e nos mostra a direção correta. Sem ela, estaríamos perdidos nas trevas.

Dedique tempo hoje para ler e meditar na Palavra de Deus. Permita que ela ilumine suas decisões e guie seus passos.

**Oração:** Senhor, que Tua Palavra seja minha luz hoje. Amém.
    `
  }

  if (!devocionalSelecionado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="mx-auto mb-6 w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-indigo-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Devocionais de Ellen White
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              13 livros devocionais com 366 meditações cada, para fortalecer sua caminhada com Deus todos os dias do ano
            </p>
          </motion.div>

          {/* Grid de Devocionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devocionais.map((devocional, index) => (
              <motion.div
                key={devocional.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                  onClick={() => setDevocionalSelecionado(devocional)}
                >
                  <div className={`h-3 bg-gradient-to-r ${devocional.cor}`} />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{devocional.imagem}</div>
                      <Badge variant="outline" className="bg-white">
                        366 dias
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-indigo-600 transition-colors">
                      {devocional.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {devocional.descricao}
                    </p>
                    <Button className={`w-full bg-gradient-to-r ${devocional.cor} text-white`}>
                      Começar Leitura
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Visualização da meditação diária
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho com navegação */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setDevocionalSelecionado(null)}
            className="mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar aos Devocionais
          </Button>

          <Card className="overflow-hidden">
            <div className={`h-3 bg-gradient-to-r ${devocionalSelecionado.cor}`} />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{devocionalSelecionado.imagem}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {devocionalSelecionado.titulo}
                    </h2>
                    <p className="text-gray-600">
                      {dataAtual.toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleFavorito}
                  className={isFavorito ? 'text-red-500' : ''}
                >
                  <Heart className={`w-5 h-5 ${isFavorito ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Navegação entre dias */}
              <div className="flex items-center justify-between gap-4">
                <Button onClick={irParaDiaAnterior} variant="outline">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Dia Anterior
                </Button>
                <Button onClick={irParaHoje} variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Hoje
                </Button>
                <Button onClick={irParaProximoDia} variant="outline">
                  Próximo Dia
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meditação do dia */}
        <motion.div
          key={diaDoAno}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">
                {meditacaoDoDia.titulo}
              </CardTitle>
              <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
                <p className="text-sm text-indigo-600 font-semibold mb-2">
                  {meditacaoDoDia.versiculo}
                </p>
                <p className="text-lg italic text-gray-700">
                  "{meditacaoDoDia.texto}"
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                {meditacaoDoDia.meditacao.split('\n').map((paragrafo, index) => (
                  paragrafo.trim() && (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragrafo.trim()}
                    </p>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rodapé */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Dia {diaDoAno} de 366</p>
          <p className="mt-2">
            © Ellen G. White Estate, Inc.
          </p>
        </div>
      </div>
    </div>
  )
}

