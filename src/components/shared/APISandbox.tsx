import React, { useState, useEffect } from 'react';
import { Terminal, Play, Loader2, Code2, Server } from 'lucide-react';

const scenarios = [
  {
    id: 'streaming',
    name: 'Messages API (Streaming)',
    request: `curl https://api.anthropic.com/v1/messages \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "stream": true,
    "messages": [{"role": "user", "content": "Olá!"}]
  }'`,
    responseChunks: [
      `event: message_start\ndata: {"type":"message_start","message":{"id":"msg_123","type":"message","role":"assistant","content":[],"model":"claude-3-5-sonnet-20241022","stop_reason":null,"stop_sequence":null,"usage":{"input_tokens":12,"output_tokens":1}}}\n\n`,
      `event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}\n\n`,
      `event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Ol"}}\n\n`,
      `event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"á! "}}\n\n`,
      `event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Como posso "}}\n\n`,
      `event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"ajudar "}}\n\n`,
      `event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"hoje?"}}\n\n`,
      `event: content_block_stop\ndata: {"type":"content_block_stop","index":0}\n\n`,
      `event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn","stop_sequence":null},"usage":{"output_tokens":15}}\n\n`,
      `event: message_stop\ndata: {"type":"message_stop"}\n\n`
    ],
    delay: 300
  },
  {
    id: 'tool_use',
    name: 'Tool Use (Function Calling)',
    request: `curl https://api.anthropic.com/v1/messages \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "tools": [{
      "name": "get_weather",
      "description": "Retorna o clima atual",
      "input_schema": {
        "type": "object",
        "properties": { "location": { "type": "string" } }
      }
    }],
    "messages": [{"role": "user", "content": "Clima em SP?"}]
  }'`,
    responseChunks: [
      `{\n  "id": "msg_01",\n  "type": "message",\n  "role": "assistant",\n  "content": [\n    {\n      "type": "tool_use",\n      "id": "toolu_01",\n      "name": "get_weather",\n      "input": {\n        "location": "SP"\n      }\n    }\n  ],\n  "model": "claude-3-5-sonnet-20241022",\n  "stop_reason": "tool_use",\n  "stop_sequence": null,\n  "usage": {\n    "input_tokens": 85,\n    "output_tokens": 30\n  }\n}`
    ],
    delay: 1500
  }
];

export default function APISandbox() {
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0].id);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0); // index of chunks

  const activeScenario = scenarios.find(s => s.id === activeScenarioId)!;

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput('');
    setProgress(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (progress < activeScenario.responseChunks.length) {
      const timer = setTimeout(() => {
        setOutput(prev => prev + activeScenario.responseChunks[progress]);
        setProgress(p => p + 1);
      }, activeScenario.delay);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, progress, activeScenario]);

  return (
    <div className="bg-stone-950 rounded-xl border border-stone-800 shadow-2xl overflow-hidden my-8 font-mono text-sm">
      {/* Sandbox Header */}
      <div className="flex items-center justify-between bg-stone-900 border-b border-stone-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-stone-200">API Sandbox (Emulador)</span>
        </div>
        <div className="flex gap-2">
          {scenarios.map(scen => (
            <button
              key={scen.id}
              onClick={() => !isRunning && setActiveScenarioId(scen.id)}
              disabled={isRunning}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                activeScenarioId === scen.id 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                  : 'bg-stone-800 text-stone-400 border border-stone-700 hover:text-stone-300'
              } ${isRunning && 'opacity-50 cursor-not-allowed'}`}
            >
              {scen.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Request Side */}
        <div className="w-full md:w-1/2 p-4 border-r border-stone-800 bg-stone-950">
          <div className="flex items-center justify-between mb-4">
            <span className="text-stone-500 font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
              <Code2 className="w-4 h-4" /> Request
            </span>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg font-bold text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              Send
            </button>
          </div>
          <pre className="text-emerald-400 overflow-x-auto p-4 bg-black rounded-lg border border-stone-800 h-64 whitespace-pre-wrap text-xs">
            {activeScenario.request}
          </pre>
        </div>

        {/* Response Side */}
        <div className="w-full md:w-1/2 p-4 bg-stone-950">
           <div className="flex items-center gap-2 mb-4">
            <span className="text-stone-500 font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
              <Server className="w-4 h-4" /> Response (Simulado)
            </span>
            {isRunning && <span className="flex w-2 h-2 rounded-full bg-amber-500 animate-ping ml-auto"></span>}
          </div>
          <div className="overflow-x-auto p-4 bg-black rounded-lg border border-stone-800 h-64">
            <pre className="text-stone-300 whitespace-pre-wrap text-xs">
              {output}
              {isRunning && <span className="inline-block w-2 h-4 bg-stone-500 animate-pulse ml-1 align-middle"></span>}
            </pre>
            {!isRunning && output === '' && (
              <div className="h-full flex items-center justify-center text-stone-600 italic">
                Aguardando requisição...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
