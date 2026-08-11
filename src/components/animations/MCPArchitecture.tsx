import React, { useEffect, useState } from 'react';
import { Bot, Network, Database, Cloud, GitBranch, Lock } from 'lucide-react';

export default function MCPArchitecture() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-96 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-center relative overflow-hidden my-8">
      
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-stone-300 font-bold text-sm tracking-widest uppercase">Model Context Protocol (MCP)</h3>
        <p className="text-stone-500 text-xs">Conexão padronizada de ferramentas</p>
      </div>

      <div className="relative w-full max-w-3xl h-full flex flex-col items-center justify-center">
        
        {/* Top: Claude */}
        <div className="w-24 h-24 rounded-3xl bg-amber-900/20 border border-amber-500/50 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(245,158,11,0.2)] mb-8">
          <Bot className="w-12 h-12 text-amber-400" />
        </div>

        {/* Center: MCP Router */}
        <div className="relative w-64 h-16 bg-blue-900/30 border border-blue-500/50 rounded-full flex items-center justify-center z-10 backdrop-blur-md">
          <div className={`absolute inset-0 bg-blue-500/10 rounded-full transition-opacity duration-1000 ${pulse ? 'opacity-100' : 'opacity-30'}`}></div>
          <span className="font-mono font-bold text-blue-300 tracking-wider flex items-center gap-2">
            <Network className="w-5 h-5" /> MCP Client
          </span>
        </div>

        {/* Bottom: Data Sources */}
        <div className="flex gap-8 mt-12 z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center relative">
              <Database className="w-8 h-8 text-stone-400" />
              <Lock className="w-3 h-3 text-emerald-400 absolute bottom-2 right-2" />
            </div>
            <span className="text-[10px] font-bold text-stone-500 uppercase">PostgreSQL</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center relative">
              <GitBranch className="w-8 h-8 text-stone-400" />
              <Lock className="w-3 h-3 text-emerald-400 absolute bottom-2 right-2" />
            </div>
            <span className="text-[10px] font-bold text-stone-500 uppercase">GitHub Repo</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center relative">
              <Cloud className="w-8 h-8 text-stone-400" />
              <Lock className="w-3 h-3 text-emerald-400 absolute bottom-2 right-2" />
            </div>
            <span className="text-[10px] font-bold text-stone-500 uppercase">Google Drive</span>
          </div>
        </div>

        {/* Connections SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
          {/* LLM to MCP */}
          <line x1="50%" y1="35%" x2="50%" y2="46%" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 6" className={pulse ? 'animate-[pulse-glow_2s_infinite]' : ''} />
          
          {/* MCP to Sources */}
          {/* Left */}
          <path d="M 50% 58% C 50% 70%, 36% 65%, 36% 75%" fill="none" stroke="#3b82f6" strokeWidth="2" className={pulse ? 'animate-pulse opacity-100' : 'opacity-40'} />
          {/* Center */}
          <line x1="50%" y1="58%" x2="50%" y2="75%" stroke="#3b82f6" strokeWidth="2" className={pulse ? 'animate-pulse opacity-100' : 'opacity-40'} />
          {/* Right */}
          <path d="M 50% 58% C 50% 70%, 64% 65%, 64% 75%" fill="none" stroke="#3b82f6" strokeWidth="2" className={pulse ? 'animate-pulse opacity-100' : 'opacity-40'} />
        </svg>

      </div>
    </div>
  );
}
