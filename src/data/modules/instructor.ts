import { Lesson } from '../../types';

export const teachingQuestions = [
  {
    question: 'Como você explicaria o conceito de "Embeddings" para um executivo de RH?',
    topic: 'Fundamentos',
    expectedConcepts: ['Analogia (ex: Mapa de proximidade de conceitos)', 'Foco na utilidade (Encontrar currículos similares)', 'Sem jargões de Álgebra Linear']
  },
  {
    question: 'Um aluno pergunta: "Por que não uso o ChatGPT em vez do Claude via API?". Qual a sua resposta como instrutor?',
    topic: 'Ecossistema Anthropic',
    expectedConcepts: ['Diferença entre UI B2C e API para engenharia', 'Segurança de Dados e Privacidade da API', 'Uso do MCP e Tool Calling específicos']
  },
  {
    question: 'Ao mostrar um exemplo de Prompt Engineering, um aluno reclama que XML tags são muito feias e difíceis. Como justificar o uso delas?',
    topic: 'Prompting',
    expectedConcepts: ['Explicar o pré-treinamento do Claude com XML', 'Garantia de separação entre instrução e dados do usuário', 'Segurança contra Prompt Injection']
  },
  {
    question: 'Um aluno do laboratório aplicou um prompt injection e fez sua aplicação de IA "xingar" os usuários. Como o instrutor deve lidar?',
    topic: 'Segurança Prática',
    expectedConcepts: ['Não punir, tratar como um "Teachable Moment"', 'Demonstrar imediatamente como mitigar usando System Prompts estritos', 'Falar sobre a importância do Red Teaming']
  },
  {
    question: 'A turma inteira não consegue entender como a IA "pensa". O que você faz?',
    topic: 'Didática',
    expectedConcepts: ['Esclarecer o termo probabilístico vs determinístico', 'Mostrar que LLMs calculam o próximo token (não pensam como humanos)', 'Fazer analogia com teclado preditivo de celular super avançado']
  }
];

export const instructorLessons: Lesson[] = [
  {
    id: 'didatics-for-ai',
    moduleId: 'instructor',
    title: 'Didática no Ensino de IA',
    description: 'Técnicas essenciais de como ensinar conceitos hiper-técnicos para audiências mistas.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'A Maldição do Conhecimento',
          content: 'A "maldição do conhecimento" ocorre quando você, sabendo muito de um assunto, esquece a sensação de não saber, e pula etapas na explicação. Em IA, isso é fatal. Falar de "Vetores Semânticos" e "Self-Attention" assusta 90% das pessoas. O papel do instrutor é criar pontes com o mundo real através de analogias sólidas.'
        },
        {
          id: 'sec-2',
          type: 'list',
          title: 'Uso de Analogias Comprovadas',
          items: [
            'Prompting: Dar instruções precisas para um estagiário genial, mas que não conhece o contexto da sua empresa e fará exatamente o que você pedir.',
            'Janela de Contexto: A memória RAM (curto prazo) do cérebro. Se lotar, ele se perde.',
            'Treinamento/Fine-Tuning: A memória de longo prazo, o "diploma da faculdade".',
            'Temperatura: O botão que ajusta a precisão (0 = Contador Frio) para a criatividade (1 = Poeta Criativo).'
          ]
        }
      ]
    }
  },
  {
    id: 'live-coding-handling',
    moduleId: 'instructor',
    title: 'Mestrado em Live Coding e Demonstrações',
    description: 'Como conduzir laboratórios sem incidentes e gerir a natureza estocástica dos LLMs.',
    order: 2,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-3',
          type: 'text',
          title: 'LLMs são Probabilísticos (O Efeito Demo)',
          content: 'Diferente de um código de Python convencional, uma demo de Inteligência Artificial pode gerar resultados diferentes ao vivo do que gerou no seu ensaio, mesmo que você use Temperatura = 0. A rede neural pode achar um caminho semântico diferente dependendo do mínimo detalhe de contexto.'
        },
        {
          id: 'sec-4',
          type: 'callout',
          calloutType: 'tip',
          title: 'Regra de Ouro do Instrutor',
          content: 'Nunca entre em pânico quando o Claude der uma alucinação no telão. Abrace a falha! A melhor forma de ensinar Prompt Engineering é quando a IA erra e a classe toda analisa junta qual parte da instrução estava ambígua e concerta ao vivo.'
        }
      ]
    }
  },
  {
    id: 'lab-crisis',
    moduleId: 'instructor',
    title: 'Gestão de Crise em Laboratórios Práticos',
    description: 'Ensinando segurança, mitigação de Prompt Injection e controle de expectativas.',
    order: 3,
    estimatedMinutes: 30,
    content: {
      sections: [
        {
          id: 'sec-5',
          type: 'concept',
          title: 'Lidando com Alunos Hackers (Red Teaming)',
          content: 'Em todo treinamento prático, algum desenvolvedor sênior tentará quebrar sua aplicação (jailbreak). Ensine Red Teaming não como uma ofensa, mas como o padrão oficial da indústria para descobrir falhas estruturais em Prompts.'
        },
        {
          id: 'sec-6',
          type: 'text',
          title: 'Construindo o Mindset de IA Segura',
          content: 'O Instrutor de IA da Anthropic deve ser o primeiro a mostrar os perigos. Mostre aos alunos como as tags <system> isolam instruções e ensine o uso de "Post-Prompting" para validar saídas perigosas antes de enviá-las de volta aos usuários.'
        }
      ]
    }
  }
];
