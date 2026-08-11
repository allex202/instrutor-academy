import { Lesson } from '../../types';

export const anthropicTimeline = [
  {
    year: '2021',
    events: [
      {
        title: 'Fundação',
        description: 'Anthropic foi fundada por Dario Amodei, Daniela Amodei (ex-VP de Segurança e Pesquisa da OpenAI) e outros pesquisadores, focando na segurança e alinhamento de IA.'
      }
    ]
  },
  {
    year: '2022',
    events: [
      {
        title: 'Constitutional AI',
        description: 'Lançamento do artigo revolucionário sobre Constitutional AI (Harmlessness from AI Feedback), estabelecendo como alinhar modelos de forma escalável sem depender de milhares de avaliadores humanos.'
      }
    ]
  },
  {
    year: '2023',
    events: [
      {
        title: 'Lançamento do Claude',
        description: 'O modelo Claude é disponibilizado, apresentando uma janela de contexto inovadora de 100k tokens.'
      }
    ]
  },
  {
    year: '2024',
    events: [
      {
        title: 'Família Claude 3',
        description: 'Lançamento do Claude 3 (Opus, Sonnet, Haiku) que alcançou resultados state-of-the-art na indústria. Lançamento do Claude 3.5 Sonnet.'
      },
      {
        title: 'Model Context Protocol (MCP)',
        description: 'Anúncio do protocolo open-source MCP, o novo padrão da indústria para conectar IAs a dados locais e remotos de maneira segura, universal e estruturada.'
      }
    ]
  }
];

export const anthropicLessons: Lesson[] = [
  {
    id: 'historia-anthropic',
    moduleId: 'anthropic',
    title: 'História e Missão da Anthropic',
    description: 'Compreenda as origens da empresa e por que a segurança é o pilar central.',
    order: 1,
    estimatedMinutes: 10,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'Uma Origem Focada em Segurança',
          content: 'A Anthropic nasceu de uma preocupação genuína: conforme a IA se tornava mais capaz, ela também se tornava mais difícil de prever e controlar. Seus fundadores deixaram outras organizações líderes não por discordarem da missão de construir IA, mas por acreditarem que a Segurança e a Interpretabilidade deveriam vir em primeiro lugar, não apenas como "checklists", mas integradas na arquitetura básica dos modelos.'
        }
      ]
    }
  },
  {
    id: 'constitutional-ai',
    moduleId: 'anthropic',
    title: 'Constitutional AI (IA Constitucional)',
    description: 'Como ensinar a IA a se comportar com base em um conjunto de valores.',
    order: 2,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-2',
          type: 'text',
          title: 'O Problema do RLHF Tradicional',
          content: 'Muitos modelos utilizam RLHF (Reinforcement Learning from Human Feedback), onde humanos dizem se a resposta foi boa ou ruim. Mas escalar isso é lento, caro e reflete vieses subjetivos dos avaliadores. A solução da Anthropic? O RLAAI (Reinforcement Learning from AI Feedback), estruturado como IA Constitucional.'
        },
        {
          id: 'sec-3',
          type: 'callout',
          calloutType: 'info',
          content: 'O modelo recebe uma Constituição (documento com regras baseadas na Declaração da ONU e boas práticas) e ele mesmo critica e revisa suas respostas na fase de treinamento baseando-se nessa Constituição.'
        }
      ]
    }
  }
];
