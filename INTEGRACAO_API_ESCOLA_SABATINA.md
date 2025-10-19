# Integração com API da Escola Sabatina

## Objetivo
Atualizar automaticamente as lições da Escola Sabatina semanalmente usando a API oficial do Adventech.

## API Oficial
- **URL Base**: `https://sabbath-school.adventech.io/api/v2/`
- **Repositório GitHub**: https://github.com/Adventech/sabbath-school-lessons
- **Documentação**: https://sabbath-school.adventech.io/

## Endpoints Principais

### 1. Listar Trimestres (Quarterlies)
```
GET /api/v2/{language}/quarterlies
```
Exemplo: `https://sabbath-school.adventech.io/api/v2/pt/quarterlies`

### 2. Obter Lições de um Trimestre
```
GET /api/v2/{language}/quarterlies/{quarterly_id}/lessons
```
Exemplo: `https://sabbath-school.adventech.io/api/v2/pt/quarterlies/2025-04/lessons`

### 3. Obter Conteúdo de uma Lição
```
GET /api/v2/{language}/quarterlies/{quarterly_id}/lessons/{lesson_id}
```

## Implementação Recomendada

### Script de Atualização Semanal

Criar um script `update-escola-sabatina.js` que:

1. **Busca o trimestre atual** baseado na data
2. **Obtém as lições do trimestre**
3. **Atualiza o arquivo** `src/data/escola-sabatina-licoes.js`
4. **Faz commit e push** automaticamente

### Exemplo de Código

```javascript
// update-escola-sabatina.js
import fetch from 'node-fetch';
import fs from 'fs';

const API_BASE = 'https://sabbath-school.adventech.io/api/v2';
const LANGUAGE = 'pt';

async function getCurrentQuarterly() {
  const response = await fetch(`${API_BASE}/${LANGUAGE}/quarterlies`);
  const quarterlies = await response.json();
  
  // Pegar o trimestre mais recente
  return quarterlies[0];
}

async function getLessons(quarterlyId) {
  const response = await fetch(`${API_BASE}/${LANGUAGE}/quarterlies/${quarterlyId}/lessons`);
  return await response.json();
}

async function updateLessons() {
  try {
    const quarterly = await getCurrentQuarterly();
    const lessons = await getLessons(quarterly.id);
    
    // Formatar dados para o formato do projeto
    const formattedData = {
      trimestre: quarterly.title,
      tema: quarterly.description,
      licoes: lessons.map(lesson => ({
        numero: lesson.index,
        titulo: lesson.title,
        versiculo: lesson.memory_verse,
        data: lesson.start_date,
        // ... outros campos
      }))
    };
    
    // Salvar no arquivo
    const fileContent = `export const licoesEscolaSabatina = ${JSON.stringify(formattedData, null, 2)};\n`;
    fs.writeFileSync('src/data/escola-sabatina-licoes.js', fileContent);
    
    console.log('✅ Lições atualizadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao atualizar lições:', error);
  }
}

updateLessons();
```

### Automatização com GitHub Actions

Criar `.github/workflows/update-escola-sabatina.yml`:

```yaml
name: Atualizar Escola Sabatina

on:
  schedule:
    # Executar todo sábado às 00:00 UTC
    - cron: '0 0 * * 6'
  workflow_dispatch: # Permitir execução manual

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install node-fetch
      
      - name: Update lessons
        run: node update-escola-sabatina.js
      
      - name: Commit and push if changed
        run: |
          git config --global user.name 'GitHub Actions'
          git config --global user.email 'actions@github.com'
          git add src/data/escola-sabatina-licoes.js
          git diff --quiet && git diff --staged --quiet || (git commit -m "chore: Atualiza lições da Escola Sabatina" && git push)
```

## Status Atual

⚠️ **Nota**: A API estava com problemas de acesso durante a verificação (18/10/2025). 

**Próximos Passos**:
1. Verificar se a API voltou a funcionar
2. Implementar o script de atualização
3. Configurar GitHub Actions para automação semanal
4. Testar a integração completa

## Alternativa Manual

Enquanto a API não estiver disponível, as lições podem ser atualizadas manualmente:

1. Acessar https://sabbath-school.adventech.io/
2. Copiar o conteúdo das lições
3. Atualizar o arquivo `src/data/escola-sabatina-licoes.js`
4. Fazer commit e push

## Benefícios da Integração

✅ **Atualização Automática**: Lições sempre atualizadas sem intervenção manual
✅ **Conteúdo Oficial**: Dados direto da fonte oficial da Igreja Adventista
✅ **Múltiplos Idiomas**: Suporte para português e outros idiomas
✅ **Histórico Completo**: Acesso a trimestres anteriores
✅ **Sem Manutenção**: Uma vez configurado, funciona automaticamente

## Referências

- [Sabbath School API](https://sabbath-school.adventech.io/)
- [GitHub Repository](https://github.com/Adventech/sabbath-school-lessons)
- [Sabbath School Web App](https://sabbath-school.adventech.io/en)

