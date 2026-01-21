import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Search, Filter, Play,
    ChevronRight, Star, Clock, GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { estudos, categoriasEstudo } from '../data/estudos';
import AuroraBackground from './21st-dev/AuroraBackground';
import { Card3D, Button3D } from './3DAnimations';
import { useDarkMode } from '../contexts/DarkModeContext';

export function EnhancedEstudosPage() {
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [filteredEstudos, setFilteredEstudos] = useState(estudos);

    // Filter logic
    useEffect(() => {
        let result = estudos;

        // Filter by Category
        if (selectedCategory !== 'Todos') {
            result = result.filter(e => e.categoria === selectedCategory || e.tipo === selectedCategory);
        }

        // Filter by Search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(e =>
                e.titulo.toLowerCase().includes(query) ||
                e.descricao?.toLowerCase().includes(query)
            );
        }

        setFilteredEstudos(result);
    }, [searchQuery, selectedCategory]);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f1115] text-white' : 'bg-slate-50 text-slate-900'}`}>

            {/* Hero Section */}
            <div className="relative pt-24 pb-12 px-4 overflow-hidden">
                <AuroraBackground absolute={true} className="opacity-30 pointer-events-none" />

                <div className="relative z-10 container mx-auto text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <span className="inline-block p-3 rounded-2xl bg-blue-500/10 mb-4 text-blue-500">
                            <GraduationCap className="w-8 h-8" />
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                            Estudos Bíblicos
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            Aprofunde seu conhecimento com guias práticos, profecias e doutrinas.
                        </p>
                    </motion.div>

                    {/* Search & Filter Bar */}
                    <motion.div
                        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="O que você quer aprender hoje?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg focus:border-blue-500 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Category Pills (Desktop) */}
                        <div className="hidden md:flex gap-2 items-center overflow-x-auto pb-2 md:pb-0">
                            <button
                                onClick={() => setSelectedCategory('Todos')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'Todos'
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                        : 'bg-card hover:bg-accent border border-border/50'
                                    }`}
                            >
                                Todos
                            </button>
                            {categoriasEstudo.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-card hover:bg-accent border border-border/50'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Category Pills (Mobile) */}
                    <div className="md:hidden flex gap-2 items-center overflow-x-auto mt-4 px-2 no-scrollbar">
                        <button
                            onClick={() => setSelectedCategory('Todos')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === 'Todos'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-card border border-border/50'
                                }`}
                        >
                            Todos
                        </button>
                        {categoriasEstudo.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-card border border-border/50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="container mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredEstudos.map((estudo, index) => (
                            <motion.div
                                key={estudo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card3D
                                    className="h-full cursor-pointer group bg-card border-border/50"
                                    onClick={() => navigate(`/estudos/detalhe/${estudo.id}`)} // Assuming this route exists or needs to be mapped
                                >
                                    <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-[inherit]">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                        <img
                                            src={estudo.capa || "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?w=600"}
                                            alt={estudo.titulo}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className="px-2 py-1 rounded-md bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                                {estudo.tipo || estudo.categoria}
                                            </span>
                                            <h3 className="text-white font-bold text-xl leading-tight">
                                                {estudo.titulo}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex flex-col h-full justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                                {estudo.descricao}
                                            </p>

                                            {estudo.licoes && (
                                                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <BookOpen size={14} />
                                                        {estudo.licoes.length} Lições
                                                    </div>
                                                    {estudo.trimestre && (
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={14} />
                                                            {estudo.trimestre}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <Button3D
                                            color="#3b82f6"
                                            className="w-full py-2 text-sm justify-center group-hover:bg-blue-700 transition-colors"
                                        >
                                            Começar Estudo <ChevronRight size={16} className="ml-1" />
                                        </Button3D>
                                    </div>
                                </Card3D>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredEstudos.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Nenhum estudo encontrado</h3>
                        <p className="text-muted-foreground">Tente buscar por outro termo ou categoria.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
                            className="mt-4 text-blue-500 hover:underline"
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
