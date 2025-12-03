import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Search, ChevronRight, Star, Clock, CheckCircle } from 'lucide-react';
import EnhancedDock from './EnhancedDock';

/**
 * Página de Estudos e Cursos Mobile com design moderno
 */
export default function MobileStudiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dados de exemplo de categorias e cursos
  const categories = [
    { id: 'all', name: 'Todos', icon: BookOpen },
    { id: 'bible', name: 'Bíblia', icon: BookOpen },
    { id: 'theology', name: 'Teologia', icon: GraduationCap },
    { id: 'history', name: 'História', icon: Clock },
    { id: 'health', name: 'Saúde', icon: CheckCircle },
  ];

  const courses = [
    {
      id: 1,
      title: 'O Grande Conflito',
      category: 'history',
      duration: '12 lições',
      level: 'Avançado',
      progress: 75,
      image: '/assets/grande-conflito-D41WeEgJ.jpg',
      link: '/estudos/historia/1'
    },
    {
      id: 2,
      title: 'Profecias de Daniel',
      category: 'bible',
      duration: '10 lições',
      level: 'Intermediário',
      progress: 100,
      image: '/assets/daniel-profecias.jpg',
      link: '/estudos/biblia/2'
    },
    {
      id: 3,
      title: 'Doutrinas Fundamentais',
      category: 'theology',
      duration: '15 lições',
      level: 'Básico',
      progress: 30,
      image: '/assets/doutrinas-fundamentais.jpg',
      link: '/estudos/teologia/3'
    },
    {
      id: 4,
      title: 'O Caminho a Cristo',
      category: 'theology',
      duration: '8 lições',
      level: 'Básico',
      progress: 0,
      image: '/assets/caminho-cristo-RDsxhN9R.jpg',
      link: '/estudos/teologia/4'
    },
    {
      id: 5,
      title: 'Princípios de Saúde',
      category: 'health',
      duration: '6 lições',
      level: 'Básico',
      progress: 0,
      image: '/assets/principios-saude.jpg',
      link: '/estudos/saude/5'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level) => {
    switch (level) {
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-md">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Estudos e Cursos
                </h1>
                <p className="text-xs text-gray-500">Crescimento Espiritual</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-600">{courses.length}</p>
              <p className="text-xs text-gray-500">Cursos</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar curso ou tema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <category.icon size={18} />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 max-w-2xl mx-auto"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
          </p>

          {filteredCourses.map((course, index) => (
            <motion.a
              key={course.id}
              href={course.link}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 p-4">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-lg font-bold truncate">{course.title}</h3>
                    <Star size={18} className="text-yellow-500 flex-shrink-0" fill="currentColor" />
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                      <span className="font-semibold text-orange-600">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <div className="flex justify-end">
                    <span className="flex items-center gap-1 text-orange-600 font-medium text-sm">
                      {course.progress === 100 ? 'Concluído' : 'Continuar'}
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Dock */}
      <EnhancedDock variant="studies" />
    </div>
  );
}
