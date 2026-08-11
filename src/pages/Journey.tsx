import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { phases, modules } from '../data/courses';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { CheckCircle2, Circle, Clock, BookOpen, Target, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const routeMap: Record<string, string> = {
  'ai-fundamentals': '/fundamentos-ia',
  'anthropic': '/anthropic',
  'claude': '/claude',
  'competitors': '/concorrentes',
  'prompt-engineering': '/prompt-engineering',
  'claude-code': '/claude-code',
  'api-development': '/api',
  'models': '/modelos',
  'context-window': '/context-window',
  'tool-use': '/tool-use',
  'mcp': '/mcp',
  'responsible-ai': '/seguranca',
  'agentic-ai': '/ia-agentica'
};

export default function Journey() {
  const { progress } = useProgress();
  const navigate = useNavigate();
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-slide-up">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Jornada de Aprendizado</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-2">
          Siga o caminho recomendado para se tornar um Instrutor Anthropic certificado.
        </p>
      </header>

      <div className="relative">
        <div className="absolute left-8 top-10 bottom-10 w-1 bg-stone-200 dark:bg-neutral-800 rounded-full" />
        
        <div className="space-y-12">
          {phases?.map((phase, index) => {
            const phaseModules = modules?.filter(m => phase.moduleIds.includes(m.id)) || [];
            const totalLessons = phaseModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
            
            // Calculate progress for this phase
            const phaseCompletedLessons = progress.completedLessons.filter(l => 
              phase.moduleIds.some(mId => l.startsWith(mId + '/'))
            ).length;
            
            const phaseProgress = totalLessons === 0 ? 0 : Math.round((phaseCompletedLessons / totalLessons) * 100);
            
            let status = 'Não Iniciado';
            let statusColor = 'bg-stone-100 text-stone-600 dark:bg-neutral-800 dark:text-stone-400';
            let StatusIcon = Circle;
            
            if (phaseProgress === 100) {
              status = 'Concluído';
              statusColor = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
              StatusIcon = CheckCircle2;
            } else if (phaseProgress > 0) {
              status = 'Em Progresso';
              statusColor = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
              StatusIcon = Clock;
            }

            const isExpanded = expandedPhase === phase.number;

            return (
              <div key={phase.number} className="relative pl-24 group">
                <div className={`absolute left-5 top-6 w-7 h-7 -translate-x-1/2 rounded-full border-4 border-stone-50 dark:border-neutral-900 flex items-center justify-center
                  ${phaseProgress === 100 ? 'bg-emerald-500' : phaseProgress > 0 ? 'bg-amber-500' : 'bg-stone-300 dark:bg-neutral-700'}
                  transition-colors z-10`}
                />
                
                <div className="bg-white dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm p-6 hover:border-amber-400 dark:hover:border-amber-600 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="default" className="bg-stone-100 dark:bg-neutral-700 text-stone-600 dark:text-stone-300">
                          Fase {phase.number}
                        </Badge>
                        <Badge variant="default" className={`flex items-center gap-1 ${statusColor}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status}
                        </Badge>
                      </div>
                      <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                        {phase.title}
                      </h2>
                      <p className="text-stone-500 dark:text-stone-400 mt-2">
                        {phase.description}
                      </p>
                    </div>
                    
                    <div className="text-right min-w-[120px]">
                      <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                        {phaseProgress}%
                      </div>
                      <ProgressBar value={phaseProgress} size="sm" color={phaseProgress === 100 ? 'emerald' : 'amber'} showPercentage={false} />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-6 pt-4 border-t border-stone-100 dark:border-neutral-700 text-sm text-stone-500 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{phaseModules.length} Módulos</span>
                    </div>
                    <button 
                      onClick={() => setExpandedPhase(isExpanded ? null : phase.number)}
                      className="ml-auto text-amber-600 dark:text-amber-500 font-medium flex items-center gap-1 hover:underline focus:outline-none"
                    >
                      {isExpanded ? 'Ocultar módulos' : 'Ver módulos'} 
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Modules Accordion */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-neutral-700 animate-slide-up">
                      <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">Módulos desta Fase</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {phaseModules.map(mod => (
                          <div 
                            key={mod.id} 
                            onClick={() => {
                              const route = routeMap[mod.id] || `/${mod.id}`;
                              navigate(route);
                            }}
                            className="bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-700 p-4 rounded-lg cursor-pointer hover:border-amber-400 dark:hover:border-amber-600 transition-colors flex flex-col justify-between"
                          >
                            <div>
                              <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1">{mod.title}</h4>
                              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">{mod.description}</p>
                            </div>
                            <div className="flex justify-end mt-4">
                              <span className="text-amber-600 dark:text-amber-500 text-xs font-bold flex items-center gap-1">Acessar <ArrowRight className="w-3 h-3" /></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
