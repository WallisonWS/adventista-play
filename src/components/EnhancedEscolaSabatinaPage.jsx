import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Video, FileText, Download, ChevronRight, PlayCircle } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D } from './3DAnimations';
import AuroraBackground from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';
import { licaoSemana } from '../data/escola_sabatina_data';

export function EnhancedEscolaSabatinaPage() {
    const { isDarkMode } = useDarkMode();
    const [selectedDayId, setSelectedDayId] = useState('sab');
    const [fontSize, setFontSize] = useState(18);

    const selectedDay = licaoSemana.dias.find(d => d.id === selectedDayId) || licaoSemana.dias[0];

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-24">
            <AuroraBackground
                colorStops={isDarkMode ? ["#2c3e50", "#34495e", "#000000"] : ["#E2E8F0", "#CBD5E1", "#F8FAFC"]}
                speed={0.2}
            />

            <main className="relative z-10 container mx-auto px-4 py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block"
                    >
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-xs font-bold uppercase tracking-widest">
                                {licaoSemana.trimestre}
                            </span>
                        </div>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            {licaoSemana.tema}
                        </h1>
                        <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} italic max-w-2xl mx-auto`}>
                            "{licaoSemana.versoMemorizar}"
                        </p>
                    </motion.div>
                </div>

                {/* Day Selector */}
                <div className="flex justify-center mb-8 overflow-x-auto pb-4 gap-2 no-scrollbar">
                    {licaoSemana.dias.map((day) => (
                        <button
                            key={day.id}
                            onClick={() => setSelectedDayId(day.id)}
                            className={`
                        flex flex-col items-center justify-center min-w-[70px] h-[70px] rounded-2xl transition-all duration-300 border
                        ${selectedDayId === day.id
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg scale-110 z-10'
                                    : 'bg-white/10 text-gray-500 border-white/5 hover:bg-white/20'}
                    `}
                        >
                            <span className="text-xs font-bold uppercase">{day.id}</span>
                            <span className="text-lg font-bold">{day.data.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedDayId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card3D className="bg-gradient-to-br from-blue-600/5 to-indigo-600/5 border-blue-500/20 p-8 min-h-[500px]">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-white/10 pb-4 gap-4">
                                        <div>
                                            <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">{selectedDay.nome}, {selectedDay.data}</span>
                                            <h2 className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                {selectedDay.titulo}
                                            </h2>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* Font Size Controls */}
                                            <div className="flex bg-black/20 rounded-lg p-1 mr-2">
                                                <button
                                                    onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                                    title="Diminuir fonte"
                                                >
                                                    <span className="text-xs font-bold">A-</span>
                                                </button>
                                                <button
                                                    onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
                                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                                    title="Aumentar fonte"
                                                >
                                                    <span className="text-lg font-bold">A+</span>
                                                </button>
                                            </div>

                                            <Button3D className="bg-blue-600 hover:bg-blue-500 flex items-center gap-2 px-4 py-2 text-sm">
                                                <PlayCircle size={18} /> <span className="hidden sm:inline">Ouvir</span>
                                            </Button3D>
                                        </div>
                                    </div>

                                    <div
                                        className={`prose prose-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} max-w-none transition-all duration-300 font-serif`}
                                        style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                                    >
                                        {selectedDay.conteudo.map((paragrafo, idx) => (
                                            <p key={idx} className="mb-6 leading-relaxed">
                                                {paragrafo}
                                            </p>
                                        ))}

                                        <div className="mt-8 p-6 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r-xl">
                                            <h4 className="font-bold text-yellow-500 mb-2 flex items-center gap-2">
                                                <BookOpen size={18} /> Leitura Adicional
                                            </h4>
                                            <p className="italic opacity-80 font-sans text-base">{selectedDay.leituraAdicional}</p>
                                        </div>
                                    </div>
                                </Card3D>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Sidebar Resources */}
                    <div className="space-y-6">
                        <Card3D className="p-6 bg-white/5 border-white/10">
                            <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Recursos da Lição</h3>

                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-500/20 text-red-500 rounded group-hover:bg-red-500 group-hover:text-white transition-colors">
                                            <Video size={18} />
                                        </div>
                                        <div className="text-left">
                                            <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Comentário em Vídeo</p>
                                            <p className="text-xs text-gray-500">Pr. Bullón</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-500" />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/20 text-blue-500 rounded group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <FileText size={18} />
                                        </div>
                                        <div className="text-left">
                                            <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Resumo em PDF</p>
                                            <p className="text-xs text-gray-500">Auxiliar de Professor</p>
                                        </div>
                                    </div>
                                    <Download size={16} className="text-gray-500" />
                                </button>
                            </div>
                        </Card3D>

                        {/* Progress Widget */}
                        <Card3D className="p-6 bg-white/5 border-white/10">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-bold text-gray-400">Progresso Semanal</span>
                                <span className="text-2xl font-bold text-blue-500">42%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                            </div>
                        </Card3D>
                    </div>
                </div>

            </main>
        </div>
    );
}
