import React from 'react';
import { Network, Server, Smartphone, Globe, Shield, Database, LayoutTemplate, Cable, Wrench } from 'lucide-react';
import { mcpLessons } from '../data/modules/mcp';
import MCPArchitecture from '../components/animations/MCPArchitecture';

export default function MCP() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Network className="w-10 h-10 text-blue-300" />
          <h1 className="text-3xl font-bold">Model Context Protocol (MCP)</h1>
        </div>
        <p className="text-xl text-blue-100 max-w-3xl">
          Um protocolo de código aberto que padroniza como as aplicações de IA se conectam a fontes de dados.
        </p>
      </div>

      <MCPArchitecture />

      {/* The Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 text-red-600 dark:text-red-400">
            O Problema Antigo
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-4">
            Anteriormente, cada nova fonte de dados exigia integrações personalizadas. Se você quisesse conectar o Claude ao seu banco de dados local, GitHub e Slack, você precisaria de três integrações completamente diferentes.
          </p>
          <ul className="space-y-2 text-stone-600 dark:text-stone-400 text-sm list-disc pl-5">
            <li>Código fragmentado</li>
            <li>Difícil manutenção</li>
            <li>Problemas de segurança isolados</li>
            <li>Falta de padronização</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 text-emerald-600 dark:text-emerald-400">
            A Solução MCP
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-4">
            O MCP fornece uma arquitetura cliente-servidor universal. O aplicativo de IA (Host) fala com o MCP Client, que se comunica com qualquer MCP Server usando o mesmo protocolo padrão.
          </p>
          <ul className="space-y-2 text-stone-600 dark:text-stone-400 text-sm list-disc pl-5">
            <li>Plug and play</li>
            <li>Comunicação padronizada</li>
            <li>Isolamento de segurança</li>
            <li>Reutilização de servidores</li>
          </ul>
        </section>
      </div>

      {/* Architecture */}
      <section className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-stone-200 dark:border-neutral-700 overflow-x-auto">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-8 text-center">
          Arquitetura MCP
        </h2>
        <div className="flex items-center justify-center min-w-[800px] gap-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-stone-100 dark:bg-neutral-900 rounded-full flex items-center justify-center border border-stone-300 dark:border-neutral-600 mb-2">
              <Smartphone className="w-8 h-8 text-stone-600 dark:text-stone-400" />
            </div>
            <span className="font-bold text-stone-900 dark:text-stone-100">App Host</span>
            <span className="text-xs text-stone-500">(ex: Claude Desktop)</span>
          </div>

          <Cable className="w-8 h-8 text-stone-300 dark:text-neutral-600" />

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-300 dark:border-blue-700 mb-2">
              <Network className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-bold text-blue-900 dark:text-blue-100">MCP Client</span>
            <span className="text-xs text-blue-500">Mantém conexão</span>
          </div>

          <div className="flex flex-col justify-center gap-2">
            <span className="text-xs bg-stone-100 dark:bg-neutral-800 px-2 py-1 rounded text-stone-500 border border-stone-200 dark:border-neutral-700">JSON-RPC</span>
            <Cable className="w-16 h-8 text-amber-500" />
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center border border-emerald-300 dark:border-emerald-700 mb-2">
              <Server className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="font-bold text-emerald-900 dark:text-emerald-100">MCP Server</span>
            <span className="text-xs text-emerald-500">Fornece acesso</span>
          </div>

          <Cable className="w-8 h-8 text-stone-300 dark:text-neutral-600" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 bg-stone-50 dark:bg-neutral-900 p-2 rounded border border-stone-200 dark:border-neutral-700">
              <Database className="w-5 h-5 text-stone-500" /> <span className="text-sm font-medium text-stone-700 dark:text-stone-300">DB Local</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-50 dark:bg-neutral-900 p-2 rounded border border-stone-200 dark:border-neutral-700">
              <Globe className="w-5 h-5 text-stone-500" /> <span className="text-sm font-medium text-stone-700 dark:text-stone-300">API Externa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Components */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm">
          <Database className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">Resources (Recursos)</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Dados que o servidor quer expor ao cliente. Pense neles como arquivos ou dados que podem ser lidos (ex: logs, arquivos locais, tabelas de DB).
          </p>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm">
          <Wrench className="w-8 h-8 text-amber-500 mb-4" />
          <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">Tools (Ferramentas)</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Funções executáveis que o servidor permite que o modelo chame (ex: fazer uma query, enviar um email, rodar um script).
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm">
          <LayoutTemplate className="w-8 h-8 text-emerald-500 mb-4" />
          <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">Prompts</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Templates de prompt reutilizáveis fornecidos pelo servidor que podem usar o contexto interno do servidor.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Lições do Módulo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mcpLessons?.map((lesson, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-stone-200 dark:border-neutral-700">
              <div className="text-sm text-blue-600 dark:text-blue-400 font-bold mb-2">Lição {idx + 1}</div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{lesson.title}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">{lesson.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

