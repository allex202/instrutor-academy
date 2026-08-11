import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, ChevronRight, Play } from 'lucide-react';
import { allQuestions } from '../data/questions';
import { modules } from '../data/courses';

export default function Exercises() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Group questions by module
  const questionsByModule: Record<string, typeof allQuestions> = {};
  allQuestions.forEach(q => {
    if (!questionsByModule[q.moduleId]) {
      questionsByModule[q.moduleId] = [];
    }
    questionsByModule[q.moduleId].push(q);
  });

  const startQuiz = (moduleId: string) => {
    setActiveModule(moduleId);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleOptionSelect = (optionId: string) => {
    if (showResult) return;
    setSelectedOption(optionId);
    setShowResult(true);
    
    if (activeModule) {
      const q = questionsByModule[activeModule][currentQuestionIdx];
      if (optionId === q.correctAnswer) {
        setScore(s => s + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (activeModule) {
      if (currentQuestionIdx < questionsByModule[activeModule].length - 1) {
        setCurrentQuestionIdx(i => i + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        setQuizFinished(true);
      }
    }
  };

  const quitQuiz = () => {
    setActiveModule(null);
  };

  if (activeModule) {
    const questions = questionsByModule[activeModule];
    const moduleName = modules.find(m => m.id === activeModule)?.title || activeModule;

    if (quizFinished) {
      const percentage = Math.round((score / questions.length) * 100);
      return (
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl border border-stone-200 dark:border-neutral-700 shadow-sm">
            <Target className="w-16 h-16 mx-auto mb-6 text-amber-500" />
            <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">Quiz Concluído!</h2>
            <p className="text-stone-500 dark:text-stone-400 mb-8">Módulo: {moduleName}</p>
            
            <div className="text-6xl font-black mb-2 text-stone-900 dark:text-stone-100">
              {percentage}%
            </div>
            <p className="text-stone-600 dark:text-stone-400 mb-8">
              Você acertou {score} de {questions.length} questões.
            </p>
            
            <button 
              onClick={quitQuiz}
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg font-bold transition-colors w-full"
            >
              Voltar para Exercícios
            </button>
          </div>
        </div>
      );
    }

    const currentQuestion = questions[currentQuestionIdx];

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">{moduleName}</h2>
            <p className="text-sm text-stone-500 dark:text-stone-400">Questão {currentQuestionIdx + 1} de {questions.length}</p>
          </div>
          <button 
            onClick={quitQuiz}
            className="text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          >
            Sair do Quiz
          </button>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm mb-6">
          <div className="mb-6 flex gap-2">
            <span className="bg-stone-100 dark:bg-neutral-900 text-stone-600 dark:text-stone-400 text-xs font-bold px-2 py-1 rounded">
              {currentQuestion.difficulty.toUpperCase()}
            </span>
          </div>
          <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-8">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map(option => {
              const isSelected = selectedOption === option.id;
              const isCorrect = option.id === currentQuestion.correctAnswer;
              
              let optionClass = "bg-white dark:bg-neutral-800 border-stone-200 dark:border-neutral-700 hover:border-amber-300 dark:hover:border-amber-700 text-stone-700 dark:text-stone-300 cursor-pointer";
              if (showResult) {
                if (isCorrect) optionClass = "bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-500 dark:text-emerald-200";
                else if (isSelected) optionClass = "bg-red-50 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-500 dark:text-red-200";
                else optionClass = "bg-stone-50 border-stone-200 text-stone-400 dark:bg-neutral-900 dark:border-neutral-800 dark:text-stone-500 opacity-50 cursor-not-allowed";
              }

              return (
                <div 
                  key={option.id}
                  className={`p-4 rounded-lg border-2 transition-all ${optionClass}`}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
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
          <div className="bg-stone-50 dark:bg-neutral-900 p-6 rounded-xl border border-stone-200 dark:border-neutral-700">
            <h4 className={`font-bold mb-2 ${selectedOption === currentQuestion.correctAnswer ? 'text-emerald-600' : 'text-red-600'}`}>
              {selectedOption === currentQuestion.correctAnswer ? 'Resposta Correta!' : 'Resposta Incorreta.'}
            </h4>
            <p className="text-stone-700 dark:text-stone-300 mb-6">{currentQuestion.explanation}</p>
            
            <button 
              onClick={nextQuestion}
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg font-bold transition-colors flex items-center gap-2 ml-auto"
            >
              {currentQuestionIdx < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultados'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
          <Target className="w-8 h-8 text-amber-600" />
          Exercícios por Módulo
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-2">
          Teste seus conhecimentos com quizzes rápidos para cada módulo do curso.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(questionsByModule).map(([moduleId, questions]) => {
          const moduleName = modules.find(m => m.id === moduleId)?.title || moduleId;
          
          return (
            <div key={moduleId} className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 flex flex-col h-full">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2 line-clamp-1">{moduleName}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                {questions.length} questões disponíveis
              </p>
              
              <div className="mt-auto pt-4 border-t border-stone-100 dark:border-neutral-700">
                <button 
                  onClick={() => startQuiz(moduleId)}
                  className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 dark:text-amber-400 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" /> Iniciar Quiz
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

