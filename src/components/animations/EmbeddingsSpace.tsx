import React, { useEffect, useState } from 'react';

export default function EmbeddingsSpace() {
  const [active, setActive] = useState(0);

  // Simple animation sequence for King - Man + Woman = Queen
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-80 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-center relative overflow-hidden my-8">
      {/* 3D Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:20px_20px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)] opacity-30"></div>
      
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-stone-300 font-bold text-sm tracking-widest uppercase">Espaço Vetorial (3D)</h3>
        <p className="text-stone-500 text-xs">Mapeamento Semântico</p>
      </div>

      <div className="relative w-full max-w-md h-full flex items-center justify-center">
        {/* Nodes */}
        <div className={`absolute top-[20%] left-[20%] transition-all duration-700 flex flex-col items-center ${active >= 0 ? 'opacity-100 scale-100' : 'opacity-50 scale-75'}`}>
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
          <span className="text-blue-300 text-xs mt-1 font-mono font-bold">Rei</span>
          <span className="text-stone-600 text-[9px] font-mono">[0.8, -0.2, 0.5]</span>
        </div>

        <div className={`absolute top-[60%] left-[20%] transition-all duration-700 flex flex-col items-center ${active >= 1 ? 'opacity-100 scale-100' : 'opacity-50 scale-75'}`}>
          <div className="w-3 h-3 bg-stone-400 rounded-full shadow-[0_0_15px_rgba(168,162,158,0.8)]"></div>
          <span className="text-stone-300 text-xs mt-1 font-mono font-bold">Homem</span>
          <span className="text-stone-600 text-[9px] font-mono">[0.7, -0.4, 0.2]</span>
        </div>

        <div className={`absolute top-[60%] right-[20%] transition-all duration-700 flex flex-col items-center ${active >= 2 ? 'opacity-100 scale-100' : 'opacity-50 scale-75'}`}>
          <div className="w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)]"></div>
          <span className="text-pink-300 text-xs mt-1 font-mono font-bold">Mulher</span>
          <span className="text-stone-600 text-[9px] font-mono">[-0.2, 0.9, 0.4]</span>
        </div>

        <div className={`absolute top-[20%] right-[20%] transition-all duration-1000 flex flex-col items-center ${active >= 3 ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`}>
          <div className="w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,1)] animate-pulse"></div>
          <span className="text-amber-300 text-sm mt-1 font-mono font-bold">Rainha</span>
          <span className="text-stone-600 text-[9px] font-mono">[-0.1, 1.1, 0.7]</span>
        </div>

        {/* Math Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }}>
          {/* Rei - Homem */}
          <line x1="20%" y1="22%" x2="20%" y2="58%" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" className={`transition-all duration-1000 ${active >= 1 ? 'opacity-50' : 'opacity-0'}`} />
          {/* Result + Mulher */}
          <line x1="20%" y1="60%" x2="78%" y2="60%" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className={`transition-all duration-1000 ${active >= 2 ? 'opacity-50' : 'opacity-0'}`} />
          {/* Final Vector to Rainha */}
          <line x1="80%" y1="58%" x2="80%" y2="22%" stroke="#f59e0b" strokeWidth="2" className={`transition-all duration-1000 ${active >= 3 ? 'opacity-100 animate-[pulse-glow_2s_infinite]' : 'opacity-0'}`} />
        </svg>

        {/* Formula */}
        <div className="absolute bottom-6 bg-stone-950/80 px-6 py-2 rounded-full border border-stone-800 backdrop-blur-sm z-20">
          <p className="font-mono text-sm">
            <span className={active >= 0 ? 'text-blue-400' : 'text-stone-600'}>Rei</span>
            <span className="text-stone-500 mx-2">-</span>
            <span className={active >= 1 ? 'text-stone-300' : 'text-stone-600'}>Homem</span>
            <span className="text-stone-500 mx-2">+</span>
            <span className={active >= 2 ? 'text-pink-400' : 'text-stone-600'}>Mulher</span>
            <span className="text-stone-500 mx-2">=</span>
            <span className={active >= 3 ? 'text-amber-400 font-bold drop-shadow-md' : 'text-stone-600'}>Rainha</span>
          </p>
        </div>
      </div>
    </div>
  );
}
