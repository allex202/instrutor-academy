import { Module, Phase } from '../types';

export const phases: Phase[] = [
  {
    number: 1,
    title: 'Fundamentos de IA',
    description: 'A base teórica e conceitos essenciais de Inteligência Artificial',
    moduleIds: ['ai-fundamentals'],
    icon: 'brain'
  },
  {
    number: 2,
    title: 'Conhecendo a Anthropic',
    description: 'História, missão e o ecossistema da empresa',
    moduleIds: ['anthropic'],
    icon: 'building'
  },
  {
    number: 3,
    title: 'Claude e Ecossistema Global',
    description: 'A família de modelos Claude, OpenAI, Google Gemini e concorrentes de mercado',
    moduleIds: ['claude', 'openai', 'gemini', 'competitors'],
    icon: 'bot'
  },
  {
    number: 4,
    title: 'Prompt Engineering',
    description: 'A arte e ciência de se comunicar com LLMs',
    moduleIds: ['prompt-engineering'],
    icon: 'message-square'
  },
  {
    number: 5,
    title: 'Desenvolvimento com Claude',
    description: 'Uso de API e ferramentas de desenvolvimento (Claude Code)',
    moduleIds: ['claude-code', 'api-development'],
    icon: 'code'
  },
  {
    number: 6,
    title: 'Integrações (Tools & MCP)',
    description: 'Conectando a IA ao mundo real e a sistemas corporativos',
    moduleIds: ['tool-use', 'mcp', 'models', 'context-window'],
    icon: 'plug'
  },
  {
    number: 7,
    title: 'Segurança e IA Responsável',
    description: 'Constitutional AI, riscos e ética em IA',
    moduleIds: ['responsible-ai'],
    icon: 'shield'
  },
  {
    number: 8,
    title: 'IA Agêntica',
    description: 'O futuro da IA: agentes autônomos e workflows complexos',
    moduleIds: ['agentic-ai'],
    icon: 'cpu'
  },
  {
    number: 9,
    title: 'Didática e Instruction',
    description: 'Como ensinar IA com eficiência e clareza',
    moduleIds: ['instructor'],
    icon: 'graduation-cap'
  },
  {
    number: 10,
    title: 'Laboratório Final',
    description: 'Projetos práticos e Simulado para certificação',
    moduleIds: [],
    icon: 'flask'
  }
];

export const modules: Module[] = [
  {
    id: 'ai-fundamentals',
    title: 'Fundamentos de IA',
    description: 'Entenda os pilares da Inteligência Artificial: Machine Learning, Deep Learning, LLMs e o mecanismo por trás do ChatGPT e do Claude.',
    icon: '🧠',
    phase: 1,
    order: 1,
    lessons: [] // To be populated dynamically or imported
  },
  {
    id: 'anthropic',
    title: 'A Anthropic',
    description: 'Conheça a história da Anthropic, sua missão voltada à segurança (Constitutional AI) e seu ecossistema de produtos.',
    icon: '🏢',
    phase: 2,
    order: 2,
    lessons: []
  },
  {
    id: 'claude',
    title: 'Claude',
    description: 'Explore a família Claude (Opus, Sonnet, Haiku), suas capacidades multimodais e os melhores casos de uso para cada modelo.',
    icon: '🤖',
    phase: 3,
    order: 3,
    lessons: []
  },
  {
    id: 'openai',
    title: 'OpenAI e ChatGPT',
    description: 'Domine a arquitetura do ChatGPT, modelos GPT-4o e o1, e as diferenças essenciais de Prompting.',
    icon: '🧠',
    phase: 3,
    order: 2,
    lessons: []
  },
  {
    id: 'gemini',
    title: 'Google Gemini',
    description: 'Arquitetura MoE, Multimodalidade Nativa, Gemini Spark e o ecossistema Google Cloud.',
    icon: '💡',
    phase: 3,
    order: 3,
    lessons: []
  },
  {
    id: 'competitors',
    title: 'Mercado e Concorrentes',
    description: 'Conheça o ecossistema de Inteligência Artificial: ChatGPT, Gemini e Llama. Aprenda a comparar e decidir o melhor modelo para cada cenário corporativo.',
    icon: '📊',
    phase: 3,
    order: 3.5,
    lessons: []
  },
  {
    id: 'prompt-engineering',
    title: 'Engenharia de Prompt',
    description: 'Aprenda técnicas profissionais para criar prompts estruturados, usando XML, System Prompts e Chain of Thought.',
    icon: '✨',
    phase: 4,
    order: 4,
    lessons: []
  },
  {
    id: 'claude-code',
    title: 'Claude Code',
    description: 'Domine a ferramenta CLI da Anthropic que auxilia desenvolvedores diretamente no terminal.',
    icon: '💻',
    phase: 5,
    order: 5,
    lessons: []
  },
  {
    id: 'api-development',
    title: 'API Development',
    description: 'Como integrar a API da Anthropic em suas aplicações corporativas com segurança e eficiência.',
    icon: '🔌',
    phase: 5,
    order: 6,
    lessons: []
  },
  {
    id: 'models',
    title: 'Modelos de IA',
    description: 'Comparativo aprofundado técnico entre os diferentes modelos e os concorrentes do mercado.',
    icon: '📊',
    phase: 6,
    order: 7,
    lessons: []
  },
  {
    id: 'context-window',
    title: 'Janela de Contexto e Tokens',
    description: 'Gestão eficiente da janela de contexto, cálculo de custos (tokens) e técnicas de Retrieval-Augmented Generation (RAG).',
    icon: '📏',
    phase: 6,
    order: 8,
    lessons: []
  },
  {
    id: 'tool-use',
    title: 'Tool Use (Function Calling)',
    description: 'Como permitir que a IA execute ações e consulte dados do mundo real em tempo de execução.',
    icon: '🛠️',
    phase: 6,
    order: 9,
    lessons: []
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol',
    description: 'Aprenda sobre o MCP (padrão open-source) que conecta assistentes de IA diretamente às fontes de dados (banco de dados, APIs).',
    icon: '🔗',
    phase: 6,
    order: 10,
    lessons: []
  },
  {
    id: 'responsible-ai',
    title: 'Segurança e IA Responsável',
    description: 'Proteja sistemas de IA contra alucinações, jailbreaks, prompt injection e mitigue vieses.',
    icon: '🛡️',
    phase: 7,
    order: 11,
    lessons: []
  },
  {
    id: 'agentic-ai',
    title: 'IA Agêntica (Agentic Workflows)',
    description: 'Indo além do chat: como construir sistemas onde a IA planeja, itera e executa complexos fluxos de trabalho com autonomia.',
    icon: '⚙️',
    phase: 8,
    order: 12,
    lessons: []
  },
  {
    id: 'instructor',
    title: 'Didática e Ensino',
    description: 'Boas práticas para instrutores técnicos: como explicar conceitos abstratos de IA com clareza usando analogias e demonstrações práticas.',
    icon: '👨‍🏫',
    phase: 9,
    order: 13,
    lessons: []
  }
];
