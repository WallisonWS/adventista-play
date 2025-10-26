// EXEMPLO: Como adicionar o componente de teste do Sentry no App.jsx
// 
// Este é um exemplo de como modificar o seu App.jsx para incluir o componente de teste.
// NÃO substitua seu App.jsx por este arquivo - use-o apenas como referência!

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// ... outras importações existentes ...

// ✅ ADICIONE ESTA IMPORTAÇÃO
import SentryTestButton from './components/SentryTestButton';

function App() {
  return (
    <Router>
      {/* Todo o seu código existente aqui */}
      
      <Routes>
        {/* Suas rotas */}
      </Routes>
      
      {/* ✅ ADICIONE ESTE COMPONENTE NO FINAL, ANTES DE FECHAR O Router */}
      <SentryTestButton />
    </Router>
  );
}

export default App;

// ═══════════════════════════════════════════════════════════════════════
// ALTERNATIVA: Se você não quiser modificar o App.jsx
// ═══════════════════════════════════════════════════════════════════════

// Você pode testar o Sentry diretamente via console do navegador:
//
// 1. Execute: npm run dev
// 2. Abra o navegador
// 3. Abra o Console (F12)
// 4. Cole este código:
//
//    throw new Error("Teste do Sentry");
//
// 5. Verifique o painel do Sentry em alguns segundos

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLO: Botão de teste inline (sem usar o componente)
// ═══════════════════════════════════════════════════════════════════════

import * as Sentry from '@sentry/react';

function QualquerComponente() {
  return (
    <div>
      {/* Seu conteúdo */}
      
      {/* Botão de teste - REMOVER EM PRODUÇÃO */}
      {import.meta.env.DEV && (
        <button
          onClick={() => {
            throw new Error("🧪 Teste do Sentry");
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 9999
          }}
        >
          Testar Sentry
        </button>
      )}
    </div>
  );
}

