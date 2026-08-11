import { Lesson } from '../../types';

export const codeExamples = [
  {
    title: 'Basic Messages API Request',
    description: 'Como enviar uma mensagem simples para o Claude.',
    python: `import os\nimport anthropic\n\nclient = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))\n\nmessage = client.messages.create(\n    model="claude-3-5-sonnet-20241022",\n    max_tokens=1000,\n    temperature=0.0,\n    system="Você é um assistente de engenharia de software.",\n    messages=[\n        {"role": "user", "content": "Explique o que é CI/CD."}\n    ]\n)\nprint(message.content)`,
    javascript: `import Anthropic from '@anthropic-ai/sdk';\n\nconst anthropic = new Anthropic({\n  apiKey: process.env.ANTHROPIC_API_KEY,\n});\n\nconst msg = await anthropic.messages.create({\n  model: "claude-3-5-sonnet-20241022",\n  max_tokens: 1000,\n  temperature: 0,\n  system: "Você é um assistente de engenharia de software.",\n  messages: [{ role: "user", content: "Explique o que é CI/CD." }],\n});\nconsole.log(msg.content);`,
    curl: `curl https://api.anthropic.com/v1/messages \\\n     -H "x-api-key: $ANTHROPIC_API_KEY" \\\n     -H "anthropic-version: 2023-06-01" \\\n     -H "content-type: application/json" \\\n     -d '{\n    "model": "claude-3-5-sonnet-20241022",\n    "max_tokens": 1024,\n    "messages": [\n        {"role": "user", "content": "Explique o que é CI/CD."}\n    ]\n}'`
  }
];

export const apiLessons: Lesson[] = [
  {
    id: 'api-intro',
    moduleId: 'api-development',
    title: 'Introdução à Messages API',
    description: 'Entenda a arquitetura fundamental da API da Anthropic, autenticação e parâmetros.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'A Messages API',
          content: 'A Anthropic modernizou sua API com o endpoint `/v1/messages`. Em vez de passar um único prompt de texto plano, você passa um array estruturado de mensagens com alternância estrita entre `role: "user"` e `role: "assistant"`.'
        },
        {
          id: 'sec-2',
          type: 'code',
          title: 'Exemplo prático',
          codeLanguage: 'typescript',
          content: '// Importando o SDK Node.js\nimport Anthropic from "@anthropic-ai/sdk";\n\nconst client = new Anthropic({ apiKey: "YOUR_KEY" });'
        }
      ]
    }
  },
  {
    id: 'api-streaming',
    moduleId: 'api-development',
    title: 'Streaming e Parâmetros',
    description: 'Como receber respostas em tempo real e otimizar tokens/temperatura.',
    order: 2,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-3',
          type: 'concept',
          title: 'Max Tokens (Output)',
          content: 'O parâmetro `max_tokens` dita o limite de resposta. Historicamente, os modelos Claude eram limitados a 4.096 tokens de saída. O Claude 3.5 Sonnet (20241022) suporta a geração de até 8.192 tokens em uma única resposta, essencial para RAG pesado ou codificação extensa.'
        },
        {
          id: 'sec-4',
          type: 'concept',
          title: 'Temperature',
          content: 'O parâmetro `temperature` varia de 0 a 1. Zero (0.0) torna a IA determinística (ótimo para extração de dados e código). Um (1.0) maximiza a criatividade (ótimo para brainstorming).'
        },
        {
          id: 'sec-5',
          type: 'text',
          title: 'Por que usar Streaming?',
          content: 'Modelos de linguagem geram tokens um por vez (latência de inferência). Se a resposta tiver 2000 tokens, o usuário da sua aplicação esperaria 10-15 segundos vendo uma tela de carregamento. O Streaming usa Server-Sent Events (SSE) para enviar cada token no exato milissegundo que ele é gerado, criando o famoso efeito "máquina de escrever".'
        }
      ]
    }
  }
];
