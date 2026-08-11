import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { storage } from '../services/storage';
import type { UserProgress, QuizResult, SimuladoResult, FlashcardProgress, Note, PromptLabEntry, TeachingLabEntry } from '../types';

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  completedModules: [],
  quizResults: [],
  flashcardProgress: [],
  notes: [],
  glossaryFavorites: [],
  achievements: [],
  xp: 0,
  level: 1,
  studyStreak: 0,
  lastStudyDate: '',
  totalStudyMinutes: 0,
  simuladoResults: [],
  checklist: {},
  promptLabHistory: [],
  teachingLabHistory: [],
};

type ProgressAction =
  | { type: 'COMPLETE_LESSON'; lessonId: string }
  | { type: 'COMPLETE_MODULE'; moduleId: string }
  | { type: 'ADD_QUIZ_RESULT'; result: QuizResult }
  | { type: 'ADD_SIMULADO_RESULT'; result: SimuladoResult }
  | { type: 'UPDATE_FLASHCARD'; progress: FlashcardProgress }
  | { type: 'ADD_NOTE'; note: Note }
  | { type: 'UPDATE_NOTE'; note: Note }
  | { type: 'DELETE_NOTE'; noteId: string }
  | { type: 'TOGGLE_GLOSSARY_FAVORITE'; termId: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'ADD_XP'; amount: number }
  | { type: 'UPDATE_STUDY_TIME'; minutes: number }
  | { type: 'UPDATE_STREAK' }
  | { type: 'TOGGLE_CHECKLIST'; itemId: string }
  | { type: 'ADD_PROMPT_LAB_ENTRY'; entry: PromptLabEntry }
  | { type: 'ADD_TEACHING_LAB_ENTRY'; entry: TeachingLabEntry }
  | { type: 'RESET_PROGRESS' }
  | { type: 'LOAD'; progress: UserProgress };

function progressReducer(state: UserProgress, action: ProgressAction): UserProgress {
  switch (action.type) {
    case 'COMPLETE_LESSON':
      if (state.completedLessons.includes(action.lessonId)) return state;
      return { ...state, completedLessons: [...state.completedLessons, action.lessonId] };

    case 'COMPLETE_MODULE':
      if (state.completedModules.includes(action.moduleId as any)) return state;
      return { ...state, completedModules: [...state.completedModules, action.moduleId as any] };

    case 'ADD_QUIZ_RESULT':
      return { ...state, quizResults: [...state.quizResults, action.result] };

    case 'ADD_SIMULADO_RESULT':
      return { ...state, simuladoResults: [...state.simuladoResults, action.result] };

    case 'UPDATE_FLASHCARD': {
      const existing = state.flashcardProgress.findIndex(f => f.flashcardId === action.progress.flashcardId);
      if (existing >= 0) {
        const updated = [...state.flashcardProgress];
        updated[existing] = action.progress;
        return { ...state, flashcardProgress: updated };
      }
      return { ...state, flashcardProgress: [...state.flashcardProgress, action.progress] };
    }

    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.note] };

    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(n => (n.id === action.note.id ? action.note : n)),
      };

    case 'DELETE_NOTE':
      return { ...state, notes: state.notes.filter(n => n.id !== action.noteId) };

    case 'TOGGLE_GLOSSARY_FAVORITE': {
      const favs = state.glossaryFavorites.includes(action.termId)
        ? state.glossaryFavorites.filter(f => f !== action.termId)
        : [...state.glossaryFavorites, action.termId];
      return { ...state, glossaryFavorites: favs };
    }

    case 'UNLOCK_ACHIEVEMENT':
      if (state.achievements.includes(action.achievementId)) return state;
      return { ...state, achievements: [...state.achievements, action.achievementId] };

    case 'ADD_XP': {
      const newXp = state.xp + action.amount;
      const newLevel = Math.floor(newXp / 500) + 1;
      return { ...state, xp: newXp, level: newLevel };
    }

    case 'UPDATE_STUDY_TIME':
      return { ...state, totalStudyMinutes: state.totalStudyMinutes + action.minutes };

    case 'UPDATE_STREAK': {
      const today = new Date().toISOString().split('T')[0];
      if (state.lastStudyDate === today) return state;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = state.lastStudyDate === yesterday ? state.studyStreak + 1 : 1;
      return { ...state, studyStreak: newStreak, lastStudyDate: today };
    }

    case 'TOGGLE_CHECKLIST':
      return {
        ...state,
        checklist: {
          ...state.checklist,
          [action.itemId]: !state.checklist[action.itemId],
        },
      };

    case 'ADD_PROMPT_LAB_ENTRY':
      return { ...state, promptLabHistory: [...state.promptLabHistory, action.entry] };

    case 'ADD_TEACHING_LAB_ENTRY':
      return { ...state, teachingLabHistory: [...state.teachingLabHistory, action.entry] };

    case 'RESET_PROGRESS':
      return { ...DEFAULT_PROGRESS };

    case 'LOAD':
      return { ...DEFAULT_PROGRESS, ...action.progress };

    default:
      return state;
  }
}

