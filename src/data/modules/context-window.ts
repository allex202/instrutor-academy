import { Lesson } from '../../types';

export const contextWindowLessons: Lesson[] = [
  {
    id: 'context-window-tokens',
    moduleId: 'context-window',
    title: 'Tokens e Limites de Contexto',
    description: 'Entenda como os modelos de linguagem "leem" e como evitar estourar o orçamento ou a memória.',
    order: 1,
    estimatedMinutes: 15,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'concept',
          title: 'A Mecânica dos Tokens',
          content: 'Modelos não veem letras ou palavras como nós, mas sim tokens. A palavra "Inteligência" pode ser dividida em "Inte" + "li" + "gên" + "cia". Quando enviamos um texto à API, ele é tokenizado e cobrado de acordo.'
        },
        {
          id: 'sec-2',
          type: 'text',
          title: 'O Limite de Contexto',
          content: 'O limite de contexto do Claude é 200.000 tokens (aproximadamente 150.000 palavras, ou um livro de 500 páginas). Esse número representa a soma total do Prompt (input) + Resposta (output). Se você enviar 190.000 tokens de texto, a resposta máxima possível será de apenas 10.000 tokens.'
        }
      ]
    }
  },
  {
    id: 'context-management',
    moduleId: 'context-window',
    title: 'Gerenciamento e RAG',
    description: 'Técnicas avançadas para não saturar a janela e focar no que importa.',
    order: 2,
    estimatedMinutes: 30,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'animation',
          componentId: 'AttentionMechanism'
        },
        {
          id: 'sec-1-text',
          type: 'text',
          title: 'Por que não enviar o Banco de Dados inteiro?',
          content: 'Mesmo com 200k tokens, colocar muita informação irrelevante dilui a atenção do modelo e custa caríssimo ($$ por milhão de tokens de input). A solução padrão da indústria é RAG (Retrieval-Augmented Generation).'
        },
        {
          id: 'sec-4',
          type: 'concept',
          title: 'RAG em poucas palavras',
          content: 'Em vez de colocar 500 manuais no prompt, você quebra os manuais em dezenas de milhares de pedaços pequenos. Converte esses pedaços em vetores (Embeddings). Quando o usuário pergunta algo, você busca matematicamente (Cos-Similarity) os 5 pedaços mais relevantes, e envia apenas esses 5 pedaços no contexto para o Claude. Inteligente e barato.'
        }
      ]
    }
  }
];
