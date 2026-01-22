import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Video, FileText, Download } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D } from './3DAnimations';
import { AuroraBackground } from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';

export function EnhancedEscolaSabatinaPage() {
    const { isDarkMode } = useDarkMode();

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-24">
            <AuroraBackground
                colorStops={isDarkMode ? ["#2c3e50", "#34495e", "#000000"] : ["#E2E8F0", "#CBD5E1", "#F8FAFC"]}
                speed={0.2}
            />

            <main className="relative z-10 container mx-auto px-4 py-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <BookOpen className="w-12 h-12 text-blue-500" />
                        </div>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            Escola Sabatina
                        </h1>
                        <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Lição desta semana: O Grande Conflito
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Daily Lesson Card */}
                    <Card3D className="lg:col-span-2 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-blue-500/30 p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Sábado, 21 de Janeiro</span>
                                <h2 className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    A Origem do Mal
                                </h2>
                            </div>
                            <Button3D className="bg-blue-600 hover:bg-blue-500">
                                Ler Lição
                            </Button3D>
                        </div>

                        <div className={`prose prose-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} max-w-none`}>
                            <p>
                                "E houve batalha no céu; Miguel e os seus anjos batalhavam contra o dragão, e batalhavam o dragão e os seus anjos." (Apocalipse 12:7)
                            </p>
                            <p>
                                O estudo desta semana foca nas origens misteriosas do pecado no coração de um ser perfeito, Lúcifer, e como esse conflito cósmico afeta nossas vidas hoje.
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Button3D className="bg-slate-700/50 hover:bg-slate-600/50 border-slate-500/30">
                                <Video className="w-4 h-4 mr-2" />
                                Assistir Comentário
                            </Button3D>
                            <Button3D className="bg-slate-700/50 hover:bg-slate-600/50 border-slate-500/30">
                                <FileText className="w-4 h-4 mr-2" />
                                Anotações
                            </Button3D>
                        </div>
                    </Card3D>

                    {/* Sidebar Resources */}
                    <div className="space-y-6">
                        {/* Progress */}
                        <Card3D className="p-6">
                            <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Seu Progresso</h3>
                            <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                            <p className="text-xs text-right text-slate-400">5 de 7 dias estudados</p>
                        </Card3D>

                        {/* Download Link */}
                        <Card3D className="p-6 cursor-pointer hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-500/20 rounded-lg text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <Download className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Baixar PDF</h4>
                                    <p className="text-xs text-slate-400">Lição completa - 1º Trimestre 2026</p>
                                </div>
                            </div>
                        </Card3D>

                        {/* Video Link */}
                        <Card3D className="p-6 cursor-pointer hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <Video className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Lição dos Adolescentes</h4>
                                    <p className="text-xs text-slate-400">Vídeo resumo da semana</p>
                                </div>
                            </div>
                        </Card3D>
                    </div>
                </div>

            </main>
        </div>
    );
}
