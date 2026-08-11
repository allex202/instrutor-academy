import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { modules } from '../data/courses';
import { glossaryEntries } from '../data/glossary';
import { allFlashcards } from '../data/flashcards';
import { allReferences } from '../data/references';

export type SearchResultType = 'module' | 'lesson' | 'glossary' | 'flashcard' | 'reference';

export interface SearchResult {
  id: string;
  title: string;
  type: SearchResultType;
  description?: string;
  url: string;
}

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

function buildSearchIndex(): SearchResult[] {
  const index: SearchResult[] = [];

  // Modules and their lessons
  const moduleRoutes: Record<string, string> = {
    'ai-fundamentals': '/fundamentos-ia',
    'anthropic': '/anthropic',
    'claude': '/claude',
    'prompt-engineering': '/prompt-engineering',
    'claude-code': '/claude-code',
    'api-development': '/api',
    'models': '/modelos',
    'context-window': '/context-window',
    'tool-use': '/tool-use',
    'mcp': '/mcp',
    'responsible-ai': '/seguranca',
    'agentic-ai': '/ia-agentica',
    'instructor': '/instructor',
  };

  for (const mod of modules) {
    const route = moduleRoutes[mod.id] || `/${mod.id}`;
    index.push({
      id: `mod-${mod.id}`,
      title: mod.title,
      type: 'module',
      description: mod.description,
      url: route,
    });

    for (const lesson of mod.lessons) {
      index.push({
        id: `lesson-${lesson.id}`,
        title: lesson.title,
        type: 'lesson',
        description: `${mod.title} — ${lesson.description}`,
        url: route,
      });
    }
  }

  // Glossary entries
  for (const entry of glossaryEntries) {
    index.push({
      id: `gloss-${entry.id}`,
      title: entry.term,
      type: 'glossary',
      description: entry.definition.slice(0, 120),
      url: '/glossario',
    });
  }

  // Flashcards
  for (const card of allFlashcards) {
    index.push({
      id: `flash-${card.id}`,
      title: card.front,
      type: 'flashcard',
      description: card.back.slice(0, 100),
      url: '/flashcards',
    });
  }

  // References
  for (const ref of allReferences) {
    index.push({
      id: `ref-${ref.id}`,
      title: ref.title,
      type: 'reference',
      description: ref.description,
      url: '/referencias',
    });
  }

  return index;
}

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  const results = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return searchIndex
      .filter(
        item =>
          item.title.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
      )
      .slice(0, 20);
  }, [query, searchIndex]);

  return (
    <SearchContext.Provider value={{ query, setQuery, results }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
