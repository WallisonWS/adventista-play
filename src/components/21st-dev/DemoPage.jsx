import React, { useState } from 'react';
import AuroraBackground from './AuroraBackground';
import BentoGrid from './BentoGrid';
import Timeline from './Timeline';
import Dock from './Dock';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const DemoPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDockItemClick = (itemId) => {
    console.log('Dock item clicked:', itemId);
    if (itemId === 'bible') {
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Adventista Play
            </h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Componentes 21st.dev
          </p>
        </div>
      </header>

      {/* Hero Section with Aurora Background */}
      <AuroraBackground className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Fortalecendo a fé através da
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Palavra de Deus
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Conecte-se com a Bíblia Sagrada através de recursos digitais inspiradores
          </p>
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
            Começar Agora
          </button>
        </div>
      </AuroraBackground>

      {/* Bento Grid Section */}
      <section className="py-16">
        <BentoGrid />
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <Timeline />
      </section>

      {/* Bottom Dock */}
      <Dock onItemClick={handleDockItemClick} />

      {/* Spacer for Dock */}
      <div className="h-24" />
    </div>
  );
};

export default DemoPage;