interface ProgressContextType {
  progress: UserProgress;
  dispatch: React.Dispatch<ProgressAction>;
  getModuleProgress: (moduleId: string) => number;
  getOverallProgress: () => number;
  getModuleQuizAverage: (moduleId: string) => number;
  getOverallQuizAverage: () => number;
  getTotalExercises: () => number;
  getBestSimuladoScore: () => number;
}

const ProgressContext = createContext<ProgressContextType>({
  progress: DEFAULT_PROGRESS,
  dispatch: () => {},
  getModuleProgress: () => 0,
  getOverallProgress: () => 0,
  getModuleQuizAverage: () => 0,
  getOverallQuizAverage: () => 0,
  getTotalExercises: () => 0,
  getBestSimuladoScore: () => 0,
});

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, dispatch] = useReducer(progressReducer, DEFAULT_PROGRESS);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = storage.get<UserProgress | null>('progress', null);
    if (saved) {
      dispatch({ type: 'LOAD', progress: saved });
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    storage.set('progress', progress);
  }, [progress]);

  const getModuleProgress = useCallback(
    (moduleId: string) => {
      const moduleLessons = progress.completedLessons.filter(l => l.startsWith(moduleId + '/'));
      // We'll calculate based on completed lessons count; the module data will tell us total
      return moduleLessons.length;
    },
    [progress.completedLessons]
  );

  const getOverallProgress = useCallback(() => {
    // This will be calculated based on total lessons across all modules
    return progress.completedLessons.length;
  }, [progress.completedLessons]);

  const getModuleQuizAverage = useCallback(
    (moduleId: string) => {
      const quizzes = progress.quizResults.filter(q => q.moduleId === moduleId);
      if (quizzes.length === 0) return 0;
      return Math.round(quizzes.reduce((sum, q) => sum + q.percentage, 0) / quizzes.length);
    },
    [progress.quizResults]
  );

  const getOverallQuizAverage = useCallback(() => {
    if (progress.quizResults.length === 0) return 0;
    return Math.round(
      progress.quizResults.reduce((sum, q) => sum + q.percentage, 0) / progress.quizResults.length
    );
  }, [progress.quizResults]);

  const getTotalExercises = useCallback(() => {
    return progress.quizResults.reduce((sum, q) => sum + q.totalQuestions, 0);
  }, [progress.quizResults]);

  const getBestSimuladoScore = useCallback(() => {
    if (progress.simuladoResults.length === 0) return 0;
    return Math.max(...progress.simuladoResults.map(s => s.percentage));
  }, [progress.simuladoResults]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        dispatch,
        getModuleProgress,
        getOverallProgress,
        getModuleQuizAverage,
        getOverallQuizAverage,
        getTotalExercises,
        getBestSimuladoScore,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
