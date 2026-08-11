import { Lesson } from '../../types';

export const openaiLessons: Lesson[] = [
  {
    id: 'openai-alignment',
    moduleId: 'openai',
    title: 'A Ciência do Alinhamento (RLHF e PPO)',
    description: 'Entenda os fundamentos algorítmicos que separaram o ChatGPT do resto do mundo.',
    order: 1,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'Além do Hype: RLHF Baseado em PPO',
          content: 'A OpenAI não inventou a arquitetura Transformer (Google, 2017), mas foi a primeira a dominar a escala do **RLHF** (Reinforcement Learning from Human Feedback). Eles utilizaram um algoritmo robusto chamado **PPO** (Proximal Policy Optimization) para treinar um "Reward Model". Diferente do Constitutional AI da Anthropic (onde o próprio modelo julga suas saídas), a OpenAI usou um exército de contratados humanos para rankear milhares de respostas, forçando o modelo a otimizar sua probabilidade de gerar a resposta que o humano julgaria "mais útil e amigável".'
        },
        {
          id: 'sec-2',
          type: 'callout',
          calloutType: 'tip',
          title: 'Referência Oficial',
          content: 'O artigo fundacional dessa técnica é o "Training language models to follow instructions with human feedback" (Ouyang et al., 2022) - o famoso paper do InstructGPT. Ele estabeleceu o padrão ouro de alinhamento de IA na indústria.'
        }
      ]
    }
  },
  {
    id: 'openai-o1-strawberry',
    moduleId: 'openai',
    title: 'O Paradigma o1 e Inference-Time Compute',
    description: 'A revolução do raciocínio oculto (Strawberry).',
    order: 2,
    estimatedMinutes: 30,
    content: {
      sections: [
        {
          id: 'sec-3',
          type: 'concept',
          title: 'Escalando a Inferência, não apenas o Treinamento',
          content: 'Até meados de 2024, a regra era: treine modelos maiores (Training-Time Compute). A série de modelos "o1" (codinome Strawberry) inverteu essa lógica, aplicando "Inference-Time Compute". Quando você envia um prompt, o o1 não gera a resposta imediatamente. Ele usa um algoritmo similar ao **Monte Carlo Tree Search (MCTS)** para gerar Cadeias de Pensamento (Chain of Thought) em um "scratchpad" oculto, provando teoremas matemáticos e descartando caminhos lógicos falsos antes de lhe responder.'
        },
        {
          id: 'sec-4',
          type: 'list',
          title: 'Limitações Arquiteturais do o1 (Atualmente)',
          items: [
            'Sem Suporte a Tools (Function Calling): Como o modelo bifurca seu pensamento dezenas de vezes em loop fechado, inserir o servidor do usuário no meio desse loop destrói a estabilidade matemática do raciocínio.',
            'Sem Streaming Rápido: Você precisa aguardar dezenas de segundos enquanto os "tokens invisíveis" (hidden reasoning tokens) são gerados. Não espere respostas instantâneas.',
            'Nova hierarquia de Prompt: O `o1` lida mal com a tag `"system"`. A recomendação oficial da OpenAI para esses modelos de raciocínio é usar a nova role `"developer"`, que traz instruções diretas sem tentar "hipnotizar" o modelo com personas.'
          ]
        },
        {
          id: 'sec-5',
          type: 'callout',
          calloutType: 'warning',
          title: 'Citação da Documentação Oficial',
          content: 'Segundo a API Docs da OpenAI: "Modelos o1 não suportam streaming, system messages, ou ferramentas na sua versão inicial base. Use a nova role `developer` para orientações ao invés de `system`."'
        }
      ]
    }
  },
  {
    id: 'openai-api-architecture',
    moduleId: 'openai',
    title: 'Chat Completions vs Assistants API',
    description: 'Compreenda a dualidade de integração oferecida pela OpenAI.',
    order: 3,
    estimatedMinutes: 20,
    content: {
      sections: [
        {
          id: 'sec-6',
          type: 'text',
          title: 'Chat Completions API (Stateless)',
          content: 'O endpoint `/v1/chat/completions` é burro (Stateless). Se você não enviar todo o array de histórico a cada requisição, a IA não lembrará da última mensagem. Você é obrigado a criar o seu próprio banco de dados (ex: Redis/Postgres) e cuidar do RAG com um banco de Vetores (ex: Pinecone).'
        },
        {
          id: 'sec-7',
          type: 'text',
          title: 'Assistants API (Stateful + Nuvem)',
          content: 'Lançado no DevDay, o `/v1/assistants` é o inverso. A OpenAI armazena as threads para você. Mais do que isso: eles oferecem uma ferramenta de **Code Interpreter** nativa (um container Docker temporário que executa Python para desenhar gráficos ou analisar planilhas Excel) e **File Search** (um Vector Store automático da própria OpenAI). É o caminho mais rápido para um MVP, com o trade-off do "vendor lock-in".'
        }
      ]
    }
  },
  {
    id: 'openai-prompting-structured',
    moduleId: 'openai',
    title: 'Engenharia de Prompt e Structured Outputs',
    description: 'Como manipular a decodificação da IA para gerar JSON determinístico.',
    order: 4,
    estimatedMinutes: 25,
    content: {
      sections: [
        {
          id: 'sec-8',
          type: 'concept',
          title: 'Markdown vs XML',
          content: 'Enquanto o Claude foi afinado (fine-tuned) para amar XML `<tags>`, o GPT-4o foi alimentado com bilhões de tokens de Markdown (`#`, `**`, `-`). Se você aplicar prompts projetados para o Claude no GPT-4o, ele muitas vezes ignorará o XML ou responderá de forma "teimosa". Sempre prefira cabeçalhos Markdown na OpenAI.'
        },
        {
          id: 'sec-9',
          type: 'text',
          title: 'A Revolução do "Strict Structured Outputs"',
          content: 'Historicamente, pedir JSON para um LLM era uma loteria. A OpenAI introduziu o parâmetro `strict: true` (no `response_format`). Isso não é apenas um truque de prompt; a OpenAI literalmente alterou o algoritmo amostral do modelo (Decodificação). O modelo só pode gerar o próximo token se esse token for sintaticamente válido de acordo com o seu JSON Schema (padrão Grammar-Based Decoding). O resultado? 100% de consistência estrutural, 0 erros de parsing.'
        },
        {
          id: 'sec-10',
          type: 'code',
          title: 'Referência: Pydantic na API (OpenAI Cookbook)',
          content: `from pydantic import BaseModel
from openai import OpenAI

client = OpenAI()

class ResearchPaper(BaseModel):
    title: str
    authors: list[str]
    year: int

# O '.parse' usa o Structured Outputs nativamente
completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "You are a research assistant."},
        {"role": "user", "content": "Extract info: 'Attention is All You Need', Vaswani et al, 2017"}
    ],
    response_format=ResearchPaper,
)

paper = completion.choices[0].message.parsed
print(paper.title) # Garantia determinística de ser string`
        }
      ]
    }
  }
];
