import { useState } from 'react'
import { Play, X } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'

export function YouTubePlayer({ videoId, titulo, onClose }) {
  if (!videoId) return null
  
  // Extrair ID do vídeo se for URL completa
  const getVideoId = (url) => {
    if (!url) return null
    
    // Se já for apenas o ID
    if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
      return url
    }
    
    // Extrair de URL do YouTube
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }
    
    return url
  }
  
  const id = getVideoId(videoId)
  
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
            <h3 className="font-semibold truncate">{titulo || 'Videoaula'}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Player */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
              title={titulo || 'Videoaula'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

// Componente de card de vídeo
export function VideoCard({ video, onClick }) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Thumbnail */}
        <div className="relative w-32 h-20 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
          {video.videoId && (
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
              alt={video.titulo}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <Play className="h-5 w-5 text-white ml-0.5" fill="white" />
            </div>
          </div>
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1 line-clamp-2">
            {video.titulo}
          </h4>
          {video.duracao && (
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {video.duracao}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

