import React from 'react';
import { motion } from 'framer-motion';
import { Book, Heart, Music, GraduationCap, Globe, Volume2 } from 'lucide-react';
import AuroraBackground from './AuroraBackground';
import BentoGrid from './BentoGrid';
import Dock from './Dock';

/**
 * HomePage Mobile com componentes 21st.dev
 */
export default function MobileHomePage() {
  const resources = [
    {
      icon: Heart,
      title: 'Devocional Diário',
      description: 'Meditações e reflexões para fortalecer sua fé todos os dias',
      gradient: 'from-pink-500 to-rose-500',
      link: '/devocional'
    },
    {
      icon: Music,
      title: 'Hinário Adventista',
      description: 'Acesse todos os hinos do hinário adventista com letras completas',
      gradient: 'from-teal-500 to-cyan-500',
      link: '/hinario'
    },
    {
      icon: Book,
      title: 'Bíblia Sagrada',
      description: 'Leia e estude a Palavra de Deus com ferramentas de busca',
      gradient: 'from-blue-500 to-indigo-500',
      link: '/biblia'
    },
    {
      icon: GraduationCap,
      title: 'Estudos Bíblicos',
      description: 'Lições da Escola Sabatina e estudos temáticos aprofundados',
      gradient: 'from-orange-500 to-red-500',
      link: '/estudos'
    },
    {
      icon: Globe,
      title: 'Projetos Missionários',
      description: 'Conheça e apoie missões ao redor do mundo',
      gradient: 'from-yellow-500 to-amber-500',
      link: '/projetos'
    },
    {
      icon: Volume2,
      title: 'Áudio Bíblia',
      description: 'Ouça a Palavra de Deus narrada com qualidade profissional',
      gradient: 'from-purple-500 to-violet-500',
      link: '/audio-biblia'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section com Aurora */}
      <AuroraBackground>
        <div className="relative z-10 px-6 py-12 text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-6"
          >
            <img
              src="/logo-adventista-play-transparent.png"
              alt="Adventista Play"
              className="h-24 mx-auto"
            />
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-4"
          >
            Bem-vindo ao{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Adventista Play
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-8 max-w-md mx-auto"
          >
            Seu espaço para crescimento espiritual com devocionais, hinário, bíblia, estudos e projetos missionários
          </motion.p>

          {/* Botões */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <a
              href="/devocional"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Devocional do Dia
            </a>
            <a
              href="/estudos"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Explorar Estudos
            </a>
          </motion.div>
        </div>
      </AuroraBackground>

      {/* Recursos Principais */}
      <div className="px-6 py-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-center mb-8"
        >
          Recursos Principais
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
          {resources.map((resource, index) => (
            <motion.a
              key={index}
              href={resource.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="block"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  {/* Ícone */}
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${resource.gradient} text-white shrink-0`}>
                    <resource.icon size={24} />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{resource.title}</h3>
                    <p className="text-gray-600 text-sm">{resource.description}</p>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Versículo do Dia */}
      <div className="px-6 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl"
        >
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-medium">
              📖 VERSÍCULO DO DIA
            </span>
          </div>

          <blockquote className="text-lg text-gray-700 italic text-center mb-4">
            "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus."
          </blockquote>

          <p className="text-center text-gray-500 font-medium">Efésios 2:8</p>

          <div className="flex gap-3 justify-center mt-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Copiar
            </button>
            <button className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors">
              Compartilhar
            </button>
          </div>
        </motion.div>
      </div>

      {/* Comunidade */}
      <div className="px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-8 shadow-xl text-white text-center"
        >
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <Heart size={32} />
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3">Conecte-se com outros membros</h3>
          <p className="mb-6 opacity-90">
            Compartilhe sua jornada de fé e cresça junto com a comunidade adventista
          </p>

          <button className="px-8 py-3 bg-white text-rose-600 rounded-xl font-bold hover:bg-gray-50 transition-colors">
            Criar Conta Gratuita
          </button>
        </motion.div>
      </div>

      {/* Dock */}
      <Dock />
    </div>
  );
}
