import React from 'react';
import { Brain, FileText, Wrench, Download, Zap } from 'lucide-react';

export default function FineTuningVsRAG() {
  return (
    <div className="w-full bg-stone-900 rounded-xl p-8 border border-stone-800 flex flex-col md:flex-row gap-8 relative my-8">
      
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-stone-300 font-bold text-sm tracking-widest uppercase">Abordagens de Especialização</h3>
      </div>

      {/* Fine-Tuning Side */}
      <div className="flex-1 flex flex-col items-center pt-8 border-r border-stone-800 pr-4">
        <h4 className="text-stone-400 font-bold mb-8">Fine-Tuning</h4>
        
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-rose-900/20 rounded-full animate-spin [animation-duration:10s]"></div>
          <Brain className="w-16 h-16 text-rose-500 z-10" />
          <Wrench className="w-6 h-6 text-stone-500 absolute -top-2 -right-2 animate-bounce" />
          <div className="absolute inset-0 border-4 border-rose-500/30 border-dashed rounded-full animate-spin [animation-duration:15s] [animation-direction:reverse]"></div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-center text-sm">
          <span className="px-3 py-1 bg-stone-800 text-stone-300 rounded border border-stone-700 w-full flex items-center justify-between">
            Custo <span className="text-rose-400">Alto</span>
          </span>
          <span className="px-3 py-1 bg-stone-800 text-stone-300 rounded border border-stone-700 w-full flex items-center justify-between">
            Atualização <span className="text-rose-400">Lenta</span>
          </span>
          <span className="px-3 py-1 bg-stone-800 text-stone-300 rounded border border-stone-700 w-full flex items-center justify-between">
            Comportamento <span className="text-emerald-400">Excelente</span>
          </span>
        </div>
      </div>

      {/* VS Badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-500 font-black z-20">
        VS
      </div>

      {/* RAG Side */}
      <div className="flex-1 flex flex-col items-center pt-8 pl-4">
        <h4 className="text-stone-400 font-bold mb-8">RAG (Retrieval)</h4>
        
        <div className="relative w-32 h-32 flex items-center justify-center gap-2">
          <div className="absolute top-0 right-1/2 translate-x-4 flex flex-col animate-[slideUp_2s_infinite]">
             <FileText className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="absolute top-4 right-1/2 -translate-x-4 flex flex-col animate-[slideUp_2.5s_infinite_0.5s]">
             <FileText className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="relative z-10 w-20 h-20 bg-emerald-900/20 rounded-2xl flex items-center justify-center border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] mt-4">
             <Brain className="w-10 h-10 text-emerald-400" />
             <Zap className="absolute -top-3 -right-3 w-6 h-6 text-amber-400 animate-pulse" />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-center text-sm">
          <span className="px-3 py-1 bg-stone-800 text-stone-300 rounded border border-stone-700 w-full flex items-center justify-between">
            Custo <span className="text-emerald-400">Baixo</span>
          </span>
          <span className="px-3 py-1 bg-stone-800 text-stone-300 rounded border border-stone-700 w-full flex items-center justify-between">
            Atualização <span className="text-emerald-400">Imediata</span>
          </span>
          <span className="px-3 py-1 bg-stone-800 text-stone-300 rounded border border-stone-700 w-full flex items-center justify-between">
            Fatos <span className="text-emerald-400">Precisos</span>
          </span>
        </div>
      </div>

    </div>
  );
}
