import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Search, Play, Pause, Volume2, Heart, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import EnhancedDock from './EnhancedDock';

/**
 * Página de Hinário Mobile com player de áudio
 */
export default function MobileHymnalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHymn, setSelectedHymn] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(true);

  // Hinos de exemplo
  const hymns = [
    {
      number: 1,
      title: "Castelo Forte",
      category: "Deus - Seu Ser e Obras",
      lyrics: `Castelo forte é nosso Deus,
Espada e bom escudo;
Com Seu poder defende os Seus
Em todo o transe agudo.

Com fúria pertinaz,
Persegue Satanás,
Com artimanhas tais
E astúcias tão cruéis,
Que iguais não há na terra.

A força nossa não faz,
Sozinhos fracassamos;
Mas nosso Deus socorro traz
E somos vitoriosos.

Sabeis quem é Jesus?
O que venceu na cruz,
Senhor dos altos céus,
E, sendo o próprio Deus,
Triunfa na batalha.`,
      audioUrl: "/audio/hinos/001.mp3"
    },
    {
      number: 2,
      title: "Ao Deus de Abraão Louvai",
      category: "Deus - Seu Ser e Obras",
      lyrics: `Ao Deus de Abraão louvai,
Povos do Senhor;
Louvai Aquele que é
Digno de louvor.

Ao Deus eterno, ao grande Eu Sou,
Que era e é, e sempre há de ser,
Louvai com canto de fervor.`,
      audioUrl: "/audio/hinos/002.mp3"
    },
    {
      number: 3,
      title: "Vinde, Cristãos",
      category: "Adoração",
      lyrics: `Vinde, cristãos, vinde já,
Vinde a Jesus louvar;
Vinde, alegres, sim, vinde,
Vinde a Jesus louvar.

Glória, glória, glória,
Glória ao Rei dos reis!
Glória, glória, glória,
Glória ao Rei dos reis!`,
      audioUrl: "/audio/hinos/003.mp3"
    }
  ];

  const filteredHymns = hymns.filter(hymn =>
    hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hymn.number.toString().includes(searchQuery)
  );

  const handleHymnSelect = (hymn) => {
    setSelectedHymn(hymn);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-md">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Hinário Adventista
                </h1>
                <p className="text-xs text-gray-500">608 Hinos</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por número ou título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        {selectedHymn ? (
          /* Hymn Detail */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedHymn(null)}
              className="mb-4 text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Voltar para lista
            </button>

            {/* Hymn Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 mb-6">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white text-2xl font-bold mb-3">
                  {selectedHymn.number}
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedHymn.title}</h2>
                <p className="text-sm text-gray-500">{selectedHymn.category}</p>
              </div>

              {/* Player */}
              <div className="bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" fill="white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    )}
                  </button>
                  <div className="flex items-center gap-3">
                    <Volume2 size={20} className="text-teal-600" />
                    <div className="w-24 h-2 bg-gray-300 dark:bg-gray-600 rounded-full">
                      <div className="w-3/4 h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: isPlaying ? '100%' : '0%' }}
                      transition={{ duration: 180, ease: 'linear' }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0:00</span>
                  <span>3:00</span>
                </div>
              </div>

              {/* Lyrics Toggle */}
              <button
                onClick={() => setShowLyrics(!showLyrics)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span className="font-medium">Letra do Hino</span>
                {showLyrics ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {/* Lyrics */}
              {showLyrics && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="prose prose-lg dark:prose-invert max-w-none mb-6"
                >
                  {selectedHymn.lyrics.split('\n\n').map((stanza, index) => (
                    <p key={index} className="mb-4 leading-relaxed text-center text-gray-700 dark:text-gray-300">
                      {stanza}
                    </p>
                  ))}
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors">
                  <Heart size={20} />
                  <span className="font-medium">Favoritar</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 hover:bg-cyan-200 dark:hover:bg-cyan-900/50 transition-colors">
                  <Share2 size={20} />
                  <span className="font-medium">Compartilhar</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Hymn List */
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-gray-500 mb-4">
              {filteredHymns.length} hino{filteredHymns.length !== 1 ? 's' : ''} encontrado{filteredHymns.length !== 1 ? 's' : ''}
            </p>

            <div className="space-y-3">
              {filteredHymns.map((hymn) => (
                <motion.button
                  key={hymn.number}
                  onClick={() => handleHymnSelect(hymn)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl p-4 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {hymn.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {hymn.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">{hymn.category}</p>
                    </div>
                    <Play size={20} className="text-teal-600 flex-shrink-0" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Dock */}
      <EnhancedDock variant="hymnal" />
    </div>
  );
}
