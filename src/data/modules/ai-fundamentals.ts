import { Lesson, Concept } from '../../types';

export const aiFundamentalsConcepts: Concept[] = [
  {
    id: 'ai-concept',
    term: 'Inteligência Artificial (IA)',
    simpleDefinition: 'Máquinas ou softwares capazes de realizar tarefas que normalmente exigem inteligência humana.',
    technicalExplanation: 'Um campo amplo da ciência da computação que inclui sistemas baseados em regras simbólicas até redes neurais complexas focadas em aproximação de funções.',
    example: 'Um NPC de video game, um corretor ortográfico ou a Siri.',
    appliedExample: 'Usar o Waze para encontrar a rota mais rápida, onde o sistema avalia o tráfego em tempo real.',
    instructorNote: 'Analogia: A IA é como a "ciência mãe", a física. É o grande guarda-chuva de tudo.',
    category: 'Fundamentos',
    relatedTerms: ['machine-learning']
  },
  {
    id: 'ml-concept',
    term: 'Machine Learning',
    simpleDefinition: 'Sistemas que aprendem sozinhos a partir de exemplos, sem precisarem ser explicitamente programados.',
    technicalExplanation: 'Técnica de IA onde modelos estatísticos são usados para encontrar padrões em dados. Envolve minimizar uma função de perda ajustando pesos iterativamente (ex: Gradient Descent).',
    example: 'Filtro de spam do email.',
    appliedExample: 'A Netflix sugerindo um filme porque você assistiu a outros parecidos.',
    instructorNote: 'Diferencie da programação clássica (Regras + Dados = Resposta) para ML (Dados + Resposta = Regras).',
    category: 'Fundamentos',
    relatedTerms: ['deep-learning', 'ai']
  },
  {
    id: 'llm-concept',
    term: 'LLM (Large Language Model)',
    simpleDefinition: 'Uma IA especialista em texto que leu quase toda a internet e sabe como continuar uma frase de forma inteligente.',
    technicalExplanation: 'Modelos probabilísticos baseados em redes neurais Transformers profundas, treinados via aprendizado auto-supervisionado para prever o próximo token.',
    example: 'Claude, ChatGPT, Gemini.',
    appliedExample: 'Pedir ao Claude para resumir um contrato jurídico em formato de tópicos.',
    instructorNote: 'É vital explicar que o LLM não "pensa" da forma humana, ele calcula as palavras mais prováveis baseadas em padrões aprendidos.',
    category: 'Modelos',
    relatedTerms: ['transformers', 'tokens']
  },
  {
    id: 'deep-learning-concept',
    term: 'Deep Learning',
    simpleDefinition: 'Uma subárea do Machine Learning que usa redes neurais profundas inspiradas no cérebro humano.',
    technicalExplanation: 'Redes neurais artificiais com múltiplas camadas ocultas (hidden layers) que aprendem representações de dados com múltiplos níveis de abstração.',
    example: 'Reconhecimento facial do celular.',
    appliedExample: 'Carros autônomos processando imagens da rua em tempo real para evitar obstáculos.',
    instructorNote: 'É o "motor" por trás da IA Generativa moderna.',
    category: 'Fundamentos',
    relatedTerms: ['machine-learning', 'ai']
  },
  {
    id: 'gen-ai-concept',
    term: 'IA Generativa',
    simpleDefinition: 'Sistemas focados em criar novos conteúdos (texto, imagem, áudio) em vez de apenas classificar dados.',
    technicalExplanation: 'Modelos que aprendem a distribuição conjunta ou condicional dos dados de treinamento para gerar novas amostras da mesma distribuição.',
    example: 'Midjourney criando imagens ou Claude escrevendo código.',
    appliedExample: 'Gerar um rascunho de e-mail profissional a partir de instruções curtas.',
    instructorNote: 'Diferencie IA Discriminativa (que diz se a foto é um gato ou cachorro) da IA Generativa (que desenha um gato novo).',
    category: 'Conceitos Modernos',
    relatedTerms: ['llm', 'deep-learning']
  },
  {
    id: 'hallucination-concept',
    term: 'Alucinação',
    simpleDefinition: 'Quando a IA inventa informações que parecem verdadeiras, mas estão erradas.',
    technicalExplanation: 'O modelo gera respostas baseadas em probabilidades matemáticas de tokens que, linguisticamente, fazem sentido, mas que não têm aderência aos fatos do mundo real (grounding).',
    example: 'A IA citar um artigo científico que não existe.',
    appliedExample: 'Um chatbot de atendimento prometendo um desconto que a empresa não oferece.',
    instructorNote: 'Sempre alerte os alunos: a IA não tem "senso comum" e não pesquisa o mundo real a menos que use ferramentas (RAG/Web Search).',
    category: 'Riscos',
    relatedTerms: ['llm']
  },
  {
    id: 'embeddings-concept',
    term: 'Embeddings & Espaço Vetorial',
    simpleDefinition: 'A forma como a IA traduz palavras e conceitos em coordenadas matemáticas para entender significados.',
    technicalExplanation: 'Vetores de números reais em um espaço de alta dimensionalidade onde a distância geométrica entre dois vetores representa a similaridade semântica entre eles.',
    example: 'A IA entende que "Rei" - "Homem" + "Mulher" = "Rainha".',
    appliedExample: 'Usar busca vetorial para encontrar documentos sobre "animais de estimação" mesmo que a busca do usuário tenha sido apenas "cachorro".',
    instructorNote: 'Isso é fundamental! É a resposta para a pergunta clássica: "Como a IA sabe o que as palavras significam?". Ela não sabe, ela mapeia distâncias.',
    category: 'Matemática e Estrutura',
    relatedTerms: ['rag', 'llm']
  },
  {
    id: 'rag-concept',
    term: 'RAG (Retrieval-Augmented Generation)',
    simpleDefinition: 'Técnica de dar um "Google" em documentos privados antes de pedir para a IA responder, conectando a IA aos seus dados.',
    technicalExplanation: 'Um padrão de arquitetura que une Recuperação de Informação (Bancos Vetoriais) com Geração de Texto. Ao invés de depender apenas dos pesos estáticos do modelo, o RAG busca o contexto em tempo real e o injeta no prompt.',
    example: 'Chatbot de suporte lendo o manual atualizado da empresa antes de responder ao cliente.',
    appliedExample: 'Construir um assistente jurídico que lê os PDFs dos processos antes de emitir um parecer.',
    instructorNote: 'É a técnica nº 1 recomendada pela Anthropic para empresas corporativas mitigarem alucinações de maneira barata e segura.',
    category: 'Arquitetura',
    relatedTerms: ['embeddings', 'hallucination']
  },
  {
    id: 'fine-tuning-concept',
    term: 'Fine-Tuning (Ajuste Fino)',
    simpleDefinition: 'Pegar uma IA que já sabe muito e dar um treinamento extra focado em uma tarefa bem específica.',
    technicalExplanation: 'Processo de atualizar os pesos de uma rede neural pré-treinada usando gradiente descendente em um dataset menor e supervisionado, otimizando o modelo para um formato específico.',
    example: 'Treinar o modelo apenas com e-mails da sua empresa para que ele escreva com o mesmo tom de voz.',
    appliedExample: 'Criar um modelo médico especializado após treinar um modelo base com milhares de diagnósticos anotados.',
    instructorNote: 'Alunos sempre confundem RAG com Fine-Tuning. RAG é para "ensinar fatos novos". Fine-Tuning é para "ensinar novos comportamentos e estilos".',
    category: 'Treinamento',
    relatedTerms: ['llm', 'machine-learning']
  },
  {
    id: 'temperature-concept',
    term: 'Temperatura & Top-P',
    simpleDefinition: 'Os botões de volume que controlam o nível de criatividade ou "loucura" da IA.',
    technicalExplanation: 'Temperatura ajusta a distribuição de probabilidade da função Softmax na última camada do LLM. Valores altos "achatam" a distribuição (trazendo diversidade/risco), valores próximos a 0 tornam a escolha quase determinística.',
    example: 'Temperatura 0.0 para extrair JSON de um boleto. Temperatura 1.0 para escrever poesia.',
    appliedExample: 'Na API da Anthropic, você altera `temperature: 0` quando não quer que o Claude varie as respostas lógicas.',
    instructorNote: 'Sempre exija que engenheiros usem Temp 0 para extração de dados e código, e Temp ~0.7 para copywriting.',
    category: 'Parâmetros',
    relatedTerms: ['llm']
  }
];

