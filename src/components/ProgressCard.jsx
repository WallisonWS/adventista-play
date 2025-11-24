import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * ProgressCard - Card animado para exibir progresso de leitura/estudos
 * Baseado no design da imagem fornecida
 */
export function ProgressCard({ 
  icon: Icon,
  title, 
  subtitle, 
  progress, 
  progressLabel,
  link,
  color = 'var(--color-primary)',
  bgColor
}) {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{ 
          y: -4, 
          boxShadow: 'var(--shadow-lg)' 
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="progress-card"
        style={{
          backgroundColor: bgColor || 'var(--color-background-white)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--spacing-lg)',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Ícone */}
        <div className="flex items-start justify-between mb-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--border-radius-md)',
              backgroundColor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            <Icon size={24} />
          </motion.div>
          
          <motion.div
            whileHover={{ x: 4 }}
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ChevronRight size={20} />
          </motion.div>
        </div>

        {/* Título e Subtítulo */}
        <div className="mb-3">
          <h3 
            className="text-lg font-semibold mb-1"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {subtitle}
          </p>
        </div>

        {/* Barra de Progresso */}
        <div className="mb-2">
          <div 
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--color-background-soft)',
              borderRadius: 'var(--border-radius-full)',
              overflow: 'hidden'
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              style={{
                height: '100%',
                backgroundColor: color,
                borderRadius: 'var(--border-radius-full)'
              }}
            />
          </div>
        </div>

        {/* Label de Progresso */}
        <p 
          className="text-sm font-medium"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {progressLabel || `${progress}% concluído`}
        </p>

        {/* Efeito de brilho ao hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            background: `linear-gradient(135deg, transparent 0%, ${color}10 100%)`
          }}
        />
      </motion.div>
    </Link>
  );
}

/**
 * ResourceCard - Card para recursos (Áudio Bíblia, Louvores, Estudos)
 */
export function ResourceCard({ 
  icon: Icon, 
  title, 
  link, 
  color = 'var(--color-primary)',
  delay = 0 
}) {
  return (
    <Link to={link}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: 'var(--shadow-lg)'
        }}
        whileTap={{ scale: 0.95 }}
        className="resource-card"
        style={{
          backgroundColor: color,
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--spacing-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--spacing-sm)',
          minHeight: '120px',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-md)',
          transition: 'all var(--transition-base)'
        }}
      >
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={32} color="white" />
        </motion.div>
        <span 
          className="text-sm font-semibold text-center"
          style={{ color: 'white' }}
        >
          {title}
        </span>
      </motion.div>
    </Link>
  );
}

/**
 * WelcomeCard - Card de boas-vindas com imagem de fundo
 */
export function WelcomeCard({ userName, onCreateAccount }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="welcome-card relative overflow-hidden"
      style={{
        borderRadius: 'var(--border-radius-xl)',
        padding: 'var(--spacing-2xl)',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        boxShadow: 'var(--shadow-xl)',
        position: 'relative'
      }}
    >
      {/* Padrão de fundo */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Boa tarde! 👋
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'white' }}>
            {userName ? `Olá, ${userName}` : 'Olá, Visitante'}
          </h2>
          <p className="text-base mb-6" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Vamos passar tempo com Deus? 🙏
          </p>
        </motion.div>

        {!userName && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateAccount}
            className="btn-primary"
            style={{
              backgroundColor: 'white',
              color: 'var(--color-primary)',
              padding: '12px 24px',
              borderRadius: 'var(--border-radius-md)',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            Criar Conta
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
