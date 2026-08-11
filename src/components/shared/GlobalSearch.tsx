import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, X } from 'lucide-react';

const searchIndex = [
  { title: 'Fundamentos de IA', path: '/fundamentos-ia', tags: 'ia basico machine learning llm embeddings redes neurais deep learning ai' },
  { title: 'Ecossistema Anthropic', path: '/anthropic', tags: 'empresa claude constitucional alinhamento' },
  { title: 'Modelos Claude', path: '/claude', tags: 'opus sonnet haiku claude 3.5' },
  { title: 'OpenAI e ChatGPT', path: '/openai', tags: 'chatgpt openai gpt-4o o1 strawberry sam altman' },
  { title: 'Ecossistema Google (Gemini)', path: '/gemini', tags: 'google gemini spark deepmind moe ring attention vertex ai studio' },
  { title: 'Mercado e Concorrentes', path: '/concorrentes', tags: 'openai chatgpt gemini google meta llama' },
  { title: 'Prompt Engineering', path: '/prompt-engineering', tags: 'prompts xml tags chain of thought few shot zero shot' },
  { title: 'Claude Code (CLI)', path: '/claude-code', tags: 'terminal cli agent bash ferramentas' },
  { title: 'API Development', path: '/api-development', tags: 'api rest curl python javascript streaming sdk' },
  { title: 'Comparativo de Modelos', path: '/modelos', tags: 'custo velocidade benchmark' },
  { title: 'Janela de Contexto', path: '/context-window', tags: 'tokens rag limites 200k memria' },
  { title: 'Tool Use (Functions)', path: '/tool-use', tags: 'function calling ferramentas json api schema' },
  { title: 'MCP (Model Context Protocol)', path: '/mcp', tags: 'mcp protocolo integracao open source' },
  { title: 'Segurana (Responsible AI)', path: '/seguranca', tags: 'seguranca prompt injection red teaming' },
  { title: 'IA Agntica', path: '/agentic-ai', tags: 'agentes autonomos react loop orquestracao' },
  { title: 'Modo Instrutor', path: '/instructor', tags: 'ensino didatica professor sala de aula' }
];

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredResults = searchIndex.filter(item => {
    const searchStr = (item.title + ' ' + item.tags).toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    }
    if (e.key === 'Enter' && filteredResults.length > 0) {
      e.preventDefault();
      navigate(filteredResults[selectedIndex].path);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-stone-900/80 backdrop-blur-sm p-4">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden animate-slide-up">
        
        <div className="flex items-center px-4 border-b border-stone-200 dark:border-stone-800">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-none py-4 px-4 text-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-0"
            placeholder="Buscar mdulos, conceitos, tecnologias..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 bg-stone-100 dark:bg-stone-800 p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-stone-500">
              Nenhum resultado encontrado para "{query}"
            </div>
          ) : (
            <ul className="space-y-1">
              {filteredResults.map((result, idx) => (
                <li key={result.path}>
                  <button
                    onClick={() => {
                      navigate(result.path);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors ${
                      idx === selectedIndex 
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100' 
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span className="font-medium">{result.title}</span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      Ir <Command className="w-3 h-3" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 px-4 py-3 text-xs text-stone-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><kbd className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-[10px]"></kbd> <kbd className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-[10px]"></kbd> Navegar</span>
            <span className="flex items-center gap-1"><kbd className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-[10px]">Enter</kbd> Selecionar</span>
          </div>
          <span className="flex items-center gap-1"><kbd className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-[10px]">Esc</kbd> Fechar</span>
        </div>
      </div>
    </div>
  );
}