export const aiFundamentalsLessons: Lesson[] = [
  {
    id: 'intro-ia',
    moduleId: 'ai-fundamentals',
    title: 'O que é Inteligência Artificial',
    description: 'Nesta lição, desmistificaremos o que realmente é IA e as diferenças entre as abordagens clássicas e modernas.',
    order: 1,
    estimatedMinutes: 15,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'animation',
          componentId: 'NeuralNetwork'
        },
        {
          id: 'sec-1-text',
          type: 'text',
          title: 'Além da Ficção Científica',
          content: 'A Inteligência Artificial (IA) permeia nossas vidas, desde recomendações do Spotify até o corretor automático do celular. Mas o que a difere da programação tradicional? Na programação tradicional, nós damos as regras (o código) e os dados para obter respostas. Na IA moderna, damos os dados e as respostas esperadas, e o sistema descobre as regras.'
        },
        {
          id: 'sec-2',
          type: 'callout',
          calloutType: 'instructor',
          content: 'Ao ensinar, utilize a analogia da receita de bolo. Programação clássica é seguir a receita à risca. Machine Learning é provar mil bolos diferentes, ler seus ingredientes, e aprender a criar a própria receita.'
        }
      ]
    }
  },
  {
    id: 'llm-transformers',
    moduleId: 'ai-fundamentals',
    title: 'LLMs e Transformers',
    description: 'Mergulhe no coração dos modelos de linguagem modernos e na arquitetura que mudou tudo.',
    order: 2,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-3',
          type: 'text',
          title: 'A Revolução do Transformer',
          content: 'Em 2017, um artigo chamado "Attention Is All You Need" apresentou a arquitetura Transformer. Antes disso, o texto era processado palavra por palavra, o que perdia contexto longo. O Transformer processa palavras em paralelo e usa o mecanismo de "Atenção" (Attention) para entender quais palavras em uma frase se relacionam mais fortemente.'
        },
        {
          id: 'sec-4',
          type: 'concept',
          title: 'Mecanismo de Atenção',
          content: 'Na frase "O banco do parque quebrou quando ele sentou no banco para pegar dinheiro no banco", a Atenção ajuda o modelo a diferenciar os significados de "banco" baseado no contexto de "parque", "sentou" e "dinheiro".'
        }
      ]
    }
  },
  {
    id: 'cisco-gen-ai-intro',
    moduleId: 'ai-fundamentals',
    title: 'Introdução à IA Moderna (Generativa)',
    description: 'Como a IA Generativa se difere da IA tradicional e o impacto dos chatbots conversacionais.',
    order: 3,
    estimatedMinutes: 15,
    content: {
      sections: [
        {
          id: 'sec-5',
          type: 'text',
          title: 'IA Discriminativa vs Generativa',
          content: 'A evolução moderna da IA foi marcada pela transição de modelos que apenas categorizavam dados (ex: prever se um e-mail é spam ou não) para modelos capazes de criar dados inteiramente novos (texto, imagens e código). Essa é a essência da IA Generativa.'
        },
        {
          id: 'sec-6',
          type: 'callout',
          calloutType: 'tip',
          content: 'A interface de Chat (chatbots conversacionais como o Claude) foi a grande responsável por democratizar a IA Generativa, permitindo que qualquer pessoa interaja com redes neurais complexas usando linguagem natural em vez de código.'
        }
      ]
    }
  },
  {
    id: 'cisco-prompt-risks',
    moduleId: 'ai-fundamentals',
    title: 'Desafios: Alucinações e Vieses',
    description: 'Compreenda as limitações da IA moderna para usá-la e ensiná-la com responsabilidade.',
    order: 4,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-7',
          type: 'concept',
          title: 'A Ilusão do Conhecimento',
          content: 'LLMs são previsores de palavras, não bancos de dados factuais. Eles podem gerar respostas que soam altamente confiantes, mas que são faticamente incorretas (Alucinação). Além disso, eles herdam os vieses e preconceitos dos dados humanos com os quais foram treinados.'
        },
        {
          id: 'sec-8',
          type: 'text',
          title: 'Mitigação Básica via Prompt',
          content: 'A principal ferramenta contra alucinações é fornecer contexto no próprio prompt. Instruir a IA dizendo "Baseado estritamente no texto fornecido abaixo, responda a pergunta. Se a resposta não estiver no texto, diga que não sabe" reduz drasticamente as chances de invenção de dados.'
        }
      ]
    }
  },
  {
    id: 'advanced-embeddings',
    moduleId: 'ai-fundamentals',
    title: 'Como a IA lê o mundo (Embeddings)',
    description: 'A base matemática por trás da compreensão semântica dos modelos de linguagem modernos.',
    order: 5,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-9',
          type: 'animation',
          componentId: 'EmbeddingsSpace'
        },
        {
          id: 'sec-9-text',
          type: 'text',
          title: 'Espaços de Alta Dimensionalidade',
          content: 'Os LLMs não processam letras, processam arrays de números (vetores). Quando a Anthropic treina o Claude, ela mapeia conceitos em um espaço de milhares de dimensões. Palavras relacionadas ficam próximas umas das outras. Isso permite que a IA faça matemática com a linguagem.'
        },
        {
          id: 'sec-10',
          type: 'callout',
          calloutType: 'info',
          content: 'Exemplo clássico: Se pegarmos as coordenadas matemáticas de "Rei", subtrairmos "Homem" e somarmos "Mulher", o resultado cairá exatamente nas coordenadas da palavra "Rainha".'
        }
      ]
    }
  },
  {
    id: 'advanced-rag',
    moduleId: 'ai-fundamentals',
    title: 'Arquitetura RAG na Prática',
    description: 'Como integrar a IA com bancos de dados corporativos para torná-la um especialista na sua empresa.',
    order: 6,
    estimatedMinutes: 30,
    content: {
      sections: [
        {
          id: 'sec-11',
          type: 'animation',
          componentId: 'RAGFlow'
        },
        {
          id: 'sec-11-text',
          type: 'text',
          title: 'Retrieval-Augmented Generation',
          content: 'A IA sabe sobre o mundo até a sua data de treinamento, mas não sabe nada sobre os e-mails internos da sua empresa. O fluxo RAG resolve isso: 1. O usuário pergunta algo. 2. O sistema faz uma busca vetorial no banco de dados privado. 3. O sistema pega os documentos mais relevantes e os cola invisivelmente no prompt. 4. A IA lê e responde baseada apenas nesses documentos.'
        },
        {
          id: 'sec-12',
          type: 'callout',
          calloutType: 'warning',
          content: 'Instrutores, reforcem: RAG não treina a IA! A IA esquece tudo assim que a conversa acaba. RAG é "dar uma prova com consulta".'
        }
      ]
    }
  },
  {
    id: 'advanced-decision',
    moduleId: 'ai-fundamentals',
    title: 'Decisão Arquitetural: Fine-Tuning vs RAG',
    description: 'O guia definitivo para orientar empresas e engenheiros em suas jornadas de IA.',
    order: 7,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-13',
          type: 'concept',
          title: 'A Regra de Ouro',
          content: 'RAG fornece CONHECIMENTO. Fine-Tuning fornece COMPORTAMENTO/ESTRUTURA.'
        },
        {
          id: 'sec-14',
          type: 'text',
          title: 'Quando usar cada um?',
          content: 'Se sua IA precisa saber as regras de RH que mudaram ontem: Use RAG. Se sua IA precisa falar no tom exato da marca da empresa e responder sempre em um formato JSON obscuro: Use Fine-Tuning.'
        }
      ]
    }
  },
  {
    id: 'references-ai',
    moduleId: 'ai-fundamentals',
    title: 'Referências Bibliográficas',
    description: 'Fontes oficiais e acadêmicas utilizadas para compor este currículo.',
    order: 8,
    estimatedMinutes: 5,
    content: {
      sections: [
        {
          id: 'sec-15',
          type: 'list',
          title: 'Fontes de Estudo Oficiais',
          items: [
            'Cisco Networking Academy: "Introduction to Modern AI" (Fundamentos de IA Generativa e Modelos de Linguagem).',
            'Anthropic Documentation: Diretrizes oficiais sobre Claude, Constitutional AI e RAG.',
            'Artigo Acadêmico (Google Brain, 2017): "Attention Is All You Need" (Fundação da arquitetura Transformer).'
          ]
        },
        {
          id: 'sec-16',
          type: 'callout',
          calloutType: 'info',
          content: 'Como instrutor da Anthropic, encoraje sempre seus alunos a lerem o artigo original do Transformer e a documentação oficial da API da Anthropic para aprofundamento técnico contínuo.'
        }
      ]
    }
  }
];
