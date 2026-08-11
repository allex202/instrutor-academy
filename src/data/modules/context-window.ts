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
          title: 'A Ilusão da Janela Vazia (Hard Caps)',
          content: 'Um erro muito comum é achar que a janela de 200.000 tokens é um "balde" livre onde Input + Output = 200k. Na verdade, a geração de respostas (Output) tem um limite máximo fixo muito menor (Hard Cap). Por exemplo, o Claude 3.5 Sonnet gera no máximo 8.192 tokens por resposta, e o Claude 3 Opus gera no máximo 4.096 tokens. Mesmo se você enviar um prompt de apenas 10 tokens (deixando 199.990 livres), a IA nunca ultrapassará o seu Hard Cap em uma única mensagem.'
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
