import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importe seus arquivos de tradução
import ptTranslation from './locales/pt/translation.json';
import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';

const resources = {
  pt: {
    translation: ptTranslation,
  },
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

i18n
  // Detecta a linguagem do usuário
  .use(LanguageDetector)
  // Passa a instância i18n para o react-i18next
  .use(initReactI18next)
  // Inicializa o i18next
  .init({
    resources,
    fallbackLng: 'pt', // Linguagem padrão caso a detectada não esteja disponível
    debug: false, // Desativar em produção

    interpolation: {
      escapeValue: false, // Não é necessário para React
    },
    
    detection: {
        // Ordem de detecção de linguagem
        order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        // Ignorar a detecção de linguagem do navegador para forçar a transição manual/por URL
        // Mas vamos manter a detecção para a primeira carga
        checkWhitelist: true
    }
  });

export default i18n;
