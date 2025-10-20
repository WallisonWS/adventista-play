# Implementação de Áudio em Segundo Plano

## 📱 Visão Geral

Foi implementada uma solução híbrida para permitir que o Text-to-Speech (TTS) da Bíblia funcione em segundo plano no celular, permitindo que os usuários ouçam a leitura bíblica mesmo com a tela bloqueada ou o app minimizado.

## 🎯 Problema Resolvido

**Antes:** O componente `TextToSpeech` usava apenas a Web Speech API, que é pausada automaticamente quando o app vai para segundo plano ou a tela é bloqueada.

**Depois:** O novo componente `TextToSpeechBackground` oferece dois modos de operação:
1. **Modo Primeiro Plano**: Usa Web Speech API (gratuito, instantâneo)
2. **Modo Segundo Plano**: Converte o texto em áudio e usa Media Session API (permite controle na tela de bloqueio)

## 🔧 Tecnologias Utilizadas

### 1. Web Speech API
- Síntese de voz em tempo real
- Usado para reprodução em primeiro plano
- Gratuito e offline

### 2. MediaRecorder API
- Captura a saída do Web Speech API
- Grava o áudio em formato WebM
- Permite reprodução posterior

### 3. HTML Audio Element
- Reproduz o áudio gravado
- Suporta reprodução em segundo plano
- Compatível com controles do sistema

### 4. Media Session API
- Integração com controles nativos do SO
- Exibe informações na tela de bloqueio
- Permite controle via notificações

## 📋 Funcionalidades

### ✅ Modo Primeiro Plano
- ▶️ Reprodução instantânea
- ⏸️ Pausar/Retomar
- ⏹️ Parar
- 🎚️ Controle de velocidade (0.5x - 2.0x)
- 🔊 Controle de volume
- 🗣️ Seleção de voz

### ✅ Modo Segundo Plano
- 📱 Preparação de áudio para segundo plano
- 🔒 Reprodução com tela bloqueada
- 📲 Controles na tela de bloqueio
- 📊 Barra de progresso
- ⏩ Navegação no áudio
- 💾 Download do áudio gerado

## 🎨 Interface do Usuário

### Alerta Informativo
```
📱 Quer ouvir com a tela bloqueada?
Clique em "Preparar para Segundo Plano" para gerar um áudio 
que continuará tocando mesmo quando você minimizar o app 
ou bloquear a tela.
```

### Botões Principais
- **Reproduzir**: Inicia reprodução em primeiro plano
- **Preparar para Segundo Plano**: Gera áudio para reprodução em background
- **Baixar Áudio**: Salva o áudio gerado

### Indicadores de Status
- 🟢 "Modo Segundo Plano" (badge verde quando ativo)
- 🔊 Animação de volume durante reprodução
- ⏱️ Tempo decorrido / Tempo total

## 📝 Uso nos Componentes

### BibliaPage.jsx
```jsx
<TextToSpeechBackground 
  text={versiculos.map(v => `Versículo ${v.number}. ${v.text}`).join(' ')}
  title={`${livroAtual?.nome} ${capituloAtual}`}
/>
```

### DesbravadoresPage.jsx
```jsx
<TextToSpeechBackground 
  text={`${estudoSelecionado.titulo}. ${estudoSelecionado.descricao}...`}
  title={estudoSelecionado.titulo}
  compact={true}
/>
```

## 🔄 Fluxo de Funcionamento

### Modo Primeiro Plano
1. Usuário clica em "Reproduzir"
2. Web Speech API sintetiza voz em tempo real
3. Áudio é reproduzido imediatamente
4. ⚠️ Pausa se o app for minimizado

### Modo Segundo Plano
1. Usuário clica em "Preparar para Segundo Plano"
2. Web Speech API sintetiza o texto
3. MediaRecorder captura a saída de áudio
4. Áudio é salvo como Blob (WebM)
5. Audio Element reproduz o arquivo
6. Media Session API configura controles nativos
7. ✅ Continua tocando em segundo plano

## 🎛️ Media Session API - Controles

