import React, { useEffect, useState } from 'react';

export default function NeuralNetwork() {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % 5); // 0,1,2,3,4 (0 is input, 1-3 hidden, 4 output)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderLayer = (count: number, layerIndex: number, isOutput: boolean = false) => {
    const isActive = activeLayer === layerIndex;
    const isPast = activeLayer > layerIndex;
    
    return (
      <div className="flex flex-col gap-4 z-10" key={`layer-${layerIndex}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={`node-${layerIndex}-${i}`} 
            className={`w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-300 shadow-lg
              ${isActive ? (isOutput ? 'bg-amber-400 scale-125 shadow-[0_0_20px_rgba(245,158,11,1)]' : 'bg-blue-400 scale-125 shadow-[0_0_15px_rgba(96,165,250,0.8)]') : 
                isPast ? 'bg-blue-900/50 scale-100 border border-blue-500/30' : 
                'bg-stone-800 scale-100 border border-stone-700'
              }
            `}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-80 bg-stone-900 rounded-xl p-8 border border-stone-800 flex items-center justify-center overflow-hidden relative my-8">
      
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-stone-300 font-bold text-sm tracking-widest uppercase">Deep Learning</h3>
        <p className="text-stone-500 text-xs">Propagação Direta (Forward Pass)</p>
      </div>

      <div className="relative w-full max-w-xl h-full flex items-center justify-between px-4 md:px-12">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <g className={`transition-opacity duration-500 ${activeLayer === 0 ? 'opacity-100' : 'opacity-20'}`}>
            <line x1="10%" y1="30%" x2="30%" y2="20%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" className={activeLayer === 0 ? 'animate-pulse' : ''} />
            <line x1="10%" y1="50%" x2="30%" y2="50%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" className={activeLayer === 0 ? 'animate-pulse' : ''} />
            <line x1="10%" y1="70%" x2="30%" y2="80%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" className={activeLayer === 0 ? 'animate-pulse' : ''} />
          </g>
          <g className={`transition-opacity duration-500 ${activeLayer === 1 ? 'opacity-100' : 'opacity-20'}`}>
             {/* Just decorative links for visual appeal */}
            <line x1="30%" y1="20%" x2="50%" y2="35%" stroke="#60a5fa" strokeWidth="1.5" className={activeLayer === 1 ? 'animate-pulse' : ''} />
            <line x1="30%" y1="50%" x2="50%" y2="50%" stroke="#60a5fa" strokeWidth="1.5" className={activeLayer === 1 ? 'animate-pulse' : ''} />
            <line x1="30%" y1="80%" x2="50%" y2="65%" stroke="#60a5fa" strokeWidth="1.5" className={activeLayer === 1 ? 'animate-pulse' : ''} />
          </g>
          <g className={`transition-opacity duration-500 ${activeLayer === 2 ? 'opacity-100' : 'opacity-20'}`}>
            <line x1="50%" y1="35%" x2="70%" y2="20%" stroke="#60a5fa" strokeWidth="1.5" className={activeLayer === 2 ? 'animate-pulse' : ''} />
            <line x1="50%" y1="65%" x2="70%" y2="80%" stroke="#60a5fa" strokeWidth="1.5" className={activeLayer === 2 ? 'animate-pulse' : ''} />
          </g>
          <g className={`transition-opacity duration-500 ${activeLayer === 3 ? 'opacity-100' : 'opacity-20'}`}>
            <line x1="70%" y1="20%" x2="90%" y2="50%" stroke="#f59e0b" strokeWidth="2" className={activeLayer === 3 ? 'animate-pulse' : ''} />
            <line x1="70%" y1="50%" x2="90%" y2="50%" stroke="#f59e0b" strokeWidth="2" className={activeLayer === 3 ? 'animate-pulse' : ''} />
            <line x1="70%" y1="80%" x2="90%" y2="50%" stroke="#f59e0b" strokeWidth="2" className={activeLayer === 3 ? 'animate-pulse' : ''} />
          </g>
        </svg>

        {/* Input Layer */}
        {renderLayer(3, 0)}
        {/* Hidden Layer 1 */}
        {renderLayer(5, 1)}
        {/* Hidden Layer 2 */}
        {renderLayer(4, 2)}
        {/* Hidden Layer 3 */}
        {renderLayer(5, 3)}
        {/* Output Layer */}
        {renderLayer(1, 4, true)}

      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 flex gap-6 text-[10px] uppercase font-bold text-stone-500">
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-stone-700"></div> Entrada</span>
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Camadas Ocultas</span>
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Saída (Predição)</span>
      </div>
    </div>
  );
}
