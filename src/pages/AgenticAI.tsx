import React, { useState } from 'react';
import { Activity, Target, Map, Wrench, Eye, BrainCircuit, Play, CheckCircle, ChevronDown, ChevronUp, MessageCircle, Lightbulb } from 'lucide-react';
import { agenticAILessons } from '../data/modules/agentic-ai';

export default function AgenticAI() {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const agentLoop = [
    { title: 'Objetivo', icon: <Target className="w-6 h-6" />, desc: 'O usuário define a meta final do agente.' },
    { title: 'Planejamento', icon: <Map className="w-6 h-6" />, desc: 'O agente quebra o objetivo em passos menores.' },
    { title: 'Ferramentas', icon: <Wrench className="w-6 h-6" />, desc: 'O agente seleciona as ferramentas necessárias.' },
    { title: 'Ação', icon: <Play className="w-6 h-6" />, desc: 'O agente executa um passo do plano.' },
    { title: 'Observação', icon: <Eye className="w-6 h-6" />, desc: 'O agente analisa o resultado da ação.' },
    { title: 'Decisão', icon: <BrainCircuit className="w-6 h-6" />, desc: 'O agente decide se concluiu o objetivo ou precisa iterar.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
          <Activity className="w-8 h-8 text-amber-600" />
          IA Agêntica
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">
          Explore sistemas que planejam, executam e iteram autonomamente para atingir objetivos complexos.
        </p>
      </div>

      <section className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">O Loop de Raciocínio Agêntico (ReAct)</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {agentLoop.map((step, idx) => (
            <div 
              key={idx}
              className={`flex flex-col items-center text-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                activeStep === idx 
                  ? 'bg-amber-50 border-amber-500 dark:bg-amber-900/30 dark:border-amber-500 transform scale-105' 
                  : 'bg-stone-50 border-stone-200 dark:bg-neutral-900 dark:border-neutral-700 hover:border-amber-300'
              }`}
              onClick={() => setActiveStep(idx)}
            >
              <div className={`mb-3 p-3 rounded-full ${
                activeStep === idx ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-500 dark:bg-neutral-800 dark:text-stone-400'
              }`}>
                {step.icon}
              </div>
              <h3 className={`font-bold text-sm ${activeStep === idx ? 'text-amber-700 dark:text-amber-400' : 'text-stone-700 dark:text-stone-300'}`}>
                {step.title}
              </h3>
            </div>
          ))}
        </div>
        <div className="bg-stone-50 dark:bg-neutral-900 p-6 rounded-lg border border-stone-200 dark:border-neutral-700">
          <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{agentLoop[activeStep].title}</h4>
          <p className="text-stone-600 dark:text-stone-400">{agentLoop[activeStep].desc}</p>
        </div>
      </section>

      {/* Accordion Lessons */}
      <section>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Aprofundamento Técnico</h2>
        <div className="space-y-4">
          {agenticAILessons?.map((lesson, index) => {
            const isExpanded = expandedLesson === lesson.id;
            
            return (
              <div key={lesson.id} className="bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl overflow-hidden shadow-sm">
                <div 
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50 dark:hover:bg-neutral-700/50 transition-colors"
                  onClick={() => setExpandedLesson(isExpanded ? null : lesson.id)}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-bold text-stone-900 dark:text-stone-100">{index + 1}. {lesson.title}</h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-stone-500 font-medium px-2 py-1 bg-stone-100 dark:bg-neutral-700 rounded-md">
                      {lesson.estimatedMinutes} min
                    </span>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="p-6 pt-0 border-t border-stone-100 dark:border-neutral-700 mt-2">
                    <div className="prose dark:prose-invert max-w-none space-y-6 mt-6">
                      {lesson.content?.sections?.map(section => (
                        <div key={section.id}>
                          {section.title && section.type !== 'callout' && <h3 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-3">{section.title}</h3>}
                          
                          {section.type === 'list' && section.items && (
                            <ul className="list-disc pl-5 space-y-2 text-stone-600 dark:text-stone-300">
                              {section.items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          )}

                          {section.type === 'code' && (
                             <pre className="bg-stone-900 text-emerald-400 p-4 rounded-xl overflow-x-auto border border-stone-800 font-mono text-sm">
                               {section.content}
                             </pre>
                          )}

                          {section.type === 'callout' && (
                            <div className={`p-4 rounded-xl border my-4 ${
                              section.calloutType === 'tip' ? 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-900/20 dark:border-emerald-800/50 dark:text-emerald-100' :
                              'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800/50 dark:text-amber-100'
                            }`}>
                              <h4 className="font-bold mb-2 flex items-center gap-2">
                                {section.calloutType === 'tip' ? <Lightbulb className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                                {section.title}
                              </h4>
                              <p className="text-sm m-0">{section.content}</p>
                            </div>
                          )}
                          
                          {section.content && section.type !== 'callout' && section.type !== 'code' && <p className="text-stone-600 dark:text-stone-300">{section.content}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