### Metadados Exibidos
- **Título**: Nome do capítulo/estudo
- **Artista**: "Adventista Play"
- **Álbum**: "Leitura Bíblica"
- **Artwork**: Logo do app

### Ações Suportadas
- ▶️ Play
- ⏸️ Pause
- ⏹️ Stop

### Atualização de Posição
- Atualiza a cada 300ms
- Exibe progresso na tela de bloqueio
- Permite navegação no áudio

## 🌐 Compatibilidade

### ✅ Suportado
- ✅ Android (Chrome, Edge, Samsung Internet)
- ✅ iOS 14.5+ (Safari)
- ✅ Desktop (Chrome, Edge, Safari)

### ⚠️ Limitações
- iOS pode ter restrições em PWAs não instaladas
- Alguns navegadores podem requerer interação do usuário antes de reproduzir

## 🚀 Melhorias Futuras

### Curto Prazo
- [ ] Cache de áudios gerados (evitar regeneração)
- [ ] Indicador de progresso durante geração
- [ ] Opção de cancelar geração

### Médio Prazo
- [ ] Integração com API de TTS externa (melhor qualidade)
- [ ] Suporte a múltiplas vozes premium
- [ ] Playlist de capítulos

### Longo Prazo
- [ ] Download offline de áudios pré-gerados
- [ ] Sincronização entre dispositivos
- [ ] Estatísticas de escuta

## 📦 Arquivos Modificados

### Novos Arquivos
- `src/components/TextToSpeechBackground.jsx` - Componente principal

### Arquivos Modificados
- `src/components/BibliaPage.jsx` - Atualizado para usar novo componente
- `src/components/DesbravadoresPage.jsx` - Atualizado para usar novo componente

### Arquivos Mantidos
- `src/components/TextToSpeech.jsx` - Mantido para compatibilidade
- `public/manifest.json` - Já configurado como PWA
- `public/sw.js` - Service Worker já ativo

## 🧪 Testes Recomendados

### Teste 1: Reprodução em Primeiro Plano
1. Abrir página da Bíblia
2. Clicar em "Reproduzir"
3. Verificar se áudio inicia imediatamente

### Teste 2: Modo Segundo Plano
1. Abrir página da Bíblia
2. Clicar em "Preparar para Segundo Plano"
3. Aguardar geração do áudio
4. Verificar se reprodução inicia automaticamente
5. Minimizar app
6. Verificar se áudio continua tocando
7. Bloquear tela
8. Verificar controles na tela de bloqueio

### Teste 3: Controles
1. Testar play/pause
2. Testar controle de velocidade
3. Testar controle de volume
4. Testar navegação no áudio (modo segundo plano)

### Teste 4: Download
1. Gerar áudio em modo segundo plano
2. Clicar em "Baixar Áudio"
3. Verificar se arquivo é baixado corretamente

## 💡 Dicas de Uso

### Para Usuários
- Use fones de ouvido para melhor experiência
- Prepare o áudio para segundo plano antes de iniciar atividades
- Baixe áudios para ouvir offline

### Para Desenvolvedores
- O componente é plug-and-play
- Aceita props `text`, `title`, `autoPlay` e `compact`
- Mantém compatibilidade com componente antigo

## 🐛 Troubleshooting

### Áudio não toca em segundo plano
- Verificar se o modo segundo plano foi ativado
- Verificar permissões do navegador
- Testar em navegador diferente

### Qualidade de voz ruim
- Selecionar voz Google ou Microsoft
- Verificar vozes disponíveis no dispositivo
- Considerar usar API externa de TTS

### Erro ao gerar áudio
- Verificar se há texto disponível
- Verificar se voz está selecionada
- Verificar console para erros específicos

## 📚 Referências

- [Media Session API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaSession)
- [Web Speech API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [MediaRecorder API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [Audio Player PWA Demo - Progressier](https://progressier.com/pwa-capabilities/audio-player-pwa)

## ✅ Conclusão

A implementação permite que usuários do Adventista Play ouçam a leitura bíblica em segundo plano, melhorando significativamente a experiência de uso em dispositivos móveis. A solução é gratuita, não requer APIs externas e funciona offline após a geração inicial do áudio.

