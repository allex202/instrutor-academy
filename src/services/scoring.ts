import type { PromptFeedback, TeachingFeedback } from '../types';

export function analyzePrompt(prompt: string, objective: string): { score: number; feedback: PromptFeedback } {
  const trimmed = prompt.trim();
  const obj = objective.trim();
  const wordCount = trimmed.split(/\s+/).length;
  const sentenceCount = trimmed.split(/[.!?]+/).filter(Boolean).length;

  // Clarity: based on structure, sentence length, readability
  let clarity = 50;
  if (sentenceCount >= 2) clarity += 10;
  if (wordCount >= 10) clarity += 10;
  if (wordCount >= 20) clarity += 5;
  if (trimmed.includes('\n')) clarity += 5;
  if (/[.!?]$/.test(trimmed)) clarity += 5;
  if (wordCount > 5 && wordCount < 200) clarity += 5;
  if (/^(você|tu|aja|atue|seja|escreva|crie|gere|analise|explique|resuma|traduza|liste|compare)/i.test(trimmed)) clarity += 10;

  // Context: does it provide background?
  let context = 40;
  if (wordCount >= 30) context += 15;
  if (wordCount >= 50) context += 10;
  if (/contexto|background|situação|cenário/i.test(trimmed)) context += 15;
  if (obj.length > 10) context += 10;
  if (trimmed.includes('"') || trimmed.includes("'")) context += 5;
  if (/por exemplo|como|tal como/i.test(trimmed)) context += 5;

  // Objective: clear goal stated
  let objectiveScore = 40;
  if (obj.length > 5) objectiveScore += 20;
  if (/objetivo|meta|quero|preciso|necessito|gostaria/i.test(trimmed)) objectiveScore += 15;
  if (/para que|a fim de|com o propósito/i.test(trimmed)) objectiveScore += 10;
  if (/resultado|output|saída|resposta/i.test(trimmed)) objectiveScore += 10;

  // Constraints: presence of limitations/rules
  let constraints = 30;
  if (/não|nunca|evite|sem|limite|máximo|mínimo|apenas|somente/i.test(trimmed)) constraints += 20;
  if (/regra|restrição|limitação|condição/i.test(trimmed)) constraints += 15;
  if (/\d+/.test(trimmed)) constraints += 10;
  if (/formato|estrutura|padrão/i.test(trimmed)) constraints += 10;

  // Examples: does it provide examples?
  let examples = 30;
  if (/exemplo|ex\.|e\.g\.|por exemplo|como:|assim:/i.test(trimmed)) examples += 25;
  if (trimmed.includes('```') || trimmed.includes('`')) examples += 15;
  if (trimmed.includes('- ') || trimmed.includes('* ')) examples += 10;
  if (/\d\.\s/.test(trimmed)) examples += 10;

  // Format: specifies output format
  let format = 30;
  if (/formato|formato de saída|json|markdown|lista|tabela|bullet|csv|xml/i.test(trimmed)) format += 25;
  if (/responda em|formate como|estruture como|organize como/i.test(trimmed)) format += 15;
  if (/<[^>]+>/.test(trimmed)) format += 15; // XML tags
  if (/```/.test(trimmed)) format += 10;

  // Ambiguity: lower is better (inverted)
  let ambiguity = 80;
  if (wordCount < 5) ambiguity -= 30;
  if (/algo|coisa|qualquer|algum|tipo|meio/i.test(trimmed)) ambiguity -= 15;
  if (!/[.!?]$/.test(trimmed)) ambiguity -= 5;
  if (wordCount < 3) ambiguity -= 20;
  if (sentenceCount < 2 && wordCount < 10) ambiguity -= 10;

  // Clamp all values
  clarity = Math.max(0, Math.min(100, clarity));
  context = Math.max(0, Math.min(100, context));
  objectiveScore = Math.max(0, Math.min(100, objectiveScore));
  constraints = Math.max(0, Math.min(100, constraints));
  examples = Math.max(0, Math.min(100, examples));
  format = Math.max(0, Math.min(100, format));
  ambiguity = Math.max(0, Math.min(100, ambiguity));

  const score = Math.round(
    (clarity * 0.2 + context * 0.15 + objectiveScore * 0.2 + constraints * 0.1 + examples * 0.1 + format * 0.1 + ambiguity * 0.15)
  );

  // Generate recommendations
  const recommendations: string[] = [];
  if (clarity < 60) recommendations.push('Adicione uma instrução clara no início do prompt, como "Escreva...", "Analise...", "Explique...".');
  if (context < 50) recommendations.push('Forneça mais contexto sobre a situação, público-alvo ou cenário de uso.');
  if (objectiveScore < 50) recommendations.push('Defina claramente o objetivo do prompt. O que você espera como resultado?');
  if (constraints < 50) recommendations.push('Adicione restrições ou limites, como tamanho, formato, tom, ou o que evitar.');
  if (examples < 40) recommendations.push('Inclua exemplos do resultado esperado para guiar a resposta (few-shot prompting).');
  if (format < 40) recommendations.push('Especifique o formato de saída desejado (lista, JSON, markdown, tabela, etc.).');
  if (ambiguity < 50) recommendations.push('Reduza a ambiguidade. Seja mais específico e evite termos vagos como "algo", "coisa".');
  if (wordCount < 10) recommendations.push('O prompt é muito curto. Adicione mais detalhes para obter melhores resultados.');
  if (!/<[^>]+>/.test(trimmed)) recommendations.push('Considere usar XML tags para estruturar seções do prompt (ex: <contexto>, <instrução>, <exemplo>).');

  if (recommendations.length === 0) {
    recommendations.push('Excelente! Seu prompt está bem estruturado. Continue praticando!');
  }

  return {
    score,
    feedback: {
      clarity,
      context,
      objective: objectiveScore,
      constraints,
      examples,
      format,
      ambiguity,
      recommendations,
    },
  };
}

export function analyzeTeachingResponse(question: string, answer: string): { score: number; feedback: TeachingFeedback } {
  const trimmed = answer.trim();
  const wordCount = trimmed.split(/\s+/).length;
  const sentenceCount = trimmed.split(/[.!?]+/).filter(Boolean).length;

  // Clarity
  let clarity = 40;
  if (sentenceCount >= 2) clarity += 10;
  if (wordCount >= 20) clarity += 15;
  if (wordCount >= 50) clarity += 10;
  if (trimmed.includes('\n')) clarity += 5;
  if (/primeiro|segundo|terceiro|então|portanto|assim|por isso/i.test(trimmed)) clarity += 10;
  if (/ou seja|isto é|em outras palavras|resumindo/i.test(trimmed)) clarity += 10;

  // Technical accuracy (heuristic based on keyword presence)
  let technicalAccuracy = 50;
  const techTerms = ['token', 'modelo', 'llm', 'api', 'prompt', 'contexto', 'ia', 'inteligência artificial',
    'claude', 'anthropic', 'transformer', 'embedding', 'inferência', 'treinamento', 'fine-tuning',
    'rag', 'agente', 'mcp', 'tool', 'safety', 'segurança'];
  const matches = techTerms.filter(t => trimmed.toLowerCase().includes(t));
  technicalAccuracy += Math.min(30, matches.length * 8);
  if (wordCount >= 30) technicalAccuracy += 10;
  if (/definição|significa|refere-se|conceito|funciona/i.test(trimmed)) technicalAccuracy += 10;

  // Didactics
  let didactics = 40;
  if (/imagine|pense|considere|suponha|vamos pensar/i.test(trimmed)) didactics += 15;
  if (/analogia|comparação|como se fosse|é como/i.test(trimmed)) didactics += 15;
  if (/por exemplo|exemplo|ilustrando/i.test(trimmed)) didactics += 10;
  if (sentenceCount >= 3) didactics += 10;
  if (/importante|fundamental|essencial|lembre/i.test(trimmed)) didactics += 5;
  if (/resumo|resumindo|em síntese/i.test(trimmed)) didactics += 5;

  // Examples
  let examplesScore = 30;
  if (/exemplo|ex\.|por exemplo/i.test(trimmed)) examplesScore += 25;
  if (/como:|assim:|tipo:/i.test(trimmed)) examplesScore += 15;
  if (trimmed.includes('"') || trimmed.includes("'")) examplesScore += 10;
  if (/\d/.test(trimmed)) examplesScore += 5;
  if (trimmed.includes('- ') || trimmed.includes('* ')) examplesScore += 10;

  // Language
  let language = 50;
  if (wordCount >= 15 && wordCount <= 300) language += 15;
  if (!/\b(porra|merda|caralho)\b/i.test(trimmed)) language += 10;
  if (/você|vocês|a gente|nós/i.test(trimmed)) language += 10;
  if (sentenceCount >= 2 && sentenceCount <= 15) language += 10;
  if (/[.!?]$/.test(trimmed)) language += 5;

  // Clamp
  clarity = Math.max(0, Math.min(100, clarity));
  technicalAccuracy = Math.max(0, Math.min(100, technicalAccuracy));
  didactics = Math.max(0, Math.min(100, didactics));
  examplesScore = Math.max(0, Math.min(100, examplesScore));
  language = Math.max(0, Math.min(100, language));

  const score = Math.round(
    clarity * 0.2 + technicalAccuracy * 0.25 + didactics * 0.25 + examplesScore * 0.15 + language * 0.15
  );

  const recommendations: string[] = [];
  if (clarity < 60) recommendations.push('Organize sua explicação com uma estrutura mais clara: definição → explicação → exemplo.');
  if (technicalAccuracy < 60) recommendations.push('Inclua mais termos técnicos corretos e definições precisas.');
  if (didactics < 60) recommendations.push('Use analogias e comparações do dia a dia para facilitar o entendimento.');
  if (examplesScore < 50) recommendations.push('Adicione exemplos concretos e práticos para ilustrar o conceito.');
  if (language < 60) recommendations.push('Adapte a linguagem para ser mais acessível ao público iniciante.');
  if (wordCount < 15) recommendations.push('Sua explicação está muito curta. Desenvolva mais o conceito.');

  if (recommendations.length === 0) {
    recommendations.push('Ótima explicação! Você demonstrou clareza, precisão e boa didática.');
  }

  return {
    score,
    feedback: {
      clarity,
      technicalAccuracy,
      didactics,
      examples: examplesScore,
      language,
      recommendations,
    },
  };
}

export function estimateTokens(text: string): number {
  // Simple heuristic: ~4 characters per token for Portuguese/English mix
  // This is an approximation; real tokenization is model-specific
  const charCount = text.length;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  // Use average of character-based and word-based estimates
  const charEstimate = Math.ceil(charCount / 4);
  const wordEstimate = Math.ceil(wordCount * 1.3);
  return Math.round((charEstimate + wordEstimate) / 2);
}
