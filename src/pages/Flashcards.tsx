import React, { useState, useMemo } from 'react';
import { Layers, RotateCcw, Check, X, Filter } from 'lucide-react';
import { allFlashcards } from '../data/flashcards';
import { useProgress } from '../contexts/ProgressContext';

export default function Flashcards() {
  const { progress, dispatch } = useProgress();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(allFlashcards.map(f => f.category)))];

  const filteredFlashcards = useMemo(() => {
    return allFlashcards.filter(f => categoryFilter === 'all' || f.category === categoryFilter);
  }, [categoryFilter]);

  const currentCard = filteredFlashcards[currentIdx];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIdx < filteredFlashcards.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setCurrentIdx(0); // loop back
    }
  };

  const handleScore = (mastered: boolean) => {
    if (currentCard) {
      dispatch({
        type: 'UPDATE_FLASHCARD',
        progress: {
          flashcardId: currentCard.id,
          mastered,
          reviewCount: 1,
          lastReviewed: Date.now(),
          nextReview: mastered ? Date.now() + 86400000 * 3 : Date.now() + 86400000,
        }
      });
    }
    handleNext();
  };

  if (!currentCard) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-500">Nenhum flashcard encontrado para este filtro.</p>
      </div>
    );
  }

  // Calculate stats
  const stats = filteredFlashcards.reduce((acc, card) => {
    const isMastered = progress.flashcardProgress.find(p => p.flashcardId === card.id)?.mastered;
    if (isMastered) acc.mastered++;
    return acc;
  }, { mastered: 0, total: filteredFlashcards.length });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
            <Layers className="w-8 h-8 text-amber-600" />
            Flashcards
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2">
            Revise conceitos com repetição espaçada.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-stone-400" />
          <select 
            className="bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500 text-stone-700 dark:text-stone-300"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentIdx(0);
              setIsFlipped(false);
            }}
          >
            <option value="all">Todas as Categorias</option>
            {categories.filter(c => c !== 'all').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center text-sm font-medium">
        <span className="text-stone-500 dark:text-stone-400">Card {currentIdx + 1} de {filteredFlashcards.length}</span>
        <span className="text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
          {stats.mastered} Dominados
        </span>
      </div>

      <div className="w-full bg-stone-200 dark:bg-neutral-700 rounded-full h-2 mb-12">
        <div 
          className="bg-amber-500 h-2 rounded-full transition-all" 
          style={{ width: `${(stats.mastered / stats.total) * 100}%` }}
        ></div>
      </div>

      <div className="max-w-2xl mx-auto perspective-1000">
        <div 
          className={`relative w-full h-[400px] transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => !isFlipped && setIsFlipped(true)}
        >
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-neutral-800 border-2 border-stone-200 dark:border-neutral-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow">
            <span className="absolute top-6 left-6 text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">Frente</span>
            <span className="absolute top-6 right-6 text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">{currentCard.difficulty}</span>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
              {currentCard.front}
            </h2>
            <div className="absolute bottom-8 flex items-center gap-2 text-stone-400 dark:text-stone-500 animate-pulse">
              <RotateCcw className="w-5 h-5" /> Clique para virar
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-stone-50 dark:bg-neutral-900 border-2 border-amber-200 dark:border-amber-900/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-lg rotate-y-180">
            <span className="absolute top-6 left-6 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500">Verso</span>
            <div className="text-xl text-stone-800 dark:text-stone-200 leading-relaxed overflow-y-auto">
              {currentCard.back}
            </div>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="max-w-2xl mx-auto mt-10 flex gap-4 animate-fade-in-up">
          <button 
            onClick={() => handleScore(false)}
            className="flex-1 py-4 bg-white dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 border border-stone-200 dark:border-neutral-700 hover:border-red-200 dark:hover:border-red-800/30 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <X className="w-5 h-5" /> Preciso Revisar
          </button>
          <button 
            onClick={() => handleScore(true)}
            className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Check className="w-5 h-5" /> Dominei
          </button>
        </div>
      )}
    </div>
  );
}
