import { GlossaryEntry } from '../types';

export const glossaryEntries: GlossaryEntry[] = [
  {
    id: 'ai',
    term: 'Inteligência Artificial (IA)',
    definition: 'Campo da ciência da computação dedicado a criar sistemas capazes de realizar tarefas que normalmente exigem inteligência humana, como reconhecimento de padrões e tomada de decisão.',
    category: 'Fundamentos',
    relatedTerms: ['machine-learning', 'deep-learning']
  },
  {
    id: 'machine-learning',
    term: 'Machine Learning (Aprendizado de Máquina)',
    definition: 'Subcampo da IA em que os sistemas aprendem e melhoram seu desempenho a partir de dados, em vez de serem explicitamente programados.',
    category: 'Fundamentos',
    relatedTerms: ['ai', 'deep-learning', 'training']
  },
  {
    id: 'deep-learning',
    term: 'Deep Learning (Aprendizado Profundo)',
    definition: 'Subcampo do Machine Learning baseado em redes neurais artificiais com múltiplas camadas. É a tecnologia base para os LLMs modernos.',
    category: 'Fundamentos',
    relatedTerms: ['machine-learning', 'transformers', 'neural-network']
  },
  {
    id: 'llm',
    term: 'Large Language Model (LLM)',
    definition: 'Modelo de inteligência artificial treinado em vastas quantidades de texto para compreender e gerar linguagem humana de forma coerente. Claude é um exemplo de LLM.',
    category: 'Fundamentos',
    relatedTerms: ['ai', 'generative-ai', 'transformers']
  },
  {
    id: 'generative-ai',
    term: 'Generative AI (IA Generativa)',
    definition: 'Tipos de sistemas de inteligência artificial focados em criar novos conteúdos, como textos, imagens ou áudios, a partir de padrões aprendidos.',
    category: 'Fundamentos',
    relatedTerms: ['ai', 'llm']
  },
  {
    id: 'nlp',
    term: 'Natural Language Processing (NLP)',
    definition: 'Processamento de Linguagem Natural. Área da IA que lida com a interação entre computadores e linguagem humana.',
    category: 'Fundamentos',
    relatedTerms: ['llm', 'transformers']
  },
  {
    id: 'transformers',
    term: 'Transformers',
    definition: 'Uma arquitetura de rede neural introduzida em 2017 que revolucionou o NLP. Destaca-se pelo uso de mecanismos de "atenção", processando contextos inteiros em paralelo.',
    category: 'Fundamentos',
    relatedTerms: ['deep-learning', 'llm', 'attention']
  },
  {
    id: 'tokens',
    term: 'Tokens',
    definition: 'As unidades básicas de dados processadas por um LLM. Podem ser palavras, partes de palavras ou até letras. Em média, 1 token ≈ 4 caracteres ou 0.75 palavras.',
    category: 'Conceitos Técnicos',
    relatedTerms: ['context-window', 'llm']
  },
  {
    id: 'embeddings',
    term: 'Embeddings',
    definition: 'Representações vetoriais de palavras ou tokens em um espaço matemático. Permitem que a IA compreenda relacionamentos semânticos entre diferentes conceitos.',
    category: 'Conceitos Técnicos',
    relatedTerms: ['nlp', 'transformers']
  },
  {
    id: 'training',
    term: 'Training (Treinamento)',
    definition: 'A fase onde um modelo de IA "aprende" padrões ao processar enormes bases de dados. Consome muita capacidade computacional e tempo.',
    category: 'Conceitos Técnicos',
    relatedTerms: ['inference', 'fine-tuning']
  },
  {
    id: 'inference',
    term: 'Inference (Inferência)',
    definition: 'A fase de uso do modelo após o treinamento. É quando o modelo aplica o que aprendeu para gerar novas respostas com base no input (prompt) do usuário.',
    category: 'Conceitos Técnicos',
    relatedTerms: ['training', 'prompt']
  },
  {
    id: 'fine-tuning',
    term: 'Fine-tuning (Ajuste Fino)',
    definition: 'Processo de pegar um modelo já treinado e treiná-lo adicionalmente em um conjunto de dados menor e especializado, para melhorar seu desempenho em tarefas específicas.',
    category: 'Conceitos Técnicos',
    relatedTerms: ['training', 'llm']
  },
  {
    id: 'rag',
    term: 'Retrieval-Augmented Generation (RAG)',
    definition: 'Técnica que melhora a precisão dos LLMs fornecendo dados externos e contextuais da base de conhecimento da própria empresa junto com o prompt.',
    category: 'Técnicas',
    relatedTerms: ['prompt-engineering', 'hallucination']
  },
  {
    id: 'context-window',
    term: 'Context Window (Janela de Contexto)',
    definition: 'A quantidade máxima de texto (tokens) que o modelo pode processar de uma só vez (somando o prompt e a resposta gerada). Claude 3, por exemplo, suporta 200k tokens.',
    category: 'Conceitos Técnicos',
    relatedTerms: ['tokens', 'llm']
  },
  {
    id: 'multimodality',
    term: 'Multimodalidade',
    definition: 'A capacidade de um modelo de IA de processar e entender diferentes tipos de dados (modos) simultaneamente, como texto e imagens. A família Claude 3 é multimodal (visão).',
    category: 'Conceitos Técnicos',
    relatedTerms: ['llm', 'generative-ai']
  },
  {
    id: 'reasoning',
    term: 'Reasoning (Raciocínio)',
    definition: 'A capacidade de um LLM de quebrar problemas complexos em etapas lógicas e deduzir soluções. Modelos maiores como Claude Opus possuem raciocínio muito superior.',
    category: 'Capacidades',
    relatedTerms: ['chain-of-thought']
  },
  {
    id: 'hallucination',
    term: 'Hallucination (Alucinação)',
    definition: 'Fenômeno onde um modelo gera informações incorretas, inventadas ou sem sentido de maneira muito confiante, por prever palavras de forma probabilística.',
    category: 'Riscos',
    relatedTerms: ['rag', 'grounding']
  },
  {
    id: 'constitutional-ai',
    term: 'Constitutional AI',
    definition: 'Método desenvolvido pela Anthropic para alinhar IAs. O modelo avalia e ajusta suas próprias respostas baseando-se em um conjunto de regras ou "constituição".',
    category: 'Segurança',
    relatedTerms: ['anthropic', 'responsible-ai']
  },
  {
    id: 'prompt',
    term: 'Prompt',
    definition: 'O texto ou instrução que o usuário envia para um modelo de IA para iniciar a interação e guiar o resultado gerado.',
    category: 'Prompting',
    relatedTerms: ['prompt-engineering', 'inference']
  },
  {
    id: 'prompt-engineering',
    term: 'Prompt Engineering',
    definition: 'A prática de estruturar instruções para obter o melhor resultado possível de um modelo de IA. Envolve técnicas como clareza, contexto e exemplos.',
    category: 'Prompting',
    relatedTerms: ['prompt', 'few-shot', 'chain-of-thought']
  },
  {
    id: 'few-shot',
    term: 'Few-Shot Prompting',
    definition: 'Técnica de engenharia de prompt onde se fornece alguns poucos exemplos (shots) do comportamento esperado para o modelo antes de fazer a requisição final.',
    category: 'Prompting',
    relatedTerms: ['prompt-engineering', 'zero-shot']
  },
  {
    id: 'chain-of-thought',
    term: 'Chain of Thought (CoT)',
    definition: 'Técnica de pedir ao modelo para "pensar passo a passo" antes de dar a resposta final. Melhora consideravelmente a precisão em tarefas lógicas.',
    category: 'Prompting',
    relatedTerms: ['prompt-engineering', 'reasoning']
  },
  {
    id: 'xml-tags',
    term: 'XML Tags (no Claude)',
    definition: 'Prática recomendada pela Anthropic para estruturar prompts usando tags como <contexto> ou <instrucoes>. Ajuda o Claude a entender claramente a separação lógica da instrução.',
    category: 'Prompting',
    relatedTerms: ['prompt-engineering', 'claude']
  },
  {
    id: 'mcp',
    term: 'Model Context Protocol (MCP)',
    definition: 'Um padrão de código aberto, introduzido pela Anthropic, que padroniza como aplicações de IA (clientes) se conectam a fontes de dados (servidores) de forma segura.',
    category: 'Integração',
    relatedTerms: ['tool-use', 'anthropic']
  },
  {
    id: 'tool-use',
    term: 'Tool Use (Function Calling)',
    definition: 'A capacidade de um modelo de IA interagir com ferramentas externas (APIs, calculadoras, bancos de dados) para realizar ações no mundo real ou obter dados atualizados.',
    category: 'Integração',
    relatedTerms: ['mcp', 'agentic-ai']
  },
  {
    id: 'agentic-ai',
    term: 'IA Agêntica (Agentic AI)',
    definition: 'Sistemas onde a IA tem autonomia para criar planos, usar ferramentas e tomar decisões em loop para atingir um objetivo complexo de alto nível sem supervisão contínua.',
    category: 'Avançado',
    relatedTerms: ['tool-use', 'reasoning']
  },
  {
    id: 'claude',
    term: 'Claude',
    definition: 'O assistente de IA desenvolvido pela Anthropic, conhecido por sua segurança avançada, longa janela de contexto e capacidades multimodais.',
    category: 'Modelos',
    relatedTerms: ['anthropic', 'opus', 'sonnet', 'haiku']
  },
  {
    id: 'claude-opus',
    term: 'Claude 3 Opus',
    definition: 'O modelo mais poderoso da família Claude 3, projetado para as tarefas mais complexas, análise profunda e codificação avançada.',
    category: 'Modelos',
    relatedTerms: ['claude']
  },
  {
    id: 'claude-sonnet',
    term: 'Claude 3.5 Sonnet',
    definition: 'O modelo mais versátil da Anthropic (atualmente 3.5), oferecendo o melhor equilíbrio entre inteligência, velocidade e custo. Excelente para codificação.',
    category: 'Modelos',
    relatedTerms: ['claude']
  },
  {
    id: 'claude-haiku',
    term: 'Claude 3.5 Haiku',
    definition: 'O modelo mais rápido e econômico da Anthropic, ideal para tarefas volumosas que exigem latência quase zero.',
    category: 'Modelos',
    relatedTerms: ['claude']
  },
  {
    id: 'prompt-injection',
    term: 'Prompt Injection',
    definition: 'Vulnerabilidade de segurança em que o input do usuário tenta subverter o prompt de sistema (instruções originais) da IA para fazê-la realizar ações indevidas.',
    category: 'Segurança',
    relatedTerms: ['jailbreak', 'responsible-ai']
  },
  {
    id: 'system-prompt',
    term: 'System Prompt',
    definition: 'Instruções invisíveis para o usuário final, mas enviadas ao modelo pela API, que definem a persona, restrições e o comportamento geral que a IA deve adotar.',
    category: 'Prompting',
    relatedTerms: ['prompt', 'grounding']
  }
];
