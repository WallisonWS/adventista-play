import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, BookOpen, Search, Filter, X, PlayCircle, Minimize2, Maximize2 } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D } from './3DAnimations';
import AuroraBackground from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';
import { cursos, categoriasCursos } from '../data/cursos_data';

export function EnhancedCursosPage() {
    const { isDarkMode } = useDarkMode();
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);

    const filteredCursos = cursos.filter(curso => {
        const matchesCategory = selectedCategory === "Todos" || curso.categoria === selectedCategory;
        const matchesSearch = curso.titulo.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-24">
            <AuroraBackground
                colorStops={isDarkMode ? ["#000000", "#1e1e2e", "#2a2a40"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]}
                speed={0.3}
            />

            <main className="relative z-10 container mx-auto px-4 py-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                            Cursos & Estudos
                        </h1>
                        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Aprofunde seu conhecimento bíblico e prático.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mt-6 md:mt-0 w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar curso..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-blue-500 focus:bg-black/40 outline-none transition-all text-white placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto pb-4 gap-3 mb-8 no-scrollbar">
                    {categoriasCursos.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`
                        px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all border
                        ${selectedCategory === cat
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg'
                                    : 'bg-black/20 text-gray-400 border-white/10 hover:bg-black/40'}
                    `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredCursos.map((curso) => (
                            <motion.div
                                key={curso.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setSelectedCourse(curso)}
                            >
                                <Card3D className="h-full overflow-hidden group cursor-pointer border-white/10 hover:border-blue-500/30 bg-black/20">
                                    {/* Course Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                        <img
                                            src={curso.imagem}
                                            alt={curso.titulo}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className="inline-block px-2 py-1 rounded bg-blue-600 text-white text-xs font-bold mb-2">
                                                {curso.categoria}
                                            </span>
                                            {curso.progresso > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                        <div className="h-full bg-green-500" style={{ width: `${curso.progresso}%` }} />
                                                    </div>
                                                    <span className="text-xs text-green-400 font-bold">{curso.progresso}%</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transform group-hover:scale-110 transition-transform">
                                                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                                            {curso.titulo}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Com {curso.instrutor}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
                                            <span className="flex items-center gap-1">
                                                <BookOpen size={14} /> {curso.aulas.length} Aulas
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} /> {curso.duracao}
                                            </span>
                                        </div>
                                    </div>
                                </Card3D>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredCursos.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Nenhum curso encontrado nesta categoria.</p>
                        <button onClick={() => { setSelectedCategory("Todos"); setSearchQuery(""); }} className="text-blue-500 mt-2 hover:underline">
                            Limpar filtros
                        </button>
                    </div>
                )}

            </main>

            {/* Video Player Modal */}
            <AnimatePresence>
                {selectedCourse && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-gray-900 w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row h-[80vh]"
                        >
                            {/* Left Side: Video Player */}
                            <div className="flex-1 bg-black relative flex flex-col">
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    <button
                                        onClick={() => setSelectedCourse(null)}
                                        className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors md:hidden"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex-1 flex items-center justify-center bg-black">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={selectedCourse.videoUrl}
                                        title={selectedCourse.titulo}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full aspect-video"
                                    ></iframe>
                                </div>

                                <div className="p-6 bg-gray-900 border-t border-white/10">
                                    <h2 className="text-2xl font-bold text-white mb-2">{selectedCourse.titulo}</h2>
                                    <p className="text-gray-400">Instrutor: {selectedCourse.instrutor}</p>
                                </div>
                            </div>

                            {/* Right Side: Playlist */}
                            <div className="w-full md:w-80 bg-gray-800/50 border-l border-white/10 overflow-y-auto">
                                <div className="p-4 border-b border-white/10 flex justify-between items-center sticky top-0 bg-gray-800/95 backdrop-blur z-10">
                                    <h3 className="font-bold text-white">Conteúdo do Curso</h3>
                                    <button
                                        onClick={() => setSelectedCourse(null)}
                                        className="text-gray-400 hover:text-white transition-colors hidden md:block"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="p-2">
                                    {selectedCourse.aulas.map((aula, index) => (
                                        <div
                                            key={aula.id}
                                            className={`p-3 rounded-lg mb-2 flex items-center gap-3 cursor-pointer transition-colors ${index === 0 ? 'bg-blue-600/20 border border-blue-500/30' : 'hover:bg-black/20 border border-transparent'}`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${index === 0 ? 'bg-blue-500 text-white' : 'bg-black/40 text-gray-400'}`}>
                                                {index === 0 ? <Play size={12} fill="currentColor" /> : <span className="text-xs font-bold">{index + 1}</span>}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-medium ${index === 0 ? 'text-blue-400' : 'text-gray-300'}`}>{aula.titulo}</p>
                                                <p className="text-xs text-gray-500">{aula.duracao}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
