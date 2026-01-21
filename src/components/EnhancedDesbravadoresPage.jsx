import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Star, Flame, Map,
    Compass, Award, ChevronRight, X,
    Anchor, Menu, Heart
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { Card3D, Button3D } from './3DAnimations';
import AuroraBackground from './21st-dev/AuroraBackground';

// Dados das Classes
const classes = [
    { id: 1, nome: "Amigo", cor: "#3b82f6", idade: 10, logo: "https://clubes.adventistas.org/br/wp-content/uploads/2021/07/amigo.png" },
    { id: 2, nome: "Companheiro", cor: "#ef4444", idade: 11, logo: "https://clubes.adventistas.org/br/wp-content/uploads/2021/07/companheiro.png" },
    { id: 3, nome: "Pesquisador", cor: "#22c55e", idade: 12, logo: "https://clubes.adventistas.org/br/wp-content/uploads/2021/07/pesquisador.png" },
    { id: 4, nome: "Pioneiro", cor: "#a855f7", idade: 13, logo: "https://clubes.adventistas.org/br/wp-content/uploads/2021/07/pioneiro.png" },
    { id: 5, nome: "Excursionista", cor: "#f97316", idade: 14, logo: "https://clubes.adventistas.org/br/wp-content/uploads/2021/07/excursionista.png" },
    { id: 6, nome: "Guia", cor: "#eab308", idade: 15, logo: "https://clubes.adventistas.org/br/wp-content/uploads/2021/07/guia.png" },
];

// Dados dos Ideais
const ideais = {
    lei: "A Lei do Desbravador ordena-me:\nObservar a devoção matinal;\nCumprir fielmente a parte que me corresponde;\nCuidar de meu corpo;\nManter a consciência limpa;\nSer cortês e obediente;\nAndar com reverência na casa de Deus;\nTer sempre um cântico no coração;\nIr aonde Deus mandar.",
    voto: "Pela graça de Deus,\nserei puro, bondoso e leal.\nGuardarei a Lei do Desbravador,\nserei servo de Deus\ne amigo de todos."
};

// Componente para Visualizar Nós (Placeholder 3D)
const Knot3D = ({ color }) => {
    return (
        <div className="w-full h-32 relative flex items-center justify-center">
            <div className={`w-20 h-20 rounded-full border-8 border-${color}-500/50 absolute animate-pulse`} />
            <div className={`w-16 h-16 rounded-full border-4 border-white absolute`} />
            <Anchor size={40} className="relative z-10 text-white" />
        </div>
    );
};

