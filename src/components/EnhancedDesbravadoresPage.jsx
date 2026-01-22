import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Award, Tent, Map, Calendar, Music, BookOpen, Star, Heart, X, ChevronRight, CheckCircle, Cloud, Sun } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D, Wave3D } from './3DAnimations';
import AuroraBackground from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';
import { classesDesbravadores, especialidades, ideais } from '../data/desbravadores_data';

const iconMap = {
    'hand-heart': Heart,
    'cat': Award,
    'medkit': Heart,
    'palette': Music,
    'sprout': Cloud,
    'cross': Star,
    'briefcase': Map,
    'flask': Tent,
    'home': Tent,
    'bike': Award
};

const getIcon = (iconName) => {
    switch (iconName) {
        case 'hand-heart': return Heart;
        case 'cat': return Star;
        case 'medkit': return Heart;
        case 'palette': return Music;
        case 'sprout': return Cloud;
        case 'cross': return BookOpen;
        case 'briefcase': return Map;
        case 'flask': return Shield;
        case 'home': return Tent;
        case 'bike': return Sun;
        default: return Star;
    }
};

export function EnhancedDesbravadoresPage() {
    const { isDarkMode } = useDarkMode();
    const [activeTab, setActiveTab] = useState('classes');
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);

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
                                        <Card3D className="h-full overflow-hidden border-white/10 group flex flex-col relative">
                                            <div className={`absolute top-0 right-0 w-24 h-24 ${classe.cor} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full -mr-10 -mt-10`} />

                                            <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
                                                <div>
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center p-2 backdrop-blur-md shadow-lg">
                                                            <img src={classe.logo} alt={classe.nome} className="w-full h-full object-contain drop-shadow-lg" onError={(e) => { e.target.onerror = null; e.target.src = 'https://cdn-icons-png.flaticon.com/512/1045/1045258.png' }} />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-white">{classe.nome}</h3>
                                                            <span className="text-sm text-gray-400">{classe.idade} Anos+</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {classe.secoes?.slice(0, 3).map((sec, idx) => (
                                                            <span key={idx} className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-300 border border-white/5 truncate max-w-[100px]">
                                                                {sec.titulo}
                                                            </span>
                                                        ))}
                                                        {classe.secoes?.length > 3 && (
                                                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-300 border border-white/5">
                                                                +{classe.secoes.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <Button3D
                                                    onClick={() => setSelectedClass(classe)}
                                                    className={`w-full ${classe.cor} text-white hover:brightness-110 border-none shadow-lg`}
                                                >
                                                    Ver Caderno Completo
                                                </Button3D>
                                            </div>
                                        </Card3D>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'especialidades' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
                            >
                                {especialidades.map((esp) => {
                                    const IconComp = getIcon(esp.icon);
                                    return (
                                        <Card3D
                                            key={esp.id}
                                            className="p-4 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/10 cursor-pointer group transition-all"
                                            onClick={() => setSelectedSpecialty(esp)}
                                        >
                                            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${esp.cor} group-hover:scale-110 transition-transform shadow-lg border border-white/10`}>
                                                <IconComp size={28} className="text-current drop-shadow-md" />
                                            </div>
                                            <span className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors uppercase tracking-tight">{esp.nome}</span>
                                        </Card3D>
                                    );
                                })}
                            </motion.div>
                        )}

                        {activeTab === 'ideais' && (
                            <Card3D className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-zinc-900/90 border-blue-500/30 shadow-2xl backdrop-blur-xl">
                                <h2 className="text-3xl font-black text-yellow-500 mb-8 border-b border-white/10 pb-4 inline-block px-12 tracking-wide">IDEAIS DO DESBRAVADOR</h2>

                                <div className="grid md:grid-cols-2 gap-12 text-left">
                                    <div>
                                        <h3 className="text-2xl font-black text-blue-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                            <span className="w-2 h-8 bg-blue-500 rounded-full" /> Voto
                                        </h3>
                                        <p className="text-2xl text-white font-serif leading-relaxed drop-shadow-md">"{ideais.voto}"</p>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-red-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                            <span className="w-2 h-8 bg-red-500 rounded-full" /> Lei
                                        </h3>
                                        <ul className="space-y-3">
                                            {ideais.lei.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-white font-medium text-lg text-left">
                                                    <span className="shrink-0 w-6 h-6 rounded-full bg-white text-black text-xs flex items-center justify-center font-bold mt-1 shadow-lg">{i + 1}</span>
                                                    <span className="drop-shadow-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card3D>
                        )}
                    </motion.div>
                </AnimatePresence>

            </main>

            {/* Workbook Modal */}
            <AnimatePresence>
                {selectedClass && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedClass(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#1a1c2e] border border-white/10 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className={`${selectedClass.cor} p-6 flex justify-between items-center relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="relative z-10 flex items-center gap-4">
                                    <img src={selectedClass.logo} alt="Logo" className="w-16 h-16 object-contain drop-shadow-md" onError={(e) => { e.target.onerror = null; e.target.src = 'https://cdn-icons-png-flaticon.com/512/1045/1045258.png' }} />
                                    <div>
                                        <h2 className="text-3xl font-bold text-white">Caderno de {selectedClass.nome}</h2>
                                        <p className="text-white/80 text-sm">Registro de requisitos e atividades</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedClass(null)} className="relative z-10 p-2 hover:bg-white/20 rounded-full text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body - Scrollable */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-gradient-to-b from-[#1a1c2e] to-[#0f111a]">
                                {selectedClass.secoes.map((secao, idx) => (
                                    <div key={idx} className="bg-white/5 rounded-xl border border-white/5 p-6 hover:bg-white/[0.07] transition-colors">
                                        <h3 className="text-xl font-bold text-blue-300 mb-6 pb-2 border-b border-white/10 flex items-center gap-2">
                                            <BookOpen size={20} />
                                            {secao.titulo}
                                        </h3>
                                        <div className="grid gap-3">
                                            {secao.itens.map((item, i) => (
                                                <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-black/20 transition-colors group">
                                                    <div className="mt-1">
                                                        <div className="w-6 h-6 rounded border-2 border-white/20 group-hover:border-green-500 transition-colors flex items-center justify-center">
                                                            <CheckCircle size={14} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-300 group-hover:text-white transition-colors leading-relaxed">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-black/40 border-t border-white/10 text-center text-xs text-gray-500">
                                Adventista Play • Ministério de Desbravadores
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Specialty Modal */}
            <AnimatePresence>
                {selectedSpecialty && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedSpecialty(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-900/30 to-purple-900/30 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/10 ${selectedSpecialty.cor}`}>
                                        <div className="w-5 h-5 bg-current rounded-full" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{selectedSpecialty.nome}</h2>
                                        <p className="text-xs text-blue-300 uppercase tracking-widest font-bold">Conteúdo de Ensino</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedSpecialty(null)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {selectedSpecialty.conteudoEnsino ? (
                                    <>
                                        <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg mb-6">
                                            <h3 className="text-lg font-bold text-blue-400 mb-1">{selectedSpecialty.conteudoEnsino.titulo}</h3>
                                            <p className="text-sm text-gray-400">Estude as perguntas e respostas abaixo para completar esta especialidade.</p>
                                        </div>

                                        <div className="space-y-4">
                                            {selectedSpecialty.conteudoEnsino.itens.map((item, idx) => (
                                                <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
                                                    <p className="font-bold text-white mb-3 text-lg">{item.pergunta}</p>
                                                    <div className="pl-4 border-l-2 border-green-500/50">
                                                        <p className="text-gray-300 leading-relaxed bg-black/20 p-3 rounded-r-lg">{item.resposta}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                                            <BookOpen size={30} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Em Desenvolvimento</h3>
                                        <p className="text-gray-400">O conteúdo desta especialidade será adicionado em breve.</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-5 border-t border-white/10 bg-black/20 flex justify-end">
                                <Button3D onClick={() => setSelectedSpecialty(null)} className="bg-white/10 hover:bg-white/20 text-white">
                                    Fechar Estudo
                                </Button3D>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="fixed bottom-0 left-0 right-0 z-0 pointer-events-none opacity-30">
                <Wave3D color={isDarkMode ? "#EAB308" : "#8F895E"} />
            </div>
        </div>
    );
}
