import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, GraduationCap, Star, Trophy, User } from 'lucide-react'
import { motion } from 'framer-motion'

export function BottomNav() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/biblia', icon: BookOpen, label: 'Bíblia' },
    { path: '/estudos', icon: GraduationCap, label: 'Estudos' },
    { path: '/desbravadores', icon: Star, label: 'Desbravadores' },
    { path: '/cursos', icon: Trophy, label: 'Cursos' },
    { path: '/perfil', icon: User, label: 'Perfil' }
  ]
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </motion.div>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

