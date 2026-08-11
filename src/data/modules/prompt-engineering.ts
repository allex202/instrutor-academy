import { Lesson } from '../../types';

export const promptExamples = [
  {
    bad: 'Escreva um e-mail pedindo desculpas por atrasar o projeto.',
    good: '<role>Você é um gerente de projetos sênior em uma empresa de TI.</role>\n<contexto>Nosso projeto de migração de nuvem atrasou 2 semanas devido a problemas com o fornecedor de banco de dados.</contexto>\n<instrucoes>Escreva um e-mail de 3 parágrafos para a diretoria, pedindo desculpas, explicando o motivo técnico de forma clara mas não excessiva, e propondo um novo prazo. O tom deve ser profissional, assumindo responsabilidade.</instrucoes>',
    explanation: 'O bom prompt define uma Role, fornece o Contexto exato, estipula restrições (3 parágrafos, tom profissional) e organiza tudo usando XML Tags.',
    technique: 'Role Prompting & XML Structuring'
  },
  {
    bad: 'Extraia os nomes e empresas deste texto: "O João da Microsoft falou com a Maria do Google".',
    good: 'Você é um assistente de extração de dados. Leia o texto fornecido e retorne os dados em formato JSON estrito.\n\n<texto>\nO João da Microsoft falou com a Maria do Google\n</texto>\n\n<exemplo>\n[\n  {"nome": "João", "empresa": "Microsoft"}\n]\n</exemplo>\n\nResponda apenas com o JSON final, sem nenhum texto introdutório.',
    explanation: 'Além da instrução clara, o prompt fornece um Exemplo (Few-shot) de como o JSON deve ser estruturado, e delimita o texto de entrada com tags.',
    technique: 'Few-shot & Output Formatting'
  },
  {
    bad: 'Se eu tenho 10 maçãs, dou 2 pro João, corto 3 pela metade e como 1, e depois roubam todas as inteiras, quantas eu tenho agora?',
    good: 'Se eu tenho 10 maçãs, dou 2 pro João, corto 3 pela metade e como 1, e depois roubam todas as inteiras, quantas eu tenho agora?\n\n<instrucao>\nAntes de dar a resposta final, por favor, abra uma tag <scratchpad> e pense passo a passo em cada transação de maçãs, categorizando-as em inteiras e metades, calculando os totais após cada evento.\n</instrucao>',
    explanation: 'Problemas matemáticos ou lógicos frequentemente fazem a IA errar se ela tentar adivinhar a resposta direto. Forçar a IA a pensar (Chain of Thought) em uma tag separada aumenta massivamente a chance de acerto.',
    technique: 'Chain of Thought (CoT)'
  }
];

export const promptEngineeringLessons: Lesson[] = [
  {
    id: 'intro-prompting',
    moduleId: 'prompt-engineering',
    title: 'Fundamentos da Engenharia de Prompt',
    description: 'Aprenda por que conversar com uma IA não é como usar o Google, e como estruturar suas instruções de forma lógica.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'A Falácia do "Basta Pedir"',
          content: 'Muitos usuários culpam a IA por resultados ruins quando, na verdade, o prompt foi vago. O Claude é incrivelmente inteligente, mas ele não tem telepatia. Ele otimiza para responder da forma que achar que você quer. Se você der uma instrução vaga, ele vai usar o caminho mais provável (o "padrão"), que geralmente é genérico. A engenharia de prompt trata de diminuir essa entropia.'
        },
        {
          id: 'sec-2',
          type: 'callout',
          calloutType: 'tip',
          content: 'Regra de ouro: Seja claro e direto. O Claude entende nuances perfeitamente. Diga a ele o que fazer, o que NÃO fazer, em que formato, e qual o tom. Pense no Claude como um estagiário brilhante no seu primeiro dia de trabalho: ele tem enorme potencial, mas precisa de contexto da empresa.'
        }
      ]
    }
  },
  {
    id: 'xml-tags',
    moduleId: 'prompt-engineering',
    title: 'XML Tags: O Superpoder do Claude',
    description: 'Descubra por que a Anthropic treinou o Claude para ser excepcionalmente bom em entender blocos formatados em XML.',
    order: 2,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-3',
          type: 'text',
          title: 'Por que usar XML?',
          content: 'O Claude foi extensivamente fine-tuned para reconhecer e processar tags XML. Isso resolve o problema de "Prompt Injection" (quando o usuário tenta misturar dados com instruções) e ajuda a separar de forma muito clara o que é instrução, o que é contexto e o que é o dado de entrada.'
        },
        {
          id: 'sec-4',
          type: 'code',
          title: 'Exemplo de Estrutura',
          codeLanguage: 'xml',
          content: '<instrucoes>\nVocê deve traduzir o texto a seguir para francês corporativo.\n</instrucoes>\n\n<texto_origem>\nOlá equipe, a reunião foi cancelada.\n</texto_origem>'
        }
      ]
    }
  },
  {
    id: 'chain-of-thought',
    moduleId: 'prompt-engineering',
    title: 'Chain of Thought (CoT)',
    description: 'A arte de fazer o modelo "pensar alto" antes de responder, evitando respostas impulsivas e incorretas.',
    order: 3,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-5',
          type: 'text',
          title: 'Como o Claude gera texto',
          content: 'Lembre-se: LLMs preveem o próximo token. Se você pedir a resposta final de cara para um problema de 5 passos, a IA não tem "espaço" (tokens gerados) para calcular. Ao obrigar a IA a abrir uma tag como <thinking> ou <scratchpad>, você dá a ela a capacidade computacional (espaço de geração de texto) para resolver passo a passo.'
        }
      ]
    }
  },
  {
    id: 'system-prompts',
    moduleId: 'prompt-engineering',
    title: 'System Prompts e API',
    description: 'A diferença entre System Prompts e User Prompts no contexto da API do Claude.',
    order: 4,
    estimatedMinutes: 15,
    content: {
      sections: [
        {
          id: 'sec-6',
          type: 'text',
          title: 'Comportamento Global',
          content: 'Na API (diferente da interface web chat), você usa o campo `system` para passar o System Prompt. É lá que você define a Persona, regras absolutas de formatação (ex: "Sempre responda em JSON"), e guarda-rails de segurança (ex: "Nunca discuta política"). O User Prompt é usado para o input do usuário na rodada atual.'
        }
      ]
    }
  }
];
