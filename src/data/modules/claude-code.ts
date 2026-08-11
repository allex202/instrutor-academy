import { Lesson } from '../../types';

export const claudeCodeLessons: Lesson[] = [
  {
    id: 'claude-code-intro',
    moduleId: 'claude-code',
    title: 'A Nova Era: Claude na Linha de Comando',
    description: 'Introdução à ferramenta de terminal (CLI) que traz a inteligência do Claude diretamente para seu ambiente de desenvolvimento local.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'IA Nativamente Integrada',
          content: 'O Claude Code é uma ferramenta CLI (Interface de Linha de Comando) desenvolvida pela Anthropic. Em vez de copiar e colar código entre o VS Code e o site do Claude, você interage com o Claude diretamente na raiz do seu projeto através do seu Terminal. Ele navega nos seus arquivos, cria scripts, altera dependências, lê documentações locais e roda testes, tudo de forma autônoma (sob sua supervisão).'
        },
        {
          id: 'sec-2',
          type: 'code',
          title: 'Instalação Rápida',
          content: `# Usando o Node Package Manager (NPM)\nnpm install -g @anthropic-ai/claude-code\n\n# Autenticando com sua chave de API via OAuth\nclaude auth\n\n# Iniciando uma sessão no diretório atual\nclaude`
        }
      ]
    }
  },
  {
    id: 'claude-code-workflows',
    moduleId: 'claude-code',
    title: 'Workflows Práticos de Engenharia',
    description: 'Aprenda a orquestrar projetos inteiros, debugar erros sistêmicos e refatorar grandes blocos de código com eficiência extrema.',
    order: 2,
    estimatedMinutes: 30,
    content: {
      sections: [
        {
          id: 'sec-3',
          type: 'list',
          title: 'Casos de Uso Poderosos',
          items: [
            'Bootstrapping Inicial: "Use npx create-react-app e instale o Tailwind v4. Depois crie um componente de formulário de login no arquivo Login.tsx"',
            'Refatoração Global: "Vá em todas as páginas da pasta /src/views e atualize a importação antiga de Button para o novo caminho."',
            'Debugging Avançado de Terminal: "Execute npm run build. Se der erro, leia os logs e corrija os arquivos problemáticos automaticamente."',
            'Documentação Dinâmica: "Analise toda a pasta /utils e escreva um README.md explicando o que cada função faz."'
          ]
        },
        {
          id: 'sec-4',
          type: 'callout',
          calloutType: 'tip',
          title: 'Permissões e Segurança',
          content: 'Embora o Claude Code aja como um desenvolvedor Sênior autônomo na sua máquina, ele nunca roda comandos destrutivos (como rm -rf, drop table) ou faz commits sem pedir a sua confirmação explícita na tela (Yes/No). Ele também lê o arquivo .gitignore para não consumir tokens lendo a pasta node_modules.'
        }
      ]
    }
  },
  {
    id: 'claude-code-slash',
    moduleId: 'claude-code',
    title: 'Slash Commands (/commands)',
    description: 'Atalhos essenciais para manipular o ambiente de terminal do Claude Code de forma profissional.',
    order: 3,
    estimatedMinutes: 15,
    content: {
      sections: [
        {
          id: 'sec-5',
          type: 'text',
          title: 'Controle Estrutural',
          content: 'No terminal, você não precisa ficar descrevendo configurações gigantes em inglês. A Anthropic implementou "Slash Commands" que executam regras lógicas de gestão de prompt instantâneas.'
        },
        {
          id: 'sec-6',
          type: 'list',
          title: 'Os Comandos Principais',
          items: [
            '/clear : Limpa a janela de contexto atual (Ideal para quando a conversa ficou gigante e está consumindo muitos tokens por mensagem).',
            '/compact : Comprime as mensagens anteriores do histórico para economizar contexto e baratear a API.',
            '/cost : Exibe o custo total gasto na sessão atual da CLI em dólares.',
            '/help : Lista todas as habilidades locais e ferramentas de MCP que o Claude Code descobriu no seu computador.'
          ]
        }
      ]
    }
  }
];
