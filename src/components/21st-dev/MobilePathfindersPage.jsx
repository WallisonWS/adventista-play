import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Trophy, 
  Award, 
  Target, 
  Book, 
  Compass, 
  Shield, 
  Flame,
  ChevronRight,
  CheckCircle,
  Lock
} from 'lucide-react';
import EnhancedDock from './EnhancedDock';

/**
 * Página de Desbravadores Mobile com especialidades e conquistas
 */
export default function MobilePathfindersPage() {
  const [selectedTab, setSelectedTab] = useState('classes');

  // Classes de Desbravadores
  const classes = [
    {
      name: 'Amigo',
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      requirements: 8,
      completed: 8,
      unlocked: true
    },
    {
      name: 'Companheiro',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      requirements: 10,
      completed: 6,
      unlocked: true
    },
    {
      name: 'Pesquisador',
      icon: Compass,
      color: 'from-purple-500 to-purple-600',
      requirements: 12,
      completed: 3,
      unlocked: true
    },
    {
      name: 'Pioneiro',
      icon: Flame,
      color: 'from-orange-500 to-orange-600',
      requirements: 14,
      completed: 0,
      unlocked: false
    },
    {
      name: 'Excursionista',
      icon: Target,
      color: 'from-red-500 to-red-600',
      requirements: 16,
      completed: 0,
      unlocked: false
    },
    {
      name: 'Guia',
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      requirements: 18,
      completed: 0,
      unlocked: false
    }
  ];

  // Especialidades
  const specialties = [
    {
      id: 1,
      name: 'Primeiros Socorros',
      category: 'Saúde e Ciência',
      icon: '🏥',
      difficulty: 'Básico',
      progress: 100,
      completed: true
    },
    {
      id: 2,
      name: 'Acampamento',
      category: 'Atividades Recreativas',
      icon: '⛺',
      difficulty: 'Intermediário',
      progress: 75,
      completed: false
    },
    {
      id: 3,
      name: 'Nós e Amarras',
      category: 'Habilidades',
      icon: '🪢',
      difficulty: 'Básico',
      progress: 60,
      completed: false
    },
    {
      id: 4,
      name: 'Astronomia',
      category: 'Ciências e Saúde',
      icon: '🔭',
      difficulty: 'Avançado',
      progress: 30,
      completed: false
    },
    {
      id: 5,
      name: 'Natação',
      category: 'Atividades Recreativas',
      icon: '🏊',
      difficulty: 'Intermediário',
      progress: 0,
      completed: false
    },
    {
      id: 6,
      name: 'Arte Culinária',
      category: 'Artes Domésticas',
      icon: '👨‍🍳',
      difficulty: 'Básico',
      progress: 0,
      completed: false
    }
  ];

  // Conquistas
  const achievements = [
    {
      name: 'Primeira Especialidade',
      description: 'Complete sua primeira especialidade',
      icon: '🎯',
      unlocked: true,
      date: '15/11/2025'
    },
    {
      name: 'Acampador',
      description: 'Participe de 3 acampamentos',
      icon: '⛺',
      unlocked: true,
      date: '20/10/2025'
    },
    {
      name: 'Estudioso',
      description: 'Complete 5 especialidades',
      icon: '📚',
      unlocked: false,
      progress: 60
    },
    {
      name: 'Mestre Desbravador',
      description: 'Complete todas as classes',
      icon: '👑',
      unlocked: false,
      progress: 30
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Básico':
        return 'bg-green-100 text-green-700';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-700';
      case 'Avançado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-md">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Desbravadores
                </h1>
                <p className="text-xs text-gray-500">Seu progresso e conquistas</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">17</p>
              <p className="text-xs text-gray-500">Especialidades</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {[
              { id: 'classes', label: 'Classes', icon: Shield },
              { id: 'specialties', label: 'Especialidades', icon: Trophy },
              { id: 'achievements', label: 'Conquistas', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        {selectedTab === 'classes' && (
          /* Classes */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Complete os requisitos de cada classe para avançar
            </p>

            {classes.map((cls, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg ${
                  !cls.unlocked ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-white flex-shrink-0 relative`}>
                    <cls.icon size={28} />
                    {!cls.unlocked && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <Lock size={20} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold">{cls.name}</h3>
                      {cls.completed === cls.requirements && (
                        <CheckCircle size={24} className="text-green-500" fill="currentColor" />
                      )}
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          {cls.completed} de {cls.requirements} requisitos
                        </span>
                        <span className="font-semibold text-blue-600">
                          {Math.round((cls.completed / cls.requirements) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${cls.color} transition-all duration-500`}
                          style={{ width: `${(cls.completed / cls.requirements) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      disabled={!cls.unlocked}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                        cls.unlocked
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Ver Requisitos
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {selectedTab === 'specialties' && (
          /* Especialidades */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {specialties.filter(s => s.completed).length} de {specialties.length} especialidades completadas
            </p>

            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl flex-shrink-0">
                    {specialty.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{specialty.name}</h3>
                        <p className="text-sm text-gray-500">{specialty.category}</p>
                      </div>
                      {specialty.completed && (
                        <CheckCircle size={24} className="text-green-500" fill="currentColor" />
                      )}
                    </div>

                    {/* Difficulty Badge */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getDifficultyColor(specialty.difficulty)}`}>
                      {specialty.difficulty}
                    </span>

                    {/* Progress */}
                    {!specialty.completed && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                          <span className="font-semibold text-indigo-600">{specialty.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${specialty.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Button */}
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all">
                      {specialty.completed ? 'Ver Certificado' : 'Continuar'}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {selectedTab === 'achievements' && (
          /* Conquistas */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {achievements.filter(a => a.unlocked).length} de {achievements.length} conquistas desbloqueadas
            </p>

            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg ${
                  !achievement.unlocked ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-500 to-amber-500'
                      : 'bg-gray-300 dark:bg-gray-700'
                  } flex items-center justify-center text-3xl flex-shrink-0 relative`}>
                    {achievement.icon}
                    {!achievement.unlocked && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <Lock size={20} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {achievement.description}
                    </p>

                    {achievement.unlocked ? (
                      <p className="text-xs text-green-600 font-semibold">
                        ✓ Desbloqueado em {achievement.date}
                      </p>
                    ) : (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                          <span className="font-semibold text-yellow-600">{achievement.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-500"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Enhanced Dock */}
      <EnhancedDock variant="pathfinders" />
    </div>
  );
}
