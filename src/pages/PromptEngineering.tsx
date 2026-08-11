import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { promptEngineeringLessons, promptExamples } from '../data/modules/prompt-engineering';
import { ModuleQuiz } from '../components/shared/ModuleQuiz';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, BookOpen, Terminal, Check, ThumbsDown, ThumbsUp, ArrowRight } from 'lucide-react';

export default function PromptEngineering() {
  const { progress, dispatch } = useProgress();
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  
  const moduleId = 'prompt-engineering';
  
  const completedLessons = progress.completedLessons.filter(l => l.startsWith(moduleId + '/'));
  const moduleProgress = Math.round((completedLessons.length / (promptEngineeringLessons?.length || 1)) * 100) || 0;

  const handleCompleteLesson = (lessonId: string) => {
    dispatch({ type: 'COMPLETE_LESSON', lessonId });
    dispatch({ type: 'ADD_XP', amount: 50 });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 animate-slide-up">
      <header className="bg-white dark:bg-neutral-800 p-8 rounded-2xl border border-stone-200 dark:border-neutral-700 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <Badge variant="default" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 mb-4">
              Módulo 4
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-3">
              <Terminal className="w-10 h-10 text-amber-600" />
              Engenharia de Prompts
            </h1>
            <p className="text-stone-500 dark:text-stone-400 max-w-2xl text-lg">
              Técnicas avançadas para extrair o máximo do Claude, desde a estruturação básica até técnicas como Chain of Thought e uso de tags XML.
            </p>
          </div>
          <div className="w-full md:w-64 bg-stone-50 dark:bg-neutral-900 p-4 rounded-xl border border-stone-200 dark:border-neutral-700">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">Seu Progresso</span>
              <span className="text-xl font-bold text-amber-600 dark:text-amber-500">{moduleProgress}%</span>
            </div>
            <ProgressBar value={moduleProgress} size="sm" color="amber" showPercentage={false} />
            <p className="text-xs text-stone-500 mt-2 text-right">
              {completedLessons.length} de {promptEngineeringLessons?.length || 0} lições
            </p>
          </div>
        </div>
      </header>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
            <Terminal className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Exemplos Práticos</h2>
        </div>

        <div className="space-y-8">
          {promptExamples?.map((example, index) => (
            <div key={index} className="bg-white dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-900/50">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">{example.technique}</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-6 border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-neutral-700 bg-red-50/30 dark:bg-red-900/5">
                  <div className="flex items-center gap-2 mb-4 text-red-600 dark:text-red-400 font-medium">
                    <ThumbsDown className="w-5 h-5" />
                    <h4>Prompt Ruim</h4>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 border border-red-200 dark:border-red-900/50 rounded-lg p-4 font-mono text-sm text-stone-700 dark:text-stone-300 whitespace-pre-wrap">
                    {example.bad}
                  </div>
                </div>
                
                <div className="p-6 bg-emerald-50/30 dark:bg-emerald-900/5">
                  <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400 font-medium">
                    <ThumbsUp className="w-5 h-5" />
                    <h4>Prompt Melhorado</h4>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-900/50 rounded-lg p-4 font-mono text-sm text-stone-700 dark:text-stone-300 whitespace-pre-wrap">
                    {example.good}
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-900/50 flex gap-4">
                <div className="shrink-0 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 self-start">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900 dark:text-stone-100 mb-1">Por que é melhor?</h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{example.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Lições</h2>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors text-sm">
            ACESSAR PROMPT LAB <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          {promptEngineeringLessons?.map((lesson, index) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isExpanded = expandedLesson === lesson.id;
            
            return (
              <div key={lesson.id} className="bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl overflow-hidden shadow-sm">
                <div 
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50 dark:hover:bg-neutral-700/50 transition-colors"
                  onClick={() => setExpandedLesson(isExpanded ? null : lesson.id)}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleCompleteLesson(lesson.id); }}
                      className={`shrink-0 rounded-full transition-colors ${isCompleted ? 'text-emerald-500' : 'text-stone-300 dark:text-neutral-600 hover:text-emerald-400'}`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                    </button>
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
                          {section.title && <h3>{section.title}</h3>}
                          <p>{section.content}</p>
                        </div>
                      ))}
                    </div>
                    
                    {!isCompleted && (
                      <div className="mt-8 flex justify-end">
                        <button 
                          onClick={() => handleCompleteLesson(lesson.id)}
                          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          MARCAR COMO CONCLUÍDA
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="pt-8">
        <ModuleQuiz moduleId={moduleId} />
      </section>
    </div>
  );
}

