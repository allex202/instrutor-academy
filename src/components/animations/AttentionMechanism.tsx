import React, { useEffect, useState } from 'react';

export default function AttentionMechanism() {
  const [activeWord, setActiveWord] = useState(0);
  
  const words = [
    { text: "O", type: "normal" },
    { text: "contrato", type: "key" },
    { text: "de", type: "normal" },
    { text: "locação", type: "key" },
    { text: "vence", type: "normal" },
    { text: "no", type: "normal" },
    { text: "dia", type: "normal" },
    { text: "15", type: "target" },
    { text: "de", type: "normal" },
    { text: "março", type: "target" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord(prev => (prev + 1) % words.length);
    }, 800);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="w-full h-80 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-center relative overflow-hidden my-8">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-stone-300 font-bold text-sm tracking-widest uppercase">Mecanismo de Atenção</h3>
        <p className="text-stone-500 text-xs">Pesos sendo calculados em tempo real</p>
      </div>

      <div className="flex flex-wrap gap-3 max-w-xl justify-center z-10 p-8 bg-stone-950/50 rounded-2xl border border-stone-800/50 backdrop-blur-md">
        {words.map((word, i) => {
          // Calculate distance for attention weight simulation
          const distance = Math.abs(activeWord - i);
          const isTargetAndActiveKey = (word.type === 'target' && (words[activeWord].type === 'key'));
          
          let opacity = 0.3;
          let scale = 1;
          let color = 'text-stone-500';
          let bg = 'transparent';
          let shadow = 'none';

          if (i === activeWord) {
            opacity = 1;
            scale = 1.1;
            color = 'text-amber-400';
            bg = 'bg-amber-500/10';
            shadow = '0 0 20px rgba(245,158,11,0.2)';
          } else if (isTargetAndActiveKey) {
            // Highly attended words based on semantic context
            opacity = 0.9;
            scale = 1.05;
            color = 'text-emerald-400';
            bg = 'bg-emerald-500/10';
            shadow = '0 0 15px rgba(16,185,129,0.2)';
          } else if (distance < 2) {
            opacity = 0.6;
            color = 'text-stone-400';
          }

          return (
            <span 
              key={i} 
              className={`font-mono text-xl md:text-3xl transition-all duration-300 rounded px-2 py-1 ${color} ${bg}`}
              style={{ 
                opacity, 
                transform: `scale(${scale})`,
                boxShadow: shadow
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      {/* SVG for Attention Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50" preserveAspectRatio="none">
        {/* Draw a subtle line between active word and target words if semantic link exists */}
        {words[activeWord].type === 'key' && (
           <line x1="40%" y1="50%" x2="70%" y2="50%" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-[pulse-glow_2s_infinite]" />
        )}
      </svg>
    </div>
  );
}
