import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Tent, Map, Calendar, Music } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D, Wave3D } from './3DAnimations';
import { AuroraBackground } from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';

export function EnhancedDesbravadoresPage() {
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
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-24">
            <AuroraBackground
                colorStops={isDarkMode ? ["#3A3F26", "#1a1c10", "#000000"] : ["#D6CBA0", "#8F895E", "#EFEFEF"]}
                speed={0.5}
            />

            {/* Floating Elements Specific to Pathfinders (Khaki/Green vibe) */}
            <FloatingParticles3D count={15} color={isDarkMode ? "#FFD700" : "#8F895E"} />

            <main className="relative z-10 container mx-auto px-4 py-8">

                {/* Header 3D */}
                <motion.div
                    initial={{ opacity: 0, y: -50, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="text-center mb-16 perspective-1000"
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

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {/* Cartões 3D de Recursos */}
                    <motion.div variants={itemVariants}>
                        <Card3D className="h-full bg-gradient-to-br from-yellow-500/10 to-green-500/10 border-yellow-500/20">
                            <div className="flex flex-col items-center text-center p-6 space-y-4">
                                <div className="p-4 rounded-full bg-yellow-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                                    <Award className="w-8 h-8 text-yellow-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-yellow-500">Classes</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Materiais completos para Amigo, Companheiro, Pesquisador, Pioneiro, Excursionista e Guia.
                                </p>
                                <Button3D className="w-full bg-yellow-600/80 hover:bg-yellow-600 border-yellow-400/30">
                                    Acessar Classes
                                </Button3D>
                            </div>
                        </Card3D>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card3D className="h-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                            <div className="flex flex-col items-center text-center p-6 space-y-4">
                                <div className="p-4 rounded-full bg-green-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                    <Map className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-500">Especialidades</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Guia de requisitos para todas as áreas: Natureza, Habilidades Domésticas, Artes e mais.
                                </p>
                                <Button3D className="w-full bg-green-600/80 hover:bg-green-600 border-green-400/30">
                                    Ver Especialidades
                                </Button3D>
                            </div>
                        </Card3D>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card3D className="h-full bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
                            <div className="flex flex-col items-center text-center p-6 space-y-4">
                                <div className="p-4 rounded-full bg-orange-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                                    <Tent className="w-8 h-8 text-orange-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-orange-500">Camporis</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    História, fotos e informações sobre os próximos grandes eventos e acampamentos.
                                </p>
                                <Button3D className="w-full bg-orange-600/80 hover:bg-orange-600 border-orange-400/30">
                                    Explorar Eventos
                                </Button3D>
                            </div>
                        </Card3D>
                    </motion.div>

                </motion.div>

                {/* Seção Ideais */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-600">
                        Nossos Ideais
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card3D className="p-8 bg-black/20 border-white/5">
                            <h3 className="text-xl font-bold text-yellow-500 mb-4">Voto</h3>
                            <p className="italic text-lg text-gray-300">
                                "Pela graça de Deus,\n
                                serei puro, bondoso e leal.\n
                                Guardarei a lei dos Desbravadores,\n
                                serei servo de Deus e amigo de todos."
                            </p>
                        </Card3D>
                        <Card3D className="p-8 bg-black/20 border-white/5">
                            <h3 className="text-xl font-bold text-green-500 mb-4">Lei</h3>
                            <ul className="text-left space-y-2 text-gray-300">
                                <li>1. Observar a devoção matinal.</li>
                                <li>2. Cumprir fielmente a parte que me corresponde.</li>
                                <li>3. Cuidar de meu corpo.</li>
                                <li>4. Manter a consciência limpa.</li>
                                <li>5. Ser cortês e obediente.</li>
                                <li>6. Andar com reverência na casa de Deus.</li>
                                <li>7. Ter sempre um cântico no coração.</li>
                                <li>8. Ir aonde Deus mandar.</li>
                            </ul>
                        </Card3D>
                    </div>
                </motion.div>

            </main>

            <div className="fixed bottom-0 left-0 right-0 z-0 pointer-events-none opacity-30">
                <Wave3D color={isDarkMode ? "#EAB308" : "#8F895E"} />
            </div>
        </div>
    );
}
