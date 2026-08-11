import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { anthropicLessons, anthropicTimeline } from '../data/modules/anthropic';
import { ModuleQuiz } from '../components/shared/ModuleQuiz';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, BookOpen, Clock, Building2, Check } from 'lucide-react';

export default function AnthropicPage() {
  const { progress, dispatch } = useProgress();
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  
  const moduleId = 'anthropic';
  
  const completedLessons = progress.completedLessons.filter(l => l.startsWith(moduleId + '/'));
  const moduleProgress = Math.round((completedLessons.length / (anthropicLessons?.length || 1)) * 100) || 0;

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
              Módulo 2
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-3">
              <Building2 className="w-10 h-10 text-amber-600" />
              Conhecendo a Anthropic
            </h1>
            <p className="text-stone-500 dark:text-stone-400 max-w-2xl text-lg">
              A história, missão, valores e o diferencial da Anthropic no desenvolvimento de IA segura.
            </p>
          </div>
          <div className="w-full md:w-64 bg-stone-50 dark:bg-neutral-900 p-4 rounded-xl border border-stone-200 dark:border-neutral-700">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">Seu Progresso</span>
              <span className="text-xl font-bold text-amber-600 dark:text-amber-500">{moduleProgress}%</span>
            </div>
            <ProgressBar value={moduleProgress} size="sm" color="amber" showPercentage={false} />
            <p className="text-xs text-stone-500 mt-2 text-right">
              {completedLessons.length} de {anthropicLessons?.length || 0} lições
            </p>
          </div>
        </div>
      </header>

      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Linha do Tempo</h2>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-stone-200 dark:bg-neutral-700 -translate-x-1/2 hidden md:block" />
          <div className="space-y-8">
            {anthropicTimeline?.map((event, index) => (
              <div key={index} className={`flex flex-col md:flex-row gap-6 md:gap-0 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full md:w-1/2 md:px-8">
                  <div className={`bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm
                    ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <Badge variant="default" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 mb-3">
                      {event.year}
                    </Badge>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">{event.events[0].title}</h3>
                    <p className="text-stone-600 dark:text-stone-400">{event.events[0].description}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex justify-center items-center w-8 shrink-0 z-10 relative">
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-white dark:border-neutral-900 shadow" />
                </div>
                
                <div className="flex-1 w-full md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Lições</h2>
        </div>
        
        <div className="space-y-4">
          {anthropicLessons?.map((lesson, index) => {
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

