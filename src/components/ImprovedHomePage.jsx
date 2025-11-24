import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookText, Heart, Music, GraduationCap, 
  Globe, Calendar, Star, Play, ChevronRight 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ScrollReveal, StaggerChildren } from './ScrollReveal';
import { VersiculoDoDia } from './VersiculoDoDia';

/**
 * HomePage Melhorada
 * Baseada nas sugestões do Gemini 3
 * - Nova paleta de cores
 * - Animações suaves
 * - Melhor hierarquia visual
 * - UX otimizado
 */
export function ImprovedHomePage({ user }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background-base)' }}>
      {/* Hero Section Melhorada */}
      <section className="hero-section-improved relative overflow-hidden">
        {/* Background com gradiente suave */}
        <div 
          className="absolute inset-0 bg-gradient-to-br"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            opacity: 0.95
          }}
        />
        
        {/* Padrão de fundo sutil */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <ScrollReveal animation="fade" duration={0.8}>
            <div className="text-center text-white max-w-4xl mx-auto">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mb-8"
              >
                <img 
                  src="/logo-adventista-play-transparent.png" 
                  alt="Adventista Play" 
                  className="h-24 md:h-32 mx-auto"
                />
              </motion.div>

              {/* Título Principal */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Bem-vindo ao <span style={{ color: 'var(--color-accent)' }}>Adventista Play</span>
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl mb-8 opacity-90"
              >
                Sua jornada de crescimento espiritual começa aqui
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link to="/devocional">
                  <Button 
                    size="lg" 
                    className="btn-primary text-lg px-8 py-6 group"
                  >
                    Devocional do Dia
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/biblia">
                  <Button 
                    size="lg" 
                    className="btn-secondary text-lg px-8 py-6"
                    style={{ 
                      backgroundColor: 'transparent',
                      borderColor: 'white',
                      color: 'white'
                    }}
                  >
                    Ler a Bíblia
                  </Button>
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        {/* Ondas decorativas no fundo */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" 
              fill="var(--color-background-base)"
            />
          </svg>
        </div>
      </section>

      {/* Seção: Nossos Pilares */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <ScrollReveal animation="slide-up">
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-4"
              style={{ color: 'var(--color-primary)' }}
            >
              Encontre inspiração e conhecimento
            </h2>
            <p 
              className="text-center mb-12 text-lg"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Explore nossos principais recursos para fortalecer sua fé
            </p>
          </ScrollReveal>

          <StaggerChildren staggerDelay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <PillarCard
                icon={<BookText className="h-10 w-10" />}
                title="Bíblia Sagrada"
                description="Estude a Palavra de Deus a qualquer hora"
                link="/biblia"
                color="var(--color-primary)"
              />
              <PillarCard
                icon={<Heart className="h-10 w-10" />}
                title="Devocionais"
                description="Mensagens diárias para sua fé"
                link="/devocional"
                color="var(--color-accent)"
              />
              <PillarCard
                icon={<Music className="h-10 w-10" />}
                title="Hinário"
                description="Cante louvores ao Senhor"
                link="/hinario"
                color="var(--color-secondary)"
              />
              <PillarCard
                icon={<GraduationCap className="h-10 w-10" />}
                title="Estudos Bíblicos"
                description="Aprofunde seu conhecimento"
                link="/estudos"
                color="var(--color-primary)"
              />
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* Seção: Acesso Rápido */}
      <section className="py-16 px-4" style={{ backgroundColor: 'var(--color-background-soft)' }}>
        <div className="container mx-auto">
          <ScrollReveal animation="slide-up">
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              style={{ color: 'var(--color-primary)' }}
            >
              Acesso Rápido
            </h2>
          </ScrollReveal>

          <StaggerChildren staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <QuickAccessCard
                icon={<Calendar />}
                title="Planos de Leitura"
                description="Continue sua jornada pela Bíblia"
                link="/planos"
              />
              <QuickAccessCard
                icon={<Star />}
                title="Desbravadores"
                description="Recursos para jovens adventistas"
                link="/desbravadores"
              />
              <QuickAccessCard
                icon={<Globe />}
                title="Projetos Missionários"
                description="Conheça missões ao redor do mundo"
                link="/projetos"
              />
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* Versículo do Dia */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal animation="scale">
            <VersiculoDoDia />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Final */}
      {!user && (
        <section 
          className="py-20 px-4 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
          }}
        >
          <div className="container mx-auto text-center relative z-10">
            <ScrollReveal animation="fade">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Comece sua jornada espiritual hoje
              </h2>
              <p className="text-xl text-white opacity-90 mb-8">
                Cadastre-se gratuitamente e tenha acesso a todos os recursos
              </p>
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="btn-primary text-lg px-8 py-6"
                >
                  Criar Conta Gratuita
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}
    </div>
  );
}

// Componente PillarCard
function PillarCard({ icon, title, description, link, color }) {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="pillar-card h-full"
        style={{
          backgroundColor: 'var(--color-background-white)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--spacing-xl)',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer',
          transition: 'all var(--transition-base)'
        }}
      >
        <div 
          className="icon-wrapper mb-4"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--border-radius-md)',
            backgroundColor: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color
          }}
        >
          {icon}
        </div>
        <h3 
          className="text-xl font-bold mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {title}
        </h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {description}
        </p>
      </motion.div>
    </Link>
  );
}

// Componente QuickAccessCard
function QuickAccessCard({ icon, title, description, link }) {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        style={{
          backgroundColor: 'var(--color-background-white)',
          borderRadius: 'var(--border-radius-md)',
          padding: 'var(--spacing-lg)',
          boxShadow: 'var(--shadow-sm)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-md)',
          transition: 'all var(--transition-base)'
        }}
      >
        <div 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--border-radius-md)',
            backgroundColor: 'var(--color-accent)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {icon}
        </div>
        <div>
          <h4 
            className="font-semibold mb-1"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </h4>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
