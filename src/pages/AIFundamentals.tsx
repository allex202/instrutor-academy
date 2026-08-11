import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { aiFundamentalsLessons, aiFundamentalsConcepts } from '../data/modules/ai-fundamentals';
import { ModuleQuiz } from '../components/shared/ModuleQuiz';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, BookOpen, Lightbulb, Check } from 'lucide-react';
import RAGFlow from '../components/animations/RAGFlow';
import EmbeddingsSpace from '../components/animations/EmbeddingsSpace';
import NeuralNetwork from '../components/animations/NeuralNetwork';

export default function AIFundamentals() {
  const { progress, dispatch } = useProgress();
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  
  const moduleId = 'ai-fundamentals';
  
  const completedLessons = progress.completedLessons.filter(l => l.startsWith(moduleId + '/'));
  const moduleProgress = Math.round((completedLessons.length / (aiFundamentalsLessons?.length || 1)) * 100) || 0;

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
              Módulo 1
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Fundamentos de IA
            </h1>
            <p className="text-stone-500 dark:text-stone-400 max-w-2xl text-lg">
              Conceitos essenciais sobre Inteligência Artificial, LLMs, Machine Learning e como essas tecnologias funcionam nos bastidores.
            </p>
          </div>
          <div className="w-full md:w-64 bg-stone-50 dark:bg-neutral-900 p-4 rounded-xl border border-stone-200 dark:border-neutral-700">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">Seu Progresso</span>
              <span className="text-xl font-bold text-amber-600 dark:text-amber-500">{moduleProgress}%</span>
            </div>
            <ProgressBar value={moduleProgress} size="sm" color="amber" showPercentage={false} />
            <p className="text-xs text-stone-500 mt-2 text-right">
              {completedLessons.length} de {aiFundamentalsLessons?.length || 0} lições
            </p>
          </div>
        </div>
      </header>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Conceitos Chave</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiFundamentalsConcepts?.map(concept => (
            <div 
              key={concept.id}
              className={`bg-white dark:bg-neutral-800 border ${expandedConcept === concept.id ? 'border-amber-400 dark:border-amber-600 shadow-md' : 'border-stone-200 dark:border-neutral-700 shadow-sm'} rounded-xl overflow-hidden transition-all`}
            >
              <div 
                className="p-5 cursor-pointer flex justify-between items-center"
                onClick={() => setExpandedConcept(expandedConcept === concept.id ? null : concept.id)}
              >
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">{concept.term}</h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">{concept.simpleDefinition}</p>
                </div>
                {expandedConcept === concept.id ? (
                  <ChevronUp className="w-5 h-5 text-stone-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                )}
              </div>
              
              {expandedConcept === concept.id && (
                <div className="p-5 pt-0 border-t border-stone-100 dark:border-neutral-700 mt-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Explicação Técnica</h4>
                    <p className="text-stone-700 dark:text-stone-300 text-sm">{concept.technicalExplanation}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-stone-50 dark:bg-neutral-900 p-3 rounded-lg">
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Exemplo</h4>
                      <p className="text-stone-700 dark:text-stone-300 text-sm">{concept.example}</p>
                    </div>
                    <div className="bg-stone-50 dark:bg-neutral-900 p-3 rounded-lg">
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Aplicação</h4>
                      <p className="text-stone-700 dark:text-stone-300 text-sm">{concept.appliedExample}</p>
                    </div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
                    <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Nota do Instrutor</h4>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">{concept.instructorNote}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
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
          {aiFundamentalsLessons?.map((lesson, index) => {
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
                          
                          {section.type === 'animation' && section.componentId === 'RAGFlow' && <RAGFlow />}
                          {section.type === 'animation' && section.componentId === 'EmbeddingsSpace' && <EmbeddingsSpace />}
                          {section.type === 'animation' && section.componentId === 'NeuralNetwork' && <NeuralNetwork />}
                          
                          {section.content && <p>{section.content}</p>}
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

