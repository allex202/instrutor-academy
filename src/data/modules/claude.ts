import { AIModel, Lesson } from '../../types';

export const claudeModels: AIModel[] = [
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    family: 'Claude 3.5',
    purpose: 'O equilíbrio perfeito entre inteligência avançada e velocidade. É o modelo state-of-the-art da Anthropic para a maioria das tarefas, superando até mesmo o Opus 3.0 em várias métricas de raciocínio, e o melhor do mundo para codificação.',
    characteristics: ['Excepcional para código', 'Multimodal avançado', 'Tomadas de decisão rápidas', 'Otimizado para Tool Use e agentes', 'Computer Use (Interação com Desktop)'],
    contextWindow: '200,000 tokens',
    capabilities: ['Codificação de software em larga escala', 'Extração de texto complexa', 'Agentes autônomos', 'Operação de interfaces gráficas (Computer Use)'],
    useCases: ['Automação de workflows e RPA', 'Criação de aplicativos web (artefatos)', 'Atendimento complexo a clientes'],
    limitations: ['Ainda pode alucinar em bases faturais muito obscuras sem RAG'],
    speed: 'medium',
    capability: 'highest',
    updatedAt: '2024 (Nota: Conteúdo sujeito a atualização)'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    family: 'Claude 3',
    purpose: 'Para tarefas altamente complexas de longa duração que exigem síntese em vários passos, criatividade profunda e análise de viabilidade estratégica.',
    characteristics: ['Extremamente persuasivo', 'Alta precisão em contextos massivos', 'Domínio fluido de vários idiomas'],
    contextWindow: '200,000 tokens',
    capabilities: ['Raciocínio complexo', 'Análise de dados avançada e pesquisa acadêmica', 'Navegação por ambiguidade severa'],
    useCases: ['Revisão de contratos legais e descobertas em P&D', 'Análise financeira avançada', 'Ghostwriting profissional'],
    limitations: ['Mais lento e custoso que a família Sonnet e Haiku'],
    speed: 'slow',
    capability: 'very-high',
    updatedAt: '2024 (Nota: Conteúdo sujeito a atualização)'
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    family: 'Claude 3.5',
    purpose: 'O modelo mais rápido da Anthropic, combinando a inteligência da classe Opus anterior com a latência de modelos diminutos. Projetado para operações em tempo real em alta escala.',
    characteristics: ['Latência quase invisível', 'Custo extremamente baixo', 'Ótimo para dados em lote (batch)'],
    contextWindow: '200,000 tokens',
    capabilities: ['Processamento de milhares de documentos por segundo (visão e texto)', 'Resumo de grandes logs em tempo real'],
    useCases: ['Moderação de conteúdo', 'Chatbots B2C com milhões de acessos', 'Análise rápida de tabelas logísticas'],
    limitations: ['Não indicado para escrita literária ou problemas matemáticos com dezenas de passos (use Sonnet para isso)'],
    speed: 'fast',
    capability: 'high',
    updatedAt: '2024 (Nota: Conteúdo sujeito a atualização)'
  }
];

export const claudeLessons: Lesson[] = [
  {
    id: 'introducao-claude',
    moduleId: 'claude',
    title: 'O que é Claude e sua Família',
    description: 'Uma imersão técnica sobre quem é o Claude, suas características principais e as diferenças entre os modelos.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'Mais que um Chatbot, um Assistente Confiável',
          content: 'O Claude foi treinado com foco explícito em ser honesto (evitar alucinações onde não sabe a resposta), prestativo e seguro. Sua arquitetura o torna especialmente eficiente no processamento de enormes janelas de contexto (200k tokens), permitindo a leitura simultânea de dezenas de PDFs complexos, balanços contábeis e bases de código sem "esquecer" as instruções contidas no meio dos documentos (fenômeno conhecido como "Lost in the Middle", ao qual o Claude é muito resistente).'
        }
      ]
    }
  }
];
