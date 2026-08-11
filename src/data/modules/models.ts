import { Lesson } from '../../types';
import { claudeModels } from './claude';

export const modelsData = claudeModels; // Reusing from claude module to keep DRY, but exporting for this specific module context

export const modelsLessons: Lesson[] = [
  {
    id: 'models-comparison',
    moduleId: 'models',
    title: 'Comparativo Técnico de Modelos',
    description: 'Como escolher o modelo certo para a tarefa certa baseando-se em Custo, Inteligência e Velocidade.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'animation',
          componentId: 'FineTuningVsRAG'
        },
        {
          id: 'sec-1-text',
          type: 'text',
          title: 'O Triângulo de Otimização',
          content: 'Em Inteligência Artificial, você não pode ter Inteligência Máxima, Velocidade Máxima e Custo Zero simultaneamente. A Anthropic resolveu isso criando uma família de 3 modelos: Opus, Sonnet e Haiku.'
        },
        {
          id: 'sec-2',
          type: 'list',
          title: 'Regras de Ouro',
          items: [
            'Sonnet é o padrão: Comece tudo com Claude 3.5 Sonnet. Ele resolve 95% dos problemas de desenvolvimento.',
            'Haiku é para escala: Use Haiku se você for processar 1 milhão de documentos. O custo compensará.',
            'Opus é para descoberta: Use Opus quando estiver atacando problemas não-estruturados, como provar teoremas ou pesquisa médica em profundidade.'
          ]
        }
      ]
    }
  }
];
