import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Facebook, Instagram, 
  Youtube, Send, Heart, ExternalLink, BookOpen
} from 'lucide-react';

/**
 * Enhanced3DFooter
 * Rodapé redesenhado com design limpo e organizado (SEM EMOJIS)
 */
export function Enhanced3DFooter() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Linha decorativa no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Coluna 1: Logo e Descrição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/simbolo-adventista.png" 
                alt="Símbolo Adventista" 
                className="h-16 w-auto"
                style={{ filter: 'invert(1) brightness(1.5)' }}
              />
            </Link>
            <h3 className="text-xl font-bold">Adventista Play</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t('portal_adventista')}
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('footer_description')}
            </p>
          </motion.div>

          {/* Coluna 2: {t('quick_links')} */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <h4 className="text-lg font-semibold">{t('quick_links')}</h4>
            </div>
            <ul className="space-y-2">
              {[
                { to: '/devocional', label: t('devotional') },
                { to: '/hinario', label: t('hymnal') },
                { to: '/biblia', label: t('bible') },
                { to: '/estudos', label: t('studies') },
                { to: '/ellen-white', label: t('ellen_white') },
                { to: '/planos', label: t('plans') },
                { to: '/projetos', label: t('projects') },
                { to: '/cursos', label: t('courses') }
              ].map((link) => (
                <motion.li 
                  key={link.to}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={link.to}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-2"
                  >
                    <span className="text-blue-400">→</span>
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Coluna 3: {t('contact')} */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Phone className="h-5 w-5 text-blue-400" />
              <h4 className="text-lg font-semibold">{t('contact')}</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:wallisonpereirade@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm break-all"
                >
                  wallisonpereirade@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+5562994251745"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  (62) 99425-1745
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Brasil
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Coluna 4: {t('social_networks')} e {t('newsletter')} */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold mb-4">{t('social_networks')}</h4>
            <div className="flex space-x-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
            </div>

            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3">{t('newsletter')}</h5>
              <p className="text-xs text-gray-400 mb-3">
                {t('newsletter_description')}
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t('your_email')}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-l-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Linha divisória */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center space-y-2"
        >
          <p className="text-sm text-gray-400">
            {t('copyright', { year: currentYear })}
          </p>
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            Desenvolvido com{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              className="inline-block text-red-500"
            >
              <Heart className="h-3 w-3 inline fill-current" />
            </motion.span>
            {' '}por Wallison Pereira
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <Link to="/contato" className="hover:text-white transition-colors flex items-center gap-1">
              {t('contact_form')}
              <ExternalLink className="h-3 w-3" />
            </Link>
            <span>•</span>
            <Link to="/feedback" className="hover:text-white transition-colors flex items-center gap-1">
              {t('feedback')}
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
