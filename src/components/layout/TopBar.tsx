import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Sun, Moon, Award } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSearch } from '../../contexts/SearchContext';
import { useProgress } from '../../contexts/ProgressContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { query, setQuery, results } = useSearch();
  const progressContext = useProgress() as any;
  const userXp = progressContext.userXp ?? progressContext.progress?.xp ?? 0;
  
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-field')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    const name = path.substring(1).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return name;
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 
      bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl
      shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]
      px-4 sm:gap-x-6 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <button 
        type="button" 
        className="-m-2.5 p-2.5 text-stone-600 hover:text-stone-900 lg:hidden dark:text-stone-400 dark:hover:text-stone-100 transition-colors" 
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator for mobile */}
      <div className="h-6 w-px bg-stone-200/50 lg:hidden dark:bg-white/10" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center gap-4">
          <div className="hidden lg:flex items-center text-sm font-medium text-stone-500 dark:text-stone-400">
            <span className="px-3 py-1.5 rounded-lg bg-stone-100/80 dark:bg-white/5 border border-transparent dark:border-white/5">
              {getBreadcrumb()}
            </span>
          </div>
          
          <div className="relative flex flex-1 max-w-md ml-auto lg:ml-4" ref={searchRef}>
            <label htmlFor="search-field" className="sr-only">Buscar</label>
            <div className={`relative w-full group ${isSearchFocused ? 'ring-2 ring-amber-500/50 rounded-full' : ''} transition-all duration-300`}>
              <Search 
                className={`pointer-events-none absolute inset-y-0 left-3 h-full w-4 transition-colors duration-300 ${
                  isSearchFocused ? 'text-amber-500' : 'text-stone-400 group-hover:text-stone-500 dark:text-stone-500 dark:group-hover:text-stone-400'
                }`} 
                aria-hidden="true" 
              />
              <input
                id="search-field"
                className="block h-10 w-full border-0 bg-stone-100/80 dark:bg-black/20 py-0 pl-10 pr-14 text-stone-900 placeholder:text-stone-500 focus:ring-0 sm:text-sm rounded-full dark:text-stone-100 transition-all duration-300"
                placeholder="Buscar (Ctrl+K)..."
                type="search"
                name="search"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-stone-200 bg-white px-1.5 font-sans text-[10px] font-medium text-stone-400 dark:border-white/10 dark:bg-white/5 dark:text-stone-500">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
            
            {/* Search Results Dropdown */}
            {isSearchFocused && query && (
              <div className="absolute top-14 left-0 w-full bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-200/50 dark:border-white/10 overflow-hidden z-50 transform origin-top transition-all duration-200">
                {results.length > 0 ? (
                  <ul className="max-h-[60vh] overflow-y-auto py-2 scrollbar-thin">
                    {results.map((result) => (
                      <li 
                        key={result.id} 
                        className="px-4 py-3 hover:bg-amber-50 dark:hover:bg-amber-500/10 cursor-pointer group transition-colors"
                        onMouseDown={() => {
                          navigate(result.url);
                          setQuery('');
                          setIsSearchFocused(false);
                        }}
                      >
                        <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">{result.title}</div>
                        {result.description && <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">{result.description}</div>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-stone-500 dark:text-stone-400">
                    <Search className="h-6 w-6 mx-auto mb-2 opacity-20" />
                    Nenhum resultado encontrado.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-x-3 lg:gap-x-5">
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 px-3 py-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 shadow-sm backdrop-blur-md transition-transform hover:scale-105 cursor-default">
            <Award className="h-4 w-4 text-amber-500" />
            <span>{userXp} XP</span>
          </div>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-stone-200 dark:lg:bg-white/10" aria-hidden="true" />

          <button
            type="button"
            className="rounded-full p-2 text-stone-500 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            onClick={toggleTheme}
          >
            <span className="sr-only">Alternar tema</span>
            <div className="relative h-5 w-5">
              <Sun className={`absolute inset-0 h-5 w-5 transform transition-transform duration-500 ${theme === 'dark' ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} aria-hidden="true" />
              <Moon className={`absolute inset-0 h-5 w-5 transform transition-transform duration-500 ${theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} aria-hidden="true" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
