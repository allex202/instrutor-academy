// ==========================================
// ANTHROPIC INSTRUCTOR LEARNING HUB — TYPES
// ==========================================

// --- Module & Content Types ---

export type ModuleId =
  | 'ai-fundamentals'
  | 'anthropic'
  | 'claude'
  | 'prompt-engineering'
  | 'claude-code'
  | 'api-development'
  | 'models'
  | 'context-window'
  | 'tool-use'
  | 'mcp'
  | 'responsible-ai'
  | 'agentic-ai'
  | 'instructor'
  | 'competitors'
  | 'openai'
  | 'gemini';

export interface Module {
  id: ModuleId;
  title: string;
  description: string;
  icon: string;
  phase: number;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: ModuleId;
  title: string;
  description: string;
  content: LessonContent;
  order: number;
  estimatedMinutes: number;
}

export interface LessonContent {
  sections: ContentSection[];
}

export interface ContentSection {
  id: string;
  type: 'text' | 'concept' | 'comparison' | 'code' | 'diagram' | 'callout' | 'list' | 'animation';
  title?: string;
  content?: string;
  componentId?: string;
  subsections?: ContentSubsection[];
  codeLanguage?: 'python' | 'javascript' | 'typescript' | 'curl' | 'bash' | 'json' | 'xml';
  calloutType?: 'info' | 'tip' | 'warning' | 'instructor';
  items?: string[];
}

export interface ContentSubsection {
  title: string;
  content: string;
}

export interface Concept {
  id: string;
  term: string;
  simpleDefinition: string;
  technicalExplanation: string;
  example: string;
  appliedExample: string;
  instructorNote: string;
  category: string;
  relatedTerms: string[];
}

// --- Quiz Types ---

export type QuestionType = 'multiple-choice' | 'true-false' | 'association' | 'scenario';

export interface Question {
  id: string;
  moduleId: ModuleId;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: QuestionOption[];
  correctAnswer: string | string[];
  explanation: string;
  category: string;
  tags: string[];
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuizResult {
  quizId: string;
  moduleId: ModuleId;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  timestamp: number;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string | string[];
  isCorrect: boolean;
  timeSpent: number;
}

// --- Flashcard Types ---

export interface Flashcard {
  id: string;
  moduleId: ModuleId;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FlashcardProgress {
  flashcardId: string;
  mastered: boolean;
  reviewCount: number;
  lastReviewed: number;
  nextReview: number;
}

// --- Glossary Types ---

export interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms: string[];
  isFavorite?: boolean;
}

// --- Notes Types ---

export interface Note {
  id: string;
  title: string;
  content: string;
  moduleId?: ModuleId;
  isFavorite: boolean;
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

// --- Progress Types ---

export interface UserProgress {
  completedLessons: string[];
  completedModules: ModuleId[];
  quizResults: QuizResult[];
  flashcardProgress: FlashcardProgress[];
  notes: Note[];
  glossaryFavorites: string[];
  achievements: string[];
  xp: number;
  level: number;
  studyStreak: number;
  lastStudyDate: string;
  totalStudyMinutes: number;
  simuladoResults: SimuladoResult[];
  checklist: Record<string, boolean>;
  promptLabHistory: PromptLabEntry[];
  teachingLabHistory: TeachingLabEntry[];
}

export interface SimuladoResult {
  id: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  timestamp: number;
  categoryScores: Record<string, { correct: number; total: number }>;
  answers: QuizAnswer[];
}

export interface PromptLabEntry {
  id: string;
  prompt: string;
  objective: string;
  score: number;
  feedback: PromptFeedback;
  timestamp: number;
}

export interface PromptFeedback {
  clarity: number;
  context: number;
  objective: number;
  constraints: number;
  examples: number;
  format: number;
  ambiguity: number;
  recommendations: string[];
}

export interface TeachingLabEntry {
  id: string;
  question: string;
  answer: string;
  score: number;
  feedback: TeachingFeedback;
  timestamp: number;
}

export interface TeachingFeedback {
  clarity: number;
  technicalAccuracy: number;
  didactics: number;
  examples: number;
  language: number;
  recommendations: string[];
}

// --- Achievement Types ---

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: AchievementCondition;
}

export interface AchievementCondition {
  type: 'lessons_completed' | 'quizzes_completed' | 'streak' | 'score' | 'module_completed' | 'simulado' | 'xp' | 'flashcards' | 'custom';
  target: number;
  moduleId?: ModuleId;
}

// --- Reference Types ---

export interface Reference {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  type: 'documentation' | 'article' | 'video' | 'github' | 'course' | 'official';
}

// --- Search Types ---

export interface SearchResult {
  type: 'module' | 'lesson' | 'concept' | 'glossary' | 'flashcard' | 'reference';
  title: string;
  description: string;
  path: string;
  moduleId?: ModuleId;
}

// --- Navigation Types ---

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  section?: 'main' | 'study' | 'practice' | 'tools';
}

// --- Model Types ---

export interface AIModel {
  id: string;
  name: string;
  family: string;
  purpose: string;
  characteristics: string[];
  contextWindow: string;
  capabilities: string[];
  useCases: string[];
  limitations: string[];
  speed: 'fast' | 'medium' | 'slow';
  capability: 'high' | 'very-high' | 'highest';
  updatedAt: string;
}

// --- Phase/Journey Types ---

export interface Phase {
  number: number;
  title: string;
  description: string;
  moduleIds: ModuleId[];
  icon: string;
}

// --- Checklist Types ---

export interface ChecklistItem {
  id: string;
  text: string;
  category: string;
}
