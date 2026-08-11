import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Footer from './components/layout/Footer';
import GlobalSearch from './components/shared/GlobalSearch';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Journey = React.lazy(() => import('./pages/Journey'));
const AIFundamentals = React.lazy(() => import('./pages/AIFundamentals'));
const Anthropic = React.lazy(() => import('./pages/AnthropicPage'));
const Claude = React.lazy(() => import('./pages/ClaudePage'));
const Competitors = React.lazy(() => import('./pages/CompetitorsPage'));
const PromptEngineering = React.lazy(() => import('./pages/PromptEngineering'));
const ClaudeCode = React.lazy(() => import('./pages/ClaudeCode'));
const APIDevelopment = React.lazy(() => import('./pages/APIDevelopment'));
const Models = React.lazy(() => import('./pages/Models'));
const ContextWindow = React.lazy(() => import('./pages/ContextWindow'));
const ToolUse = React.lazy(() => import('./pages/ToolUse'));
const MCP = React.lazy(() => import('./pages/MCP'));
const ResponsibleAI = React.lazy(() => import('./pages/ResponsibleAI'));
const AgenticAI = React.lazy(() => import('./pages/AgenticAI'));
const InstructorMode = React.lazy(() => import('./pages/InstructorMode'));
const Labs = React.lazy(() => import('./pages/Labs'));
const Exercises = React.lazy(() => import('./pages/Exercises'));
const Simulados = React.lazy(() => import('./pages/Simulados'));
const Flashcards = React.lazy(() => import('./pages/Flashcards'));
const Glossary = React.lazy(() => import('./pages/Glossary'));
const Notes = React.lazy(() => import('./pages/Notes'));
const References = React.lazy(() => import('./pages/References'));

const Loading = () => (
  <div className="flex h-[60vh] flex-col items-center justify-center animate-fade-in">
    <div className="relative flex items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-stone-200/50 dark:border-neutral-800"></div>
      <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-amber-500 border-t-transparent shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
      <div className="absolute h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 animate-pulse shadow-inner"></div>
    </div>
    <p className="mt-6 text-sm font-bold tracking-widest text-stone-500 dark:text-stone-400 uppercase animate-pulse">
      Carregando...
    </p>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const main = document.getElementById('main-scroll-container');
    if (main) {
      main.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);
  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-fade-in h-full">
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-stone-50/50 text-stone-900 dark:bg-neutral-950 dark:text-stone-100 overflow-hidden font-sans selection:bg-amber-200 dark:selection:bg-amber-900/50">
      {/* Background ambient gradient */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] h-[60%] w-[50%] rounded-full bg-amber-500/10 blur-[120px] dark:bg-amber-500/15"></div>
        <div className="absolute -bottom-[20%] -left-[10%] h-[60%] w-[50%] rounded-full bg-[#d4845a]/5 blur-[120px] dark:bg-[#d4845a]/10"></div>
      </div>

      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex flex-col flex-1 w-full min-w-0">
        <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <GlobalSearch />
        <main id="main-scroll-container" className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="min-h-full flex flex-col">
            <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 lg:px-8 xl:py-10">
              <Suspense fallback={<Loading />}>
                <ScrollToTop />
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jornada" element={<Journey />} />
                    <Route path="/fundamentos-ia" element={<AIFundamentals />} />
                    <Route path="/anthropic" element={<Anthropic />} />
                    <Route path="/claude" element={<Claude />} />
                    <Route path="/concorrentes" element={<Competitors />} />
                    <Route path="/prompt-engineering" element={<PromptEngineering />} />
                    <Route path="/claude-code" element={<ClaudeCode />} />
                    <Route path="/api" element={<APIDevelopment />} />
                    <Route path="/modelos" element={<Models />} />
                    <Route path="/context-window" element={<ContextWindow />} />
                    <Route path="/tool-use" element={<ToolUse />} />
                    <Route path="/mcp" element={<MCP />} />
                    <Route path="/seguranca" element={<ResponsibleAI />} />
                    <Route path="/ia-agentica" element={<AgenticAI />} />
                    <Route path="/instructor" element={<InstructorMode />} />
                    <Route path="/laboratorios" element={<Labs />} />
                    <Route path="/exercicios" element={<Exercises />} />
                    <Route path="/simulados" element={<Simulados />} />
                    <Route path="/flashcards" element={<Flashcards />} />
                    <Route path="/glossario" element={<Glossary />} />
                    <Route path="/anotacoes" element={<Notes />} />
                    <Route path="/referencias" element={<References />} />
                  </Routes>
                </PageTransition>
              </Suspense>
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
