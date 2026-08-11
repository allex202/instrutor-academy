import React, { useState, useEffect } from 'react';
import { Bot, Server, Terminal, Settings } from 'lucide-react';

export default function ToolUseFlow() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[400px] bg-stone-900 rounded-xl border border-stone-800 flex flex-col items-center justify-center relative overflow-hidden my-8">
      
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-stone-300 font-bold text-sm tracking-widest uppercase">Tool Use / Function Calling</h3>
        <p className="text-stone-500 text-xs">O Agente acionando APIs externas</p>
      </div>

      <div className="relative w-full max-w-2xl flex justify-between items-center px-12 z-10 mt-8">
        
        {/* Claude */}
        <div className="flex flex-col items-center gap-2">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${step === 0 || step === 4 ? 'bg-amber-900/40 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'bg-stone-800 border-stone-700'} border`}>
            <Bot className={`w-10 h-10 ${step === 0 || step === 4 ? 'text-amber-400' : 'text-stone-500'}`} />
          </div>
          <span className="text-xs font-bold text-stone-400 uppercase">Claude</span>
        </div>

        {/* Data flowing */}
        <div className="flex-1 flex flex-col items-center justify-center relative h-32 mx-4">
          
          {/* Top track (Claude -> API) */}
          <div className="w-full h-1/2 relative border-b border-dashed border-stone-700">
            {step === 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center gap-2 animate-[slideRight_1.5s_linear_forwards]">
                <div className="px-3 py-1 bg-blue-900/40 border border-blue-500/50 rounded text-[10px] font-mono text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  {`{"city": "São Paulo"}`}
                </div>
              </div>
            )}
          </div>
          
          {/* Bottom track (API -> Claude) */}
          <div className="w-full h-1/2 relative">
             {step === 3 && (
              <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-2 animate-[slideRight_1.5s_linear_forwards] [animation-direction:reverse]">
                <div className="px-3 py-1 bg-emerald-900/40 border border-emerald-500/50 rounded text-[10px] font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  {`{"temp": 28, "cond": "Ensolarado"}`}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* External API */}
        <div className="flex flex-col items-center gap-2">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${step === 2 ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'bg-stone-800 border-stone-700'} border relative`}>
            <Settings className={`absolute -top-3 -right-3 w-8 h-8 text-stone-600 ${step === 2 ? 'animate-spin' : ''}`} />
            <Server className={`w-10 h-10 ${step === 2 ? 'text-blue-400' : 'text-stone-500'}`} />
          </div>
          <span className="text-xs font-bold text-stone-400 uppercase">API Externa</span>
        </div>

      </div>

      {/* Terminal UI */}
      <div className="mt-12 w-full max-w-xl bg-black rounded-lg border border-stone-800 p-4 font-mono text-xs shadow-2xl z-10">
        <div className="flex items-center gap-2 mb-3 border-b border-stone-800 pb-2 text-stone-500">
          <Terminal className="w-4 h-4" /> <span>sys.log</span>
        </div>
        <div className="space-y-1 h-20 flex flex-col justify-end">
          <div className={`text-stone-300 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-green-500">User:</span> Qual o clima em São Paulo?
          </div>
          <div className={`text-blue-400 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-stone-500">[System]</span> Chamando ferramenta: getWeather()
          </div>
          <div className={`text-stone-400 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-stone-500">[API]</span> Processando request...
          </div>
          <div className={`text-emerald-400 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-stone-500">[System]</span> Resultado da ferramenta inserido no contexto.
          </div>
          <div className={`text-amber-400 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-amber-500">Claude:</span> Atualmente faz 28 graus e está ensolarado em SP.
          </div>
        </div>
      </div>
    </div>
  );
}
