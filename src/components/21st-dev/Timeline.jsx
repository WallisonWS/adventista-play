import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

const Timeline = ({ items = [] }) => {
  const defaultItems = [
    {
      title: "Gênesis - Êxodo",
      description: "Início da criação e libertação do Egito",
      date: "Semana 1-4",
      completed: true,
    },
    {
      title: "Levítico - Deuteronômio",
      description: "Leis e preparação para Terra Prometida",
      date: "Semana 5-8",
      completed: true,
    },
    {
      title: "Josué - Rute",
      description: "Conquista de Canaã e histórias de fé",
      date: "Semana 9-12",
      completed: false,
      current: true,
    },
    {
      title: "1 Samuel - 2 Reis",
      description: "Reino unido e dividido de Israel",
      date: "Semana 13-20",
      completed: false,
    },
    {
      title: "Profetas e Sabedoria",
      description: "Isaías, Jeremias, Salmos, Provérbios",
      date: "Semana 21-32",
      completed: false,
    },
    {
      title: "Novo Testamento",
      description: "Evangelhos e Epístolas",
      date: "Semana 33-52",
      completed: false,
    },
  ];

  const timelineItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Plano de Leitura Anual
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe seu progresso na leitura da Bíblia
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

        {/* Timeline Items */}
        <div className="space-y-8">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start gap-6"
            >
              {/* Icon */}
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    item.completed
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                      : item.current
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 animate-pulse'
                      : 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'
                  } shadow-lg`}
                >
                  {item.completed ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : (
                    <Circle className="w-8 h-8 text-white" fill={item.current ? "white" : "none"} />
                  )}
                </motion.div>

                {/* Glow Effect */}
                {item.current && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500 blur-xl opacity-50"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className={`flex-1 p-6 rounded-2xl ${
                  item.current
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-500'
                    : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700'
                } shadow-lg`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    item.completed
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : item.current
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {item.date}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>

                {/* Progress Bar */}
                {item.current && (
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      60% concluído
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
