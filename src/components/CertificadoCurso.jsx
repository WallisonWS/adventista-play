import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { 
  Award,
  Download,
  Share2,
  Sparkles,
  Trophy,
  Star,
  CheckCircle2
} from 'lucide-react'
import logoCertificado from '../assets/logo-certificado.png'

export function CertificadoCurso({ curso, onClose }) {
  const [nomeAluno, setNomeAluno] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataConclusao, setDataConclusao] = useState(new Date().toISOString().split('T')[0])

  const gerarCertificado = () => {
    if (!nomeAluno.trim()) {
      alert('Por favor, preencha seu nome!')
      return
    }

    const canvas = document.createElement('canvas')
    canvas.width = 1600
    canvas.height = 1200
    const ctx = canvas.getContext('2d')

    // Fundo com gradiente
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#2E3192')
    gradient.addColorStop(0.5, '#4A5FA5')
    gradient.addColorStop(1, '#7CB342')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Borda decorativa
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 30
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120)

    // Borda interna
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 5
    ctx.strokeRect(90, 90, canvas.width - 180, canvas.height - 180)

    // Logo no topo
    const logoImg = new Image()
    logoImg.src = logoCertificado
    logoImg.onload = () => {
      ctx.drawImage(logoImg, canvas.width / 2 - 80, 120, 160, 160)
      finalizarCertificado()
    }
    
    const finalizarCertificado = () => {

    // Título
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 80px Georgia'
    ctx.textAlign = 'center'
    ctx.fillText('CERTIFICADO', canvas.width / 2, 350)

    // Subtítulo
    ctx.font = '40px Georgia'
    ctx.fillText('de Conclusão de Curso', canvas.width / 2, 410)

    // Linha decorativa
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(400, 450)
    ctx.lineTo(1200, 450)
    ctx.stroke()

    // Texto "Certificamos que"
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '35px Georgia'
    ctx.fillText('Certificamos que', canvas.width / 2, 530)

    // Nome do aluno
    ctx.fillStyle = '#FFD700'
    ctx.font = 'bold 60px Georgia'
    ctx.fillText(nomeAluno.toUpperCase(), canvas.width / 2, 620)

    // Linha sob o nome
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 2
    ctx.beginPath()
    const nomeWidth = ctx.measureText(nomeAluno.toUpperCase()).width
    ctx.moveTo((canvas.width - nomeWidth) / 2, 640)
    ctx.lineTo((canvas.width + nomeWidth) / 2, 640)
    ctx.stroke()

    // Texto de conclusão
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '32px Georgia'
    ctx.fillText('completou com êxito o curso', canvas.width / 2, 710)

    // Nome do curso
    ctx.fillStyle = '#FFD700'
    ctx.font = 'bold 45px Georgia'
    const cursoNome = curso?.titulo || 'Curso Adventista'
    ctx.fillText(cursoNome, canvas.width / 2, 780)

    // Informações adicionais
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '28px Georgia'
    if (curso) {
      ctx.fillText(`Carga Horária: ${curso.duracao} | ${curso.aulas} aulas`, canvas.width / 2, 850)
      ctx.fillText(`Instrutor: ${curso.instrutor}`, canvas.width / 2, 890)
    }

    // Data
    ctx.font = '30px Georgia'
    const dataFormatada = new Date(dataConclusao).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    ctx.fillText(dataFormatada, canvas.width / 2, 980)

    // Assinatura (linha)
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 200, 1080)
    ctx.lineTo(canvas.width / 2 + 200, 1080)
    ctx.stroke()

    // Texto da assinatura
    ctx.font = '24px Georgia'
    ctx.fillText('Adventista Play - Educação Cristã', canvas.width / 2, 1110)

    // Marca d'água
    ctx.globalAlpha = 0.1
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 100px Arial'
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(-Math.PI / 6)
    ctx.fillText('ADVENTISTA PLAY', -400, 0)
    ctx.restore()
    ctx.globalAlpha = 1.0

      // Download
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `certificado-${cursoNome.toLowerCase().replace(/\s+/g, '-')}.png`
        a.click()
        URL.revokeObjectURL(url)
        alert('Certificado gerado com sucesso!')
      })
    }
  }

  const compartilharCertificado = () => {
    const texto = `🎓 Acabei de concluir o curso "${curso?.titulo || 'Curso Adventista'}" no Adventista Play!\n\n✨ ${curso?.descricao || ''}\n\n#AdventistasPlay #EducaçãoCristã #Certificado`
    
    if (navigator.share) {
      navigator.share({
        title: 'Certificado de Conclusão',
        text: texto
      }).catch(err => console.log('Erro ao compartilhar:', err))
    } else {
      navigator.clipboard.writeText(texto)
      alert('Texto copiado! Cole nas suas redes sociais.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-2xl">
            <CardHeader className="text-center bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
              <motion.div
                className="flex justify-center mb-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Trophy className="h-20 w-20" />
              </motion.div>
              <CardTitle className="text-4xl font-bold">Gerar Certificado</CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Parabéns pela conclusão do curso!
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-8 space-y-6">
              {/* Informações do Curso */}
              {curso && (
                <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary/20">
                  <div className="flex items-start space-x-4">
                    <Award className="h-12 w-12 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-2xl mb-2">{curso.titulo}</h3>
                      <p className="text-muted-foreground mb-3">{curso.descricao}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{curso.duracao}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{curso.aulas} aulas concluídas</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>Avaliação: {curso.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Formulário */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-lg font-semibold">
                    Nome Completo *
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={nomeAluno}
                    onChange={(e) => setNomeAluno(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataInicio">Data de Início (opcional)</Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataConclusao">Data de Conclusão</Label>
                    <Input
                      id="dataConclusao"
                      type="date"
                      value={dataConclusao}
                      onChange={(e) => setDataConclusao(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg border-2 border-dashed border-primary/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h4 className="font-bold text-lg">Preview do Certificado</h4>
                </div>
                <div className="text-center space-y-3 py-8">
                  <p className="text-3xl font-bold text-primary">★ CERTIFICADO ★</p>
                  <p className="text-lg">de Conclusão de Curso</p>
                  <p className="text-sm text-muted-foreground">Certificamos que</p>
                  <p className="text-2xl font-bold text-primary">
                    {nomeAluno || '[SEU NOME]'}
                  </p>
                  <p className="text-sm">completou com êxito o curso</p>
                  <p className="text-xl font-bold">{curso?.titulo || 'Curso Adventista'}</p>
                  <p className="text-xs text-muted-foreground pt-4">
                    {new Date(dataConclusao).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  onClick={gerarCertificado}
                  disabled={!nomeAluno.trim()}
                  className="flex-1 bg-primary hover:bg-primary/90 text-lg py-6"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Gerar e Baixar Certificado
                </Button>

                <Button
                  onClick={compartilharCertificado}
                  variant="outline"
                  className="flex-1 text-lg py-6"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Compartilhar
                </Button>
              </div>

              {/* Nota */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  💡 <strong>Dica:</strong> Após gerar o certificado, você pode compartilhá-lo nas redes sociais 
                  ou adicionar ao seu portfólio profissional.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

