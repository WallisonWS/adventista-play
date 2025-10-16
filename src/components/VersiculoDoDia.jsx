import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { BookText, Share2, Copy, Heart, RefreshCw } from 'lucide-react'

// Versículos do dia (rotação diária)
const versiculos = [
  {
    texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    referencia: "João 3:16",
    tema: "Amor de Deus"
  },
  {
    texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-O em todos os teus caminhos, e Ele endireitará as tuas veredas.",
    referencia: "Provérbios 3:5-6",
    tema: "Confiança"
  },
  {
    texto: "O Senhor é o meu pastor; nada me faltará.",
    referencia: "Salmos 23:1",
    tema: "Provisão"
  },
  {
    texto: "Tudo posso naquele que me fortalece.",
    referencia: "Filipenses 4:13",
    tema: "Força"
  },
  {
    texto: "Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.",
    referencia: "Josué 1:9",
    tema: "Coragem"
  },
  {
    texto: "Entrega o teu caminho ao Senhor; confia nele, e ele o fará.",
    referencia: "Salmos 37:5",
    tema: "Entrega"
  },
  {
    texto: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.",
    referencia: "Efésios 2:8",
    tema: "Graça"
  }
]

export function VersiculoDoDia({ compact = false }) {
  const [versiculo, setVersiculo] = useState(null)
  const [favorito, setFavorito] = useState(false)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    // Selecionar versículo baseado no dia do ano
    const hoje = new Date()
    const inicioDano = new Date(hoje.getFullYear(), 0, 0)
    const diff = hoje - inicioDano
    const umDia = 1000 * 60 * 60 * 24
    const diaDoAno = Math.floor(diff / umDia)
    const index = diaDoAno % versiculos.length
    
    setVersiculo(versiculos[index])
  }, [])

  const handleCopiar = () => {
    if (versiculo) {
      const texto = `"${versiculo.texto}" - ${versiculo.referencia}`
      navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const handleCompartilhar = async () => {
    if (versiculo && navigator.share) {
      try {
        await navigator.share({
          title: 'Versículo do Dia',
          text: `"${versiculo.texto}" - ${versiculo.referencia}`,
        })
      } catch (err) {
        handleCopiar()
      }
    } else {
      handleCopiar()
    }
  }

  const handleNovoVersiculo = () => {
    const index = Math.floor(Math.random() * versiculos.length)
    setVersiculo(versiculos[index])
  }

  if (!versiculo) return null

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border"
      >
        <div className="flex items-start gap-3">
          <BookText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-sm italic mb-2">"{versiculo.texto}"</p>
            <p className="text-xs font-semibold text-primary">{versiculo.referencia}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <BookText className="h-6 w-6 text-primary" />
              </motion.div>
              Versículo do Dia
            </CardTitle>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFavorito(!favorito)}
              className={`p-2 rounded-full transition-colors ${
                favorito ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${favorito ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            key={versiculo.referencia}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg">
              <p className="text-lg italic leading-relaxed text-center">
                "{versiculo.texto}"
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-primary">{versiculo.referencia}</p>
                <p className="text-sm text-muted-foreground">Tema: {versiculo.tema}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopiar}
                className="w-full"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copiado ? 'Copiado!' : 'Copiar'}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCompartilhar}
                className="w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNovoVersiculo}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Compartilhe este versículo com alguém hoje!
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

