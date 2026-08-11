import React, { useState } from 'react';
import { Wrench, ArrowRight, Bot, Cpu, CheckCircle, Code, Brain } from 'lucide-react';
import { toolUseLessons } from '../data/modules/tool-use';
import CodeBlock from '../components/ui/CodeBlock';
import ToolUseFlow from '../components/animations/ToolUseFlow';

export default function ToolUse() {
  const [activeStep, setActiveStep] = useState(0);

  const workflowSteps = [
    { title: 'Usuário', desc: 'Faz uma pergunta que requer dados externos', icon: <Bot className="w-6 h-6" /> },
    { title: 'Claude', desc: 'Decide usar uma ferramenta apropriada', icon: <Brain className="w-6 h-6" /> },
    { title: 'Aplicação', desc: 'Executa a função solicitada localmente', icon: <Cpu className="w-6 h-6" /> },
    { title: 'Resultado', desc: 'Retorna os dados para o modelo', icon: <CheckCircle className="w-6 h-6" /> },
    { title: 'Resposta', desc: 'Claude formula resposta final baseada nos dados', icon: <Bot className="w-6 h-6" /> }
  ];

  // Lucide brain is not imported, let's use Cpu or Bot again or Zap. Let's fix imports.
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
          <Wrench className="w-8 h-8 text-amber-600" />
          Tool Use (Function Calling)
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">
          Dê aos modelos de IA a capacidade de interagir com sistemas externos e APIs.
        </p>
      </div>

      <ToolUseFlow />

      {/* Interactive Diagram */}
      <section className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">O Fluxo de Uso de Ferramentas</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {workflowSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div 
                className={`flex-1 flex flex-col items-center text-center p-4 rounded-lg cursor-pointer transition-colors border ${
                  activeStep === idx 
                    ? 'bg-amber-50 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700' 
                    : 'bg-stone-50 border-stone-200 dark:bg-neutral-900 dark:border-neutral-700 hover:border-amber-300'
                }`}
                onClick={() => setActiveStep(idx)}
              >
                <div className={`mb-3 p-3 rounded-full ${
                  activeStep === idx ? 'bg-amber-100 text-amber-600 dark:bg-amber-800 dark:text-amber-300' : 'bg-stone-200 text-stone-500 dark:bg-neutral-800 dark:text-stone-400'
                }`}>
                  {step.icon}
                </div>
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">{step.desc}</p>
              </div>
              
              {idx < workflowSteps.length - 1 && (
                <div className="hidden md:block text-stone-300 dark:text-neutral-600">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
              {idx < workflowSteps.length - 1 && (
                <div className="block md:hidden text-stone-300 dark:text-neutral-600 my-2">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-stone-50 dark:bg-neutral-900 p-6 rounded-lg border border-stone-200 dark:border-neutral-700">
          <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">Detalhes da Etapa: {workflowSteps[activeStep].title}</h3>
          <p className="text-stone-600 dark:text-stone-400">
            {activeStep === 0 && "Tudo começa com um prompt do usuário que requer informações além do conhecimento estático do modelo (ex: 'Qual a previsão do tempo para São Paulo amanhã?')."}
            {activeStep === 1 && "O modelo analisa as ferramentas disponíveis no prompt de sistema e identifica que precisa usar a ferramenta 'get_weather'. Ele responde com uma solicitação estruturada de uso da ferramenta, parando a geração de texto."}
            {activeStep === 2 && "A sua aplicação intercepta essa solicitação, extrai os parâmetros (ex: location='São Paulo') e executa a função real no seu backend (ex: chamada a API meteorológica)."}
            {activeStep === 3 && "A sua aplicação recebe o resultado da API e o formata em uma resposta que é enviada de volta ao modelo como uma nova mensagem no histórico da conversa."}
            {activeStep === 4 && "Com os novos dados, o modelo retoma a geração e formula uma resposta em linguagem natural amigável para o usuário, baseada nas informações recém-obtidas."}
          </p>
        </div>
      </section>

      {/* Code Examples */}
      <section className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <Code className="w-6 h-6 text-amber-500" /> Como definir uma ferramenta
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          As ferramentas são definidas usando JSON Schema no parâmetro <code className="bg-stone-100 dark:bg-neutral-900 px-1 py-0.5 rounded text-sm text-stone-800 dark:text-stone-200">tools</code> da API.
        </p>

        <CodeBlock 
          language="json"
          title="Exemplo de Definição (JSON)"
          code={`{
  "name": "get_weather",
  "description": "Obtém a temperatura atual e clima para uma cidade específica.",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "Nome da cidade, ex: São Paulo, BR"
      },
      "unit": {
        "type": "string",
        "enum": ["celsius", "fahrenheit"],
        "description": "Unidade de temperatura"
      }
    },
    "required": ["location"]
  }
}`}
        />
      </section>

      {/* Lessons Grid */}
      <section>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Lições do Módulo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolUseLessons?.map((lesson, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 hover:border-amber-300 dark:hover:border-amber-700 transition-colors cursor-pointer">
              <div className="text-sm text-amber-600 dark:text-amber-500 font-bold mb-2">Lição {idx + 1}</div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{lesson.title}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 line-clamp-2">{lesson.description}</p>
              <div className="text-xs text-stone-400 font-medium">{lesson.estimatedMinutes} min</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

