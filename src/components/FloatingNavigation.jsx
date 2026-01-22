import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ArrowLeft, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function FloatingNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const isHome = location.pathname === '/';

    // Show button only when scrolled down or not on home
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100 || !isHome) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Initial check
        if (!isHome) setIsVisible(true);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    const handleHomeClick = () => {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    className="fixed bottom-24 right-6 z-50 flex flex-col gap-3"
                >
                    {/* Back Button (only if not on home) */}
                    {!isHome && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleBackClick}
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </motion.button>
                    )}

                    {/* Home Button (Main Action) */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleHomeClick}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl flex items-center justify-center text-white border border-white/20 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                        <Home size={24} fill="currentColor" />
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
