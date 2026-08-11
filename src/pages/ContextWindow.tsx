import React, { useState, useEffect } from 'react';
import { Layers, FileText, History, MessageSquare, Database, AlertCircle, PlayCircle, CheckCircle2 } from 'lucide-react';
import { contextWindowLessons } from '../data/modules/context-window';
import { estimateTokens } from '../services/scoring';
import { useProgress } from '../contexts/ProgressContext';
import ProgressBar from '../components/ui/ProgressBar';
import AttentionMechanism from '../components/animations/AttentionMechanism';

export default function ContextWindow() {
  const [inputText, setInputText] = useState('');
  const [stats, setStats] = useState({ chars: 0, words: 0, tokens: 0 });
  const MAX_TOKENS = 200000;

  useEffect(() => {
    const chars = inputText.length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const tokens = estimateTokens(inputText);
    setStats({ chars, words, tokens });
  }, [inputText]);

  const tokenPercentage = Math.min(100, (stats.tokens / MAX_TOKENS) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
          <Layers className="w-8 h-8 text-amber-600" />
          Janela de Contexto
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">
          Entenda como a memória e o processamento de contexto funcionam nos modelos de IA.
        </p>
      </div>

      {/* Visual Diagram */}
      <AttentionMechanism />
      
      <section className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <Database className="w-6 h-6 text-emerald-500" /> O que compõe a Janela de Contexto?
        </h2>
        
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
          <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/30 text-center flex flex-col items-center justify-center gap-2">
            <MessageSquare className="w-8 h-8 text-blue-500" />
            <h3 className="font-bold text-blue-700 dark:text-blue-400">Prompt</h3>
            <p className="text-sm text-blue-600 dark:text-blue-300">Instruções atuais</p>
          </div>
          <div className="hidden md:flex items-center text-stone-300 dark:text-neutral-600 font-bold text-2xl">+</div>
          <div className="flex-1 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800/30 text-center flex flex-col items-center justify-center gap-2">
            <Layers className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-amber-700 dark:text-amber-400">Contexto</h3>
            <p className="text-sm text-amber-600 dark:text-amber-300">Regras de sistema</p>
          </div>
          <div className="hidden md:flex items-center text-stone-300 dark:text-neutral-600 font-bold text-2xl">+</div>
          <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800/30 text-center flex flex-col items-center justify-center gap-2">
            <FileText className="w-8 h-8 text-emerald-500" />
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400">Documentos</h3>
            <p className="text-sm text-emerald-600 dark:text-emerald-300">Arquivos anexados</p>
          </div>
          <div className="hidden md:flex items-center text-stone-300 dark:text-neutral-600 font-bold text-2xl">+</div>
          <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800/30 text-center flex flex-col items-center justify-center gap-2">
            <History className="w-8 h-8 text-purple-500" />
            <h3 className="font-bold text-purple-700 dark:text-purple-400">Histórico</h3>
            <p className="text-sm text-purple-600 dark:text-purple-300">Conversas passadas</p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col items-center">
          <div className="text-stone-300 dark:text-neutral-600 font-bold text-2xl mb-4">=</div>
          <div className="w-full bg-stone-100 dark:bg-neutral-900 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 text-center">
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest">Janela de Contexto Total</h3>
            <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">Todo o conhecimento que a IA pode acessar simultaneamente para gerar uma resposta.</p>
          </div>
        </div>
      </section>

      {/* Token Simulator */}
      <section className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Database className="w-6 h-6 text-amber-500" /> Simulador de Tokens
          </h2>
          <span className="text-xs bg-stone-100 dark:bg-neutral-700 text-stone-500 dark:text-stone-400 px-3 py-1 rounded-full font-medium">
            Estimativa aproximada
          </span>
        </div>

        <textarea 
          className="w-full h-40 bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-700 rounded-lg p-4 text-stone-700 dark:text-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-y"
          placeholder="Digite ou cole um texto aqui para ver como ele é convertido em tokens..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-stone-50 dark:bg-neutral-900 p-4 rounded-lg border border-stone-200 dark:border-neutral-700 text-center">
            <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{stats.chars}</div>
            <div className="text-sm text-stone-500 dark:text-stone-400">Caracteres</div>
          </div>
          <div className="bg-stone-50 dark:bg-neutral-900 p-4 rounded-lg border border-stone-200 dark:border-neutral-700 text-center">
            <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{stats.words}</div>
            <div className="text-sm text-stone-500 dark:text-stone-400">Palavras</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800/30 text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.tokens}</div>
            <div className="text-sm text-amber-700 dark:text-amber-500 font-medium">Tokens Estimados</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-stone-500 dark:text-stone-400 font-medium">Uso da Janela de Contexto (ex: Claude 3.5 Sonnet - 200k)</span>
            <span className="text-stone-900 dark:text-stone-100 font-bold">{stats.tokens} / 200.000</span>
          </div>
          <div className="w-full bg-stone-200 dark:bg-neutral-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${tokenPercentage > 90 ? 'bg-red-500' : tokenPercentage > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.max(tokenPercentage, 1)}%` }}
            ></div>
          </div>
          {tokenPercentage > 0 && tokenPercentage < 1 && (
             <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 text-right">Menos de 1% utilizado</p>
          )}
        </div>
      </section>

      {/* Lessons */}
      <section>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-amber-600" /> Lições do Módulo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contextWindowLessons?.map((lesson, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 hover:border-amber-300 dark:hover:border-amber-700 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center font-bold mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                {idx + 1}
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{lesson.title}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 line-clamp-2">{lesson.description}</p>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-stone-400 dark:text-stone-500">{lesson.estimatedMinutes} min</span>
                <span className="text-amber-600 dark:text-amber-500 flex items-center gap-1">
                  Iniciar <CheckCircle2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

