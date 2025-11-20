import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookText, Heart, Calendar, Menu, X, Home, BookOpen, GraduationCap, Users, Music, Volume2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useReadingProgress } from '../store/useReadingProgress'

const navItems = [
  { name: 'Início', icon: Home, path: '/' },
  { name: 'Bíblia', icon: BookOpen, path: '/biblia' },
  { name: 'Estudos', icon: GraduationCap, path: '/estudos' },
  { name: 'Desbravadores', icon: Users, path: '/desbravadores' },
  { name: 'Louvores', icon: Music, path: '/hinario' },
  { name: 'Áudio Bíblia', icon: Volume2, path: '/audio-biblia' },
]

const VersiculoDoDia = () => (
  <Card className="shadow-lg border-l-4 border-primary">
    <CardHeader className="p-4 pb-2">
      <CardTitle className="text-sm font-bold text-primary">Versículo do Dia</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <p className="text-sm italic text-gray-700 dark:text-gray-300">
        "Tudo posso naquele que me fortalece."
      </p>
      <p className="text-xs font-semibold text-right mt-2 text-muted-foreground">
        Filipenses 4:13
      </p>
    </CardContent>
  </Card>
)

const ProgressoResumido = () => {
  const bibliaProgress = useReadingProgress(state => state.getProgress('biblia-ano'))
  const devocionalProgress = useReadingProgress(state => state.getProgress('devocional-diario'))

  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-bold">Seu Progresso</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {/* Bíblia em um ano */}
        <Link to="/planos">
          <div className="flex items-center space-x-3 hover:bg-muted/50 p-2 rounded-md transition-colors">
            <BookText className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Bíblia em 1 Ano</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${bibliaProgress.progressPercent}%` }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{bibliaProgress.progressPercent}% concluído</p>
            </div>
          </div>
        </Link>

        {/* Meu Devocional */}
        <Link to="/devocional">
          <div className="flex items-center space-x-3 hover:bg-muted/50 p-2 rounded-md transition-colors">
            <Heart className="h-5 w-5 text-red-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Meu Devocional</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${devocionalProgress.progressPercent}%` }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{devocionalProgress.progressPercent}% concluído</p>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

export function Sidebar() {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:block w-64 p-4 space-y-6 sticky top-0 h-screen overflow-y-auto"
    >
      {/* Logo e Título */}
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-primary">Adventista Play</h1>
      </div>

      {/* Navegação Principal */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <Button variant="ghost" className="w-full justify-start text-base font-medium hover:bg-primary/10">
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="space-y-6">
        <ProgressoResumido />
        <VersiculoDoDia />
      </div>
    </motion.div>
  )
}
