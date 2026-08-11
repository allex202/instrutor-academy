import React, { useState, useMemo } from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { allQuestions } from '../../data/questions';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import type { ModuleId } from '../../types';

interface ModuleQuizProps {
  moduleId: ModuleId;
}

export function ModuleQuiz({ moduleId }: ModuleQuizProps) {
  const { dispatch } = useProgress();
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{questionId: string; isCorrect: boolean}[]>([]);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => {
    return allQuestions?.filter(q => q.moduleId === moduleId) || [];
  }, [moduleId]);

  if (questions.length === 0) {
    return (
      <div className="p-6 bg-stone-100 dark:bg-neutral-800 rounded-xl text-center border border-stone-200 dark:border-neutral-700">
        <p className="text-stone-500 dark:text-stone-400">Nenhum quiz disponível para este módulo ainda.</p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 text-center space-y-4 shadow-sm">
        <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Quiz do Módulo</h3>
        <p className="text-stone-500 dark:text-stone-400">
          Teste seus conhecimentos com {questions.length} perguntas sobre este módulo.
        </p>
        <button 
          onClick={() => setStarted(true)}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          INICIAR QUIZ
        </button>
      </div>
    );
  }

  if (finished) {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    
    return (
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 text-center space-y-6 shadow-sm">
        <Award className="w-16 h-16 text-amber-500 mx-auto" />
        <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Quiz Concluído!</h3>
        <div className="text-4xl font-black text-amber-600 dark:text-amber-500">
          {percentage}%
        </div>
        <p className="text-stone-600 dark:text-stone-300">
          Você acertou {correctAnswers} de {questions.length} perguntas.
        </p>
        <button 
          onClick={() => {
            setStarted(false);
            setCurrentIndex(0);
            setAnswers([]);
            setFinished(false);
            setShowExplanation(false);
            setSelectedAnswer(null);
          }}
          className="px-6 py-2 bg-stone-200 hover:bg-stone-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-stone-900 dark:text-stone-100 rounded-lg font-medium transition-colors"
        >
          TENTAR NOVAMENTE
        </button>
      </div>
    );
  }

  const question = questions[currentIndex];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleSelect = (id: string) => {
    if (showExplanation) return;
    setSelectedAnswer(id);
  };

  const handleConfirm = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers, { questionId: question.id, isCorrect }];
    if (currentIndex < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(curr => curr + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setAnswers(newAnswers);
      setFinished(true);
      const correctCount = newAnswers.filter(a => a.isCorrect).length;
      const percentage = Math.round((correctCount / questions.length) * 100);
      dispatch({
        type: 'ADD_QUIZ_RESULT',
        result: {
          quizId: `quiz-${moduleId}-${Date.now()}`,
          moduleId,
          totalQuestions: questions.length,
          correctAnswers: correctCount,
          percentage,
          timestamp: Date.now(),
          answers: newAnswers.map(a => ({
            questionId: a.questionId,
            selectedAnswer: 'selected',
            isCorrect: a.isCorrect,
            timeSpent: 0
          }))
        }
      });
      dispatch({ type: 'ADD_XP', amount: correctCount * 10 });
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 md:p-8 rounded-xl border border-stone-200 dark:border-neutral-700 space-y-6 shadow-sm">
      <div className="flex justify-between items-center text-sm font-medium text-stone-500 dark:text-stone-400">
        <span>Pergunta {currentIndex + 1} de {questions.length}</span>
        <span>{Math.round((currentIndex / questions.length) * 100)}% concluído</span>
      </div>
      
      <div className="w-full bg-stone-100 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-amber-600 h-full transition-all duration-300"
          style={{ width: `${(currentIndex / questions.length) * 100}%` }}
        />
      </div>

      <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100">
        {question.question}
      </h4>

      <div className="space-y-3">
        {question.options.map(opt => {
          let btnClass = "w-full text-left p-4 rounded-xl border transition-colors ";
          if (showExplanation) {
            if (opt.id === question.correctAnswer) {
              btnClass += "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-900 dark:text-emerald-100";
            } else if (opt.id === selectedAnswer) {
              btnClass += "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-900 dark:text-red-100";
            } else {
              btnClass += "bg-stone-50 dark:bg-neutral-800 border-stone-200 dark:border-neutral-700 opacity-50";
            }
          } else {
            if (selectedAnswer === opt.id) {
              btnClass += "bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-900 dark:text-amber-100";
            } else {
              btnClass += "bg-white dark:bg-neutral-800 border-stone-200 dark:border-neutral-700 hover:border-amber-400 dark:hover:border-amber-600 text-stone-700 dark:text-stone-300";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={showExplanation}
              className={btnClass}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className={`p-4 rounded-xl flex items-start gap-3 ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
          {isCorrect ? <CheckCircle className="w-6 h-6 shrink-0" /> : <XCircle className="w-6 h-6 shrink-0" />}
          <div>
            <p className="font-bold">{isCorrect ? 'Correto!' : 'Incorreto'}</p>
            <p className="mt-1 text-sm">{question.explanation}</p>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-neutral-700">
        {!showExplanation ? (
          <button
            onClick={handleConfirm}
            disabled={!selectedAnswer}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
          >
            CONFIRMAR
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
          >
            {currentIndex < questions.length - 1 ? 'PRÓXIMA PERGUNTA' : 'VER RESULTADO'}
          </button>
        )}
      </div>
    </div>
  );
}
