import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Award, Tent, Map, Calendar, Music, BookOpen, Star, Heart } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D, Wave3D } from './3DAnimations';
import { AuroraBackground } from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';
import { classesDesbravadores, especialidades, ideais } from '../data/desbravadores_data';

export function EnhancedDesbravadoresPage() {
    const { isDarkMode } = useDarkMode();
    const [activeTab, setActiveTab] = useState('classes');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-24">
            <AuroraBackground
                colorStops={isDarkMode ? ["#3A3F26", "#1a1c10", "#000000"] : ["#D6CBA0", "#8F895E", "#EFEFEF"]}
                speed={0.5}
            />

            <FloatingParticles3D count={15} color={isDarkMode ? "#FFD700" : "#8F895E"} />

            <main className="relative z-10 container mx-auto px-4 py-8">

                {/* Header 3D */}
                <motion.div
                    initial={{ opacity: 0, y: -50, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="text-center mb-10 perspective-1000"
                >
                    <div className="inline-block relative">
                        <motion.div
                            animate={{ rotateY: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="mb-4"
                        >
                            <Shield className="w-24 h-24 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] mx-auto" strokeWidth={1.5} />
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-600 to-green-700 drop-shadow-sm">
                            DESBRAVADORES
                        </h1>
                        <p className={`text-xl mt-4 font-medium tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Salvar do pecado e guiar no serviço
                        </p>
                    </div>
                </motion.div>

                {/* Custom Tab Navigation */}
                <div className="flex justify-center mb-12 flex-wrap gap-4">
                    {['classes', 'especialidades', 'ideais'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                        px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 border
                        ${activeTab === tab
                                    ? 'bg-yellow-500 text-black border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.4)] scale-105'
                                    : 'bg-black/20 text-white/70 border-white/10 hover:bg-white/10'}
                    `}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'classes' && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {classesDesbravadores.map((classe) => (
                                    <motion.div variants={itemVariants} key={classe.id}>
                                        <Card3D className="h-full overflow-hidden border-white/10 group">
                                            <div className={`h-2 ${classe.cor}`} />
                                            <div className="p-6">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                                        <img src={classe.logo} alt={classe.nome} className="w-10 h-10 object-contain drop-shadow-lg" onError={(e) => { e.target.onerror = null; e.target.src = 'https://cdn-icons-png.flaticon.com/512/1045/1045258.png' }} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white">{classe.nome}</h3>
                                                        <span className="text-xs text-gray-400">{classe.idade} Anos</span>
                                                    </div>
                                                </div>

                                                <ul className="space-y-2 mb-6">
                                                    {classe.requisitos.map((req, i) => (
                                                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                                            <span className="text-yellow-500 mt-1">•</span>
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <Button3D className="w-full bg-white/10 hover:bg-white/20 border-white/5">
                                                    Ver Caderno Completo
                                                </Button3D>
                                            </div>
                                        </Card3D>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'especialidades' && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {especialidades.map((esp) => (
                                    <Card3D key={esp.id} className="p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 cursor-pointer border-white/10">
                                        <div className={`mb-3 p-4 rounded-full bg-white/5 ${esp.cor}`}>
                                            <Award className="w-8 h-8" />
                                        </div>
                                        <h3 className="font-bold text-white">{esp.nome}</h3>
                                        <p className="text-xs text-gray-400 mt-1">Ver Requisitos</p>
                                    </Card3D>
                                ))}
                            </div>
                        )}

                        {activeTab === 'ideais' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                <Card3D className="p-8 bg-gradient-to-br from-yellow-900/40 to-black/40 border-yellow-500/30">
                                    <h2 className="text-2xl font-bold text-yellow-500 mb-6 flex items-center gap-2">
                                        <Heart className="w-6 h-6" /> Voto
                                    </h2>
                                    <p className="text-xl leading-relaxed text-gray-200 italic">
                                        "{ideais.voto}"
                                    </p>
                                </Card3D>

                                <Card3D className="p-8 bg-gradient-to-br from-green-900/40 to-black/40 border-green-500/30">
                                    <h2 className="text-2xl font-bold text-green-500 mb-6 flex items-center gap-2">
                                        <Star className="w-6 h-6" /> Lei
                                    </h2>
                                    <ul className="space-y-3">
                                        {ideais.lei.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-lg text-gray-300">
                                                <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs font-bold">
                                                    {idx + 1}
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </Card3D>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

            </main>

            <div className="fixed bottom-0 left-0 right-0 z-0 pointer-events-none opacity-30">
                <Wave3D color={isDarkMode ? "#EAB308" : "#8F895E"} />
            </div>
        </div>
    );
}
