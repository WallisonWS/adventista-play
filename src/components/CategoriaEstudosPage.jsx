import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, Users, Clock, Star, BookOpen } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { Button } from './ui/button'
import { estudosCompletos } from '../data/estudos-completos'

export function CategoriaEstudosPage() {
  const { categoria } = useParams()
  const navigate = useNavigate()
  
  // Mapear categoria da URL para chave do objeto estudosCompletos
  const categoriaMap = {
    'biblicos': 'escolaSabatina',
    'financas': 'financas',
    'relacionamentos': 'relacionamentos',
    'familia': 'familia',
    'vida-crista': 'vidaCrista'
  }
  
  // Buscar cursos da categoria
  const chaveCat = categoriaMap[categoria] || 'escolaSabatina'
  const cursos = estudosCompletos[chaveCat] || []
  
  // Títulos das categorias
  const titulosCategoria = {
    'biblicos': 'Estudos Bíblicos',
    'financas': 'Finanças',
    'relacionamentos': 'Relacionamentos',
    'familia': 'Família',
    'vida-crista': 'Vida Cristã'
  }
  
  const titulo = titulosCategoria[categoria] || 'Estudos'
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/estudos')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {titulo}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {cursos.length} cursos disponíveis
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de Cursos */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {cursos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">
                Nenhum curso disponível nesta categoria ainda.
              </p>
            </CardContent>
          </Card>
        ) : (
          cursos.map((curso, index) => (
            <motion.div
              key={curso.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/estudos/${categoria}/${curso.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {curso.titulo}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {curso.descricao}
                      </CardDescription>
                      {curso.trimestre && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                          {curso.trimestre}
                        </p>
                      )}
                    </div>
                    <Button size="icon" variant="ghost" className="flex-shrink-0">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{curso.licoes?.length || 0} lições</span>
                    </div>
                    {curso.categoria && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{curso.categoria}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

