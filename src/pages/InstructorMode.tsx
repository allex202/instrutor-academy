import React, { useState } from 'react';
import { GraduationCap, BookOpen, Users, Lightbulb, MessageCircle, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { instructorLessons, teachingQuestions } from '../data/modules/instructor';
import StudentSimulator from '../components/shared/StudentSimulator';

export default function InstructorMode() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const methodologies = [
    { title: 'Como explicar LLMs', icon: <Lightbulb className="w-6 h-6" />, desc: 'Use analogias de "autocompletar avançado" e "leitura estocástica" em vez de antropomorfização.' },
    { title: 'Como demonstrar prompting', icon: <MessageCircle className="w-6 h-6" />, desc: 'Mostre o "antes e depois". Compare um prompt ruim com um prompt bem estruturado.' },
    { title: 'Como conduzir laboratórios', icon: <Users className="w-6 h-6" />, desc: 'Incentive a experimentação. Deixe os alunos falharem e iterarem em seus prompts.' },
    { title: 'Como lidar com dúvidas', icon: <BookOpen className="w-6 h-6" />, desc: 'Redirecione perguntas sobre "IA consciente" para os mecanismos técnicos de atenção.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="bg-stone-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <GraduationCap className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <div className="inline-block bg-amber-500 text-stone-900 font-bold px-3 py-1 rounded-full text-xs mb-4 tracking-widest uppercase">
            Instructor Mode Ativado
          </div>
          <h1 className="text-4xl font-bold mb-4">Metodologia de Ensino</h1>
          <p className="text-xl text-stone-300 max-w-2xl">
            Aprenda como ensinar Inteligência Artificial de forma clara, técnica e inspiradora.
          </p>
        </div>
      </div>

      <StudentSimulator questions={teachingQuestions} />

      <section className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-8 text-center">A Estrutura de Ensino Ideal</h2>
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
          {['Conceito', 'Explicação Simples', 'Exemplo', 'Demonstração', 'Exercício', 'Avaliação'].map((step, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-neutral-900 text-stone-900 dark:text-stone-100 font-bold flex items-center justify-center border-2 border-stone-300 dark:border-neutral-600 mb-3 z-10 relative">
                {idx + 1}
              </div>
              <div className="text-center font-semibold text-stone-700 dark:text-stone-300 text-sm">
                {step}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {methodologies.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 flex gap-4">
            <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-3 rounded-lg h-fit">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{item.title}</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-amber-500" /> Módulos de Treinamento de Instrutor
        </h2>
        <div className="space-y-4">
          {instructorLessons?.map((lesson, index) => {
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
                          
                          {section.content && section.type !== 'callout' && <p className="text-stone-600 dark:text-stone-300">{section.content}</p>}
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
