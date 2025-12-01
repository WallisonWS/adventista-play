import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, BookOpen, Share2, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import EnhancedDock from './EnhancedDock';

/**
 * Página de Devocional Mobile com design moderno
 */
export default function MobileDevotionalPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [devotional, setDevotional] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento do devocional
    setTimeout(() => {
      setDevotional({
        title: "Confiança em Deus",
        verse: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.",
        reference: "Provérbios 3:5",
        content: `A confiança em Deus é fundamental para a vida cristã. Quando confiamos plenamente no Senhor, reconhecemos que Sua sabedoria é infinitamente superior à nossa.

Muitas vezes, enfrentamos situações que parecem impossíveis de resolver. É nesses momentos que precisamos lembrar que Deus tem um plano perfeito para nossas vidas.

A confiança não significa ausência de dúvidas, mas a escolha consciente de depositar nossa fé em Deus, mesmo quando não compreendemos completamente Seus caminhos.

Hoje, reflita sobre as áreas da sua vida onde você precisa confiar mais em Deus. Entregue suas preocupações a Ele e descanse em Sua providência.`,
        prayer: "Senhor, ajuda-me a confiar plenamente em Ti. Que eu possa descansar em Tua sabedoria e amor, sabendo que Tu cuidas de mim. Em nome de Jesus, amém.",
        author: "Ellen G. White",
        date: new Date().toLocaleDateString('pt-BR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      });
      setLoading(false);
    }, 1000);
  }, [currentDate]);

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    setLoading(true);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    setLoading(true);
  };

  const handleShare = () => {
    if (navigator.share && devotional) {
      navigator.share({
        title: devotional.title,
        text: `${devotional.verse} - ${devotional.reference}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-md">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Devocional Diário
                </h1>
                <p className="text-xs text-gray-500">Meditação e Reflexão</p>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Carregando devocional...</p>
          </div>
        ) : devotional ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {/* Date */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Calendar size={20} className="text-pink-600" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                {devotional.date}
              </p>
            </div>

            {/* Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 mb-6">
              {/* Title */}
              <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                {devotional.title}
              </h2>

              {/* Verse */}
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-6 mb-6">
                <BookOpen size={24} className="text-pink-600 mb-3" />
                <p className="text-lg italic mb-2 text-gray-800 dark:text-gray-200">
                  "{devotional.verse}"
                </p>
                <p className="text-sm font-semibold text-pink-600">
                  {devotional.reference}
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                {devotional.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Prayer */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 mb-4">
                <p className="text-sm font-semibold text-purple-600 mb-2">Oração</p>
                <p className="italic text-gray-800 dark:text-gray-200">
                  {devotional.prayer}
                </p>
              </div>

              {/* Author */}
              <p className="text-sm text-gray-500 text-center">
                — {devotional.author}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors">
                  <Heart size={20} />
                  <span className="font-medium">Favoritar</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                  <Bookmark size={20} />
                  <span className="font-medium">Salvar</span>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousDay}
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <ChevronLeft size={20} />
                <span className="font-medium">Anterior</span>
              </button>

              <button
                onClick={handleNextDay}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <span className="font-medium">Próximo</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </div>

      {/* Enhanced Dock */}
      <EnhancedDock variant="devotional" />
    </div>
  );
}
