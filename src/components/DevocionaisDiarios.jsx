import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Calendar, 
  BookOpen, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  Moon,
  Star
} from 'lucide-react'

// Devocionais para cada dia da semana
const devocionaisSemana = [
  {
    dia: "Domingo",
    tema: "Criação e Descanso",
    versiculo: "Gênesis 2:2-3",
    texto: "E havendo Deus acabado no dia sétimo a obra que fizera, descansou no sétimo dia de toda a sua obra, que tinha feito. E abençoou Deus o dia sétimo, e o santificou; porque nele descansou de toda a sua obra que Deus criara e fizera.",
    reflexao: "Deus nos deu o sábado como um presente especial, um dia para descansar e nos conectar com Ele. Assim como Deus descansou após criar o mundo, Ele nos convida a descansar também, renovando nossas forças e nossa fé.",
    aplicacao: "Hoje, reflita sobre como você pode honrar o sábado. Planeje atividades que fortaleçam sua conexão com Deus e sua família.",
    oracao: "Senhor, obrigado pelo dom do sábado. Ajuda-me a guardar este dia santo e a usá-lo para me aproximar de Ti. Amém.",
    cor: "from-orange-500 to-red-500"
  },
  {
    dia: "Segunda-feira",
    tema: "Novo Começo",
    versiculo: "Lamentações 3:22-23",
    texto: "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; renovam-se cada manhã. Grande é a tua fidelidade.",
    reflexao: "Cada segunda-feira é uma nova oportunidade de começar bem a semana. Deus renova Suas misericórdias a cada manhã, oferecendo-nos um novo começo, não importa o que aconteceu antes.",
    aplicacao: "Comece esta semana com gratidão. Liste três bênçãos que você recebeu e agradeça a Deus por elas.",
    oracao: "Pai celestial, obrigado por Tuas misericórdias que se renovam a cada manhã. Ajuda-me a começar esta semana com fé e esperança. Amém.",
    cor: "from-blue-500 to-cyan-500"
  },
  {
    dia: "Terça-feira",
    tema: "Força e Coragem",
    versiculo: "Josué 1:9",
    texto: "Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.",
    reflexao: "Deus nos chama a ser fortes e corajosos, não por nossa própria força, mas porque Ele está conosco. Não importa os desafios que enfrentamos, Deus promete estar ao nosso lado.",
    aplicacao: "Identifique um desafio que você está enfrentando. Ore pedindo coragem e confie que Deus está com você.",
    oracao: "Senhor, dá-me força e coragem para enfrentar os desafios desta semana. Lembra-me que Tu estás sempre comigo. Amém.",
    cor: "from-green-500 to-emerald-500"
  },
  {
    dia: "Quarta-feira",
    tema: "Sabedoria e Conhecimento",
    versiculo: "Provérbios 3:5-6",
    texto: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
    reflexao: "A verdadeira sabedoria vem de confiar em Deus, não apenas em nossa própria compreensão. Quando buscamos a Deus em todas as nossas decisões, Ele nos guia no caminho certo.",
    aplicacao: "Antes de tomar decisões hoje, pare e ore pedindo a direção de Deus. Confie que Ele guiará seus passos.",
    oracao: "Deus sábio, ajuda-me a confiar em Ti de todo o meu coração. Guia-me em todas as minhas decisões. Amém.",
    cor: "from-purple-500 to-pink-500"
  },
  {
    dia: "Quinta-feira",
    tema: "Amor e Serviço",
    versiculo: "João 13:34-35",
    texto: "Um novo mandamento vos dou: Que vos ameis uns aos outros; como eu vos amei a vós, que também vós uns aos outros vos ameis. Nisto todos conhecerão que sois meus discípulos, se vos amardes uns aos outros.",
    reflexao: "Jesus nos ensinou que o amor é a marca distintiva de Seus seguidores. Amar como Jesus amou significa servir, perdoar e cuidar uns dos outros com compaixão.",
    aplicacao: "Hoje, encontre uma maneira prática de demonstrar amor a alguém. Pode ser um gesto simples de bondade ou uma palavra de encorajamento.",
    oracao: "Jesus, ensina-me a amar como Tu amaste. Ajuda-me a ser Tuas mãos e pés neste mundo. Amém.",
    cor: "from-red-500 to-rose-500"
  },
  {
    dia: "Sexta-feira",
    tema: "Preparação e Santificação",
    versiculo: "Êxodo 20:8-10",
    texto: "Lembra-te do dia do sábado, para o santificar. Seis dias trabalharás, e farás toda a tua obra. Mas o sétimo dia é o sábado do Senhor teu Deus.",
    reflexao: "A sexta-feira é o dia de preparação para o sábado. É um momento para encerrar nossas atividades seculares e preparar nosso coração para adorar a Deus.",
    aplicacao: "Prepare-se para o sábado hoje. Termine seus trabalhos, prepare sua casa e seu coração para receber o dia santo.",
    oracao: "Senhor, ajuda-me a me preparar adequadamente para o Teu santo dia. Que meu coração esteja pronto para Te adorar. Amém.",
    cor: "from-amber-500 to-orange-500"
  },
  {
    dia: "Sábado",
    tema: "Adoração e Comunhão",
    versiculo: "Salmos 122:1",
    texto: "Alegrei-me quando me disseram: Vamos à casa do Senhor.",
    reflexao: "O sábado é um dia de alegria, adoração e comunhão com Deus e Sua família. É um tempo para descansar das atividades seculares e focar em nossa relação com o Criador.",
    aplicacao: "Dedique este dia a Deus. Participe do culto, estude a Bíblia, passe tempo com a família e desfrute da criação de Deus.",
    oracao: "Pai amado, obrigado por este dia especial. Ajuda-me a honrá-lo e a usá-lo para me aproximar de Ti. Amém.",
    cor: "from-indigo-500 to-purple-500"
  }
]

