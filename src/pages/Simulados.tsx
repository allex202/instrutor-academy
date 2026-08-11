import React, { useState } from 'react';
import { FileText, Clock, Play, AlertCircle, BarChart3, CheckCircle2 } from 'lucide-react';
import { allQuestions } from '../data/questions';

export default function Simulados() {
  const [numQuestions, setNumQuestions] = useState(20);
  const [isExamActive, setIsExamActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // In a real app we'd shuffle and pick N questions based on categories
  const examQuestions = allQuestions.slice(0, numQuestions);

  const handleStart = () => {
    setIsExamActive(true);
    setCurrentIdx(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [examQuestions[currentIdx].id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentIdx < examQuestions.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    let score = 0;
    examQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    const percentage = Math.round((score / examQuestions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">Resultados do Simulado</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1 bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 text-center flex flex-col justify-center">
            <h2 className="text-stone-500 dark:text-stone-400 font-bold mb-2 uppercase tracking-wider">Nota Final</h2>
            <div className={`text-6xl font-black mb-2 ${percentage >= 80 ? 'text-emerald-500' : percentage >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
              {percentage}%
            </div>
            <p className="text-stone-600 dark:text-stone-400">
              {score} de {examQuestions.length} corretas
            </p>
          </div>
          
          <div className="md:col-span-2 bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-500" /> Desempenho Geral
            </h3>
            {percentage >= 80 ? (
              <p className="text-stone-600 dark:text-stone-300 mb-4">Excelente trabalho! Você demonstrou um forte entendimento dos conceitos fundamentais.</p>
            ) : percentage >= 60 ? (
              <p className="text-stone-600 dark:text-stone-300 mb-4">Bom trabalho, mas há espaço para melhoria. Revise as questões incorretas.</p>
            ) : (
              <p className="text-stone-600 dark:text-stone-300 mb-4">Recomendamos revisar os materiais do curso antes de tentar novamente.</p>
            )}
            <button 
              onClick={() => {
                setIsExamActive(false);
                setShowResults(false);
              }}
              className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg font-bold transition-colors"
            >
              Fazer Novo Simulado
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">Revisão das Questões</h3>
        <div className="space-y-6">
          {examQuestions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <div key={q.id} className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {isCorrect ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <AlertCircle className="w-6 h-6 text-red-500" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-4">{idx + 1}. {q.question}</h4>
                    <div className="space-y-2 mb-4">
                      {q.options.map(opt => (
                        <div key={opt.id} className={`p-3 rounded-lg border text-sm ${
                          opt.id === q.correctAnswer ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800/50 dark:text-emerald-300 font-medium' :
                          opt.id === userAnswer && !isCorrect ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300' :
                          'bg-stone-50 border-stone-200 text-stone-600 dark:bg-neutral-900 dark:border-neutral-700 dark:text-stone-400'
                        }`}>
                          {opt.text}
                        </div>
                      ))}
                    </div>
                    {!isCorrect && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-sm text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/30">
                        <span className="font-bold block mb-1">Explicação:</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (isExamActive) {
    const q = examQuestions[currentIdx];
    const hasAnswered = !!answers[q.id];

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 h-screen flex flex-col">
        <div className="flex justify-between items-center mb-8 bg-white dark:bg-neutral-800 p-4 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm">
          <div>
            <div className="text-sm text-stone-500 dark:text-stone-400 font-medium mb-1">Progresso</div>
            <div className="font-bold text-stone-900 dark:text-stone-100">Questão {currentIdx + 1} de {examQuestions.length}</div>
          </div>
          <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 font-mono bg-stone-100 dark:bg-neutral-900 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4" />
            <span>Simulado em andamento</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm mb-6">
            <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-8">
              {q.question}
            </h3>
            <div className="space-y-3">
              {q.options.map(opt => (
                <div 
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    answers[q.id] === opt.id
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-100'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-300 dark:hover:border-amber-700'
                  }`}
                >
                  {opt.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-stone-200 dark:border-neutral-700">
          <button 
            onClick={handleNext}
            disabled={!hasAnswered}
            className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentIdx < examQuestions.length - 1 ? 'Próxima Questão' : 'Finalizar Simulado'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <FileText className="w-16 h-16 text-amber-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">Simulado Oficial</h1>
        <p className="text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
          Prepare-se para certificações testando seus conhecimentos em condições semelhantes às de um exame real.
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl border border-stone-200 dark:border-neutral-700 shadow-sm max-w-2xl mx-auto">
        <h2 className="font-bold text-xl text-stone-900 dark:text-stone-100 mb-6">Configurar Simulado</h2>
        
        <div className="mb-8">
          <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">Número de Questões</label>
          <div className="flex gap-4">
            {[10, 20, 30, 50].map(num => (
              <button
                key={num}
                onClick={() => setNumQuestions(num)}
                className={`flex-1 py-3 rounded-lg border-2 font-bold transition-colors ${
                  numQuestions === num 
                    ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
                    : 'border-stone-200 bg-white text-stone-600 hover:border-amber-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-400'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800/30 mb-8 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Atenção:</strong> Ao iniciar o simulado, recomendamos que você reserve tempo ininterrupto. O progresso não é salvo se você sair no meio.
          </div>
        </div>

        <button 
          onClick={handleStart}
          className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl font-bold text-lg transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" /> Iniciar Simulado
        </button>
      </div>
    </div>
  );
}

