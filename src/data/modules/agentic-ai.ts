import { Lesson } from '../../types';

export const agenticAILessons: Lesson[] = [
  {
    id: 'intro-agents',
    moduleId: 'agentic-ai',
    title: 'O Paradigma Agêntico',
    description: 'A transição de "bots de resposta curta" para sistemas de IA capazes de trabalhar com autonomia e perseguir objetivos.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'Agente vs Chatbot',
          content: 'Um chatbot espera um comando, executa, e devolve a resposta. Um Agente recebe um objetivo de alto nível ("Resolva este bug no repositório"). O próprio Agente quebra a tarefa em pedaços lógicos, decide quais ferramentas usar (via MCP), lê o output do terminal, planeja novamente, itera, e só volta ao humano quando terminou ou bateu em um bloqueio intransponível.'
        },
        {
          id: 'sec-2',
          type: 'list',
          title: 'Anatomia de um Agente',
          items: [
            'Raciocínio Base: LLMs potentes (Claude 3.5 Sonnet) para planejar e não se perder na execução.',
            'Memória Contínua: Armazenamento de estado (State) e reflexão (Reflection) sobre tentativas que falharam.',
            'Atuadores (Ferramentas): Acesso direto ao mundo real através de Tool Calling (bancos, APIs, filesystem).',
            'Loop de Controle: O código hospedeiro (em Python/JS) que mantém a IA em looping até o objetivo ser cumprido.'
          ]
        }
      ]
    }
  },
  {
    id: 'react-pattern',
    moduleId: 'agentic-ai',
    title: 'O Padrão ReAct (Reasoning and Acting)',
    description: 'O fluxo de controle mais clássico na engenharia de agentes autônomos.',
    order: 2,
    estimatedMinutes: 30,
    content: {
      sections: [
        {
          id: 'sec-3',
          type: 'text',
          title: 'O Loop ReAct',
          content: 'No paradigma ReAct, o modelo é forçado a declarar seu "pensamento" (Reasoning) antes de invocar uma ferramenta (Acting). Após a ferramenta retornar um resultado (Observation), o loop recomeça. O Claude 3.5 Sonnet foi especificamente ajustado (fine-tuned) para ser excelente neste tipo de loop.'
        },
        {
          id: 'sec-4',
          type: 'code',
          title: 'Exemplo do Loop em Ação (Log de Terminal)',
          content: `Thought: Preciso encontrar o IP do servidor antes de conectar. Vou rodar 'nslookup'.
Action: Executa ferramenta [shell] com comando 'nslookup prod.db.local'
Observation: "Name: prod.db.local Address: 10.0.0.55"
Thought: Agora tenho o IP. Posso tentar a conexão no banco.
Action: Executa ferramenta [sql_client]...`
        },
        {
          id: 'sec-5',
          type: 'callout',
          calloutType: 'tip',
          title: 'Prevenindo Loops Infinitos',
          content: 'Sempre defina um `max_iterations` no seu orquestrador (ex: LangGraph). Se o agente ficar preso tentando o mesmo comando quebrado 15 vezes, ele deve interromper o loop e pedir ajuda ao usuário humano.'
        }
      ]
    }
  },
  {
    id: 'multi-agent',
    moduleId: 'agentic-ai',
    title: 'Orquestração Multi-Agente',
    description: 'Arquiteturas avançadas onde vários agentes colaboram entre si.',
    order: 3,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-6',
          type: 'concept',
          title: 'Supervisor e Workers',
          content: 'Em vez de usar um prompt gigante para fazer tudo, cria-se um Agente "Supervisor" que apenas delega tarefas. Ele pode chamar o Agente "Pesquisador" (com MCP de Browser) e depois passar o resultado para o Agente "Programador" (com MCP de GitHub).'
        },
        {
          id: 'sec-7',
          type: 'text',
          title: 'Vantagens do Isolamento',
          content: 'Ao isolar papéis, reduzimos a chance do LLM se distrair, economizamos tokens (pois o agente codificador não precisa do histórico de navegação web), e podemos definir permissões de segurança restritas para cada worker.'
        }
      ]
    }
  }
];
