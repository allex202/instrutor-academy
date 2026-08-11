import { Achievement } from '../types';

export const allAchievements: Achievement[] = [
  {
    id: 'primeiro-quiz',
    title: 'Primeiro Quiz',
    description: 'Completou seu primeiro quiz na plataforma.',
    icon: '🎯',
    xpReward: 50,
    condition: { type: 'quizzes_completed', target: 1 }
  },
  {
    id: 'streak-7',
    title: '7 Dias Estudando',
    description: 'Manteve uma ofensiva de estudos de 7 dias.',
    icon: '🔥',
    xpReward: 200,
    condition: { type: 'streak', target: 7 }
  },
  {
    id: 'prompt-master',
    title: 'Prompt Master',
    description: 'Obteve nota superior a 90 no Prompt Lab.',
    icon: '✨',
    xpReward: 300,
    condition: { type: 'score', target: 90 }
  },
  {
    id: 'security-student',
    title: 'AI Security Student',
    description: 'Completou o módulo Segurança e Responsible AI.',
    icon: '🛡️',
    xpReward: 250,
    condition: { type: 'module_completed', target: 1, moduleId: 'responsible-ai' }
  },
  {
    id: 'instructor-apprentice',
    title: 'Instructor Apprentice',
    description: 'Completou o módulo Didática e Instruction.',
    icon: '👨‍🏫',
    xpReward: 300,
    condition: { type: 'module_completed', target: 1, moduleId: 'instructor' }
  },
  {
    id: 'junior-ready',
    title: 'Instructor Junior Ready',
    description: 'Completou todos os módulos do curso.',
    icon: '🎓',
    xpReward: 500,
    condition: { type: 'lessons_completed', target: 50 } // Assuming around 50 lessons total
  },
  {
    id: 'quiz-perfect',
    title: 'Quiz Perfeito',
    description: 'Obteve 100% de acerto em um quiz.',
    icon: '⭐',
    xpReward: 150,
    condition: { type: 'score', target: 100 }
  },
  {
    id: 'flashcard-master',
    title: 'Mestre dos Flashcards',
    description: 'Dominou mais de 50 flashcards.',
    icon: '🧠',
    xpReward: 200,
    condition: { type: 'flashcards', target: 50 }
  },
  {
    id: 'simulado-aprovado',
    title: 'Simulado Aprovado',
    description: 'Obteve mais de 70% de acerto no Simulado Final.',
    icon: '✅',
    xpReward: 250,
    condition: { type: 'simulado', target: 70 }
  },
  {
    id: 'all-lessons',
    title: 'Todas as Lições',
    description: 'Completou todas as lições da plataforma.',
    icon: '📚',
    xpReward: 400,
    condition: { type: 'lessons_completed', target: 50 }
  },
  {
    id: 'first-note',
    title: 'Primeira Anotação',
    description: 'Criou sua primeira anotação de estudo.',
    icon: '📝',
    xpReward: 25,
    condition: { type: 'custom', target: 1 }
  },
  {
    id: 'explorer',
    title: 'Explorador',
    description: 'Visitou todos os módulos da plataforma.',
    icon: '🗺️',
    xpReward: 100,
    condition: { type: 'custom', target: 13 }
  }
];
