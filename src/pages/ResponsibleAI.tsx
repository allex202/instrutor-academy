import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Lock, EyeOff, BookOpen, ChevronRight } from 'lucide-react';
import { responsibleAILessons, securityScenarios } from '../data/modules/responsible-ai';

export default function ResponsibleAI() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (optionId: string) => {
    if (showResult) return;
    setSelectedOption(optionId);
    setShowResult(true);
    
    const scenario = securityScenarios[activeScenario];
    if (scenario.options[parseInt(optionId)]?.isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextScenario = () => {
    if (activeScenario < securityScenarios.length - 1) {
      setActiveScenario(s => s + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const currentScenario = securityScenarios[activeScenario];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="bg-gradient-to-r from-rose-900 to-red-900 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-10 h-10 text-rose-300" />
          <h1 className="text-3xl font-bold">IA Responsável e Segurança</h1>
        </div>
        <p className="text-xl text-rose-100 max-w-3xl">
          Princípios fundamentais, ética, Constitutional AI e mitigação de riscos na implementação de LLMs.
        </p>
      </div>

      <section className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-500" /> Laboratório de Cenários de Segurança
        </h2>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-stone-500 dark:text-stone-400">
            Cenário {activeScenario + 1} de {securityScenarios.length}
          </span>
          <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
            Pontuação: {score}
          </span>
        </div>

        <div className="bg-stone-50 dark:bg-neutral-900 p-6 rounded-lg border border-stone-200 dark:border-neutral-700 mb-6">
          <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-3">{currentScenario.principle}</h3>
          <p className="text-stone-700 dark:text-stone-300 mb-6">{currentScenario.scenario}</p>
          
          <div className="space-y-3">
            {currentScenario.options.map((option, idx) => {
              const isSelected = selectedOption === idx.toString();
              const isCorrect = option.isCorrect;
              
              let optionClass = "bg-white dark:bg-neutral-800 border-stone-200 dark:border-neutral-700 hover:border-amber-300 dark:hover:border-amber-700 text-stone-700 dark:text-stone-300 cursor-pointer";
              if (showResult) {
                if (isCorrect) optionClass = "bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-500 dark:text-emerald-200";
                else if (isSelected) optionClass = "bg-red-50 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-500 dark:text-red-200";
                else optionClass = "bg-stone-50 border-stone-200 text-stone-400 dark:bg-neutral-900 dark:border-neutral-800 dark:text-stone-500 opacity-50 cursor-not-allowed";
              }

              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-lg border-2 transition-all ${optionClass}`}
                  onClick={() => handleOptionSelect(idx.toString())}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                      {showResult && isSelected && !isCorrect && <AlertTriangle className="w-5 h-5 text-red-500" />}
                      {!showResult && <div className="w-5 h-5 rounded-full border-2 border-current opacity-30"></div>}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {showResult && (
          <div className={`p-6 rounded-lg border mb-6 ${
            currentScenario.options[parseInt(selectedOption || '0')]?.isCorrect 
              ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/30' 
              : 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30'
          }`}>
            <h4 className={`font-bold mb-2 ${
              currentScenario.options[parseInt(selectedOption || '0')]?.isCorrect 
                ? 'text-emerald-800 dark:text-emerald-400' 
                : 'text-amber-800 dark:text-amber-400'
            }`}>
              {currentScenario.options[parseInt(selectedOption || '0')]?.isCorrect ? 'Correto!' : 'Incorreto.'}
            </h4>
            <p className="text-stone-700 dark:text-stone-300 text-sm">{currentScenario.explanation}</p>
            
            {activeScenario < securityScenarios.length - 1 && (
              <button 
                onClick={nextScenario}
                className="mt-4 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg flex items-center gap-2 transition-colors"
              >
                Próximo Cenário <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-rose-600" /> Lições do Módulo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {responsibleAILessons?.map((lesson, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 hover:border-rose-300 dark:hover:border-rose-700 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center font-bold mb-4 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                {idx + 1}
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{lesson.title}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 line-clamp-2">{lesson.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

