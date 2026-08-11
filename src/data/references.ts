import { Reference } from '../types';

export const allReferences: Reference[] = [
  {
    id: 'anthropic-docs',
    title: 'Anthropic Documentation',
    url: 'https://docs.anthropic.com',
    description: 'Documentação oficial da Anthropic para a API, Claude e ferramentas.',
    category: 'Oficial',
    type: 'documentation'
  },
  {
    id: 'api-reference',
    title: 'Anthropic API Reference',
    url: 'https://docs.anthropic.com/en/api/getting-started',
    description: 'Referência completa da API da Anthropic, incluindo Messages e streaming.',
    category: 'Desenvolvimento',
    type: 'documentation'
  },
  {
    id: 'claude-overview',
    title: 'Claude Overview',
    url: 'https://www.anthropic.com/claude',
    description: 'Visão geral da família de modelos Claude e suas capacidades.',
    category: 'Modelos',
    type: 'official'
  },
  {
    id: 'prompt-engineering-guide',
    title: 'Prompt Engineering Guide',
    url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
    description: 'Guia oficial de engenharia de prompt da Anthropic (técnicas otimizadas para Claude).',
    category: 'Prompting',
    type: 'documentation'
  },
  {
    id: 'mcp-site',
    title: 'Model Context Protocol (MCP)',
    url: 'https://modelcontextprotocol.io',
    description: 'Página oficial do Model Context Protocol. Padrão aberto de conexão a dados.',
    category: 'Integração',
    type: 'official'
  },
  {
    id: 'anthropic-research',
    title: 'Anthropic Research Papers',
    url: 'https://www.anthropic.com/research',
    description: 'Publicações acadêmicas e de pesquisa da Anthropic.',
    category: 'Pesquisa',
    type: 'article'
  },
  {
    id: 'anthropic-safety',
    title: 'Anthropic Safety',
    url: 'https://www.anthropic.com/safety',
    description: 'Diretrizes, políticas de segurança e a abordagem da Anthropic sobre IA Responsável.',
    category: 'Segurança',
    type: 'official'
  },
  {
    id: 'claude-code-docs',
    title: 'Claude Code Documentation',
    url: 'https://docs.anthropic.com/en/docs/claude-code',
    description: 'Documentação oficial sobre a ferramenta CLI Claude Code para desenvolvedores.',
    category: 'Desenvolvimento',
    type: 'documentation'
  },
  {
    id: 'anthropic-cookbook',
    title: 'Anthropic Cookbook',
    url: 'https://github.com/anthropics/anthropic-cookbook',
    description: 'Repositório de receitas e exemplos de código para uso da API da Anthropic.',
    category: 'Desenvolvimento',
    type: 'github'
  },
  {
    id: 'constitutional-ai-paper',
    title: 'Constitutional AI Paper',
    url: 'https://arxiv.org/abs/2212.08073',
    description: 'Artigo fundamental sobre IA Constitucional: Harmlessness from AI Feedback.',
    category: 'Pesquisa',
    type: 'article'
  }
];
