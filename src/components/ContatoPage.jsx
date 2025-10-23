import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Button } from '@/components/ui/button.jsx'
import { 
  Mail, 
  Phone, 
  Send, 
  MessageSquare,
  CheckCircle,
  LaptopMinimal
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  })
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Criar link mailto com os dados do formulário
    const subject = `Contato do Portal Adventista - ${formData.nome}`
    const body = `Nome: ${formData.nome}%0D%0AEmail: ${formData.email}%0D%0ATelefone: ${formData.telefone}%0D%0A%0D%0AMensagem:%0D%0A${formData.mensagem}`
    const mailtoLink = `mailto:wallisonpereiradev@gmail.com?subject=${subject}&body=${body}`
    
    window.location.href = mailtoLink
    setEnviado(true)
    
    // Resetar formulário após 3 segundos
    setTimeout(() => {
      setFormData({ nome: '', email: '', telefone: '', mensagem: '' })
      setEnviado(false)
    }, 3000)
  }

  const handleWhatsApp = () => {
    const mensagem = "Olá! Vim através do Portal Adventista e gostaria de entrar em contato."
    const url = `https://wa.me/5562994791745?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-4"
          >
            <MessageSquare className="h-16 w-16 text-primary mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou precisa de ajuda? Estou aqui para ajudar!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações de Contato */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {/* Card de Email */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary/10 p-3 rounded-full"
                  >
                    <Mail className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-lg">E-mail</CardTitle>
                    <CardDescription>Envie uma mensagem</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a 
                  href="mailto:wallisonpereiradev@gmail.com"
                  className="text-primary hover:underline break-all"
                >
                  wallisonpereiradev@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Card de Telefone */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary/10 p-3 rounded-full"
                  >
                    <Phone className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-lg">Telefone / WhatsApp</CardTitle>
                    <CardDescription>Ligue ou envie mensagem</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <a 
                  href="tel:+5562994791745"
                  className="text-primary hover:underline block"
                >
                  (62) 99479-1745
                </a>
                <Button 
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Abrir WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Card do Desenvolvedor */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="bg-primary/20 p-3 rounded-full"
                  >
                    <LaptopMinimal className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-lg">Desenvolvedor</CardTitle>
                    <CardDescription>Wallison Pereira</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Desenvolvedor Full Stack especializado em criar soluções web modernas e responsivas.
                </p>
              </CardContent>
            </Card>

            {/* Horário de Atendimento */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Horário de Atendimento</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span className="font-semibold">9h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="font-semibold">Fechado</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="font-semibold">10h - 16h</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Formulário de Contato */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e entrarei em contato o mais breve possível
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enviado ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: 3, duration: 0.5 }}
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">
                      Mensagem Enviada!
                    </h3>
                    <p className="text-muted-foreground">
                      Obrigado pelo contato. Responderei em breve!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="nome"
                            type="text"
                            placeholder="Seu nome"
                            className="pl-10"
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone (opcional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="telefone"
                          type="tel"
                          placeholder="(00) 00000-0000"
                          className="pl-10"
                          value={formData.telefone}
                          onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensagem">Mensagem *</Label>
                      <Textarea
                        id="mensagem"
                        placeholder="Digite sua mensagem aqui..."
                        rows={6}
                        value={formData.mensagem}
                        onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                        required
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" size="lg" className="w-full">
                        <Send className="mr-2 h-5 w-5" />
                        Enviar Mensagem
                      </Button>
                    </motion.div>

                    <p className="text-xs text-muted-foreground text-center">
                      * Campos obrigatórios
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ ou Informações Adicionais */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Quanto tempo leva para receber resposta?</h4>
                <p className="text-sm text-muted-foreground">
                  Normalmente respondo em até 24 horas durante dias úteis.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">O Portal Adventista é gratuito?</h4>
                <p className="text-sm text-muted-foreground">
                  Sim! Todos os recursos do portal são completamente gratuitos.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Posso sugerir melhorias?</h4>
                <p className="text-sm text-muted-foreground">
                  Com certeza! Sua opinião é muito importante para melhorar o portal.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Como posso contribuir?</h4>
                <p className="text-sm text-muted-foreground">
                  Entre em contato para saber como pode ajudar com conteúdo ou desenvolvimento.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

