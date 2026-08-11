import { Lesson } from '../../types';

export const geminiLessons: Lesson[] = [
  {
    id: 'gemini-architecture',
    moduleId: 'gemini',
    title: 'A Arquitetura Gemini (MoE e Multimodalidade Nativa)',
    description: 'Descubra como o Google unificou texto, áudio e vídeo desde os pesos de treinamento iniciais.',
    order: 1,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'Treinamento Multimodal Nativo',
          content: 'A principal diferença arquitetônica do Gemini em relação aos GPTs iniciais é a Multimodalidade Nativa. Enquanto outras empresas treinavam modelos de texto e depois "remendavam" analisadores de imagem e áudio por cima, o Gemini foi projetado desde o dia zero (no nível dos tensores) para observar vídeos, ouvir áudios e ler textos simultaneamente. Isso reduz severamente a perda de informação cruzada.'
        },
        {
          id: 'sec-2',
          type: 'concept',
          title: 'MoE (Mixture of Experts)',
          content: 'Modelos gigantescos como o Gemini 1.5 Pro não acionam todos os seus parâmetros a cada palavra gerada. Eles utilizam a técnica Mixture of Experts. A rede neural atua como um roteador que envia perguntas de programação apenas para o "Especialista em Código", e perguntas de história para o "Especialista em História". Isso economiza muito processamento computacional (Compute) e aumenta a inteligência bruta.'
        },
        {
          id: 'sec-3',
          type: 'callout',
          calloutType: 'tip',
          title: 'Referência DeepMind',
          content: 'Para um mergulho científico na arquitetura, consulte o "Gemini 1.5: Our next-generation model, now available for Private Preview in Google AI Studio" (DeepMind Technical Report, 2024).'
        }
      ]
    }
  },
  {
    id: 'gemini-context-ring-attention',
    moduleId: 'gemini',
    title: 'Ring Attention: Os 2 Milhões de Tokens',
    description: 'Como o Google quebrou a barreira da janela de contexto.',
    order: 2,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-4',
          type: 'text',
          title: 'O Problema Quadrático do Transformer',
          content: 'A arquitetura Transformer clássica sofre do "Problema Quadrático": dobrar a janela de contexto requer 4x mais memória de GPU. É por isso que muitos modelos paravam em 32k ou 128k tokens.'
        },
        {
          id: 'sec-5',
          type: 'concept',
          title: 'A Solução: Ring Attention',
          content: 'A equipe da Google contornou isso com técnicas modernas como Ring Attention. O algoritmo fragmenta o bloco de contexto (ex: um livro de 2 milhões de tokens) em vários pedaços menores e os espalha por um anel de dezenas de GPUs interconectadas (via NVLink/TPUs). Cada placa de vídeo calcula um fragmento e passa o resultado para a vizinha, mantendo o Raciocínio Global sem explodir a memória.'
        },
        {
          id: 'sec-6',
          type: 'list',
          title: 'O que cabe em 2 Milhões de Tokens?',
          items: [
            'Repositórios inteiros de código-fonte corporativo.',
            'Mais de 2 horas ininterruptas de análise frame a frame de vídeos pesados.',
            'Milhares de relatórios financeiros cruzados em um único prompt (sem necessidade de banco de dados vetorial / RAG tradicional).'
          ]
        }
      ]
    }
  },
  {
    id: 'gemini-spark',
    moduleId: 'gemini',
    title: 'Gemini Spark: O Agente Always-On (Google I/O 2026)',
    description: 'A revolução da IA Pró-Ativa e Autônoma movida pela Google Antigravity.',
    order: 3,
    estimatedMinutes: 30,
    content: {
      sections: [
        {
          id: 'sec-7',
          type: 'text',
          title: 'Além dos Chatbots: IA Autônoma Contínua',
          content: 'Chatbots tradicionais são "reativos": eles esperam você digitar um prompt, respondem, e "morrem" (a sessão encerra). O Gemini Spark inaugura a era "Always-On" (Sempre Ligado). Ele roda de forma persistente em instâncias isoladas (VMs) na infraestrutura Google Cloud, operando de forma autônoma 24 horas por dia.'
        },
        {
          id: 'sec-8',
          type: 'text',
          title: 'Orquestração com Google Antigravity',
          content: 'Movido pelos modelos Gemini 3.5 Flash e superiores, o Spark utiliza a poderosa engine de agent workflow *Google Antigravity*. O usuário delega um objetivo (ex: "Organize meus e-mails financeiros semanalmente em planilhas"). O agente decompõe a tarefa, interage assincronamente com o Google Workspace (Docs, Sheets, Gmail) em background, e avisa o humano apenas quando precisa de autorização para ações de alto risco.'
        },
        {
          id: 'sec-9',
          type: 'callout',
          calloutType: 'warning',
          title: 'Supervisão Humana In The Loop',
          content: 'Embora o Spark possua forte capacidade agêntica para "web errands" (tarefas online como reservas de viagens e varredura na web), a arquitetura da Google mantém checkpoints obrigatórios (Human-in-the-Loop) para garantir que limites éticos não sejam ultrapassados e que os custos sejam previsíveis.'
        }
      ]
    }
  },
  {
    id: 'gemini-ecosystem',
    moduleId: 'gemini',
    title: 'Ecossistema: Google AI Studio vs Vertex AI',
    description: 'Onde rodar o Gemini em Produção.',
    order: 4,
    estimatedMinutes: 15,
    content: {
      sections: [
        {
          id: 'sec-10',
          type: 'concept',
          title: 'A Divisão do Ecossistema',
          content: 'Um instrutor de elite precisa saber posicionar o produto correto para a empresa correta.'
        },
        {
          id: 'sec-11',
          type: 'list',
          title: 'Comparativo de Deployment',
          items: [
            'Google AI Studio: O playground dos desenvolvedores. Excelente para testar novas features experimentais, prototipar e brincar de graça com o Gemini 1.5 Pro. Não possui governança corporativa pesada.',
            'Google Cloud Vertex AI: O ecossistema Enterprise real. Possui SLAs (Service Level Agreements) rígidos, isolamento de dados com certificações HIPAA/SOC2, VPC peering, e o framework de RAG enterprise (Vertex Search & Conversation). É aqui que bancos e hospitais operam a IA do Google.'
          ]
        }
      ]
    }
  }
];
