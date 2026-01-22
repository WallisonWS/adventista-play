import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Heart, Music, BookOpen, GraduationCap,
    Globe, ChevronRight, Play
} from 'lucide-react';
import { DestaquesCarousel } from './DestaquesCarousel';
import { useIsMobile } from '../hooks/useIsMobile';

// Simplified 3D Homepage optimized for Mobile & Performance
export function Ultra3DHomePage({ user }) {
    const isMobile = useIsMobile();
    const { scrollY } = useScroll();
    const headersOpacity = useTransform(scrollY, [0, 200], [1, 0]);
    const headersY = useTransform(scrollY, [0, 200], [0, -50]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-900 pb-20 lg:pb-0">
            {/* Hero Section with 3D Effects */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20 pb-10">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/40 to-purple-900/40 z-0">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMC00djJ6bTAtNHYyem0wLTR2MnptMC00djJ6bTAtNHYyem0wLTR2MnptMC00djJ6bTAtNHYyem0wLTR2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
                    <motion.div
                        style={{ opacity: headersOpacity, y: headersY }}
                        className="flex flex-col items-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-6 relative"
                        >
                            <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full z-0" />
                            <h1 className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight tracking-tight">
                                Adventista Play
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-lg md:text-2xl text-blue-100/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed px-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Sua jornada espiritual completa: devocionais, hinário, bíblia e estudos em uma experiência imersiva.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto sm:justify-center p-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/devocional" className="w-full sm:w-auto">
                                <motion.button
                                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-transform"
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(59 130 246 / 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Começar Devocional
                                    <ChevronRight className="inline ml-2 w-5 h-5" />
                                </motion.button>
                            </Link>
                            <Link to="/biblia" className="w-full sm:w-auto">
                                <motion.button
                                    className="w-full px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white font-semibold hover:bg-white/10 active:scale-95 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Abrir Bíblia
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Floating Ambient Elements - Optimized count for mobile */}
                {[...Array(isMobile ? 3 : 6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl pointer-events-none"
                        style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </section>

            {/* Destaques Section - Native horizontal scroll feel */}
            <section className="relative py-8 px-0 md:px-4 space-y-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between px-6 mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                            <span className="text-yellow-400">✨</span> Destaques
                        </h2>
                    </div>
                    <div className="px-2">
                        <DestaquesCarousel />
                    </div>
                </div>
            </section>

            {/* Features Grid - Stacks nicely on mobile */}
            <section className="relative py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 px-2">Recursos</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        <FeatureCard3D
                            to="/devocional"
                            icon={Heart}
                            title="Devocional"
                            subtitle="Inspiração Diária"
                            color="from-pink-500 to-rose-600"
                            delay={0}
                        />
                        <FeatureCard3D
                            to="/hinario"
                            icon={Music}
                            title="Hinário"
                            subtitle="Louvores"
                            color="from-purple-500 to-indigo-600"
                            delay={0.1}
                        />
                        <FeatureCard3D
                            to="/biblia"
                            icon={BookOpen}
                            title="Bíblia"
                            subtitle="Palavra Viva"
                            color="from-blue-500 to-cyan-600"
                            delay={0.2}
                        />
                        <FeatureCard3D
                            to="/estudos"
                            icon={GraduationCap}
                            title="Estudos"
                            subtitle="Aprofunde-se"
                            color="from-emerald-500 to-teal-600"
                            delay={0.3}
                        />
                        <FeatureCard3D
                            to="/cursos"
                            icon={Play}
                            title="Cursos VIP"
                            subtitle="Vídeo Aulas"
                            color="from-red-600 to-rose-700"
                            delay={0.35}
                        />
                    </div>
                </div>
            </section>

            {/* Departamentos Section */}
            <section className="relative py-4 px-4 pb-32">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 px-2">Departamentos</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        <FeatureCard3D
                            to="/desbravadores"
                            icon={Globe}
                            title="Desbravadores"
                            subtitle="Serviço e Aventura"
                            color="from-yellow-600 to-green-700"
                            delay={0.4}
                        />
                        <FeatureCard3D
                            to="/aventureiros"
                            icon={Heart}
                            title="Aventureiros"
                            subtitle="Por Jesus Semper"
                            color="from-orange-500 to-blue-500"
                            delay={0.5}
                        />
                        <FeatureCard3D
                            to="/jovens"
                            icon={Music}
                            title="Jovens"
                            subtitle="Energia e Fé"
                            color="from-indigo-600 to-purple-600"
                            delay={0.6}
                        />
                        <FeatureCard3D
                            to="/escola-sabatina"
                            icon={BookOpen}
                            title="Escola Sabatina"
                            subtitle="Estudo Diário"
                            color="from-slate-600 to-slate-800"
                            delay={0.7}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

// Optimized 3D Card for Touch/Mobile
function FeatureCard3D({ to, icon: Icon, title, subtitle, color, delay }) {
    return (
        <Link to={to} className="block h-full">
            <motion.div
                className="relative h-40 md:h-56 rounded-3xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay, duration: 0.5 }}
                whileTap={{ scale: 0.96 }}
            >
                {/* Dynamic Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80 transition-opacity duration-300`} />

                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/20 p-5 flex flex-col justify-between">

                    {/* Icon Header */}
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md shadow-inner">
                            <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                        </div>
                        {/* 3D decorative circle */}
                        <div className="w-12 h-12 rounded-full border-2 border-white/10 -mr-4 -mt-4 opacity-50" />
                    </div>

                    {/* Text Content */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">{title}</h3>
                        <p className="text-white/80 text-xs md:text-sm font-medium">{subtitle}</p>
                    </div>
                </div>

                {/* Touch Ripple / Hover Highlight */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
            </motion.div>
        </Link>
    );
}
