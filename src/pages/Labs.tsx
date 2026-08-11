import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Beaker, Shield, GraduationCap, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { analyzePrompt, analyzeTeachingResponse } from '../services/scoring';
import { teachingQuestions } from '../data/modules/instructor';

export default function Labs() {
  const [activeTab, setActiveTab] = useState('prompt');
  
  // Prompt Lab State
  const [promptInput, setPromptInput] = useState('');
  const [objectiveInput, setObjectiveInput] = useState('');
  const [promptResult, setPromptResult] = useState<any>(null);

  // Teaching Lab State
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [teachingResponse, setTeachingResponse] = useState('');
  const [teachingResult, setTeachingResult] = useState<any>(null);

  const handleAnalyzePrompt = async () => {
    if (!promptInput || !objectiveInput) return;
    const result = analyzePrompt(promptInput, objectiveInput);
    setPromptResult(result);
  };

  const handleAnalyzeTeaching = async () => {
    if (!teachingResponse) return;
    const result = analyzeTeachingResponse(teachingQuestions[activeQuestion].question, teachingResponse);
    setTeachingResult(result);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
          <Beaker className="w-8 h-8 text-amber-600" />
          Laboratórios Práticos
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-2">
          Coloque seus conhecimentos em prática com simulações interativas.
        </p>
      </div>

      <div className="flex border-b border-stone-200 dark:border-neutral-700 mb-8">
        <button 
          className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'prompt' ? 'border-amber-500 text-amber-600 dark:text-amber-500' : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'}`}
          onClick={() => setActiveTab('prompt')}
        >
          <Send className="w-4 h-4" /> Prompt Lab
        </button>
        <button 
          className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'security' ? 'border-rose-500 text-rose-600 dark:text-rose-500' : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'}`}
          onClick={() => setActiveTab('security')}
        >
          <Shield className="w-4 h-4" /> Security Lab
        </button>
        <button 
          className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'teaching' ? 'border-blue-500 text-blue-600 dark:text-blue-500' : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'}`}
          onClick={() => setActiveTab('teaching')}
        >
          <GraduationCap className="w-4 h-4" /> Teaching Lab
        </button>
      </div>

      {activeTab === 'prompt' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Objetivo do Prompt</label>
                <input 
                  type="text"
                  className="w-full bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-lg p-3 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Ex: Extrair nomes e emails de um texto"
                  value={objectiveInput}
                  onChange={(e) => setObjectiveInput(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Seu Prompt</label>
                <textarea 
                  className="w-full h-64 bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-lg p-3 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                  placeholder="Escreva seu prompt aqui..."
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                />
              </div>
              <button 
                onClick={handleAnalyzePrompt}
                disabled={!promptInput || !objectiveInput}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
              >
                Analisar Prompt
              </button>
            </div>
            
            <div className="bg-stone-50 dark:bg-neutral-900 rounded-xl border border-stone-200 dark:border-neutral-700 p-6 h-fit">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">Resultados da Análise</h2>
              {promptResult ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg border border-stone-200 dark:border-neutral-700">
                    <span className="font-bold text-stone-700 dark:text-stone-300">Score Geral</span>
                    <span className={`text-2xl font-bold ${promptResult.score >= 80 ? 'text-emerald-500' : promptResult.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                      {promptResult.score}/100
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wider">Critérios</h3>
                    {['clarity', 'context', 'objective', 'constraints', 'examples', 'format', 'ambiguity'].map((crit) => (
                      <div key={crit} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-stone-700 dark:text-stone-300">{crit}</span>
                        <div className="w-1/2 bg-stone-200 dark:bg-neutral-700 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(promptResult.feedback[crit as keyof typeof promptResult.feedback] as number) * 10}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {promptResult.feedback.recommendations.length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800/30">
                      <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Recomendações
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-amber-700 dark:text-amber-300 space-y-1">
                        {promptResult.feedback.recommendations.map((rec: string, idx: number) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-stone-500 dark:text-stone-400 py-12">
                  Preencha o objetivo e o prompt e clique em "Analisar Prompt" para ver os resultados.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Security Lab</h2>
          <p className="text-stone-500 dark:text-stone-400 mb-6">Pratique a identificação e mitigação de vulnerabilidades em prompts.</p>
          <Link to="/seguranca" className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg font-bold transition-colors">
            Ir para Cenários de Segurança
          </Link>
        </div>
      )}

      {activeTab === 'teaching' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/30 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-1 rounded">Aluno Pergunta:</span>
                </div>
                <p className="text-blue-900 dark:text-blue-100 font-medium italic">
                  "{teachingQuestions[activeQuestion]?.question || 'O que é temperatura na API do Claude e como devo configurá-la?'}"
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Sua Resposta como Instrutor</label>
                <textarea 
                  className="w-full h-64 bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-lg p-3 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Escreva sua explicação aqui..."
                  value={teachingResponse}
                  onChange={(e) => setTeachingResponse(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setActiveQuestion((prev) => (prev + 1) % teachingQuestions.length);
                    setTeachingResponse('');
                    setTeachingResult(null);
                  }}
                  className="px-4 py-3 bg-stone-200 hover:bg-stone-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-stone-800 dark:text-stone-200 rounded-lg font-bold transition-colors"
                >
                  Outra Pergunta
                </button>
                <button 
                  onClick={handleAnalyzeTeaching}
                  disabled={!teachingResponse}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
                >
                  Avaliar Resposta
                </button>
              </div>
            </div>
            
            <div className="bg-stone-50 dark:bg-neutral-900 rounded-xl border border-stone-200 dark:border-neutral-700 p-6 h-fit">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">Avaliação Didática</h2>
              {teachingResult ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg border border-stone-200 dark:border-neutral-700">
                    <span className="font-bold text-stone-700 dark:text-stone-300">Instructor Score</span>
                    <span className={`text-2xl font-bold ${teachingResult.score >= 80 ? 'text-blue-500' : 'text-amber-500'}`}>
                      {teachingResult.score}/100
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wider">Critérios</h3>
                    {['clarity', 'technicalAccuracy', 'didactics', 'examples', 'language'].map((crit) => (
                      <div key={crit} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-stone-700 dark:text-stone-300">{crit}</span>
                        <div className="w-1/2 bg-stone-200 dark:bg-neutral-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(teachingResult.feedback[crit as keyof typeof teachingResult.feedback] as number) * 10}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {teachingResult.feedback.recommendations.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/30">
                      <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Dicas Práticas
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        {teachingResult.feedback.recommendations.map((rec: string, idx: number) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-stone-500 dark:text-stone-400 py-12">
                  Escreva sua resposta para o aluno e clique em "Avaliar Resposta" para ver o feedback didático.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

