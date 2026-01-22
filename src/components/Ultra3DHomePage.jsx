import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Heart, Music, BookOpen, GraduationCap,
    Globe, Play, Star, Sparkles, ChevronRight
} from 'lucide-react';
import { DestaquesCarousel } from './DestaquesCarousel';

// Simplified 3D Homepage without react-three/fiber
export function Ultra3DHomePage({ user }) {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Hero Section with 3D Effects */}
            <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMC00djJ6bTAtNHYyem0wLTR2MnptMC00djJ6bTAtNHYyem0wLTR2MnptMC00djJ6bTAtNHYyem0wLTR2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            Adventista Play
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Seu espaço para crescimento espiritual com devocionais, hinário, bíblia e estudos
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/devocional">
                                <motion.button
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold shadow-2xl hover:shadow-blue-500/50 transition-all"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Devocional do Dia
                                    <ChevronRight className="inline ml-2" />
                                </motion.button>
                            </Link>
                            <Link to="/biblia">
                                <motion.button
                                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Ler a Bíblia
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Floating Elements */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 20, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </section>

            {/* Destaques Section */}
            <section className="relative py-16 px-4 bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        ✨ Destaques do Dia
                    </motion.h2>
                    <DestaquesCarousel />
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard3D
                            to="/devocional"
                            icon={Heart}
                            title="Devocional"
                            color="from-red-500 to-pink-500"
                            delay={0}
                        />
                        <FeatureCard3D
                            to="/hinario"
                            icon={Music}
                            title="Hinário"
                            color="from-purple-500 to-indigo-500"
                            delay={0.1}
                        />
                        <FeatureCard3D
                            to="/biblia"
                            icon={BookOpen}
                            title="Bíblia"
                            color="from-blue-500 to-cyan-500"
                            delay={0.2}
                        />
                        <FeatureCard3D
                            to="/estudos"
                            icon={GraduationCap}
                            title="Estudos"
                            color="from-green-500 to-emerald-500"
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

// 3D Feature Card Component
function FeatureCard3D({ to, icon: Icon, title, color, delay }) {
    return (
        <Link to={to}>
            <motion.div
                className="relative group h-48 perspective-1000"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay, duration: 0.6 }}
                whileHover={{ y: -10 }}
            >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity rounded-3xl`} />

                {/* Card */}
                <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center transform-gpu transition-transform duration-300 group-hover:scale-105">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Icon className="w-16 h-16 text-white mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                </div>
            </motion.div>
        </Link>
    );
}
