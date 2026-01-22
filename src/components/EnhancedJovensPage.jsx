import React from 'react';
import { motion } from 'framer-motion';
import { Music, Calendar, Users, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D } from './3DAnimations';
import { AuroraBackground } from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';

export function EnhancedJovensPage() {
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

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-24">
            <AuroraBackground
                colorStops={["#ec4899", "#8b5cf6", "#3b82f6"]}
                speed={0.4}
            />

            <FloatingParticles3D count={30} color="#ffffff" className="opacity-50" />

            <main className="relative z-10 container mx-auto px-4 py-8">

                {/* Header Ultra Modern */}
                <div className="relative py-16 text-center">
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        JOVENS
                        <span className="block text-2xl md:text-4xl font-light tracking-widest mt-2 uppercase text-blue-200">
                            Adventistas
                        </span>
                    </h1>
                    <p className="mt-6 text-xl text-white/80 max-w-2xl mx-auto backdrop-blur-sm rounded-lg p-4">
                        "Ninguém o despreze pelo fato de você ser jovem, mas seja um exemplo para os fiéis na palavra, no procedimento, no amor, na fé e na pureza."
                    </p>
                </div>

                {/* Featured Content Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* Eventos */}
                    <Card3D className="col-span-1 md:col-span-2 h-64 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 flex relative group overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10 p-8 flex flex-col justify-end items-start w-full">
                            <Badge3D>Próximo Evento</Badge3D>
                            <h2 className="text-3xl font-bold text-white mt-2 mb-1">Acampamento Jovem 2026</h2>
                            <p className="text-gray-200 mb-4">Prepare-se para uma experiência sobrenatural.</p>
                            <Button3D className="bg-white text-purple-900 hover:bg-gray-100">Inscrever-se</Button3D>
                        </div>
                    </Card3D>

                    {/* Música */}
                    <Card3D className="bg-blue-900/50 border-blue-500/30 p-6 flex flex-col justify-between">
                        <div>
                            <Music className="w-10 h-10 text-blue-400 mb-4" />
                            <h3 className="text-2xl font-bold text-white">Playlist Jovem</h3>
                            <p className="text-blue-200 text-sm mt-2">Músicas para elevar sua conexão com Deus.</p>
                        </div>
                        <div className="space-y-3 mt-6">
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 cursor-pointer">
                                <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center shrink-0">
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-white font-medium truncate">Ressuscita-me</p>
                                    <p className="text-xs text-gray-400">Aline Barros</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 cursor-pointer">
                                <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center shrink-0">
                                    <Music className="w-4 h-4 text-white" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-white font-medium truncate">Maranata</p>
                                    <p className="text-xs text-gray-400">Ministério Avivah</p>
                                </div>
                            </div>
                        </div>
                    </Card3D>
                </motion.div>

                {/* Social Feed Simulation */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SocialButton icon={Instagram} label="@jovensadventistas" color="hover:text-pink-500" />
                    <SocialButton icon={Youtube} label="Canal Jovem" color="hover:text-red-500" />
                    <SocialButton icon={MessageCircle} label="Comunidade" color="hover:text-green-500" />
                    <SocialButton icon={Users} label="Pequenos Grupos" color="hover:text-blue-500" />
                </div>

            </main>
        </div>
    );
}

const Badge3D = ({ children }) => (
    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 shadow-lg">
        {children}
    </span>
);

const SocialButton = ({ icon: Icon, label, color }) => (
    <Card3D className="p-4 flex flex-col items-center justify-center gap-2 bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer group">
        <Icon className={`w-8 h-8 text-white transition-colors duration-300 ${color}`} />
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </Card3D>
);
