import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { 
  Share2, 
  Instagram, 
  MessageCircle, 
  Facebook, 
  Twitter,
  Copy,
  Download,
  Heart,
  Sparkles
} from 'lucide-react'


export function CompartilharOracao() {
  const [oracao, setOracao] = useState('')
  const [versiculo, setVersiculo] = useState('')


  const compartilharWhatsApp = () => {
    const texto = `🙏 *Pedido de Oração*\n\n${oracao}\n\n📖 ${versiculo}\n\n_Compartilhado via Adventista Play_`
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank')
  }

  const compartilharInstagram = () => {
    // Para Instagram, vamos copiar o texto e instruir o usuário
    const texto = `🙏 Pedido de Oração\n\n${oracao}\n\n📖 ${versiculo}\n\n#OracaoAdventista #Fe #AdventistasPlay`
    navigator.clipboard.writeText(texto)
    alert('Texto copiado! Cole no Instagram Stories ou Feed.')
  }

  const compartilharFacebook = () => {
    const texto = `🙏 Pedido de Oração\n\n${oracao}\n\n📖 ${versiculo}`
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(texto)}`
    window.open(url, '_blank')
  }

  const compartilharTwitter = () => {
    const texto = `🙏 ${oracao}\n\n📖 ${versiculo}\n\n#OracaoAdventista #Fe`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank')
  }

  const copiarTexto = () => {
    const texto = `🙏 Pedido de Oração\n\n${oracao}\n\n📖 ${versiculo}`
    navigator.clipboard.writeText(texto)
    alert('Texto copiado para a área de transferência!')
  }

  const gerarImagem = () => {
    // Criar canvas para gerar imagem
    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1920
    const ctx = canvas.getContext('2d')

    // Fundo gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#2E3192')
    gradient.addColorStop(1, '#7CB342')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Texto
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 60px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('🙏 Pedido de Oração', canvas.width / 2, 200)

    // Oração
    ctx.font = '40px Arial'
    const palavras = oracao.split(' ')
    let linha = ''
    let y = 400
    palavras.forEach(palavra => {
      const testeLinha = linha + palavra + ' '
      const metricas = ctx.measureText(testeLinha)
      if (metricas.width > canvas.width - 100) {
        ctx.fillText(linha, canvas.width / 2, y)
        linha = palavra + ' '
        y += 60
      } else {
        linha = testeLinha
      }
    })
    ctx.fillText(linha, canvas.width / 2, y)

    // Versículo
    if (versiculo) {
      ctx.font = 'italic 35px Arial'
      ctx.fillText(`📖 ${versiculo}`, canvas.width / 2, y + 150)
    }

    // Logo/Marca
    ctx.font = 'bold 30px Arial'
    ctx.fillText('Adventista Play', canvas.width / 2, canvas.height - 100)

    // Download
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'oracao-adventista-play.png'
      a.click()
      URL.revokeObjectURL(url)
      alert('Imagem baixada! Compartilhe em suas redes sociais.')
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <motion.div
                className="flex justify-center mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="h-16 w-16 text-primary" />
              </motion.div>
              <CardTitle className="text-3xl font-bold">Compartilhar Oração</CardTitle>
              <CardDescription className="text-lg">
                Compartilhe seu pedido de oração com sua comunidade
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Campo de Oração */}
              <div className="space-y-2">
                <Label htmlFor="oracao" className="text-lg font-semibold flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Seu Pedido de Oração</span>
                </Label>
                <Textarea
                  id="oracao"
                  placeholder="Digite seu pedido de oração aqui..."
                  value={oracao}
                  onChange={(e) => setOracao(e.target.value)}
                  className="min-h-[150px] text-lg"
                />
              </div>

              {/* Campo de Versículo */}
              <div className="space-y-2">
                <Label htmlFor="versiculo" className="text-lg font-semibold">
                  Versículo (opcional)
                </Label>
                <Textarea
                  id="versiculo"
                  placeholder="Ex: João 3:16 - Porque Deus amou o mundo..."
                  value={versiculo}
                  onChange={(e) => setVersiculo(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              {/* Botões de Compartilhamento */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>Compartilhar em:</span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button
                    onClick={compartilharWhatsApp}
                    disabled={!oracao}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </Button>

                  <Button
                    onClick={compartilharInstagram}
                    disabled={!oracao}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Instagram className="h-5 w-5 mr-2" />
                    Instagram
                  </Button>

                  <Button
                    onClick={compartilharFacebook}
                    disabled={!oracao}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Facebook className="h-5 w-5 mr-2" />
                    Facebook
                  </Button>

                  <Button
                    onClick={compartilharTwitter}
                    disabled={!oracao}
                    className="bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    <Twitter className="h-5 w-5 mr-2" />
                    Twitter
                  </Button>

                  <Button
                    onClick={copiarTexto}
                    disabled={!oracao}
                    variant="outline"
                  >
                    <Copy className="h-5 w-5 mr-2" />
                    Copiar
                  </Button>

                  <Button
                    onClick={gerarImagem}
                    disabled={!oracao}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Baixar Imagem
                  </Button>
                </div>
              </div>

              {/* Preview */}
              {oracao && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20"
                >
                  <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>Preview:</span>
                  </h4>
                  <div className="space-y-4">
                    <p className="text-lg whitespace-pre-wrap">🙏 <strong>Pedido de Oração</strong></p>
                    <p className="text-base whitespace-pre-wrap">{oracao}</p>
                    {versiculo && (
                      <p className="text-sm italic text-muted-foreground whitespace-pre-wrap">
                        📖 {versiculo}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

