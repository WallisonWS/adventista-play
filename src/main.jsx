import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as Sentry from '@sentry/react'

// Inicializar Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% das transações
  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% das sessões
  replaysOnErrorSampleRate: 1.0, // 100% quando ocorrer erro
  environment: import.meta.env.MODE,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
