import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Heart, Users, Calendar, TrendingUp, 
  Sparkles, ArrowRight, Play, Star, Award,
  Home, Search, Bell, User
} from 'lucide-react';

// Paleta de cores profissional 2025
const colors = {
  primary: '#006FEE',
  secondary: '#9750DD',
  success: '#17C964',
  warning: '#F5A524',
  danger: '#F31260',
  background: '#FFFFFF',
  surface: '#F4F4F5',
  text: '#11181C',
  textSecondary: '#687076',
};

const ModernMobileHomePage = () => {
  const [activeTab, setActiveTab] = useState('inicio');

  // Dados dos cards de recursos
  const features = [
    {
      icon: BookOpen,
      title: 'Bíblia Sagrada',
      description: 'Leia a Palavra de Deus',
      color: colors.primary,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Calendar,
      title: 'Devocional Diário',
      description: 'Reflexões inspiradoras',
      color: colors.secondary,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Progresso',
      description: 'Acompanhe sua jornada',
      color: colors.success,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Conecte-se com outros',
      color: colors.warning,
      gradient: 'from-orange-500 to-amber-500',
    },
  ];

  // Dados dos cards de destaque
  const highlights = [
    {
      title: 'Plano de Leitura',
      subtitle: 'Bíblia em 1 Ano',
      progress: 65,
      icon: BookOpen,
      color: colors.primary,
    },
    {
      title: 'Versículo do Dia',
      subtitle: 'João 3:16',
      icon: Heart,
      color: colors.danger,
    },
    {
      title: 'Conquistas',
      subtitle: '12 Medalhas',
      icon: Award,
      color: colors.warning,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Adventista Play</h1>
                <p className="text-xs text-gray-500">Portal Adventista</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-8"
      >
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4"
            >
              <Star className="w-4 h-4" fill="currentColor" />
              <span className="text-sm font-medium">Bem-vindo de volta!</span>
            </motion.div>

            <h2 className="text-2xl font-bold mb-2">
              Continue sua jornada espiritual
            </h2>
            <p className="text-blue-100 mb-6">
              Fortaleça sua fé com recursos digitais inspiradores
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Highlights Cards */}
      <section className="px-6 py-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Destaques</h3>
        <div className="grid grid-cols-1 gap-4">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
                {item.progress && (
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: item.color }}>
                      {item.progress}%
                    </div>
                    <div className="text-xs text-gray-500">completo</div>
                  </div>
                )}
                {!item.progress && (
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {item.progress && (
                <div className="mt-3">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recursos</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer"
            >
              <div 
                className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-3`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-xs text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Versículo do Dia */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-4 mb-24"
      >
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-purple-600" fill="currentColor" />
            <span className="text-sm font-semibold text-purple-900">Versículo do Dia</span>
          </div>
          <p className="text-gray-800 italic mb-3">
            "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, 
            para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
          </p>
          <p className="text-sm text-purple-700 font-semibold">João 3:16</p>
        </div>
      </motion.section>

      {/* Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 px-6 py-3"
      >
        <div className="flex items-center justify-around">
          {[
            { id: 'inicio', icon: Home, label: 'Início' },
            { id: 'buscar', icon: Search, label: 'Buscar' },
            { id: 'biblia', icon: BookOpen, label: 'Bíblia' },
            { id: 'perfil', icon: User, label: 'Perfil' },
          ].map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center gap-1 relative"
            >
              <div className={`p-2 rounded-2xl transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-100' 
                  : 'bg-transparent'
              }`}>
                <item.icon 
                  className={`w-6 h-6 transition-colors ${
                    activeTab === item.id 
                      ? 'text-blue-600' 
                      : 'text-gray-400'
                  }`}
                />
              </div>
              <span className={`text-xs font-medium transition-colors ${
                activeTab === item.id 
                  ? 'text-blue-600' 
                  : 'text-gray-400'
              }`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

export default ModernMobileHomePage;
