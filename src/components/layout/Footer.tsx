import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto relative z-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      <div className="glass dark:glass-dark rounded-t-2xl mx-4 md:mx-6 lg:mx-8 mb-0 mt-8 p-6 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.2)]">
        <div className="mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-sm font-bold tracking-tight text-stone-900 dark:text-white flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-sm shadow-amber-500/20 inline-block"></span>
              Anthropic Instructor Learning Hub
            </h3>
            <p className="mt-2 text-xs font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1">
              Plataforma pessoal de estudos feita com <span className="text-red-500 animate-pulse">❤️</span>
            </p>
          </div>
          
          <div className="text-xs font-medium text-stone-500 dark:text-stone-400 max-w-md text-center sm:text-left bg-stone-100/50 dark:bg-neutral-800/50 p-3 rounded-xl border border-stone-200/50 dark:border-neutral-700/50">
            Conteúdo educacional. Consulte sempre a documentação oficial da Anthropic para informações atualizadas.
          </div>

          <div className="flex gap-4 text-sm font-semibold text-amber-600 dark:text-amber-500">
            <a 
              href="https://docs.anthropic.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 px-3.5 py-1.5 rounded-full hover:bg-amber-50 dark:hover:bg-amber-900/20 border border-transparent hover:border-amber-200 dark:hover:border-amber-800/50"
            >
              Documentação Oficial
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
