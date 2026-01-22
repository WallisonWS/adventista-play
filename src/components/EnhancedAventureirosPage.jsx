import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Sun, Cloud, Music, BookHeart, Smile, X, CheckCircle } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D, Wave3D } from './3DAnimations';
import AuroraBackground from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';
import { classesAventureiros, ideaisAventureiros } from '../data/aventureiros_data';

export function EnhancedAventureirosPage() {
    const { isDarkMode } = useDarkMode();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-24">
            {/* Fun, brighter background for kids */}
            <AuroraBackground
                colorStops={["#FBBF24", "#F59E0B", "#D97706"]}
                speed={0.3}
            />
            {/* Child-friendly particles: More colorful and larger */}
            <FloatingParticles3D count={20} color="#ffffff" className="opacity-60" />

            <main className="relative z-10 container mx-auto px-4 py-8">

                {/* Header Fun */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_4px_0_rgba(217,119,6,1)] tracking-tight mb-2">
                            AVENTUREIROS
                        </h1>
                        <div className="bg-white/20 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-white/30">
                            <p className="text-xl text-white font-bold flex items-center gap-2">
                                <Smile className="text-yellow-300" /> Por amor a Jesus
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {classesAventureiros.map((classe) => (
                        <Card3D key={classe.id} className="h-full border-t-8 border-t-white/50 border-white/20 hover:scale-105 transition-transform duration-300">
                            <div className={`h-24 ${classe.cor} flex items-center justify-center relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                                <div className="w-20 h-20 bg-white rounded-full p-2 shadow-lg z-10 mt-10">
                                    <img src={classe.logo} alt={classe.nome} className="w-full h-full object-contain" />
                                </div>
                            </div>

                            <div className="p-6 pt-12 text-center flex flex-col h-[calc(100%-6rem)]">
                                <h2 className="text-2xl font-black text-white mb-1">{classe.nome}</h2>
                                <span className="inline-block bg-black/40 px-3 py-1 rounded-full text-xs font-bold text-white mb-4">
                                    {classe.idade} Anos
                                </span>

                                <div className="flex-1 space-y-2 mb-6 text-left">
                                    {classe.secoes && classe.secoes.slice(0, 2).map((sec, i) => (
                                        <div key={i} className="flex items-center gap-2 text-gray-200 bg-black/10 p-2 rounded-lg">
                                            <Star size={12} className="text-yellow-300" />
                                            <span className="text-xs font-bold truncate">{sec.titulo}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button3D
                                    onClick={() => setSelectedClass(classe)}
                                    className={`w-full ${classe.cor} border-b-4 border-black/20 hover:brightness-110 active:border-b-0 active:translate-y-1 text-white font-black`}
                                >
                                    ABRIR CADERNO
                                </Button3D>
                            </div>
                        </Card3D>
                    ))}
                </div>

                {/* Ideais Section */}
                <Card3D className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12 relative overflow-hidden border-none shadow-2xl">
                    <div className="absolute top-0 right-0 p-32 bg-black/40 rounded-full -mr-16 -mt-16 blur-3xl" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-black text-white mb-6 flex items-center gap-3">
                                <Heart className="text-pink-400 fill-pink-400 w-10 h-10 animate-pulse" /> NOSSOS IDEAIS
                            </h2>
                            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 mb-6">
                                <h3 className="text-yellow-300 font-bold mb-2 uppercase tracking-widest text-sm">Voto</h3>
                                <p className="text-2xl font-bold text-white leading-tight">"{ideaisAventureiros.voto}"</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-yellow-300 font-bold mb-2 uppercase tracking-widest text-sm">Lei do Aventureiro</h3>
                            {ideaisAventureiros.lei.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-black/20 p-3 rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-indigo-900 font-black">
                                        {idx + 1}
                                    </div>
                                    <p className="text-white font-bold text-lg">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card3D>

                {/* Workbook Modal */}
                <AnimatePresence>
                    {selectedClass && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedClass(null)}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                className="bg-white border-4 border-white rounded-3xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl overflow-hidden"
                                onClick={e => e.stopPropagation()}
                            >
                                {/* Modal Header - Fun Style */}
                                <div className={`${selectedClass.cor} p-6 flex justify-between items-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10" />
                                    <div className="relative z-10 flex items-center gap-4">
                                        <div className="bg-white p-2 rounded-full shadow-lg">
                                            <img src={selectedClass.logo} alt="Logo" className="w-12 h-12 object-contain" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-white drop-shadow-md">Caderno {selectedClass.nome}</h2>
                                            <p className="text-white/90 font-bold text-sm bg-black/10 inline-block px-3 rounded-full">Minhas Tarefas</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedClass(null)} className="relative z-10 w-10 h-10 bg-white rounded-full text-red-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                                        <X size={24} strokeWidth={3} />
                                    </button>
                                </div>

                                {/* Modal Body - Scrollable */}
                                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-[#f0f9ff]">
                                    {selectedClass.secoes?.map((secao, idx) => (
                                        <div key={idx} className="bg-white rounded-3xl border-2 border-blue-100 p-6 shadow-[0_4px_0_rgba(0,0,0,0.05)]">
                                            <h3 className="text-2xl font-black text-blue-500 mb-6 flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-sm">{idx + 1}</span>
                                                {secao.titulo}
                                            </h3>
                                            <div className="space-y-4">
                                                {secao.itens.map((item, i) => (
                                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-300 transition-colors group cursor-pointer">
                                                        <div className="mt-1">
                                                            <div className="w-8 h-8 rounded-full border-4 border-slate-200 group-hover:border-green-400 group-hover:bg-green-400 transition-colors flex items-center justify-center">
                                                                <CheckCircle size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={4} />
                                                            </div>
                                                        </div>
                                                        <p className="text-slate-600 font-bold text-lg group-hover:text-blue-600 transition-colors">{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-blue-500 text-center text-white font-bold text-sm">
                                    Aventureiros • Igreja Adventista do Sétimo Dia
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
            <div className="absolute bottom-0 w-full">
                <Wave3D color="#3B82F6" />
            </div>
        </div>
    );
}
