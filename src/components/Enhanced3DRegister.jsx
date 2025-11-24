import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input.jsx';
import { ChristianBackground3D } from './ChristianBackground3D';
import { registerUser } from '../services/authService';

/**
 * Enhanced3DRegister
 * Página de cadastro moderna com animações 3D fluidas
 */
export function Enhanced3DRegister({ onLogin }) {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = await registerUser(
        formData.nome,
        formData.email,
        formData.senha,
        parseInt(formData.idade)
      );
      onLogin(userData);
      navigate('/');
    } catch (error) {
      alert('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background 3D cristão */}
      <ChristianBackground3D />

      {/* Card de Cadastro com animações 3D */}
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
                  filter: 'drop-shadow(0 10px 20px rgba(80, 125, 109, 0.3))'
                }}
              />
            </motion.div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #507D6D 0%, #7CB342 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Criar Conta
            </h1>
            <p className="text-sm text-gray-600">
              Cadastre-se gratuitamente no Portal Adventista
            </p>
          </motion.div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Nome */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-[#507D6D] transition-all"
                />
              </div>
            </motion.div>

            {/* Campo Idade */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Idade
              </label>
              <div className="relative">
                <Calendar 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="number"
                  placeholder="Sua idade"
                  value={formData.idade}
                  onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                  required
                  min="1"
                  max="120"
                  className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-[#507D6D] transition-all"
                />
              </div>
            </motion.div>

            {/* Campo E-mail */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
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
                  className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-[#507D6D] transition-all"
                />
              </div>
            </motion.div>

            {/* Campo Senha */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
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
                  className="pl-10 pr-10 h-12 rounded-xl border-2 border-gray-200 focus:border-[#507D6D] transition-all"
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

            {/* Campo Confirmar Senha */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmarSenha}
                  onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                  required
                  className="pl-10 pr-10 h-12 rounded-xl border-2 border-gray-200 focus:border-[#507D6D] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Botão Criar Conta */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-xl font-semibold text-white bg-gradient-to-r from-[#507D6D] to-[#7CB342] hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{
                  boxShadow: '0 10px 30px rgba(80, 125, 109, 0.3)'
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
                    <UserPlus size={20} />
                    Criar Conta
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Link para Login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center text-sm text-gray-600"
            >
              Já tem uma conta?{' '}
              <Link 
                to="/login" 
                className="font-semibold text-[#507D6D] hover:text-[#7CB342] transition-colors"
              >
                Faça login
              </Link>
            </motion.div>
          </form>
        </motion.div>

        {/* Efeito de brilho ao redor do card */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(80, 125, 109, 0.1) 0%, transparent 70%)',
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
