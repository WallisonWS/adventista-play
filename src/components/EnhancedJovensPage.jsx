import React from 'react';
import { motion } from 'framer-motion';
import { Music, Calendar, Users, Instagram, Youtube, MessageCircle, Play } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D } from './3DAnimations';
import AuroraBackground from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';
import { eventosJovens, playlistJovem, pequenosGrupos, cultosJovens } from '../data/jovens_data';

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
                    {/* Destaque Principal: Próximo Evento */}
                    {eventosJovens.length > 0 && (
                        <Card3D className="col-span-1 md:col-span-2 h-96 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 flex relative group overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700"
                                style={{ backgroundImage: `url(${eventosJovens[0].imagem})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                            <div className="relative z-10 p-8 flex flex-col justify-end items-start w-full h-full">
                                <Badge3D>Próximo Evento</Badge3D>
                                <h2 className="text-4xl font-bold text-white mt-4 mb-2">{eventosJovens[0].titulo}</h2>
                                <div className="flex items-center gap-4 text-gray-200 mb-4 text-sm font-medium">
                                    <span className="flex items-center gap-1"><Calendar size={16} /> {eventosJovens[0].data}</span>
                                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                    <span>{eventosJovens[0].local}</span>
                                </div>
                                <p className="text-gray-300 mb-6 max-w-lg line-clamp-2">{eventosJovens[0].descricao}</p>
                                <Button3D className="bg-white text-purple-900 hover:bg-gray-100 flex items-center gap-2">
                                    Inscrever-se Agora
                                </Button3D>
                            </div>
                        </Card3D>
                    )}

                    {/* Playlist Jovem */}
                    <Card3D className="bg-blue-900/50 border-blue-500/30 p-6 flex flex-col h-96 overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Music className="w-6 h-6 text-blue-400" /> Playlist
                                </h3>
                                <p className="text-blue-200 text-xs">Top hits espirituais</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                            {playlistJovem.map((music, idx) => (
                                <div key={music.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 cursor-pointer group transition-all">
                                    <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden relative shrink-0">
                                        <img src={music.capa} alt={music.titulo} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                                            <Play size={16} className="text-white fill-white" />
                                        </div>
                                    </div>
                                    <div className="overflow-hidden flex-1">
                                        <p className="text-white font-medium truncate text-sm">{music.titulo}</p>
                                        <p className="text-xs text-gray-400 truncate">{music.artista}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono">{music.duracao}</span>
                                </div>
                            ))}
                        </div>
                    </Card3D>
                </motion.div>

                {/* Second Row: Pequenos Grupos & Culto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Pequenos Grupos Widget */}
                    <Card3D className="p-6 bg-white/5 border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-orange-500/20 rounded-xl">
                                <Users className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Pequenos Grupos</h3>
                                <p className="text-gray-400 text-sm">Encontre sua tribo</p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {pequenosGrupos.map((pg) => (
                                <div key={pg.id} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors">
                                    <div>
                                        <h4 className="font-bold text-white">{pg.nome}</h4>
                                        <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                                            <span className="w-2 h-2 rounded-full bg-green-500" />
                                            {pg.dia} • {pg.bairro}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-orange-400">{pg.participantes}</span>
                                        <p className="text-[10px] uppercase tracking-wide text-gray-500">Membros</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card3D>

                    {/* Culto Jovem Widget */}
                    <Card3D className="p-6 bg-white/5 border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 bg-red-600 rounded-bl-xl text-xs font-bold text-white shadow-lg">
                            AO VIVO SÁBADO
                        </div>
                        <div className="flex flex-col h-full justify-center">
                            <span className="text-blue-400 font-bold tracking-widest text-sm mb-2">CULTO JOVEM</span>
                            <h3 className="text-3xl font-black text-white mb-2">{cultosJovens[0].tema}</h3>
                            <p className="text-gray-300 mb-6 italic">"{cultosJovens[0].resumo}"</p>

                            <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl backdrop-blur-md">
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl">👨🏻‍💼</div>
                                <div>
                                    <p className="text-white font-bold">{cultosJovens[0].pregador}</p>
                                    <p className="text-xs text-gray-400">Orador oficial</p>
                                </div>
                            </div>
                        </div>
                    </Card3D>
                </div>

                {/* Social Feed Simulation */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SocialButton icon={Instagram} label="@jovensadventistas" color="text-pink-500" />
                    <SocialButton icon={Youtube} label="Canal Jovem" color="text-red-500" />
                    <SocialButton icon={MessageCircle} label="Comunidade" color="text-green-500" />
                    <SocialButton icon={Users} label="Liderança" color="text-blue-500" />
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
