import { Lesson } from '../../types';

export const mcpLessons: Lesson[] = [
  {
    id: 'mcp-intro',
    moduleId: 'mcp',
    title: 'Model Context Protocol (MCP)',
    description: 'Entenda o padrão revolucionário de integração open-source da Anthropic.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'animation',
          componentId: 'MCPArchitecture'
        },
        {
          id: 'sec-1-text',
          type: 'text',
          title: 'O Problema da Integração N-para-N',
          content: 'Antes do MCP, conectar modelos de IA a fontes de dados (PostgreSQL, GitHub, Slack, Notion) exigia códigos personalizados para cada combinação (integrações proprietárias). O MCP padroniza isso. Funciona como o padrão "USB-C" para a inteligência artificial: você escreve um servidor MCP uma vez, e qualquer cliente MCP (como o Claude Desktop) pode usar.'
        },
        {
          id: 'sec-2',
          type: 'callout',
          calloutType: 'info',
          content: 'O MCP não substitui a API do Claude, ele é um protocolo de comunicação Local/Remoto. A estrutura é: Cliente (IDE, Claude Desktop) fala com Servidor MCP (que roda na máquina do dev ou na nuvem conectada ao banco de dados).'
        }
      ]
    }
  },
  {
    id: 'mcp-capabilities',
    moduleId: 'mcp',
    title: 'Resources, Tools e Prompts no MCP',
    description: 'As 3 primitivas principais que um servidor MCP expõe para um cliente.',
    order: 2,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-3',
          type: 'list',
          title: 'Primitivas do MCP',
          items: [
            'Resources: Dados estáticos expostos pelo servidor. Como se fosse uma URL que o LLM pode ler (ex: "file:///logs/error.log" ou "postgres://table/users").',
            'Tools: Ações dinâmicas que o LLM pode invocar. Ex: "query_database(sql_string)" ou "restart_server()".',
            'Prompts: Templates de contexto pré-prontos que usuários podem selecionar na interface do cliente.'
          ]
        },
        {
          id: 'sec-4',
          type: 'text',
          title: 'Segurança por Design',
          content: 'No MCP, o cliente deve aprovar as conexões e cada ferramenta que o servidor sugere. Isso permite que desenvolvedores tenham a IA alterando código no projeto A, mas bloqueada de acessar os segredos no projeto B.'
        }
      ]
    }
  }
];
