import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookText, Heart, Music, GraduationCap, 
  Volume2, Calendar, Menu, Bell, Search
} from 'lucide-react';
import { ProgressCard, ResourceCard, WelcomeCard } from './ProgressCard';
import { ScrollReveal, StaggerChildren } from './ScrollReveal';
import { useState } from 'react';

/**
 * ImprovedHomePageDesktop
 * Versão desktop melhorada baseada na imagem fornecida
 * Com nova paleta de cores e animações suaves
 */
export function ImprovedHomePageDesktop({ user }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background-base)' }}
    >
      {/* Header */}
      <header 
        className="sticky top-0 z-50"
        style={{
          backgroundColor: 'var(--color-background-white)',
          borderBottom: '1px solid var(--color-background-soft)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <img 
                  src="/logo-adventista-play-transparent.png" 
                  alt="Adventista Play" 
                  className="h-10"
                />
              </motion.div>
            </Link>

            {/* Navegação Central */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/biblia">Bíblia</NavLink>
              <NavLink to="/devocional">Devocional</NavLink>
              <NavLink to="/hinario">Hinário</NavLink>
              <NavLink to="/estudos">Estudos</NavLink>
            </nav>

            {/* Ações */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'var(--color-background-soft)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Search size={20} color="var(--color-text-primary)" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'var(--color-background-soft)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Bell size={20} color="var(--color-text-primary)" />
              </motion.button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'var(--color-background-soft)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Menu size={20} color="var(--color-text-primary)" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <WelcomeCard 
              userName={user?.name}
              onCreateAccount={() => navigate('/login')}
            />

            {/* Cards de Progresso */}
            <ScrollReveal animation="slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProgressCard
                  icon={BookText}
                  title="A Bíblia em um ano"
                  subtitle="Lucas 9 a 11 - Continue sua jornada"
                  progress={81}
                  progressLabel="81% concluído"
                  link="/biblia/planos/um-ano"
                  color="#5B7FDB"
                  bgColor="rgba(91, 127, 219, 0.08)"
                />

                <ProgressCard
                  icon={Heart}
                  title="Meu devocional"
                  subtitle="256 de 365 - Reflexão diária"
                  progress={81}
                  progressLabel="81% concluído"
                  link="/devocional"
                  color="#E57373"
                  bgColor="rgba(229, 115, 115, 0.08)"
                />
              </div>
            </ScrollReveal>

            {/* Seção de Recursos */}
            <ScrollReveal animation="slide-up" delay={0.2}>
              <div>
                <h2 
                  className="text-2xl font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Recursos
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ResourceCard
                    icon={Volume2}
                    title="Áudio Bíblia"
                    link="/biblia/audio"
                    color="#9575CD"
                    delay={0}
                  />
                  <ResourceCard
                    icon={Music}
                    title="Louvores"
                    link="/hinario"
                    color="#4DB6AC"
                    delay={0.1}
                  />
                  <ResourceCard
                    icon={Calendar}
                    title="Estudos"
                    link="/estudos"
                    color="#FF8A65"
                    delay={0.2}
                  />
                  <ResourceCard
                    icon={GraduationCap}
                    title="Cursos"
                    link="/cursos"
                    color="#FFB74D"
                    delay={0.3}
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Versículo do Dia */}
            <ScrollReveal animation="scale" delay={0.3}>
              <motion.div
                whileHover={{ boxShadow: 'var(--shadow-lg)' }}
                style={{
                  backgroundColor: 'var(--color-background-white)',
                  borderRadius: 'var(--border-radius-xl)',
                  padding: 'var(--spacing-2xl)',
                  boxShadow: 'var(--shadow-md)',
                  borderLeft: '4px solid var(--color-accent)'
                }}
              >
                <p 
                  className="text-sm font-semibold mb-2"
                  style={{ color: 'var(--color-accent)' }}
                >
                  VERSÍCULO DO DIA
                </p>
                <p 
                  className="text-lg md:text-xl mb-3 italic"
                  style={{ 
                    color: 'var(--color-text-primary)',
                    lineHeight: '1.7'
                  }}
                >
                  "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, 
                  para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
                </p>
                <p 
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  João 3:16
                </p>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Estatísticas */}
            <ScrollReveal animation="slide-left">
              <motion.div
                whileHover={{ boxShadow: 'var(--shadow-lg)' }}
                style={{
                  backgroundColor: 'var(--color-background-white)',
                  borderRadius: 'var(--border-radius-lg)',
                  padding: 'var(--spacing-lg)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <h3 
                  className="text-lg font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Sua Jornada
                </h3>
                
                <div className="space-y-4">
                  <StatItem
                    label="Dias consecutivos"
                    value="42"
                    icon="🔥"
                  />
                  <StatItem
                    label="Capítulos lidos"
                    value="156"
                    icon="📖"
                  />
                  <StatItem
                    label="Hinos cantados"
                    value="89"
                    icon="🎵"
                  />
                  <StatItem
                    label="Estudos concluídos"
                    value="12"
                    icon="✅"
                  />
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Próximos Eventos */}
            <ScrollReveal animation="slide-left" delay={0.2}>
              <motion.div
                whileHover={{ boxShadow: 'var(--shadow-lg)' }}
                style={{
                  backgroundColor: 'var(--color-background-white)',
                  borderRadius: 'var(--border-radius-lg)',
                  padding: 'var(--spacing-lg)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <h3 
                  className="text-lg font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Próximos Eventos
                </h3>
                
                <div className="space-y-3">
                  <EventItem
                    title="Escola Sabatina"
                    date="Sábado, 9:00"
                    color="var(--color-primary)"
                  />
                  <EventItem
                    title="Culto de Oração"
                    date="Quarta, 19:30"
                    color="var(--color-secondary)"
                  />
                  <EventItem
                    title="Pequeno Grupo"
                    date="Sexta, 20:00"
                    color="var(--color-accent)"
                  />
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'var(--color-background-white)',
          borderTop: '1px solid var(--color-background-soft)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div className="flex justify-around items-center py-3">
          <BottomNavItem icon={<BookText size={24} />} label="Início" to="/" />
          <BottomNavItem icon={<BookText size={24} />} label="Bíblia" to="/biblia" />
          <BottomNavItem icon={<GraduationCap size={24} />} label="Estudos" to="/estudos" />
          <BottomNavItem icon={<Calendar size={24} />} label="Cursos" to="/cursos" />
          <BottomNavItem icon={<Heart size={24} />} label="Perfil" to="/perfil" />
        </div>
      </nav>
    </div>
  );
}

// Componentes auxiliares
function NavLink({ to, children }) {
  return (
    <Link to={to}>
      <motion.span
        whileHover={{ color: 'var(--color-accent)' }}
        style={{
          color: 'var(--color-text-primary)',
          fontWeight: 500,
          transition: 'color var(--transition-base)'
        }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

function StatItem({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
      </div>
      <span 
        className="text-lg font-bold"
        style={{ color: 'var(--color-primary)' }}
      >
        {value}
      </span>
    </div>
  );
}

function EventItem({ title, date, color }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center gap-3"
    >
      <div 
        style={{
          width: '4px',
          height: '40px',
          backgroundColor: color,
          borderRadius: 'var(--border-radius-full)'
        }}
      />
      <div>
        <p 
          className="font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {title}
        </p>
        <p 
          className="text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {date}
        </p>
      </div>
    </motion.div>
  );
}

function BottomNavItem({ icon, label, to }) {
  return (
    <Link to={to}>
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center gap-1"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {icon}
        <span className="text-xs">{label}</span>
      </motion.div>
    </Link>
  );
}
