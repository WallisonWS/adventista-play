import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Heart, Share2, Calendar,
    Volume2, Sun, Moon, Sparkles, ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDevocionalDoDia, devocionais } from '../data/devocionais';
import { TextToSpeech } from './TextToSpeech';
import AuroraBackground from './21st-dev/AuroraBackground';
import { Card3D, Button3D } from './3DAnimations';
import { useDarkMode } from '../contexts/DarkModeContext';

export function EnhancedDevocionalPage() {
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();
    const [devocionalDoDia, setDevocionalDoDia] = useState(null);
    const [selectedDevocional, setSelectedDevocional] = useState(null);

    useEffect(() => {
        // Carregar devocional do dia
        setDevocionalDoDia(getDevocionalDoDia());
    }, []);

    const handleSelectDevocional = (dev) => {
        setSelectedDevocional(dev);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentDevotional = selectedDevocional || devocionalDoDia;

    if (!currentDevotional) return null;

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f1115] text-white' : 'bg-slate-50 text-slate-900'}`}>

            {/* Hero Section / Main Devotional */}
            <div className="relative pt-24 pb-12 px-4 overflow-hidden">
                <AuroraBackground absolute={true} className="opacity-30 pointer-events-none" />

                <div className="relative z-10 container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 font-medium backdrop-blur-sm">
                            <Calendar size={16} />
                            {currentDevotional.data}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">
                            {currentDevotional.titulo}
                        </h1>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <Button3D
                                onClick={() => {/* Share logic */ }}
                                color="#3b82f6"
                                className="px-6"
                            >
                                <Share2 size={18} className="mr-2" /> Compartilhar
                            </Button3D>
                        </div>
                    </motion.div>

                    {/* Main Content Card */}
                    <Card3D className="bg-card/80 backdrop-blur-md border-border/50 p-6 md:p-10">
                        <div className="mb-8 p-6 rounded-2xl bg-accent/10 border-l-4 border-primary">
                            <p className="text-xl md:text-2xl font-serif italic leading-relaxed opacity-90">
                                "{currentDevotional.texto}"
                            </p>
                            <p className="mt-4 font-bold text-primary flex items-center justify-end gap-2">
                                <BookOpen size={16} /> {currentDevotional.versiculo}
                            </p>
                        </div>

                        {/* Audio Player */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2 font-semibold text-sm uppercase tracking-wider opacity-70">
                                <Volume2 size={16} /> Ouvir Reflexão
                            </div>
                            <TextToSpeech text={`${currentDevotional.titulo}. ${currentDevotional.texto}. Reflexão: ${currentDevotional.reflexao}`} />
                        </div>

                        {/* Reflection Text */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                                <Sparkles size={20} className="text-yellow-500" /> Reflexão
                            </h3>
                            <p className="text-lg leading-relaxed opacity-90 whitespace-pre-line">
                                {currentDevotional.reflexao}
                            </p>

                            <div className="mt-8 pt-6 border-t border-border">
                                <h4 className="font-bold text-lg mb-2">Aplicação Prática</h4>
                                <p className="italic opacity-80">{currentDevotional.aplicacao}</p>
                            </div>
                        </div>
                    </Card3D>
                </div>
            </div>

            {/* More Devotionals List */}
            <div className="container mx-auto px-4 pb-24 max-w-5xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Calendar size={24} /> Outras Leituras
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {devocionais
                        .filter(d => d.id !== currentDevotional.id)
                        .slice(0, 6) // Show only 6 recents
                        .map((dev, index) => (
                            <motion.div
                                key={dev.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card3D
                                    className="h-full cursor-pointer hover:border-primary/50"
                                    onClick={() => handleSelectDevocional(dev)}
                                >
                                    <div className="p-6">
                                        <span className="text-xs font-semibold text-primary mb-2 block">
                                            {dev.data}
                                        </span>
                                        <h3 className="text-lg font-bold mb-2 line-clamp-1">{dev.titulo}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {dev.reflexao}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-accent-foreground/70">
                                            <span className="px-2 py-1 rounded-full bg-accent">
                                                {dev.categoria}
                                            </span>
                                        </div>
                                    </div>
                                </Card3D>
                            </motion.div>
                        ))}
                </div>
            </div>
        </div>
    );
}
