import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-stone-200 bg-[#1A1B26] dark:border-neutral-700 shadow-sm">
      <div className="flex items-center justify-between border-b border-stone-700/50 bg-[#1A1B26] px-4 py-2">
        <div className="flex items-center gap-2">
          {title && <span className="text-xs font-medium text-stone-300">{title}</span>}
          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-stone-400">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md p-1.5 text-xs font-medium text-stone-400 hover:bg-white/10 hover:text-stone-200 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed text-stone-300 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
