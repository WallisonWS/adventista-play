import * as Sentry from '@sentry/react';

/**
 * Componente de teste para verificar se o Sentry está funcionando
 * REMOVER EM PRODUÇÃO
 */
export default function SentryTestButton() {
  const testSentryError = () => {
    try {
      throw new Error("🧪 Teste do Sentry - Este é um erro proposital para verificar a integração");
    } catch (error) {
      Sentry.captureException(error);
      console.error("Erro enviado para o Sentry:", error);
      alert("Erro enviado para o Sentry! Verifique o painel em alguns segundos.");
    }
  };

  const testSentryMessage = () => {
    Sentry.captureMessage("📝 Mensagem de teste do Sentry", "info");
    console.log("Mensagem enviada para o Sentry");
    alert("Mensagem enviada para o Sentry! Verifique o painel em alguns segundos.");
  };

  // Só mostra em desenvolvimento
  if (import.meta.env.MODE !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '15px',
      backgroundColor: '#1a1a1a',
      border: '2px solid #ff4444',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    }}>
      <div style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
        🧪 Sentry Test (Dev Only)
      </div>
      <button
        onClick={testSentryError}
        style={{
          padding: '8px 12px',
          backgroundColor: '#ff4444',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '600'
        }}
      >
        Testar Erro
      </button>
      <button
        onClick={testSentryMessage}
        style={{
          padding: '8px 12px',
          backgroundColor: '#4444ff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '600'
        }}
      >
        Testar Mensagem
      </button>
    </div>
  );
}

