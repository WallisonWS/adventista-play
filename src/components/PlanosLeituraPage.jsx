import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { BookOpen, Calendar, Clock, ChevronRight, X, Check } from 'lucide-react'
import Timeline from './21st-dev/Timeline'

export function PlanosLeituraPage({ planos }) {
  const [selectedPlano, setSelectedPlano] = useState(null)
  const [diasConcluidos, setDiasConcluidos] = useState([])

  const toggleDia = (dia) => {
    if (diasConcluidos.includes(dia)) {
      setDiasConcluidos(diasConcluidos.filter(d => d !== dia))
    } else {
      setDiasConcluidos([...diasConcluidos, dia])
    }
  }

  if (selectedPlano) {
    const progresso = (diasConcluidos.length / selectedPlano.licoes.length) * 100

    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedPlano(null)}>
              <X className="mr-2 h-4 w-4" />
              Voltar aos Planos
            </Button>
            <Badge variant="secondary">
              {diasConcluidos.length} / {selectedPlano.licoes.length} dias
            </Badge>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-3xl">{selectedPlano.titulo}</CardTitle>
              <CardDescription>{selectedPlano.descricao}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge><Calendar className="h-3 w-3 mr-1" />{selectedPlano.duracao}</Badge>
                <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{selectedPlano.tempoMedioDiario}</Badge>
                <Badge variant="secondary">{selectedPlano.nivel}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progresso</span>
                  <span>{progresso.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <motion.div
                    className="bg-primary h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progresso}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {selectedPlano.licoes.map((licao) => (
              <motion.div
                key={licao.dia}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: licao.dia * 0.01 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    diasConcluidos.includes(licao.dia) 
                      ? 'bg-primary/10 border-primary' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleDia(licao.dia)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Dia {licao.dia}</Badge>
                          {diasConcluidos.includes(licao.dia) && (
                            <Badge className="bg-green-500">
                              <Check className="h-3 w-3 mr-1" />
                              Concluído
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{licao.leitura}</h3>
                        <p className="text-sm text-muted-foreground">{licao.reflexao}</p>
                      </div>
                      <div className="ml-4">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {diasConcluidos.includes(licao.dia) ? (
                            <Check className="h-6 w-6 text-green-500" />
                          ) : (
                            <div className="h-6 w-6 border-2 border-muted rounded-full" />
                          )}
                        </motion.div>
                      </div>
                    </div>
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
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            Planos de Leitura Bíblica
          </h1>
          <p className="text-muted-foreground">Escolha um plano e comece sua jornada pela Palavra de Deus</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planos.map((plano, index) => (
            <motion.div
              key={plano.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer" onClick={() => setSelectedPlano(plano)}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{plano.categoria}</Badge>
                    <Badge variant="outline">{plano.nivel}</Badge>
                  </div>
                  <CardTitle>{plano.titulo}</CardTitle>
                  <CardDescription>{plano.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {plano.duracao}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {plano.tempoMedioDiario} por dia
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {plano.licoes.length} dias de leitura
                    </div>
                  </div>
                  <Button className="w-full">
                    Começar Plano
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline de Progresso */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Seu Progresso Anual</h2>
          <Timeline />
        </div>
      </div>
    </div>
  )
}

