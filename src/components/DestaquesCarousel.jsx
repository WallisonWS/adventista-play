import React from 'react'
import { motion } from 'framer-motion'
import { useEmblaCarousel } from 'embla-carousel-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, Play, BookOpen, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'

// Dados mockados para o carrossel
const destaques = [
  {
    id: 1,
    titulo: 'Novo Estudo Bíblico',
    descricao: 'As Profecias de Daniel: Desvendando o Futuro',
    icone: <BookOpen className="h-6 w-6 text-white" />,
    cor: 'bg-blue-500',
    link: '/estudos/daniel'
  },
  {
    id: 2,
    titulo: 'Série Feliz7 Play',
    descricao: 'A Última Esperança: Episódio Final',
    icone: <Play className="h-6 w-6 text-white" />,
    cor: 'bg-red-600',
    link: '/feliz7play/ultima-esperanca'
  },
  {
    id: 3,
    titulo: 'Notícias Adventistas',
    descricao: 'IASD Lança Campanha Global de Saúde Mental',
    icone: <Newspaper className="h-6 w-6 text-white" />,
    cor: 'bg-green-500',
    link: '/noticias-desbravadores'
  },
  {
    id: 4,
    titulo: 'Plano de Oração',
    descricao: '10 Dias de Oração e Consagração',
    icone: <BookOpen className="h-6 w-6 text-white" />,
    cor: 'bg-purple-500',
    link: '/planos/10-dias-oracao'
  },
]

export function DestaquesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {destaques.map((destaque) => (
            <div className="flex-none min-w-0 w-full md:w-1/2 lg:w-1/3 px-2" key={destaque.id}>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                className="h-full"
              >
                <Link to={destaque.link}>
                  <Card className="h-full border-2 border-transparent hover:border-primary transition-all duration-300">
                    <CardHeader className="flex-row items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full ${destaque.cor} flex items-center justify-center flex-shrink-0`}>
                        {destaque.icone}
                      </div>
                      <CardTitle className="text-lg flex-1">{destaque.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{destaque.descricao}</p>
                      <Button variant="link" className="p-0 mt-2">
                        Ver Detalhes <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Navegação */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 hidden md:flex"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 hidden md:flex"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
