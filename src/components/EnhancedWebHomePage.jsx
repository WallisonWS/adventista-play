import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookText, Heart, Music, GraduationCap, 
  Globe, Volume2, Calendar, Sparkles
} from 'lucide-react';
import { 
  FloatingParticles3D, 
  Card3D, 
  Icon3D, 
  ResourceCard3D,
  Wave3D,
  Button3D
} from './3DAnimations';
import { ScrollReveal, StaggerChildren } from './ScrollReveal';
import { DestaquesCarousel } from './DestaquesCarousel';

/**
 * EnhancedWebHomePage
 * HomePage web com animações 3D fluidas e design moderno
 * Baseada nas imagens fornecidas com melhorias visuais
 */
export function EnhancedWebHomePage({ user }) {
  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        background: 'linear-gradient(180deg, #f0f4f8 0%, #e8eef5 50%, #f0f4f8 100%)'
      }}
    >
      {/* Partículas flutuantes 3D no fundo */}
      <FloatingParticles3D count={15} />

      {/* Hero Section Melhorada */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Gradiente de fundo */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(91, 127, 219, 0.1) 0%, transparent 50%)'
          }}
        />

        <div className="container mx-auto relative z-10">
          <ScrollReveal animation="fade">
            <div className="text-center max-w-4xl mx-auto">
              {/* Logo com animação 3D */}
              <motion.div
                initial={{ scale: 0, rotateY: -180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                  duration: 1
                }}
                className="mb-8 inline-block"
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotateY: 360
                  }}
                  transition={{ duration: 0.8 }}
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(91, 127, 219, 0.3))'
                  }}
                >
                  <img 
                    src="/logo-adventista-play-transparent.png" 
                    alt="Adventista Play" 
                    className="h-24 md:h-28"
                  />
                </motion.div>
              </motion.div>

              {/* Título com gradiente */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #2D4059 0%, #507D6D 50%, #5B7FDB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Bem-vindo ao <span style={{ 
                  background: 'linear-gradient(135deg, #5B7FDB 0%, #7CB342 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Adventista Play</span>
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl md:text-2xl mb-8"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Seu espaço para crescimento espiritual com devocionais, hinário, bíblia, estudos e projetos missionários
              </motion.p>

              {/* Botões com efeito 3D */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link to="/devocional">
                  <Button3D color="#5B7FDB">
                    Devocional do Dia
                  </Button3D>
                </Link>
                <Link to="/estudos">
                  <Button3D color="#507D6D">
                    Explorar Estudos
                  </Button3D>
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        {/* Onda decorativa */}
        <Wave3D />
      </section>

      {/* Seção: Destaques do Dia */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <ScrollReveal animation="slide-up">
            <div className="text-center mb-12">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="inline-block mb-4"
              >
                <Sparkles size={40} color="#EBB060" />
              </motion.div>
              <h2 
                className="text-3xl md:text-4xl font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #2D4059 0%, #5B7FDB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Destaques do Dia
              </h2>
            </div>
          </ScrollReveal>

          <DestaquesCarousel />
        </div>
      </section>

      {/* Seção: Recursos Principais */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <ScrollReveal animation="slide-up">
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              style={{ color: 'var(--color-primary)' }}
            >
              Recursos Principais
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ResourceCard3D
              icon={Heart}
              title="Devocional Diário"
              description="Meditações e reflexões para fortalecer sua fé todos os dias"
              link="/devocional"
              color="#E57373"
              delay={0}
            />

            <ResourceCard3D
              icon={Music}
              title="Hinário Adventista"
              description="Acesse todos os hinos do hinário adventista com letras completas"
              link="/hinario"
              color="#4DB6AC"
              delay={0.1}
            />

            <ResourceCard3D
              icon={BookText}
              title="Bíblia Sagrada"
              description="Leia e estude a Palavra de Deus com ferramentas de busca"
              link="/biblia"
              color="#5B7FDB"
              delay={0.2}
            />

            <ResourceCard3D
              icon={GraduationCap}
              title="Estudos Bíblicos"
              description="Lições da Escola Sabatina e estudos temáticos aprofundados"
              link="/estudos"
              color="#FF8A65"
              delay={0.3}
            />

            <ResourceCard3D
              icon={Globe}
              title="Projetos Missionários"
              description="Conheça e apoie missões ao redor do mundo"
              link="/projetos"
              color="#FFB74D"
              delay={0.4}
            />

            <ResourceCard3D
              icon={Volume2}
              title="Áudio Bíblia"
              description="Ouça a Palavra de Deus narrada com qualidade profissional"
              link="/biblia/audio"
              color="#9575CD"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Seção: Versículo do Dia com Card 3D */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal animation="scale">
            <Card3D>
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <p 
                    className="text-sm font-bold mb-4 tracking-wider"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    📖 VERSÍCULO DO DIA
                  </p>
                </motion.div>

                <p 
                  className="text-2xl md:text-3xl mb-6 italic font-serif"
                  style={{ 
                    color: 'var(--color-text-primary)',
                    lineHeight: '1.8'
                  }}
                >
                  "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus."
                </p>

                <p 
                  className="text-lg font-bold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Efésios 2:8
                </p>

                <div className="flex justify-center gap-4 mt-6">
                  <Button3D color="#5B7FDB">
                    Copiar
                  </Button3D>
                  <Button3D color="#4DB6AC">
                    Compartilhar
                  </Button3D>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>
        </div>
      </section>

      {/* Seção: Comunidade */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal animation="fade">
            <Card3D>
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block mb-4"
                >
                  <Icon3D icon={Heart} color="#E57373" size={40} />
                </motion.div>

                <h2 
                  className="text-3xl font-bold mb-4"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Conecte-se com outros membros
                </h2>

                <p 
                  className="text-lg mb-6"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Compartilhe sua jornada de fé e cresça junto com a comunidade adventista
                </p>

                {!user && (
                  <Link to="/login">
                    <Button3D color="#EBB060">
                      Criar Conta Gratuita
                    </Button3D>
                  </Link>
                )}
              </div>
            </Card3D>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
