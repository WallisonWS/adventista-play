import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx'
import { Button } from './ui/button.jsx'
import { Badge } from './ui/badge.jsx'
import { Book, BookOpen, ArrowLeft, ChevronRight } from 'lucide-react'

const livros = [
  {
    id: 1,
    titulo: 'O Grande Conflito',
    autor: 'Ellen G. White',
    capa: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    descricao: 'A história do conflito entre Cristo e Satanás, desde a queda de Lúcifer até a erradicação final do pecado.',
    capitulos: 42,
    paginas: 678,
    ano: 1888,
    categoria: 'Conflito Cósmico',
    conteudo: `
# O Grande Conflito

## Introdução

Este livro apresenta a história do grande conflito entre Cristo e Satanás, desde a origem do pecado até sua erradicação final e o estabelecimento do reino eterno de Deus.

## Capítulo 1: A Destruição de Jerusalém

A destruição de Jerusalém em 70 d.C. foi um prenúncio da destruição final do mundo. Jesus predisse este evento com precisão surpreendente.

"Quando virdes Jerusalém cercada de exércitos, sabei que está próxima a sua devastação" (Lucas 21:20).

Os cristãos que creram nas palavras de Jesus fugiram da cidade antes que fosse tarde demais. Nenhum cristão pereceu na destruição.

## Capítulo 2: A Perseguição nos Primeiros Séculos

Após a morte dos apóstolos, Satanás intensificou seus ataques contra a igreja. Milhares de cristãos foram martirizados por sua fé.

Mas quanto mais eram perseguidos, mais a igreja crescia. "O sangue dos mártires é a semente da igreja."

## Capítulo 3: A Apostasia

Gradualmente, erros e tradições humanas foram introduzidos na igreja. A simplicidade do evangelho foi obscurecida por cerimônias e rituais.

O papado surgiu como um poder político e religioso, cumprindo as profecias de Daniel e Apocalipse.

## Lições Práticas

1. **O Conflito é Real**: Estamos em meio a uma guerra espiritual
2. **A Profecia se Cumpre**: Deus conhece o fim desde o princípio
3. **A Verdade Prevalecerá**: Apesar de toda oposição, a verdade de Deus triunfará
4. **Escolha seu Lado**: Cada pessoa deve decidir de que lado estará no conflito

## Conclusão

O grande conflito terminará com a vitória completa de Cristo. O pecado será erradicado e o universo será restaurado à perfeição original.
    `
  },
  {
    id: 2,
    titulo: 'Caminho a Cristo',
    autor: 'Ellen G. White',
    capa: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=600&fit=crop',
    descricao: 'Um guia prático para encontrar paz e alegria através de um relacionamento com Jesus Cristo.',
    capitulos: 13,
    paginas: 128,
    ano: 1892,
    categoria: 'Vida Cristã',
    conteudo: `
# Caminho a Cristo

## Introdução

Este livro é um guia simples e prático para aqueles que desejam conhecer a Cristo e experimentar a alegria da salvação.

## Capítulo 1: O Amor de Deus

O amor de Deus é a base de todo relacionamento com Ele. "Porque Deus amou o mundo de tal maneira que deu o Seu Filho unigênito" (João 3:16).

Deus não nos ama porque somos bons. Ele nos ama porque Ele é amor. Seu amor é incondicional e eterno.

## Capítulo 2: O Pecador Necessita de Cristo

Todos pecaram e destituídos estão da glória de Deus (Romanos 3:23). Não podemos nos salvar por nossos próprios esforços.

Cristo é nossa única esperança. Ele morreu em nosso lugar para que possamos ter vida eterna.

## Capítulo 3: Arrependimento

O verdadeiro arrependimento é mais do que sentir tristeza pelo pecado. É uma mudança completa de mente e coração.

"Deixe o ímpio o seu caminho, e o homem maligno os seus pensamentos, e se converta ao Senhor" (Isaías 55:7).

## Capítulo 4: Confissão

A confissão sincera traz paz à alma. "Se confessarmos os nossos pecados, Ele é fiel e justo para nos perdoar" (1 João 1:9).

Não precisamos temer confessar nossos pecados a Deus. Ele já conhece tudo e está esperando para nos perdoar.

## Capítulo 5: Consagração

Entregar nossa vida completamente a Cristo é o segredo da verdadeira felicidade. "Entrega o teu caminho ao Senhor" (Salmos 37:5).

Quando nos rendemos a Cristo, Ele trabalha em nós tanto o querer como o efetuar.

## Lições Práticas

1. **Aceite o Amor de Deus**: Você é amado incondicionalmente
2. **Reconheça sua Necessidade**: Todos precisamos de um Salvador
3. **Arrependa-se Sinceramente**: Deixe o pecado e volte-se para Deus
4. **Confesse seus Pecados**: Seja honesto com Deus
5. **Consagre sua Vida**: Entregue tudo a Cristo

## Conclusão

O caminho para Cristo é simples: reconheça sua necessidade, aceite Seu amor, arrependa-se, confesse e consagre sua vida a Ele. A paz e a alegria que você busca são encontradas apenas em Jesus.
    `
  },
  {
    id: 3,
    titulo: 'Patriarcas e Profetas',
    autor: 'Ellen G. White',
    capa: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    descricao: 'A história da criação, do dilúvio e dos patriarcas de Israel, revelando o caráter de Deus.',
    capitulos: 73,
    paginas: 756,
    ano: 1890,
    categoria: 'História Bíblica',
    conteudo: `
# Patriarcas e Profetas

## Introdução

Este livro cobre a história desde a criação do mundo até o reinado de Davi, revelando o caráter de Deus através das experiências dos patriarcas e profetas.

## Capítulo 1: Por que Foi Permitido o Pecado?

A pergunta mais antiga da humanidade: se Deus é amor, por que existe o mal?

Lúcifer, o querubim ungido, permitiu que o orgulho entrasse em seu coração. Ele desejou ser igual a Deus.

Deus poderia ter destruído Satanás imediatamente, mas isso não teria resolvido o problema. O universo precisava ver as consequências da rebelião.

## Capítulo 2: A Criação

"No princípio criou Deus os céus e a terra" (Gênesis 1:1). Em seis dias literais, Deus criou tudo o que existe.

Cada dia da criação revela algo sobre o caráter de Deus: Seu poder, Sua sabedoria, Seu amor e Seu cuidado pelos detalhes.

## Capítulo 3: A Tentação e a Queda

Eva foi enganada, mas Adão escolheu pecar conscientemente. Ele preferiu morrer com Eva do que viver sem ela.

As consequências do pecado foram imediatas: vergonha, medo e separação de Deus.

Mas Deus já tinha um plano de salvação. O Cordeiro foi morto desde a fundação do mundo.

## Capítulo 4: O Plano da Redenção

Deus prometeu que a semente da mulher esmagaria a cabeça da serpente (Gênesis 3:15).

Cristo Se ofereceu para morrer em lugar da humanidade. O Pai aceitou o sacrifício.

O sistema de sacrifícios foi instituído para ensinar sobre o Cordeiro de Deus que tira o pecado do mundo.

## Lições Práticas

1. **Deus é Criador**: Tudo foi feito por Ele e para Ele
2. **O Pecado Tem Consequências**: A desobediência sempre traz sofrimento
3. **Deus Tem um Plano**: Antes mesmo de pecarmos, Deus já tinha a solução
4. **Jesus é o Centro**: Toda a história aponta para Cristo

## Conclusão

A história dos patriarcas e profetas nos ensina sobre o caráter de Deus e Seu plano de salvação. Através de suas vitórias e fracassos, aprendemos lições valiosas para nossa própria jornada espiritual.
    `
  },
  {
    id: 4,
    titulo: 'O Desejado de Todas as Nações',
    autor: 'Ellen G. White',
    capa: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
    descricao: 'A vida de Jesus Cristo, desde Seu nascimento até Sua ascensão, revelando Seu amor pela humanidade.',
    capitulos: 87,
    paginas: 835,
    ano: 1898,
    categoria: 'Vida de Cristo',
    conteudo: `
# O Desejado de Todas as Nações

## Introdução

Este livro apresenta a vida de Jesus Cristo de maneira profunda e inspiradora, revelando Seu caráter e Seu amor pela humanidade.

## Capítulo 1: Deus Conosco

"E o Verbo Se fez carne e habitou entre nós" (João 1:14). O Criador do universo Se tornou um bebê indefeso.

Jesus veio para revelar o Pai. Ele disse: "Quem Me vê a Mim, vê o Pai" (João 14:9).

## Capítulo 2: O Povo Escolhido

Deus escolheu Israel para ser uma luz para as nações. Mas eles falharam em sua missão.

Quando Jesus nasceu, a nação estava sob domínio romano. O povo esperava um Messias político que os libertaria.

## Capítulo 3: O Cumprimento do Tempo

Jesus nasceu no momento exato predito pelas profecias. "Vindo a plenitude dos tempos, Deus enviou Seu Filho" (Gálatas 4:4).

Tudo na história estava preparando o caminho para a vinda do Salvador.

## Lições Práticas

1. **Jesus é Deus**: Ele não é apenas um bom homem, mas o próprio Deus
2. **Deus Se Importa**: Ele desceu ao nosso nível para nos salvar
3. **O Tempo de Deus é Perfeito**: Tudo acontece no momento certo
4. **Jesus Revela o Pai**: Através de Cristo conhecemos o verdadeiro caráter de Deus

## Conclusão

A vida de Jesus é a maior demonstração do amor de Deus. Ele deixou o céu, viveu como homem, sofreu e morreu para nos salvar. Não há amor maior que este.
    `
  },
  {
    id: 5,
    titulo: 'Atos dos Apóstolos',
    autor: 'Ellen G. White',
    capa: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=400&h=600&fit=crop',
    descricao: 'A história da igreja primitiva e a expansão do evangelho pelo mundo.',
    capitulos: 58,
    paginas: 602,
    ano: 1911,
    categoria: 'História da Igreja',
    conteudo: `
# Atos dos Apóstolos

## Introdução

Este livro narra a história da igreja primitiva, desde o Pentecostes até a prisão de Paulo em Roma.

## Capítulo 1: O Propósito de Deus para Sua Igreja

Antes de ascender ao céu, Jesus deu a Grande Comissão: "Ide por todo o mundo e pregai o evangelho" (Marcos 16:15).

A igreja foi estabelecida para continuar a obra que Jesus começou.

## Capítulo 2: O Pentecostes

No dia de Pentecostes, o Espírito Santo foi derramado sobre os discípulos. Eles foram capacitados para pregar o evangelho.

Três mil pessoas foram batizadas naquele dia. A igreja cresceu rapidamente.

## Capítulo 3: A Conversão de Paulo

Saulo era um perseguidor feroz dos cristãos. Mas no caminho para Damasco, ele teve um encontro com Jesus.

Sua conversão mostra que ninguém está além do alcance da graça de Deus.

## Lições Práticas

1. **O Espírito Santo Capacita**: Não podemos fazer a obra de Deus sem Seu poder
2. **A Igreja Deve Crescer**: Evangelização não é opcional
3. **Deus Pode Transformar Qualquer Um**: Até os maiores pecadores podem ser salvos
4. **A Unidade é Essencial**: A igreja primitiva estava unida em amor

## Conclusão

A história da igreja primitiva nos inspira e desafia. Eles enfrentaram perseguição, mas permaneceram fiéis. Através de seu testemunho, o evangelho se espalhou por todo o mundo conhecido.
    `
  },
  {
    id: 6,
    titulo: 'Educação',
    autor: 'Ellen G. White',
    capa: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=600&fit=crop',
    descricao: 'Princípios para uma educação verdadeira que desenvolve o caráter e prepara para a eternidade.',
    capitulos: 20,
    paginas: 320,
    ano: 1903,
    categoria: 'Educação',
    conteudo: `
# Educação

## Introdução

A verdadeira educação é mais do que a busca de um curso de estudos. É o desenvolvimento harmonioso das faculdades físicas, mentais e espirituais.

## Capítulo 1: A Fonte e o Objetivo da Verdadeira Educação

"O temor do Senhor é o princípio da sabedoria" (Provérbios 9:10).

A verdadeira educação prepara o estudante para o gozo do serviço neste mundo e para a alegria mais elevada por um mais dilatado serviço no mundo vindouro.

## Capítulo 2: A Escola do Éden

O primeiro lar e a primeira escola foram no Éden. Deus era o instrutor, e Adão e Eva eram os alunos.

A natureza era o livro-texto. Através da criação, eles aprendiam sobre o Criador.

## Lições Práticas

1. **Educação é Desenvolvimento**: Não apenas acumular informação
2. **Deus é o Grande Mestre**: Toda verdadeira sabedoria vem dEle
3. **Caráter é Mais Importante que Conhecimento**: Ser é mais importante que saber
4. **Educação é Para a Eternidade**: Prepara para este mundo e para o próximo

## Conclusão

A educação verdadeira é a preparação para a vida eterna. Ela desenvolve o caráter, fortalece a mente e santifica o coração.
    `
  }
]

