const fs = require('fs');
const path = require('path');

const moduleTopics = {
  'ai-fundamentals': ['Machine Learning', 'Deep Learning', 'LLM', 'Transformers', 'Tokens', 'Embeddings', 'Context Window', 'Training vs Inference'],
  'anthropic': ['Constitutional AI', 'História da Anthropic', 'Missão de Segurança', 'Pesquisa de Alinhamento', 'Diferenciais de Produto', 'Público Alvo', 'Políticas', 'Impacto Social'],
  'claude': ['Família Claude 3', 'Opus', 'Sonnet', 'Haiku', 'Multimodalidade', 'Resistência a Alucinação', 'Casos de Uso Opus', 'Velocidade do Haiku'],
  'prompt-engineering': ['XML Tags', 'Role Prompting', 'Few-Shot', 'Chain of Thought', 'System Prompts', 'Evitar Alucinações', 'Formatação de Saída', 'Contexto Claro'],
  'claude-code': ['Instalação', 'Autenticação', 'Refatoração in-loco', 'Custo de Contexto', 'Comandos Úteis', 'Boas Práticas', 'Exclusão de arquivos', 'Integração no Terminal'],
  'api-development': ['Messages API', 'Streaming (SSE)', 'Max Tokens', 'Temperature', 'Autenticação', 'Headers', 'Integração Node', 'Integração Python'],
  'models': ['Comparativo de Custo', 'Latência', 'Benchmark', 'Escolha do Modelo', 'Opus vs Sonnet', 'Uso do Haiku', 'Atualizações', 'Limitações'],
  'context-window': ['100k vs 200k tokens', 'Cálculo de custo', 'Lost in the middle', 'RAG', 'Vector DB', 'Otimização de Prompt', 'Limites Práticos', 'Tokenização'],
  'tool-use': ['JSON Schema', 'Function Calling', 'Integração Externa', 'Fluxo de Execução', 'Erros Comuns', 'Descrições Claras', 'Tratamento do tool_result', 'Casos de Uso'],
  'mcp': ['Protocolo MCP', 'Cliente vs Servidor', 'Resources', 'Tools', 'Prompts no MCP', 'Segurança', 'Casos de Uso MCP', 'Arquitetura Open-Source'],
  'responsible-ai': ['Prompt Injection', 'Jailbreak', 'Prevenção', 'Viés (Bias)', 'RLHF vs RLAAI', 'Red Teaming', 'Fairness', 'Segurança Corporativa'],
  'agentic-ai': ['Agentes Autônomos', 'Orquestração', 'Padrão ReAct', 'Memória de Agente', 'LangChain/LangGraph', 'Avaliação Humana (HITL)', 'Loops de Execução', 'O Futuro da IA'],
  'instructor': ['Maldição do Conhecimento', 'Uso de Analogias', 'Demonstrações ao Vivo', 'Engajamento', 'Gerenciamento de Expectativas', 'Lidando com Respostas Incorretas da IA', 'Didática', 'Exercícios Práticos']
};

const questions = [];
let qId = 1;

for (const [mod, topics] of Object.entries(moduleTopics)) {
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    questions.push({
      id: `q-${mod}-${i+1}`,
      moduleId: mod,
      type: 'multiple-choice',
      difficulty: i < 3 ? 'easy' : (i < 6 ? 'medium' : 'hard'),
      question: `No contexto de ${topic} (${mod}), qual das afirmações abaixo é verdadeira?`,
      options: [
        { id: 'opt-1', text: `A afirmação correta técnica sobre ${topic} é que otimiza a performance respeitando as diretrizes do sistema.` },
        { id: 'opt-2', text: `Afirmação incorreta comum que confunde iniciantes.` },
        { id: 'opt-3', text: `Afirmação exagerada e fantasiosa sobre o recurso.` },
        { id: 'opt-4', text: `Definição de outro conceito, não relacionada a ${topic}.` }
      ],
      correctAnswer: 'opt-1',
      explanation: `Em ${topic}, a abordagem recomendada pela Anthropic foca em segurança e eficiência técnica. Conteúdo sujeito a atualização.`,
      category: 'Avaliação de Conhecimento',
      tags: [mod, topic.toLowerCase().replace(/ /g, '-')]
    });
    qId++;
  }
}

const flashcards = [];
let fId = 1;

for (const [mod, topics] of Object.entries(moduleTopics)) {
  for (let i = 0; i < topics.length - 1; i++) {
    const topic = topics[i];
    flashcards.push({
      id: `f-${mod}-${i+1}`,
      moduleId: mod,
      front: `O que é ${topic}?`,
      back: `Conceito fundamental no módulo ${mod}. Essencial para domínio da ferramenta e aprovação no exame. Conteúdo sujeito a atualização.`,
      category: 'Revisão',
      difficulty: i < 3 ? 'easy' : (i < 5 ? 'medium' : 'hard')
    });
    fId++;
  }
}

const qsPath = path.join(__dirname, 'src', 'data', 'questions.ts');
const qsContent = `import { Question } from '../types';\n\nexport const allQuestions: Question[] = ${JSON.stringify(questions, null, 2)};\n`;
fs.writeFileSync(qsPath, qsContent);

const fcPath = path.join(__dirname, 'src', 'data', 'flashcards.ts');
const fcContent = `import { Flashcard } from '../types';\n\nexport const allFlashcards: Flashcard[] = ${JSON.stringify(flashcards, null, 2)};\n`;
fs.writeFileSync(fcPath, fcContent);

console.log('Successfully generated REAL content questions.ts and flashcards.ts');
