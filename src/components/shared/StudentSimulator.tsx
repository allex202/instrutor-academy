import React, { useState } from 'react';
import { MessageCircleQuestion, Lightbulb, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Question {
  question: string;
  topic: string;
  expectedConcepts: string[];
}

export default function StudentSimulator({ questions }: { questions: Question[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQ = questions[currentIndex];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="bg-stone-900 rounded-2xl border border-stone-800 p-8 shadow-2xl relative overflow-hidden my-12">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <MessageCircleQuestion className="w-64 h-64" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 font-bold px-3 py-1 rounded-full text-xs mb-4 uppercase tracking-widest border border-amber-500/20">
            <MessageCircleQuestion className="w-4 h-4" />
            Simulador de Dúvidas
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Desafio Prático</h2>
          <p className="text-stone-400 text-sm mb-6">
            Alunos frequentemente farão perguntas capciosas. Leia a dúvida ao lado, formule sua resposta mentalmente e veja se você abordou os tópicos obrigatórios.
          </p>
          
          <div className="flex gap-2">
            {questions.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 flex-1 rounded-full transition-colors ${idx === currentIndex ? 'bg-amber-500' : 'bg-stone-800'}`}
              />
            ))}
          </div>
          <div className="text-stone-500 text-xs mt-2 font-mono">Cenário {currentIndex + 1} de {questions.length}</div>
        </div>

        <div className="w-full md:w-2/3">
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm transition-all duration-300 min-h-[300px] flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-bold bg-stone-100 dark:bg-neutral-700 text-stone-500 dark:text-stone-400 px-3 py-1 rounded-full uppercase tracking-wider">
                Tópico: {currentQ.topic}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-8 italic">
              "{currentQ.question}"
            </h3>

            <div className="mt-auto flex-1 flex flex-col justify-end">
              {!showAnswer ? (
                <button 
                  onClick={() => setShowAnswer(true)}
                  className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Lightbulb className="w-5 h-5 text-amber-400" /> Revelar Conceitos Esperados
                </button>
              ) : (
                <div className="animate-fade-in">
                  <h4 className="text-sm font-bold text-stone-500 dark:text-stone-400 mb-4 uppercase tracking-wider border-b border-stone-200 dark:border-neutral-700 pb-2">
                    Na sua resposta, você mencionou:
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {currentQ.expectedConcepts.map((concept, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-stone-700 dark:text-stone-300 font-medium">{concept}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={handleNext}
                    className="w-full py-3 bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    Próximo Cenário <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
