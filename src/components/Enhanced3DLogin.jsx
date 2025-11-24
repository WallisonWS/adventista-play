import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { ChristianBackground3D } from './ChristianBackground3D';
import { loginUser } from '../services/authService';

/**
 * Enhanced3DLogin
 * Página de login moderna com animações 3D fluidas
 * Design inspirado no prompt fornecido, adaptado para português
 */
export function Enhanced3DLogin({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userData = await loginUser(formData.email, formData.senha);
      onLogin(userData);
      navigate('/');
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background 3D cristão */}
      <ChristianBackground3D />

      {/* Card de Login com animações 3D */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{
          duration: 0.6,
          type: 'spring',
          stiffness: 100
        }}
        className="w-full max-w-md relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        <motion.div
          whileHover={{
            rotateY: 2,
            rotateX: -2,
            scale: 1.02
          }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Logo */}
          <motion.div 
            className="flex flex-col items-center mb-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              whileHover={{
                scale: 1.1,
                rotateY: 360
              }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <img 
                src="/logo-adventista-play-transparent.png" 
                alt="Adventista Play" 
                className="h-20 w-auto"
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(91, 127, 219, 0.3))'
                }}
              />
            </motion.div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #2D4059 0%, #5B7FDB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Entrar
            </h1>
            <p className="text-sm text-gray-600">
              Acesse sua conta do Portal Adventista
            </p>
          </motion.div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo E-mail */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-[#5B7FDB] transition-all"
                />
              </div>
            </motion.div>

            {/* Campo Senha */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  required
                  className="pl-10 pr-10 h-12 rounded-xl border-2 border-gray-200 focus:border-[#5B7FDB] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Botão Entrar */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-xl font-semibold text-white bg-gradient-to-r from-[#5B7FDB] to-[#507D6D] hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{
                  boxShadow: '0 10px 30px rgba(91, 127, 219, 0.3)'
                }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    ⏳
                  </motion.div>
                ) : (
                  <>
                    <LogIn size={20} />
                    Entrar
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Link para Cadastro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center text-sm text-gray-600"
            >
              Não tem uma conta?{' '}
              <Link 
                to="/cadastro" 
                className="font-semibold text-[#5B7FDB] hover:text-[#507D6D] transition-colors"
              >
                Cadastre-se
              </Link>
            </motion.div>
          </form>
        </motion.div>

        {/* Efeito de brilho ao redor do card */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(91, 127, 219, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: -1
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
    </div>
  );
}
