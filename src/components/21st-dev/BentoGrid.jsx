import React from 'react';
import { motion } from 'framer-motion';
import { Book, Heart, Users, TrendingUp, Calendar, Star } from 'lucide-react';

const BentoGrid = () => {
  const features = [
    {
      title: "Bíblia Sagrada",
      description: "Leia a Palavra de Deus em qualquer lugar",
      icon: Book,
      gradient: "from-blue-500 to-cyan-500",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Devocional Diário",
      description: "Reflexões inspiradoras todos os dias",
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      span: "md:col-span-1",
    },
    {
      title: "Comunidade",
      description: "Conecte-se com outros membros",
      icon: Users,
      gradient: "from-purple-500 to-indigo-500",
      span: "md:col-span-1",
    },
    {
      title: "Progresso",
      description: "Acompanhe sua jornada espiritual",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
      span: "md:col-span-1",
    },
    {
      title: "Planos de Leitura",
      description: "Organize seus estudos bíblicos",
      icon: Calendar,
      gradient: "from-orange-500 to-amber-500",
      span: "md:col-span-1",
    },
    {
      title: "Favoritos",
      description: "Salve seus versículos preferidos",
      icon: Star,
      gradient: "from-yellow-500 to-orange-500",
      span: "md:col-span-2",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Recursos Espirituais
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Ferramentas para fortalecer sua fé
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`${feature.span} group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                <feature.icon className="w-full h-full" />
              </div>
            </div>

            {/* Border Glow Effect */}
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${feature.gradient} blur-xl -z-10`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BentoGrid;
