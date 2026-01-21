import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Heart, Music, BookOpen, GraduationCap,
    Globe, Play, Star, Sparkles, ChevronRight,
    Shield, Flame, Anchor, Wind
} from 'lucide-react';
import AuroraBackground from './21st-dev/AuroraBackground';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, PerspectiveCamera } from '@react-three/drei';

// Componente de Cartão Tilting 3D
const TiltCard = ({ to, icon: Icon, title, subtitle, color, delay }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    return (
        <Link to={to}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.8, type: "spring" }}
                style={{ x, y, rotateX, rotateY, z: 100 }}
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    x.set(e.clientX - rect.left - rect.width / 2);
                    y.set(e.clientY - rect.top - rect.height / 2);
                }}
                onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                }}
                className="relative group w-full h-64 perspective-1000 cursor-pointer"
            >
                <div
                    className={`
            absolute inset-0 rounded-3xl bg-gradient-to-br ${color} 
            opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl
          `}
                />
                <div
                    className="
            relative h-full w-full rounded-3xl bg-white/5 border border-white/10 
            backdrop-blur-md p-8 flex flex-col justify-between overflow-hidden
            shadow-2xl transition-transform duration-200 ease-out group-hover:scale-[1.02]
          "
                >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform translate-x-[-100%] group-hover:translate-x-[100%] duration-1000" />

                    {/* Icon */}
                    <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <Icon size={32} className="text-white" />
                    </div>

                    {/* Text */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform">
                            {title}
                        </h3>
                        <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                            {subtitle}
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="absolute bottom-8 right-8 text-white/40 group-hover:text-white transition-colors">
                        <ChevronRight size={24} />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

// Scene 3D para o Background
const BackgroundScene = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    {/* Elementos flutuantes abstratos podem ser adicionados aqui */}
                </Float>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115]/80 via-[#0f1115]/50 to-[#0f1115] z-10" />
        </div>
    );
};

export function Ultra3DHomePage({ user }) {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div className="min-h-screen bg-[#0f1115] text-white overflow-hidden relative selection:bg-purple-500/30">

            {/* 3D Background */}
            <BackgroundScene />
            <AuroraBackground absolute className="opacity-40" />

            {/* Hero Section */}
            <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">

                {/* Floating Title */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center relative"
                >
                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <Sparkles size={16} className="text-yellow-400" />
                        <span className="text-sm font-medium tracking-wider uppercase text-white/80">Experiência Imersiva</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 transparent-text bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        ADVENTISTA
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            PLAY 3D
                        </span>
                    </h1>

                    <p className="max-w-xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed mix-blend-plus-lighter">
                        Explore o universo do conhecimento bíblico em uma nova dimensão.
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                </motion.div>
            </section>

            {/* Main Navigation Grid */}
            <section className="relative z-20 container mx-auto px-4 pb-32 -mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                    <TiltCard
                        to="/biblia"
                        icon={BookOpen}
                        title="Bíblia Imersiva"
                        subtitle="Explore as escrituras com áudio e leitura offline."
                        color="from-blue-500 to-cyan-500"
                        delay={0.1}
                    />

                    <TiltCard
                        to="/hinario"
                        icon={Music}
                        title="Hinário 3D"
                        subtitle="600+ hinos com player de voz e visualizações."
                        color="from-purple-500 to-pink-500"
                        delay={0.2}
                    />

                    <TiltCard
                        to="/estudos"
                        icon={GraduationCap}
                        title="Estudos Profundos"
                        subtitle="Profecias, Doutrinas e Guias Práticos."
                        color="from-orange-500 to-red-500"
                        delay={0.3}
                    />

                    <TiltCard
                        to="/devocional"
                        icon={Heart}
                        title="Devocional Diário"
                        subtitle="Conexão espiritual renovada a cada manhã."
                        color="from-green-500 to-emerald-500"
                        delay={0.4}
                    />

                    <TiltCard
                        to="/desbravadores"
                        icon={Shield}
                        title="Desbravadores"
                        subtitle="Classes, Especialidades e Vida ao Ar Livre."
                        color="from-yellow-500 to-amber-500"
                        delay={0.5}
                    />

                    <TiltCard
                        to="/projetos"
                        icon={Globe}
                        title="Missão Global"
                        subtitle="Conheça os projetos que transformam o mundo."
                        color="from-indigo-500 to-blue-600"
                        delay={0.6}
                    />

                </div>
            </section>

            {/* Featured Section */}
            <section className="relative z-10 py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 skew-y-3" />

                <div className="container mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row items-center gap-12"
                    >
                        <div className="flex-1">
                            <span className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-2 block">Destaque da Semana</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                O Grande Conflito <br />
                                <span className="text-white/50">Série Exclusiva</span>
                            </h2>
                            <p className="text-lg text-white/70 mb-8 max-w-md">
                                Uma jornada visual pelos eventos finais da história terrestre. Prepare-se para o que está por vir.
                            </p>

                            <Link to="/estudos">
                                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors flex items-center gap-2 group">
                                    <Play fill="currentColor" size={18} />
                                    Assistir Agora
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>

                        <div className="flex-1 w-full max-w-lg aspect-video rounded-3xl bg-black/50 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                            <img
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
                                alt="Space"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                    <Play fill="white" className="text-white ml-1" size={32} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="h-20" />
        </div>
    );
}
