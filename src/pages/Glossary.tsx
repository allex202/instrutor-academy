import React, { useState } from 'react';
import { Book, Search, Heart, Tag } from 'lucide-react';
import { glossaryEntries } from '../data/glossary';
import { useProgress } from '../contexts/ProgressContext';

export default function Glossary() {
  const { progress, dispatch } = useProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showFavorites, setShowFavorites] = useState(false);

  const categories = ['Todos', ...Array.from(new Set(glossaryEntries.map(e => e.category)))];

  const filteredEntries = glossaryEntries.filter(entry => {
    const matchesSearch = entry.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || entry.category === activeCategory;
    const isFavorite = progress.glossaryFavorites.includes(entry.id);
    const matchesFavorite = showFavorites ? isFavorite : true;

    return matchesSearch && matchesCategory && matchesFavorite;
  });

  // Group by first letter
  const grouped = filteredEntries.reduce((acc, entry) => {
    const letter = entry.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(entry);
    return acc;
  }, {} as Record<string, typeof glossaryEntries>);

  const letters = Object.keys(grouped).sort();

  const toggleFavorite = (id: string) => {
    dispatch({ type: 'TOGGLE_GLOSSARY_FAVORITE', termId: id });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3 mb-4">
          <Book className="w-8 h-8 text-amber-600" />
          Glossário
        </h1>
        <p className="text-stone-500 dark:text-stone-400">
          Pesquise termos técnicos e conceitos de Inteligência Artificial.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input 
            type="text"
            placeholder="Buscar termo ou definição..."
            className="w-full bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl pl-12 pr-4 py-4 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-6 py-4 rounded-xl border font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${
            showFavorites 
              ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-900/20 dark:border-rose-800/30 dark:text-rose-400' 
              : 'bg-white dark:bg-neutral-800 border-stone-200 dark:border-neutral-700 text-stone-600 dark:text-stone-400 hover:border-rose-200 dark:hover:border-rose-800/30 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${showFavorites ? 'fill-current' : ''}`} />
          Favoritos
        </button>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                : 'bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-neutral-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {letters.length === 0 ? (
        <div className="text-center py-20 text-stone-500 dark:text-stone-400">
          Nenhum termo encontrado.
        </div>
      ) : (
        <div className="space-y-12">
          {letters.map(letter => (
            <div key={letter}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-black text-stone-300 dark:text-neutral-700">{letter}</h2>
                <div className="flex-1 h-px bg-stone-200 dark:bg-neutral-800"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {grouped[letter].map(entry => {
                  const isFavorite = progress.glossaryFavorites.includes(entry.id);
                  
                  return (
                    <div key={entry.id} className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 hover:shadow-md transition-shadow group relative">
                      <button 
                        onClick={() => toggleFavorite(entry.id)}
                        className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isFavorite ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-stone-300 dark:text-neutral-600 hover:bg-stone-100 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100'}`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      
                      <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 mb-3 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                        <Tag className="w-3 h-3" /> {entry.category}
                      </div>
                      
                      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-3 pr-10">
                        {entry.term}
                      </h3>
                      
                      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
                        {entry.definition}
                      </p>
                      
                      {entry.relatedTerms.length > 0 && (
                        <div className="pt-4 border-t border-stone-100 dark:border-neutral-700 flex flex-wrap gap-2">
                          <span className="text-xs text-stone-400 dark:text-stone-500 mr-1 flex items-center">Relacionado:</span>
                          {entry.relatedTerms.map((rt, idx) => (
                            <span key={idx} className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                              {rt}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
