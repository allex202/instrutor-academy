import { Lesson } from '../../types';

export const toolUseLessons: Lesson[] = [
  {
    id: 'intro-tool-use',
    moduleId: 'tool-use',
    title: 'O que é Tool Use (Function Calling)',
    description: 'Aprenda como tirar a IA da "caixa de texto" e permitir que ela execute ações reais.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'animation',
          componentId: 'ToolUseFlow'
        },
        {
          id: 'sec-1-text',
          type: 'text',
          title: 'Dar Mãos e Olhos à IA',
          content: 'Por si só, o Claude não consegue olhar a temperatura atual do clima, não acessa seu banco de dados MySQL e não consegue mandar um email. Tool Use (ou Function Calling) é a ponte estruturada para que o Claude avise SUA aplicação para rodar um código.'
        },
        {
          id: 'sec-2',
          type: 'concept',
          title: 'O Fluxo de Execução',
          content: '1. O usuário pergunta "Qual o clima em SP?". 2. A API envia essa pergunta junto com a "definição da ferramenta" `get_weather`. 3. O Claude percebe que não sabe, mas percebe que a ferramenta ajuda, então ele responde com `tool_use: get_weather("SP")`. 4. SEU backend roda a função de clima. 5. SEU backend devolve o resultado ao Claude (`tool_result`). 6. O Claude lê o resultado e escreve a resposta final: "Hoje em SP faz 25 graus".'
        }
      ]
    }
  },
  {
    id: 'tool-schemas',
    moduleId: 'tool-use',
    title: 'Definindo Schemas de Ferramentas',
    description: 'Aprenda a descrever corretamente suas funções usando JSON Schema.',
    order: 2,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-3',
          type: 'code',
          title: 'Exemplo de Tool Schema',
          codeLanguage: 'json',
          content: '{\n  "name": "get_stock_price",\n  "description": "Retorna o preço atual de uma ação.",\n  "input_schema": {\n    "type": "object",\n    "properties": {\n      "ticker": {\n        "type": "string",\n        "description": "O símbolo da ação. Ex: AAPL, MSFT"\n      }\n    },\n    "required": ["ticker"]\n  }\n}'
        },
        {
          id: 'sec-4',
          type: 'callout',
          calloutType: 'warning',
          content: 'A descrição da ferramenta ("description") não é apenas documentação, ela é efetivamente o "prompt" que a IA usa para decidir SE DEVE ou não usar essa ferramenta. Descrições ruins causam uso incorreto.'
        }
      ]
    }
  }
];
