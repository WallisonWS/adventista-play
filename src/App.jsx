import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ThemeProvider } from './contexts/ThemeContext';
import { DarkModeProvider } from './contexts/DarkModeContext.jsx';
import { useIsMobile } from './hooks/useIsMobile.js';
import { getCurrentUser, logoutUser } from './services/authService.js';

// Import 3D Components
import { ChristianBackground3D, ChristianBackground3DMobile } from './components/ChristianBackground3D.jsx';
import Dock from './components/21st-dev/Dock';
import { Enhanced3DFooter } from './components/Enhanced3DFooter.jsx';

// Import Pages
import { Ultra3DHomePage } from './components/Ultra3DHomePage.jsx';
import { Enhanced3DLogin } from './components/Enhanced3DLogin.jsx';
import { Enhanced3DRegister } from './components/Enhanced3DRegister.jsx';
import { Enhanced3DBiblePage } from './components/Enhanced3DBiblePage.jsx';
import { EnhancedHinarioPage } from './components/EnhancedHinarioPage.jsx';
import { EnhancedDevocionalPage } from './components/EnhancedDevocionalPage.jsx';
import { EnhancedEstudosPage } from './components/EnhancedEstudosPage.jsx';
import { EnhancedDesbravadoresPage } from './components/EnhancedDesbravadoresPage.jsx';
import { EnhancedAventureirosPage } from './components/EnhancedAventureirosPage.jsx';
import { EnhancedJovensPage } from './components/EnhancedJovensPage.jsx';
import { EnhancedEscolaSabatinaPage } from './components/EnhancedEscolaSabatinaPage.jsx';
import { EnhancedCursosPage } from './components/EnhancedCursosPage.jsx';

// ... (other code)


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-slate-900 text-white h-screen flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Erro Fatal</h1>
          <p className="mb-4">Ocorreu um erro crítico na aplicação.</p>
          <pre className="bg-black/50 p-4 rounded text-sm text-red-300 mb-6 max-w-2xl overflow-auto">
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
            Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading Fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-medium">Carregando experiência 3D...</p>
    </div>
  </div>
);

// App Content with 3D Background
function AppContent() {
  const [user, setUser] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative">
      {/* 3D Background - Wrapped in ErrorBoundary */}
      <ErrorBoundary>
        <Suspense fallback={null}>
          {isMobile ? <ChristianBackground3DMobile /> : <ChristianBackground3D />}
        </Suspense>
      </ErrorBoundary>

      {/* Main Content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Ultra3DHomePage user={user} />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/login" element={
            <ErrorBoundary>
              <Enhanced3DLogin onLogin={handleLogin} />
            </ErrorBoundary>
          } />
          <Route path="/cadastro" element={
            <ErrorBoundary>
              <Enhanced3DRegister onLogin={handleLogin} />
            </ErrorBoundary>
          } />
          <Route path="/biblia" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Enhanced3DBiblePage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/hinario" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <EnhancedHinarioPage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/devocional" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <EnhancedDevocionalPage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/estudos" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <EnhancedEstudosPage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/desbravadores" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <EnhancedDesbravadoresPage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/aventureiros" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <EnhancedAventureirosPage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/jovens" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <EnhancedJovensPage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/escola-sabatina" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <EnhancedEscolaSabatinaPage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/cursos" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <EnhancedCursosPage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="*" element={
            <div className="h-screen flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-xl mb-4">Página em construção</p>
                <Link to="/" className="text-blue-400 hover:underline">Voltar ao início</Link>
              </div>
            </div>
          } />
        </Routes>
      </div>

      {/* Dock Navigation */}
      <ErrorBoundary>
        <Dock onItemClick={(id) => {
          if (id === 'home') window.location.href = '/';
          else if (id === 'bible') window.location.href = '/biblia';
          else if (id === 'profile') window.location.href = '/perfil';
        }} />
      </ErrorBoundary>

      {/* Footer */}
      <ErrorBoundary>
        <Enhanced3DFooter />
      </ErrorBoundary>
    </div>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <DarkModeProvider>
        <ThemeProvider>
          <Router>
            <ErrorBoundary>
              <Toaster position="top-center" toastOptions={{
                duration: 3000,
                style: { background: '#363636', color: '#fff' },
              }} />
              <Suspense fallback={<LoadingFallback />}>
                <AppContent />
              </Suspense>
            </ErrorBoundary>
          </Router>
        </ThemeProvider>
      </DarkModeProvider>
    </I18nextProvider>
  );
}

export default App;