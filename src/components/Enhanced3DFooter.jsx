import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Facebook, Instagram, 
  Youtube, Twitter, Heart, ExternalLink
} from 'lucide-react';

/**
 * Enhanced3DFooter
 * Rodapé moderno com animações 3D e melhor UX
 */
export function Enhanced3DFooter() {
  return (
    <footer className="relative bg-gradient-to-br from-[#2D4059] via-[#1a2332] to-[#2D4059] text-white overflow-hidden">
      {/* Padrão de fundo decorativo */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="footerPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 L50 100 M0 50 L100 50" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#footerPattern)"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Seção Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Sobre */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <motion.img 
                src="/logo-adventista-play-transparent.png" 
                alt="Adventista Play" 
                className="h-16 w-auto"
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 360,
                  filter: 'drop-shadow(0 0 20px rgba(235, 176, 96, 0.5))'
                }}
                transition={{ duration: 0.6 }}
                style={{
                  transformStyle: 'preserve-3d'
                }}
              />
              <div>
                <span className="font-bold text-2xl block group-hover:text-[#EBB060] transition-colors">
                  Adventista Play
                </span>
                <span className="text-xs opacity-70">Portal Adventista</span>
              </div>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              Fortalecendo a fé e conectando corações com a Palavra de Deus através de recursos digitais inspiradores.
            </p>
          </motion.div>

          {/* Links Rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                📚
              </motion.div>
              Links Rápidos
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/devocional', label: 'Devocional' },
                { to: '/hinario', label: 'Hinário' },
                { to: '/biblia', label: 'Bíblia' },
                { to: '/estudos', label: 'Estudos' },
                { to: '/projetos', label: 'Projetos' },
                { to: '/cursos', label: 'Cursos' }
              ].map((link, index) => (
                <motion.li 
                  key={link.to}
                  whileHover={{ x: 10, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.to} 
                    className="opacity-80 hover:opacity-100 hover:text-[#EBB060] transition-all flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contato */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📞
              </motion.div>
              Contato
            </h3>
            <ul className="space-y-4 text-sm">
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <Mail size={18} className="mt-1 text-[#EBB060]" />
                <a 
                  href="mailto:wallisonpereirade@gmail.com" 
                  className="opacity-80 hover:opacity-100 hover:text-[#EBB060] transition-colors"
                >
                  wallisonpereirade@gmail.com
                </a>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <Phone size={18} className="mt-1 text-[#EBB060]" />
                <a 
                  href="tel:+5562994251745" 
                  className="opacity-80 hover:opacity-100 hover:text-[#EBB060] transition-colors"
                >
                  (62) 99425-1745
                </a>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <MapPin size={18} className="mt-1 text-[#EBB060]" />
                <span className="opacity-80">
                  Brasil
                </span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Redes Sociais */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌐
              </motion.div>
              Redes Sociais
            </h3>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: '#', color: '#1877F2' },
                { Icon: Instagram, href: '#', color: '#E4405F' },
                { Icon: Youtube, href: '#', color: '#FF0000' },
                { Icon: Twitter, href: '#', color: '#1DA1F2' }
              ].map(({ Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.2, 
                    rotateY: 360,
                    backgroundColor: color
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:shadow-lg"
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3 text-sm">📧 Newsletter</h4>
              <p className="text-xs opacity-70 mb-3">
                Receba devocionais e novidades
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#EBB060] transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-md bg-[#EBB060] text-white font-semibold text-sm hover:bg-[#d99d4f] transition-colors"
                >
                  Enviar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divisor animado */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Copyright */}
        <motion.div 
          className="text-center text-sm opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="flex items-center justify-center gap-2 flex-wrap">
            © 2025 Portal Adventista. Todos os direitos reservados. 
            <span className="flex items-center gap-1">
              Desenvolvido com 
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} className="text-red-400 fill-current" />
              </motion.span>
              por Wallison Pereira
            </span>
          </p>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs">
            <Link to="/contato" className="hover:text-[#EBB060] transition-colors flex items-center gap-1">
              Formulário de Contato
              <ExternalLink size={12} />
            </Link>
            <span>•</span>
            <Link to="/feedback" className="hover:text-[#EBB060] transition-colors flex items-center gap-1">
              Feedback
              <ExternalLink size={12} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Efeito de brilho no rodapé */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#EBB060] to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </footer>
  );
}
