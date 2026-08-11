import React, { useState } from 'react';
import { Target, CheckCircle2, Circle, ChevronDown, ChevronUp, Check, BrainCircuit, BookOpen } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { competitorsModels, competitorsLessons } from '../data/modules/competitors';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import ComparisonTable from '../components/ui/ComparisonTable';
import { ModuleQuiz } from '../components/shared/ModuleQuiz';

export default function CompetitorsPage() {
  const moduleId = 'competitors';
  const { progress, dispatch } = useProgress();
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const moduleProgress = Math.round(
    (competitorsLessons.filter(l => progress.completedLessons.includes(l.id)).length / 
    Math.max(competitorsLessons.length, 1)) * 100
  );

  const completedLessons = competitorsLessons.filter(l => progress.completedLessons.includes(l.id));

  const handleCompleteLesson = (lessonId: string) => {
    dispatch({ type: 'COMPLETE_LESSON', lessonId });
    setExpandedLesson(null);
  };

  const modelColumns = [
    { key: 'name', header: 'Modelo', width: '20%' },
    { key: 'family', header: 'Empresa', width: '15%' },
    { key: 'contextWindow', header: 'Contexto', width: '15%' },
    { key: 'purpose', header: 'Propósito Principal', width: '50%' }
  ];

  const modelRows = competitorsModels.map(model => ({
    id: model.id,
    name: model.name,
    family: model.family,
    contextWindow: model.contextWindow,
    purpose: model.purpose
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
              <Target className="w-8 h-8 text-amber-600" />
              Mercado e Concorrentes
            </h1>
            <p className="text-stone-500 dark:text-stone-400 mt-2 max-w-2xl">
              Entenda como a Anthropic se posiciona contra OpenAI, Google e Meta no mercado atual.
            </p>
          </div>
          <div className="w-full md:w-64 bg-stone-50 dark:bg-neutral-900 p-4 rounded-xl border border-stone-200 dark:border-neutral-700">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">Seu Progresso</span>
              <span className="text-xl font-bold text-amber-600 dark:text-amber-500">{moduleProgress}%</span>
            </div>
            <ProgressBar value={moduleProgress} size="sm" color="amber" showPercentage={false} />
            <p className="text-xs text-stone-500 mt-2 text-right">
              {completedLessons.length} de {competitorsLessons.length} lições
            </p>
          </div>
        </div>
      </header>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Visão Geral dos Concorrentes</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {competitorsModels.map(model => (
            <div key={model.id} className="bg-white dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 bg-stone-50 dark:bg-neutral-900/50 border-b border-stone-200 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">{model.name}</h3>
                  <Badge variant="default" className="bg-amber-100/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs">
                    {model.family}
                  </Badge>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 h-16">{model.purpose}</p>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Capacidades e Limites</h4>
                  <ul className="space-y-1">
                    {model.limitations.map((lim, i) => (
                      <li key={i} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        {lim}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Janela de Contexto</h4>
                  <Badge variant="default" className="bg-stone-100 text-stone-700 dark:bg-neutral-700 dark:text-stone-300">
                    {model.contextWindow}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-200 dark:border-neutral-700">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Comparação Rápida de Concorrentes</h3>
          </div>
          <ComparisonTable columns={modelColumns} rows={modelRows} />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Lições (Guia do Instrutor)</h2>
        </div>
        
        <div className="space-y-4">
          {competitorsLessons.map((lesson, index) => {
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
                          {section.title && <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-2">{section.title}</h3>}
                          {section.type === 'callout' ? (
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                              <p className="text-blue-800 dark:text-blue-300 m-0">{section.content}</p>
                            </div>
                          ) : (
                            <p className="text-stone-700 dark:text-stone-300">{section.content}</p>
                          )}
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