export function DevocionaisDiarios() {
  const [diaAtual, setDiaAtual] = useState(new Date().getDay())
  const [devocionalSalvo, setDevocionalSalvo] = useState(false)
  
  const devocional = devocionaisSemana[diaAtual]
  
  const proximoDia = () => {
    setDiaAtual((prev) => (prev + 1) % 7)
  }
  
  const diaAnterior = () => {
    setDiaAtual((prev) => (prev - 1 + 7) % 7)
  }
  
  const compartilhar = async () => {
    const texto = `${devocional.dia} - ${devocional.tema}\n\n${devocional.versiculo}\n"${devocional.texto}"\n\n${devocional.reflexao}\n\nCompartilhado via Adventista Play`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Devocional: ${devocional.tema}`,
          text: texto
        })
      } catch (err) {
        console.log('Erro ao compartilhar:', err)
      }
    } else {
      navigator.clipboard.writeText(texto)
      alert('Texto copiado para a área de transferência!')
    }
  }
  
  const salvarDevocional = () => {
    setDevocionalSalvo(!devocionalSalvo)
    // Aqui você pode adicionar lógica para salvar no localStorage ou banco de dados
  }
  
  const getIconeDia = () => {
    if (diaAtual === 0 || diaAtual === 6) return Sun
    if (diaAtual === 5) return Moon
    return Star
  }
  
  const IconeDia = getIconeDia()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Devocionais Diários</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Alimento espiritual para cada dia da semana
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className={`bg-gradient-to-r ${devocional.cor} text-white`}>
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={diaAnterior}
                  className="text-white hover:bg-white/20"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <div className="text-center flex-1">
                  <div className="flex items-center justify-center mb-2">
                    <IconeDia className="h-8 w-8 mr-2" />
                    <CardTitle className="text-3xl">{devocional.dia}</CardTitle>
                  </div>
                  <CardDescription className="text-white/90 text-lg">
                    {devocional.tema}
                  </CardDescription>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={proximoDia}
                  className="text-white hover:bg-white/20"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              
              <Badge variant="secondary" className="w-fit mx-auto">
                <Calendar className="h-3 w-3 mr-1" />
                {devocional.versiculo}
              </Badge>
            </CardHeader>
            
            <CardContent className="pt-6 space-y-6">
              {/* Versículo */}
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                <p className="text-lg italic leading-relaxed">
                  "{devocional.texto}"
                </p>
                <p className="text-sm text-muted-foreground mt-2 text-right">
                  — {devocional.versiculo}
                </p>
              </div>
              
              {/* Reflexão */}
              <div>
                <h3 className="font-bold text-lg mb-2 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Reflexão
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {devocional.reflexao}
                </p>
              </div>
              
              {/* Aplicação */}
              <div>
                <h3 className="font-bold text-lg mb-2 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  Aplicação Prática
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {devocional.aplicacao}
                </p>
              </div>
              
              {/* Oração */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-primary" />
                  Oração
                </h3>
                <p className="italic leading-relaxed">
                  {devocional.oracao}
                </p>
              </div>
              
              {/* Ações */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={salvarDevocional} 
                  variant={devocionalSalvo ? "default" : "outline"}
                  className="flex-1"
                >
                  <Heart className={`h-4 w-4 mr-2 ${devocionalSalvo ? 'fill-current' : ''}`} />
                  {devocionalSalvo ? 'Salvo' : 'Salvar'}
                </Button>
                <Button onClick={compartilhar} variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Navegação por dias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="grid grid-cols-7 gap-2">
            {devocionaisSemana.map((dev, index) => (
              <Button
                key={index}
                variant={diaAtual === index ? "default" : "outline"}
                onClick={() => setDiaAtual(index)}
                className="flex flex-col h-auto py-3"
              >
                <span className="text-xs mb-1">{dev.dia.substring(0, 3)}</span>
                {diaAtual === index && <div className="h-1 w-1 bg-white rounded-full" />}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

