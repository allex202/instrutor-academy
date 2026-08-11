import React from 'react';
import { User, Database, FileText, BrainCircuit, ArrowRight } from 'lucide-react';

export default function RAGFlow() {
  return (
    <div className="w-full bg-stone-900 rounded-xl p-8 border border-stone-800 flex flex-col items-center justify-center my-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <h3 className="text-stone-300 font-bold mb-12 z-10 text-lg">Arquitetura RAG (Retrieval-Augmented Generation)</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-3xl z-10">
        
        {/* User Query */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10">
            <User className="w-8 h-8" />
          </div>
          <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">Usuário</span>
        </div>

        {/* Arrow 1 */}
        <div className="flex-1 flex items-center justify-center relative h-10 w-full md:w-auto">
          <div className="absolute w-full h-[2px] bg-stone-800"></div>
          <div className="absolute w-full h-[2px] bg-amber-500 origin-left animate-[scaleIn_2s_ease-out_infinite]"></div>
          <ArrowRight className="text-amber-500 absolute right-0 animate-[slideRight_2s_ease-out_infinite]" />
          <span className="absolute -top-6 text-[10px] text-amber-500/80 font-mono">1. Query</span>
        </div>

        {/* Vector DB */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-24 rounded-xl bg-blue-900/20 border border-blue-500/30 flex flex-col items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
            <Database className="w-8 h-8 mb-2" />
            <span className="text-[10px] font-bold">Vector DB</span>
          </div>
          <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">Busca</span>
        </div>

        {/* Arrow 2 */}
        <div className="flex-1 flex items-center justify-center relative h-10 w-full md:w-auto">
          <div className="absolute w-full h-[2px] bg-stone-800"></div>
          <div className="absolute w-full h-[2px] bg-emerald-500 origin-left animate-[scaleIn_2s_ease-out_infinite] delay-700"></div>
          <ArrowRight className="text-emerald-500 absolute right-0 animate-[slideRight_2s_ease-out_infinite] delay-700" />
          <span className="absolute -top-6 text-[10px] text-emerald-500/80 font-mono">2. Contexto</span>
        </div>

        {/* LLM */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-2xl bg-amber-900/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.15)] relative">
            <div className="absolute inset-0 bg-amber-500/10 animate-pulse-glow rounded-2xl"></div>
            <BrainCircuit className="w-10 h-10" />
          </div>
          <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">Claude (LLM)</span>
        </div>

      </div>

      {/* Returned Answer */}
      <div className="mt-12 flex items-center gap-4 border border-stone-800 bg-stone-900/80 p-4 rounded-lg shadow-lg z-10 animate-fade-in">
        <FileText className="text-stone-400 w-5 h-5" />
        <p className="text-sm text-stone-300 font-mono">
          <span className="text-emerald-400">Contexto injetado.</span> Gerando resposta fundamentada...
        </p>
      </div>
    </div>
  );
}
