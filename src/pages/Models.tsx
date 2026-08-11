import React, { useState } from 'react';
import { Bot, Zap, Brain, Minimize2, ChevronDown, ChevronUp, AlertCircle, Info } from 'lucide-react';
import { modelsData } from '../data/modules/models';
import { AIModel } from '../types';
import FineTuningVsRAG from '../components/animations/FineTuningVsRAG';

export default function Models() {
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [filterSpeed, setFilterSpeed] = useState<string>('all');
  const [filterCapability, setFilterCapability] = useState<string>('all');

  const filteredModels = modelsData.filter(model => {
    if (filterSpeed !== 'all' && model.speed !== filterSpeed) return false;
    if (filterCapability !== 'all' && model.capability !== filterCapability) return false;
    return true;
  });

  const getSpeedIcon = (speed: string) => {
    switch (speed) {
      case 'fast': return <Zap className="w-4 h-4 text-emerald-500" />;
      case 'medium': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'slow': return <Zap className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getCapabilityLabel = (cap: string) => {
    switch (cap) {
      case 'high': return 'Alta';
      case 'very-high': return 'Muito Alta';
      case 'highest': return 'Altíssima';
      default: return cap;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
            <Bot className="w-8 h-8 text-amber-600" />
            Modelos de IA
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2">
            Explore e compare os diferentes modelos da Anthropic
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-lg border border-amber-200 dark:border-amber-800/30">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Conteúdo sujeito a atualização</span>
        </div>
      </div>

      <FineTuningVsRAG />

      <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-stone-200 dark:border-neutral-700 mb-8 flex flex-wrap gap-4 items-center">
        <span className="text-sm font-medium text-stone-700 dark:text-stone-300 flex items-center gap-2">
          <Info className="w-4 h-4" /> Filtros:
        </span>
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-stone-500 dark:text-stone-400">Velocidade:</label>
          <select 
            className="bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-500 text-stone-700 dark:text-stone-300"
            value={filterSpeed}
            onChange={(e) => setFilterSpeed(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="fast">Rápida</option>
            <option value="medium">Média</option>
            <option value="slow">Lenta</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-stone-500 dark:text-stone-400">Capacidade:</label>
          <select 
            className="bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-500 text-stone-700 dark:text-stone-300"
            value={filterCapability}
            onChange={(e) => setFilterCapability(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="high">Alta</option>
            <option value="very-high">Muito Alta</option>
            <option value="highest">Altíssima</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredModels.map((model) => (
          <div 
            key={model.id}
            className="bg-white dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setExpandedModel(expandedModel === model.id ? null : model.id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">{model.name}</h3>
                <span className="bg-stone-100 dark:bg-neutral-700 text-stone-600 dark:text-stone-300 text-xs font-semibold px-2 py-1 rounded">
                  {model.family}
                </span>
              </div>
              
              <p className="text-stone-600 dark:text-stone-400 text-sm mb-6 h-10">
                {model.purpose}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500 dark:text-stone-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Velocidade
                  </span>
                  <div className="flex items-center gap-1 font-medium text-stone-700 dark:text-stone-300">
                    {getSpeedIcon(model.speed)}
                    <span className="capitalize">{model.speed === 'fast' ? 'Rápida' : model.speed === 'medium' ? 'Média' : 'Lenta'}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500 dark:text-stone-400 flex items-center gap-2">
                    <Brain className="w-4 h-4" /> Capacidade
                  </span>
                  <span className="font-medium text-stone-700 dark:text-stone-300">
                    {getCapabilityLabel(model.capability)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500 dark:text-stone-400 flex items-center gap-2">
                    <Minimize2 className="w-4 h-4" /> Contexto
                  </span>
                  <span className="font-medium text-stone-700 dark:text-stone-300">
                    {model.contextWindow}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center text-amber-600 dark:text-amber-500 text-sm font-medium">
                {expandedModel === model.id ? (
                  <><ChevronUp className="w-4 h-4 mr-1" /> Ocultar Detalhes</>
                ) : (
                  <><ChevronDown className="w-4 h-4 mr-1" /> Ver Detalhes</>
                )}
              </div>
            </div>

            {expandedModel === model.id && (
              <div className="px-6 pb-6 pt-0 border-t border-stone-100 dark:border-neutral-700 mt-2 bg-stone-50/50 dark:bg-neutral-800/50">
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">Casos de Uso Ideais</h4>
                    <ul className="list-disc list-inside text-sm text-stone-600 dark:text-stone-400 space-y-1">
                      {model.useCases.map((useCase, idx) => (
                        <li key={idx}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">Características</h4>
                    <div className="flex flex-wrap gap-2">
                      {model.characteristics.map((char, idx) => (
                        <span key={idx} className="bg-stone-200 dark:bg-neutral-700 text-stone-700 dark:text-stone-300 text-xs px-2 py-1 rounded-md">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {model.limitations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-500" /> Limitações
                      </h4>
                      <ul className="list-disc list-inside text-sm text-stone-600 dark:text-stone-400 space-y-1">
                        {model.limitations.map((lim, idx) => (
                          <li key={idx}>{lim}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="text-xs text-stone-400 dark:text-stone-500 pt-2 text-right">
                    Atualizado em: {model.updatedAt}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700 overflow-hidden">
        <div className="p-6 border-b border-stone-200 dark:border-neutral-700">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Comparativo Rápido</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 dark:bg-neutral-900 text-stone-500 dark:text-stone-400">
              <tr>
                <th className="px-6 py-3 font-medium">Modelo</th>
                <th className="px-6 py-3 font-medium">Velocidade</th>
                <th className="px-6 py-3 font-medium">Capacidade</th>
                <th className="px-6 py-3 font-medium">Contexto</th>
                <th className="px-6 py-3 font-medium">Uso Recomendado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-neutral-700">
              {modelsData.map((model) => (
                <tr key={model.id} className="hover:bg-stone-50 dark:hover:bg-neutral-800/50">
                  <td className="px-6 py-4 font-medium text-stone-900 dark:text-stone-100">{model.name}</td>
                  <td className="px-6 py-4 text-stone-600 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      {getSpeedIcon(model.speed)}
                      <span className="capitalize">{model.speed === 'fast' ? 'Rápida' : model.speed === 'medium' ? 'Média' : 'Lenta'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600 dark:text-stone-400">{getCapabilityLabel(model.capability)}</td>
                  <td className="px-6 py-4 text-stone-600 dark:text-stone-400">{model.contextWindow}</td>
                  <td className="px-6 py-4 text-stone-600 dark:text-stone-400 truncate max-w-xs" title={model.purpose}>{model.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

