import React, { useState } from 'react';
import { ExternalLink, Search, BookOpen, Video, Code2, GraduationCap, Link2, AlertCircle } from 'lucide-react';
import { allReferences } from '../data/references';

export default function References() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(allReferences.map(r => r.category)))];

  const filteredReferences = allReferences.filter(ref => {
    const matchesSearch = ref.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ref.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || ref.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by category for display
  const groupedReferences = filteredReferences.reduce((acc, ref) => {
    if (!acc[ref.category]) acc[ref.category] = [];
    acc[ref.category].push(ref);
    return acc;
  }, {} as Record<string, typeof allReferences>);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'documentation': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'github': return <Code2 className="w-4 h-4" />;
      case 'course': return <GraduationCap className="w-4 h-4" />;
      default: return <Link2 className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'documentation': return 'Documentação';
      case 'article': return 'Artigo';
      case 'video': return 'Vídeo';
      case 'github': return 'Repositório';
      case 'course': return 'Curso';
      case 'official': return 'Oficial';
      default: return 'Link';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
            <Link2 className="w-8 h-8 text-amber-600" />
            Referências
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2">
            Material de apoio, documentação oficial e recursos recomendados.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-lg border border-amber-200 dark:border-amber-800/30">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Conteúdo sujeito a atualização</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input 
            type="text"
            placeholder="Buscar referências..."
            className="w-full bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl pl-12 pr-4 py-3 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 text-stone-700 dark:text-stone-300 font-medium shadow-sm"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          <option value="all">Todas as Categorias</option>
          {categories.filter(c => c !== 'all').map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {Object.keys(groupedReferences).length === 0 ? (
        <div className="text-center py-20 bg-stone-50 dark:bg-neutral-800/50 rounded-xl border border-dashed border-stone-300 dark:border-neutral-700">
          <p className="text-stone-500 dark:text-stone-400">Nenhuma referência encontrada para esta busca.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedReferences).map(([category, refs]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {refs.map(ref => (
                  <a 
                    key={ref.id}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all group flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                      <ExternalLink className="w-5 h-5 text-amber-500" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-neutral-900 px-2 py-1 rounded">
                        {getTypeIcon(ref.type)} {getTypeLabel(ref.type)}
                      </span>
                      {ref.type === 'official' && (
                        <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">
                          Oficial
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 pr-6 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                      {ref.title}
                    </h3>
                    
                    <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 flex-1">
                      {ref.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
