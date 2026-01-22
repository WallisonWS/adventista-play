import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Church, ShoppingBag, Globe, Youtube, Radio, ExternalLink, Smartphone } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D } from './3DAnimations';
import AuroraBackground from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';

export function EnhancedResourcesPage() {
    const { isDarkMode } = useDarkMode();
    const [activeTab, setActiveTab] = useState('iasd');

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-24">
            <AuroraBackground
                colorStops={isDarkMode ? ["#000000", "#1a1a2e", "#16213e"] : ["#f0f9ff", "#e0f2fe", "#bae6fd"]}
                speed={0.4}
            />
            <FloatingParticles3D count={20} color="#3b82f6" />

            <main className="relative z-10 container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 drop-shadow-sm">
                        RECURSOS ADVENTISTAS
                    </h1>
                    <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Materiais oficiais, notícias e produtos da igreja.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-10 gap-4">
                    <button
                        onClick={() => setActiveTab('iasd')}
                        className={`px-8 py-3 rounded-full font-bold text-lg transition-all flex items-center gap-2 ${activeTab === 'iasd' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white/10 text-gray-500 hover:bg-white/20'}`}
                    >
                        <Church size={20} /> IASD
                    </button>
                    <button
                        onClick={() => setActiveTab('abc')}
                        className={`px-8 py-3 rounded-full font-bold text-lg transition-all flex items-center gap-2 ${activeTab === 'abc' ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white/10 text-gray-500 hover:bg-white/20'}`}
                    >
                        <ShoppingBag size={20} /> ABC / CPB
                    </button>
                    <button
                        onClick={() => setActiveTab('novotempo')}
                        className={`px-8 py-3 rounded-full font-bold text-lg transition-all flex items-center gap-2 ${activeTab === 'novotempo' ? 'bg-orange-600 text-white shadow-lg scale-105' : 'bg-white/10 text-gray-500 hover:bg-white/20'}`}
                    >
                        <Radio size={20} /> Novo Tempo
                    </button>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'iasd' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <ResourceCard
                                    icon={Globe}
                                    title="Portal Adventista"
                                    desc="Notícias e informações oficiais da IASD na América do Sul."
                                    link="https://www.adventistas.org/pt/"
                                    color="bg-blue-500"
                                />
                                <ResourceCard
                                    icon={Book}
                                    title="Revista Adventista"
                                    desc="Artigos teológicos, notícias e inspiração."
                                    link="https://www.revistaadventista.com.br/"
                                    color="bg-blue-400"
                                />
                                <ResourceCard
                                    icon={Smartphone}
                                    title="7Me - Membresia"
                                    desc="Aplicativo para membros: dízimos, ofertas e pedidos de oração."
                                    link="https://play.google.com/store/apps/details?id=org.adventistas.sevenme"
                                    color="bg-blue-600"
                                />
                            </div>
                        )}

                        {activeTab === 'abc' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <ResourceCard
                                    icon={ShoppingBag}
                                    title="Loja CPB"
                                    desc="Livros, lições, devocionais e materiais para a igreja."
                                    link="https://www.cpb.com.br/"
                                    color="bg-indigo-500"
                                />
                                <ResourceCard
                                    icon={Book}
                                    title="Lição da Escola Sabatina"
                                    desc="Assinaturas e materiais auxiliares para professores."
                                    link="https://www.cpb.com.br/categoria/escola-sabatina"
                                    color="bg-indigo-400"
                                />
                                <ResourceCard
                                    icon={Globe}
                                    title="Casa Publicadora"
                                    desc="Conheça a editora oficial da Igreja Adventista no Brasil."
                                    link="https://www.cpb.com.br/institucional"
                                    color="bg-indigo-600"
                                />
                            </div>
                        )}

                        {activeTab === 'novotempo' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <ResourceCard
                                    icon={Youtube}
                                    title="TV Novo Tempo"
                                    desc="Assista ao vivo a programação da TV da Esperança."
                                    link="https://www.novotempo.com/tv"
                                    color="bg-red-600"
                                />
                                <ResourceCard
                                    icon={Radio}
                                    title="Rádio Novo Tempo"
                                    desc="Ouvindo a voz da esperança 24h por dia."
                                    link="https://www.novotempo.com/radio"
                                    color="bg-orange-500"
                                />
                                <ResourceCard
                                    icon={Book}
                                    title="Escola Bíblica"
                                    desc="Solicite estudos bíblicos gratuitos."
                                    link="https://biblia.com.br/"
                                    color="bg-blue-500"
                                />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

function ResourceCard({ icon: Icon, title, desc, link, color }) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
            <Card3D className="h-full p-6 hover:bg-white/5 border-white/10 group transition-colors">
                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    {title} <ExternalLink size={16} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-400 leading-relaxed">
                    {desc}
                </p>
            </Card3D>
        </a>
    );
}
