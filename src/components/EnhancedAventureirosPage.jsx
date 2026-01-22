import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Sun, Cloud, Music, BookHeart } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D, Wave3D } from './3DAnimations';
import { AuroraBackground } from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';

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
                colorStops={isDarkMode ? ["#1e3a8a", "#ea580c", "#000000"] : ["#BFDBFE", "#FED7AA", "#FFFFFF"]}
                speed={0.8}
            />

            <FloatingParticles3D count={20} color={isDarkMode ? "#60A5FA" : "#F97316"} />

            <main className="relative z-10 container mx-auto px-4 py-8">

                {/* Header 3D Playful */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                    className="text-center mb-12 perspective-1000"
                >
                    <div className="inline-block relative p-4">
                        {/* Decorative Icons */}
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-4 -left-4">
                            <Sun className="w-12 h-12 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute -bottom-4 -right-4">
                            <Cloud className="w-12 h-12 text-blue-300 fill-blue-300" />
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 drop-shadow-xl filter">
                            AVENTUREIROS
                        </h1>
                        <p className={`text-xl mt-4 font-bold rounded-full py-1 px-4 inline-block ${isDarkMode ? 'bg-white/10 text-white' : 'bg-white/50 text-blue-800'}`}>
                            Por Jesus farei sempre o meu melhor!
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {/* Classes Cards - Coloring specific for kids */}
                    {[
                        { title: 'Abelhinha', color: 'bg-yellow-400', icon: '🐝' },
                        { title: 'Luminares', color: 'bg-orange-400', icon: '☀️' },
                        { title: 'Edificadores', color: 'bg-blue-400', icon: '🏗️' },
                        { title: 'Mãos Ajudadoras', color: 'bg-green-400', icon: '🤝' },
                    ].map((classe, idx) => (
                        <motion.div variants={itemVariants} key={idx}>
                            <Card3D className={`h-full border-none shadow-lg overflow-hidden group hover:scale-105 transition-transform`}>
                                <div className={`h-24 ${classe.color} flex items-center justify-center text-5xl`}>
                                    {classe.icon}
                                </div>
                                <div className="p-6 text-center bg-white/10 backdrop-blur-md">
                                    <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{classe.title}</h3>
                                    <Button3D className="w-full text-sm bg-white/20 hover:bg-white/30 border-white/10">
                                        Ver Caderno
                                    </Button3D>
                                </div>
                            </Card3D>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Atividades e Ideais */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <Card3D className="bg-blue-600/20 border-blue-400/30 p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <BookHeart className="w-8 h-8 text-blue-400" />
                            <h2 className="text-2xl font-bold text-blue-400">Voto</h2>
                        </div>
                        <p className="text-xl font-medium text-center italic text-white/90">
                            "Por amor a Jesus,<br />farei sempre o meu melhor."
                        </p>
                    </Card3D>

                    <Card3D className="bg-orange-500/20 border-orange-400/30 p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Star className="w-8 h-8 text-orange-400" />
                            <h2 className="text-2xl font-bold text-orange-400">Lei</h2>
                        </div>
                        <p className="text-lg font-medium text-white/90 leading-relaxed">
                            Jesus me ajuda a ser:<br />
                            Obediente, Puro, Reverente,<br />
                            Bondoso e Colaborador.
                        </p>
                    </Card3D>
                </motion.div>

            </main>

            {/* Footer Decoration */}
            <div className="absolute bottom-0 w-full">
                <Wave3D color="#3B82F6" />
            </div>
        </div>
    );
}
