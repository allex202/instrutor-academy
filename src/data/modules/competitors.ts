import { AIModel, Lesson } from '../../types';

export const competitorsModels: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o (Omni)',
    family: 'OpenAI',
    purpose: 'Modelo flagship multimodal da OpenAI. Conhecido por ser o padrão de mercado e oferecer integrações de voz, visão e texto em tempo real.',
    characteristics: ['Pioneiro em adoção no mercado (Market Share)', 'Voz nativa avançada', 'Raciocínio lógico universal e programação', 'Amplo ecossistema de APIs e Plugins'],
    contextWindow: '128,000 tokens',
    capabilities: ['Codificação de software genérica', 'Análise profunda de dados e matemática', 'Atendimento conversacional humanizado'],
    useCases: ['Aplicações B2C gerais', 'Criação de texto criativo', 'Agentes multimodais (voz)'],
    limitations: ['Janela de contexto menor que Gemini Pro e Claude 3.5', 'Pode ser mais "teimoso" ao seguir System Prompts complexos se comparado ao Claude'],
    speed: 'medium',
    capability: 'highest',
    updatedAt: '2024'
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    family: 'Google',
    purpose: 'O gigante de processamento do Google, desenvolvido para mastigar quantidades absurdas de dados de uma só vez sem a necessidade de arquiteturas RAG complexas.',
    characteristics: ['Janela de Contexto Massiva', 'Integração nativa com ecossistema Google Workspace e Cloud', 'Multimodal (Video, Audio, Texto)'],
    contextWindow: 'Até 2,000,000 tokens',
    capabilities: ['Raciocínio sobre bases de código inteiras em uma única requisição', 'Análise de vídeos longos de 1h+ sem perda de frames', 'Análise de documentos gigantescos (livros inteiros)'],
    useCases: ['Análise de repositórios legados inteiros', 'Processamento de horas de vídeo', 'Big Data analítico'],
    limitations: ['Tempos de resposta (TTFT) altos ao carregar o contexto máximo', 'Respostas por vezes muito longas/verborrágicas'],
    speed: 'slow',
    capability: 'very-high',
    updatedAt: '2024'
  },
  {
    id: 'llama-3-1-405b',
    name: 'Llama 3.1 405B',
    family: 'Meta (Open Source)',
    purpose: 'O maior e mais capaz modelo de pesos abertos (Open Source) do mundo, permitindo que empresas rodem IA em servidores próprios por segurança absoluta.',
    characteristics: ['Pesos Abertos (Deploy Local)', 'Liderança em custo (quando hospedado via Groq/Together)', 'Desempenho equivalente a modelos proprietários top-tier'],
    contextWindow: '128,000 tokens',
    capabilities: ['Fine-Tuning ilimitado em hardware próprio', 'Distilação para criar modelos menores e baratos', 'Geração robusta em várias linguagens'],
    useCases: ['Setores altamente regulamentados (Bancos, Saúde, Governos)', 'Criação de IAs verticais finamente treinadas', 'Redução drástica de custos em alta escala'],
    limitations: ['Requer clusters de GPU caríssimos para hospedar localmente a versão 405B', 'Sem capacidades multimodais visuais completas como GPT/Claude no modelo base de texto'],
    speed: 'fast',
    capability: 'very-high',
    updatedAt: '2024'
  }
];

export const competitorsLessons: Lesson[] = [
  {
    id: 'intro-competitors',
    moduleId: 'competitors',
    title: 'Panorama do Mercado: OpenAI, Google e Meta',
    description: 'Como um instrutor da Anthropic, você deve conhecer os adversários para defender a arquitetura ideal.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'Conheça o Campo de Batalha',
          content: 'No ecossistema de Inteligência Artificial Generativa corporativa, a Anthropic não joga sozinha. Ela concorre em inteligência (Frontier Models) com a OpenAI (GPT) e com o Google (Gemini). E no lado de custos e segurança de dados, ela disputa indiretamente com a Meta e a comunidade Open Source (Llama). Para ser um instrutor respeitado, você deve saber pontuar as vitórias do Claude, mas também reconhecer quando um aluno deve usar a concorrência.'
        },
        {
          id: 'sec-2',
          type: 'callout',
          calloutType: 'instructor',
          content: 'Regra de Prata: Nunca ataque a concorrência dizendo que é "ruim". Seja analítico. Diga: "O GPT-4o é excepcional para voz e o Gemini para contexto massivo, mas para codificação e precisão em formatação (JSON), o Claude 3.5 Sonnet é o campeão atual".'
        }
      ]
    }
  },
  {
    id: 'competitors-comparison',
    moduleId: 'competitors',
    title: 'Comparativo Técnico vs Claude',
    description: 'Um embate direto entre as tecnologias para facilitar tomadas de decisão.',
    order: 2,
    estimatedMinutes: 30,
    content: {
      sections: [
        {
          id: 'sec-3',
          type: 'text',
          title: 'Claude 3.5 Sonnet vs GPT-4o',
          content: 'Ambos são os reis da categoria "Frontier". O GPT-4o ganha em aplicações puramente voltadas a consumidores finais por sua voz realista nativa. O Claude ganha nas empresas: segue System Prompts muito melhor, escreve códigos mais robustos (o queridinho de ferramentas como o Cursor) e possui os Artefatos e a funcionalidade de Computer Use.'
        },
        {
          id: 'sec-4',
          type: 'text',
          title: 'Claude 3.5 Haiku vs Gemini 1.5 Pro',
          content: 'Em termos de janela de contexto, o Gemini 1.5 Pro aceita 2 Milhões de tokens. Se a empresa tem 50 horas de vídeo para analisar em 1 clique, use Gemini. Mas para a maioria dos casos práticos (ler 10 manuais e agir rápido), a janela de 200k do Claude acompanhada pela velocidade absurda do Haiku vence em UX.'
        },
        {
          id: 'sec-5',
          type: 'text',
          title: 'Modelos de API vs Open Source (Llama 3.1)',
          content: 'A Meta jogou duro ao liberar o Llama 3.1 405B, que bate de frente com o Claude 3 Opus. Se um banco governamental disser: "Não podemos mandar nenhum dado para servidores americanos", o Claude/OpenAI estão fora. A única solução do aluno será baixar o Llama, colocar em servidores próprios no Brasil e gerenciar a infraestrutura. O custo é alto em hardware, mas a privacidade é 100% garantida.'
        }
      ]
    }
  }
];
