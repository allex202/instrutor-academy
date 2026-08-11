import React from 'react';
import { NavLink } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';
import {
  LayoutDashboard, Map, Brain, Building2, Bot, Pen, Terminal, Code2,
  Layers, Box, Wrench, Network, Shield, Cpu, GraduationCap, FlaskConical,
  Dumbbell, ClipboardList, CreditCard, BookOpen, StickyNote, ExternalLink, X, Target, MessageSquare, Hexagon
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    title: 'PRINCIPAL',
    items: [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      { name: 'Minha Jornada', path: '/jornada', icon: Map },
    ]
  },
  {
    title: 'MÓDULOS',
    items: [
      { name: 'Fundamentos de IA', path: '/fundamentos-ia', icon: Brain },
      { name: 'Anthropic', path: '/anthropic', icon: Building2 },
      { name: 'Claude', path: '/claude', icon: Bot },
      { name: 'OpenAI / ChatGPT', path: '/openai', icon: MessageSquare },
      { name: 'Google / Gemini', path: '/gemini', icon: Hexagon },
      { name: 'Mercado e Concorrentes', path: '/concorrentes', icon: Target },
      { name: 'Prompt Engineering', path: '/prompt-engineering', icon: Pen },
      { name: 'Claude Code', path: '/claude-code', icon: Terminal },
      { name: 'API e Desenvolvimento', path: '/api', icon: Code2 },
      { name: 'Modelos', path: '/modelos', icon: Layers },
      { name: 'Context Window', path: '/context-window', icon: Box },
      { name: 'Tool Use', path: '/tool-use', icon: Wrench },
      { name: 'MCP', path: '/mcp', icon: Network },
      { name: 'Segurança e Responsible AI', path: '/seguranca', icon: Shield },
      { name: 'IA Agêntica', path: '/ia-agentica', icon: Cpu },
      { name: 'Instruction / Teaching', path: '/instructor', icon: GraduationCap },
    ]
  },
  {
    title: 'PRÁTICA',
    items: [
      { name: 'Laboratórios', path: '/laboratorios', icon: FlaskConical },
      { name: 'Exercícios', path: '/exercicios', icon: Dumbbell },
      { name: 'Simulados', path: '/simulados', icon: ClipboardList },
      { name: 'Flashcards', path: '/flashcards', icon: CreditCard },
    ]
  },
  {
    title: 'FERRAMENTAS',
    items: [
      { name: 'Glossário', path: '/glossario', icon: BookOpen },
      { name: 'Anotações', path: '/anotacoes', icon: StickyNote },
      { name: 'Referências', path: '/referencias', icon: ExternalLink },
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const context = useProgress() as any;
  const userLevel = context.userLevel ?? context.progress?.level ?? 1;
  const userXp = context.userXp ?? context.progress?.xp ?? 0;
  const nextLevelXp = context.nextLevelXp ?? (userLevel * 500);
  
  const xpPercentage = Math.min(100, Math.round((userXp / nextLevelXp) * 100));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-slate-950 transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r border-slate-800 shadow-2xl lg:shadow-none
      `}>
        {/* Header / Logo */}
        <div className="relative flex flex-col p-6 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 shadow-md">
                <Layers className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white leading-none">
                  AGL
                </h1>
                <p className="text-[11px] font-bold text-indigo-400 mt-1 uppercase tracking-widest leading-none">
                  Academy
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 lg:hidden text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          {/* Subtle animated gradient line */}
          <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 opacity-50" />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 space-y-8 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {navigation.map((group, i) => (
            <div key={i} className="px-4">
              <h2 className="mb-3 px-3 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                {group.title}
              </h2>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) => `
                      group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-amber-500/10 text-white border-l-2 border-amber-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' 
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border-l-2 border-transparent'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <div className="flex items-center gap-3">
                        <item.icon className={`h-5 w-5 transition-colors duration-200 ${
                          isActive ? 'text-amber-500' : 'text-slate-500 group-hover:text-slate-400'
                        }`} />
                        {item.name}
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* XP / Level Bar */}
        <div className="p-4 shrink-0 bg-slate-950/50 backdrop-blur-md border-t border-slate-800/50">
          <div className="rounded-xl bg-slate-900/80 p-4 border border-slate-800 shadow-inner">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-amber-900/20">
                  <span className="text-xs font-bold text-slate-950">{userLevel}</span>
                </div>
                <span className="text-sm font-semibold text-slate-200">Nível {userLevel}</span>
              </div>
              <span className="text-xs font-medium text-slate-400">{userXp} / {nextLevelXp}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800/50 shadow-inner">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700 ease-out relative"
                style={{ width: `${xpPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
