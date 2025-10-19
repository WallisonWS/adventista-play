import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  MessageSquare, 
  Star, 
  Send,
  ThumbsUp,
  Bug,
  Lightbulb,
  Heart
} from 'lucide-react'

export function FeedbackPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    tipo: 'sugestao',
    avaliacao: 5,
    mensagem: ''
  })
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Salvar feedback no localStorage
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    feedbacks.push({
      ...formData,
      data: new Date().toISOString(),
      id: Date.now()
    })
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks))
    
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      setFormData({
        nome: '',
        email: '',
        tipo: 'sugestao',
        avaliacao: 5,
        mensagem: ''
      })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block p-4 bg-primary/10 rounded-full mb-4"
            >
              <MessageSquare className="h-12 w-12 text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">Feedback</h1>
            <p className="text-muted-foreground">
              Sua opinião é muito importante para nós! Ajude-nos a melhorar o Adventista Play.
            </p>
          </div>

          {/* Formulário */}
          <Card>
            <CardHeader>
              <CardTitle>Envie seu Feedback</CardTitle>
              <CardDescription>
                Compartilhe suas sugestões, reporte bugs ou nos diga o que você achou
              </CardDescription>
            </CardHeader>
            <CardContent>
              {enviado ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-block p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                    <ThumbsUp className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Obrigado!</h3>
                  <p className="text-muted-foreground">
                    Seu feedback foi enviado com sucesso. Agradecemos sua contribuição!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome */}
                  <div>
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  {/* Tipo de Feedback */}
                  <div>
                    <Label htmlFor="tipo">Tipo de Feedback</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {[
                        { value: 'sugestao', label: 'Sugestão', icon: Lightbulb, color: 'bg-yellow-500' },
                        { value: 'bug', label: 'Bug/Erro', icon: Bug, color: 'bg-red-500' },
                        { value: 'elogio', label: 'Elogio', icon: Heart, color: 'bg-pink-500' }
                      ].map(tipo => (
                        <button
                          key={tipo.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, tipo: tipo.value })}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.tipo === tipo.value
                              ? 'border-primary bg-primary/10 scale-105'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <tipo.icon className={`h-6 w-6 mx-auto mb-2 ${
                            formData.tipo === tipo.value ? 'text-primary' : 'text-gray-400'
                          }`} />
                          <div className="text-sm font-semibold">{tipo.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Avaliação */}
                  <div>
                    <Label>Avaliação Geral</Label>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, avaliacao: star })}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= formData.avaliacao
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground self-center">
                        {formData.avaliacao} de 5 estrelas
                      </span>
                    </div>
                  </div>

                  {/* Mensagem */}
                  <div>
                    <Label htmlFor="mensagem">Mensagem</Label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Conte-nos mais sobre sua experiência, sugestão ou problema..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Botão Enviar */}
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-5 w-5 mr-2" />
                    Enviar Feedback
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Estatísticas de Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {JSON.parse(localStorage.getItem('feedbacks') || '[]').length}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Feedbacks Recebidos
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avaliação Média
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">
                    Feito com Amor
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