export function EnhancedDesbravadoresPage() {
    const [activeSection, setActiveSection] = useState('classes');
    const [selectedClass, setSelectedClass] = useState(null);

    return (
        <div className="min-h-screen bg-[#0f1115] text-white relative overflow-hidden font-sans">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000')] bg-cover bg-center opacity-20 fixed" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115] via-[#0f1115]/80 to-[#0f1115] fixed" />

            {/* Fireflies Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_10px_gold]"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0
                        }}
                        animate={{
                            x: [null, Math.random() * window.innerWidth],
                            y: [null, Math.random() * window.innerHeight],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <div className="relative z-10 pt-24 pb-10 text-center px-4">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className="w-24 h-24 mx-auto mb-6 relative">
                        <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 animate-pulse" />
                        <Shield className="w-full h-full text-yellow-500 relative z-10" fill="currentColor" fillOpacity={0.2} strokeWidth={1.5} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Flame className="w-10 h-10 text-red-500 mb-2" fill="currentColor" />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600 drop-shadow-sm">
                        DESBRAVADORES
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Aventura, fé e amizade na natureza de Deus.
                    </p>
                </motion.div>
            </div>

            {/* Navigation Tabs */}
            <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-16 px-4">
                {['classes', 'especialidades', 'nos', 'ideais'].map((sec) => (
                    <button
                        key={sec}
                        onClick={() => setActiveSection(sec)}
                        className={`
              px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all
              ${activeSection === sec
                                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-105'
                                : 'bg-white/5 hover:bg-white/10 text-white/60'
                            }
            `}
                    >
                        {sec}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 pb-24 relative z-10 min-h-[50vh]">
                <AnimatePresence mode="wait">

                    {/* CLASSES SECTION */}
                    {activeSection === 'classes' && (
                        <motion.div
                            key="classes"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {classes.map((cls, idx) => (
                                <Card3D key={cls.id} className="cursor-pointer group">
                                    <div className="relative overflow-hidden p-8 flex flex-col items-center text-center h-full border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                                        {/* Background Glow */}
                                        <div
                                            className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40"
                                            style={{ background: `radial-gradient(circle at center, ${cls.cor}, transparent 70%)` }}
                                        />

                                        <div className="w-32 h-32 mb-6 relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                                            <div
                                                className="absolute inset-0 rounded-full blur-xl opacity-50"
                                                style={{ backgroundColor: cls.cor }}
                                            />
                                            {/* Placeholder for SVG Emblem if image fails, else IMG */}
                                            <Shield className="w-full h-full text-white drop-shadow-lg" fill={cls.cor} fillOpacity={0.8} />
                                            <span className="absolute inset-0 flex items-center justify-center font-black text-4xl text-white/90 drop-shadow-md">
                                                {cls.idade}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-bold mb-2 text-white">{cls.nome}</h3>
                                        <p className="text-white/50 text-sm uppercase tracking-widest mb-6">Class {cls.idade} Anos</p>

                                        <Button3D
                                            color={cls.cor}
                                            className="w-full justify-center mt-auto"
                                        >
                                            Ver Requisitos
                                        </Button3D>
                                    </div>
                                </Card3D>
                            ))}
                        </motion.div>
                    )}

                    {/* IDEAIS SECTION (LAW & VOW) */}
                    {activeSection === 'ideais' && (
                        <motion.div
                            key="ideais"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
                        >
                            {/* LEI */}
                            <Card3D className="bg-[#1a1c23] border border-yellow-500/30">
                                <div className="p-10 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-600 to-yellow-300" />
                                    <h2 className="text-4xl font-black mb-8 text-yellow-500">A LEI</h2>
                                    <div className="space-y-4 text-lg md:text-xl leading-relaxed text-white/90 font-serif">
                                        {ideais.lei.split('\n').map((line, i) => (
                                            <p key={i} className="py-1 border-b border-white/5 last:border-0 hover:text-yellow-200 transition-colors">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </Card3D>

                            {/* VOTO */}
                            <Card3D className="bg-[#1a1c23] border border-blue-500/30">
                                <div className="p-10 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-300" />
                                    <h2 className="text-4xl font-black mb-8 text-blue-400">O VOTO</h2>
                                    <div className="space-y-4 text-lg md:text-xl leading-relaxed text-white/90 font-serif flex flex-col justify-center h-full min-h-[300px]">
                                        {ideais.voto.split('\n').map((line, i) => (
                                            <p key={i} className="hover:text-blue-200 transition-colors">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </Card3D>
                        </motion.div>
                    )}

                    {/* NOS SECTION */}
                    {activeSection === 'nos' && (
                        <motion.div
                            key="nos"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        >
                            {['Direito', 'Escota', 'Lais de Guia', 'Catau', 'Pescador', 'Volta do Fiel', 'Cirurgião', 'Caminhoneiro'].map((no, idx) => (
                                <Card3D key={idx}>
                                    <div className="p-6 bg-white/5 text-center rounded-xl border border-white/10 hover:border-white/30 transition-colors">
                                        <div className="mb-4 text-orange-400">
                                            <Anchor size={48} className="mx-auto" />
                                        </div>
                                        <h3 className="font-bold text-lg">{no}</h3>
                                    </div>
                                </Card3D>
                            ))}
                        </motion.div>
                    )}

                    {/* ESPECIALIDADES (Placeholder) */}
                    {activeSection === 'especialidades' && (
                        <div className="text-center py-20">
                            <Award size={64} className="mx-auto text-white/20 mb-4" />
                            <h3 className="text-2xl font-bold text-white/40">Em construção...</h3>
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