export function LivrosEllenWhite() {
  const [livroSelecionado, setLivroSelecionado] = useState(null)

  if (!livroSelecionado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="mx-auto mb-6 w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
              <Book className="w-10 h-10 text-amber-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Livros de Ellen G. White
            </h1>
            <p className="text-xl text-gray-600">
              Biblioteca completa com os principais livros
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {livros.map((livro, index) => (
              <motion.div
                key={livro.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  onClick={() => setLivroSelecionado(livro)}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={livro.capa} 
                      alt={livro.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <Badge className="bg-amber-600 mb-2">
                        {livro.categoria}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-1">
                        {livro.titulo}
                      </h3>
                      <p className="text-sm opacity-90">
                        {livro.autor}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {livro.descricao}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{livro.capitulos} capítulos</span>
                      <span>{livro.paginas} páginas</span>
                    </div>
                    <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Ler Livro
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setLivroSelecionado(null)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à Biblioteca
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-2xl overflow-hidden">
            <div className="relative h-96">
              <img 
                src={livroSelecionado.capa} 
                alt={livroSelecionado.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <Badge className="bg-amber-600 mb-4">
                  {livroSelecionado.categoria}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {livroSelecionado.titulo}
                </h1>
                <p className="text-xl opacity-90 mb-4">
                  {livroSelecionado.autor}
                </p>
                <div className="flex gap-6 text-sm">
                  <span>{livroSelecionado.capitulos} capítulos</span>
                  <span>{livroSelecionado.paginas} páginas</span>
                  <span>Publicado em {livroSelecionado.ano}</span>
                </div>
              </div>
            </div>

            <CardContent className="p-8">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-6">
                  {livroSelecionado.descricao}
                </p>

                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {livroSelecionado.conteudo}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continuar Lendo
                </Button>
                <Button variant="outline">
                  Marcar como Lido
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

