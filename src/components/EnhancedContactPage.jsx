import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Facebook, MessageCircle } from 'lucide-react';
import { Card3D, Button3D, FloatingParticles3D } from './3DAnimations';
import AuroraBackground from './21st-dev/AuroraBackground';
import { useDarkMode } from '../contexts/DarkModeContext';

export function EnhancedContactPage() {
    const { isDarkMode } = useDarkMode();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);
        // Simulate sending
        setTimeout(() => {
            setIsSending(false);
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-24">
            <AuroraBackground colorStops={["#10b981", "#3b82f6", "#8b5cf6"]} speed={0.5} />
            <FloatingParticles3D count={40} color="#ffffff" className="opacity-40" />

            <main className="relative z-10 container mx-auto px-4 py-8">
                {/* Header */}
                <div className="relative py-12 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg mb-4">
                        FALE CONOSCO
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto backdrop-blur-sm rounded-lg p-2">
                        Estamos aqui para ouvir você. Envie suas dúvidas, sugestões ou pedidos de oração.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                    {/* Contact Form */}
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        <Card3D className="p-8 bg-white/10 backdrop-blur-xl border-white/20">
                            <h2 className="text-3xl font-bold text-white mb-6">Envie uma Mensagem</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-white mb-2">Nome</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                                        placeholder="Seu nome completo"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                                        placeholder="seu@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-2">Assunto</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-green-400 transition-colors [&>option]:text-black"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    >
                                        <option value="">Selecione um assunto</option>
                                        <option value="duvida">Dúvida Geral</option>
                                        <option value="oracao">Pedido de Oração</option>
                                        <option value="suporte">Suporte Técnico</option>
                                        <option value="parceria">Parceria</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-white mb-2">Mensagem</label>
                                    <textarea
                                        required
                                        rows="4"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-green-400 transition-colors resize-none"
                                        placeholder="Escreva sua mensagem aqui..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <Button3D
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full bg-green-600 hover:bg-green-500 text-white py-4 text-lg font-bold flex items-center justify-center gap-2"
                                >
                                    {isSending ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send size={20} /> Enviar Mensagem
                                        </>
                                    )}
                                </Button3D>
                            </form>
                        </Card3D>
                    </motion.div>

                    {/* Contact Info & Socials */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        <Card3D className="p-6 bg-blue-900/40 border-blue-500/30">
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <MessageCircle className="text-blue-400" /> Canais de Atendimento
                            </h3>
                            <div className="space-y-4">
                                <ContactItem icon={Mail} title="Email" value="contato@adventistaplay.com" />
                                <ContactItem icon={Phone} title="WhatsApp" value="(11) 99999-9999" />
                                <ContactItem icon={MapPin} title="Localização" value="São Paulo, SP - Brasil" />
                            </div>
                        </Card3D>

                        <div className="grid grid-cols-2 gap-4">
                            <SocialCard icon={Instagram} label="Instagram" color="hover:text-pink-500" link="https://instagram.com" />
                            <SocialCard icon={Youtube} label="YouTube" color="hover:text-red-500" link="https://youtube.com" />
                            <SocialCard icon={Facebook} label="Facebook" color="hover:text-blue-600" link="https://facebook.com" />
                            <SocialCard icon={MessageCircle} label="Telegram" color="hover:text-blue-400" link="https://telegram.org" />
                        </div>

                        <Card3D className="p-6 bg-purple-900/40 border-purple-500/30 mt-6">
                            <h3 className="text-xl font-bold text-white mb-2">Horário de Atendimento</h3>
                            <p className="text-gray-300">Segunda à Quinta: 08h às 18h</p>
                            <p className="text-gray-300">Sexta: 08h às 12h</p>
                            <p className="text-gray-400 text-sm mt-2 italic">Não atendemos aos Sábados.</p>
                        </Card3D>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

const ContactItem = ({ icon: Icon, title, value }) => (
    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center shrink-0">
            <Icon className="text-blue-400" size={20} />
        </div>
        <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-white font-medium select-all">{value}</p>
        </div>
    </div>
);

const SocialCard = ({ icon: Icon, label, color, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer">
        <Card3D className="p-4 flex flex-col items-center justify-center gap-2 bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer group h-32">
            <Icon className={`w-8 h-8 text-gray-300 transition-colors duration-300 ${color} group-hover:scale-110`} />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</span>
        </Card3D>
    </a>
);
