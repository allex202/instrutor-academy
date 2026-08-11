import React, { useMemo } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { modules } from '../data/courses';
import { allAchievements } from '../data/achievements';
import ProgressBar from '../components/ui/ProgressBar';
import ProgressCard from '../components/ui/ProgressCard';
import Badge from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Target, CheckCircle, Clock, 
  TrendingUp, Activity, Award, Flame, Play, Star,
  Zap, Brain
} from 'lucide-react';

export default function Dashboard() {
  const { 
    progress, 
    getOverallQuizAverage, 
    getTotalExercises, 
    getBestSimuladoScore,
    getModuleQuizAverage,
    getModuleProgress
  } = useProgress();

  const totalLessons = useMemo(() => {
    return modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  }, []);

  const completedLessons = progress.completedLessons.length;
  const overallProgress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
  
  const pendingLessonsCount = totalLessons - completedLessons;
  const estimatedHoursRemaining = Math.max(1, Math.round((pendingLessonsCount * 15) / 60)); // Assuming 15 min per lesson

  const pendingModules = useMemo(() => {
    return modules?.filter(m => !progress.completedModules.includes(m.id)).slice(0, 3) || [];
  }, [progress.completedModules]);

  const moduleAverages = useMemo(() => {
    return (modules || []).map(m => ({
      id: m.id,
      title: m.title,
      avg: getModuleQuizAverage(m.id)
    })).filter(m => m.avg > 0).sort((a, b) => b.avg - a.avg);
  }, [getModuleQuizAverage]);

  const topModules = moduleAverages.slice(0, 3);
  const bottomModules = moduleAverages.slice(-3).reverse();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-slide-up pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-orange-100/50 dark:from-neutral-900 dark:to-neutral-800/80 p-8 sm:p-10 border border-amber-200/50 dark:border-neutral-700/50 shadow-sm">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-gradient-to-tr from-amber-300/20 to-transparent dark:from-amber-600/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
              Bem-vindo de volta!
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mt-3 text-lg max-w-xl">
              Continue sua jornada de excelência no Anthropic Instructor Learning Hub.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md border border-amber-200 dark:border-amber-900/50 px-5 py-3 rounded-2xl shadow-sm self-start md:self-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 dark:bg-amber-500 blur-md opacity-50 animate-pulse rounded-full"></div>
              <Flame className="w-7 h-7 text-amber-500 dark:text-amber-400 fill-current relative z-10" />
            </div>
            <div>
              <div className="text-sm text-stone-500 dark:text-stone-400 font-medium">Ofensiva</div>
              <div className="text-lg font-bold text-amber-700 dark:text-amber-500 leading-none">
                {progress.studyStreak} dias
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Progress */}
      <section className="bg-gradient-to-br from-white to-stone-50 dark:from-neutral-800 dark:to-neutral-900 p-8 rounded-3xl border border-stone-200 dark:border-neutral-700/80 shadow-md flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-36 h-36 shrink-0 drop-shadow-xl">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" className="stroke-stone-200 dark:stroke-neutral-700" strokeWidth="8" fill="none" />
            <circle 
              cx="60" cy="60" r="54" 
              className="stroke-amber-500 transition-all duration-1000 ease-out" 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray={339.292} 
              strokeDashoffset={339.292 * (1 - overallProgress / 100)} 
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tighter">{overallProgress}%</span>
          </div>
        </div>
        
        <div className="flex-1 w-full space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Seu Progresso Geral</h2>
            <p className="text-stone-500 dark:text-stone-400 mt-1 text-lg">Você está no caminho certo para dominar os modelos Claude.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-neutral-800/80 p-4 rounded-2xl border border-stone-100 dark:border-neutral-700 shadow-sm">
              <div className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Lições Concluídas</div>
              <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                <span className="text-amber-600 dark:text-amber-500">{completedLessons}</span> <span className="text-stone-400 dark:text-stone-500 text-lg font-medium">/ {totalLessons}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-neutral-800/80 p-4 rounded-2xl border border-stone-100 dark:border-neutral-700 shadow-sm">
              <div className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Tempo Estimado Restante</div>
              <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                ~{estimatedHoursRemaining} <span className="text-stone-400 dark:text-stone-500 text-lg font-medium">horas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: "Conteúdos Concluídos", value: progress.completedModules.length.toString(), icon: CheckCircle },
          { title: "Pendentes", value: ((modules?.length || 0) - progress.completedModules.length).toString(), icon: BookOpen },
          { title: "Exercícios", value: getTotalExercises().toString(), icon: Target },
          { title: "Taxa de Acertos", value: `${getOverallQuizAverage()}%`, icon: Activity },
          { title: "Simulados", value: progress.simuladoResults.length.toString(), icon: Zap },
          { title: "Melhor Pontuação", value: `${getBestSimuladoScore()}%`, icon: Star },
          { title: "Horas de Estudo", value: `${Math.round(progress.totalStudyMinutes / 60)}h`, icon: Clock },
          { title: "Sequência", value: `${progress.studyStreak} dias`, icon: TrendingUp }
        ].map((stat, i) => (
          <div key={stat.title} style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }} className="animate-slide-up h-full">
            <ProgressCard 
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              className="bg-white/70 dark:bg-neutral-800/60 backdrop-blur-md h-full transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1.5 border border-white/60 dark:border-neutral-700/60"
            />
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue Studying */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg text-amber-600 dark:text-amber-500">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Continue Estudando</h2>
          </div>
          
          <div className="space-y-4">
            {pendingModules.map(m => {
              const totalModLessons = m.lessons?.length || 1;
              const completedModLessons = getModuleProgress(m.id);
              const modProgress = Math.round((completedModLessons / totalModLessons) * 100);

              return (
                <div key={m.id} className="bg-white/70 dark:bg-neutral-800/60 backdrop-blur-md p-5 rounded-2xl border border-white/60 dark:border-neutral-700/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row justify-between items-center gap-5 group">
                  <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-amber-600 dark:text-amber-500 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex-1 w-full">
                      <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-2 truncate">{m.title}</h3>
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-stone-100 dark:bg-neutral-900/80 h-2 rounded-full overflow-hidden shadow-inner">
                          <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${modProgress}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-stone-500 dark:text-stone-400 w-8">{modProgress}%</span>
                      </div>
                    </div>
                  </div>
                  <button className="whitespace-nowrap px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold transition-all duration-300 flex items-center gap-2 hover:scale-105 shadow-md shadow-amber-500/20 w-full sm:w-auto justify-center">
                    <Play className="w-4 h-4 fill-current" />
                    CONTINUAR
                  </button>
                </div>
              );
            })}
            {pendingModules.length === 0 && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-8 rounded-2xl text-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Parabéns!</h3>
                <p className="text-stone-600 dark:text-stone-400 mt-2">Você concluiu todos os módulos disponíveis.</p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-100 dark:bg-neutral-800 rounded-lg text-stone-600 dark:text-stone-400">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Ações Rápidas</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[calc(100%-44px)] min-h-[160px]">
            <Link to="/exercicios" className="group relative overflow-hidden h-full p-6 bg-white/70 dark:bg-neutral-800/60 backdrop-blur-md rounded-2xl border border-white/60 dark:border-neutral-700/50 hover:border-amber-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-stone-900 dark:text-stone-100 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-500/20 dark:to-orange-500/10 rounded-2xl text-amber-600 dark:text-amber-500 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Target className="w-8 h-8" />
              </div>
              <span className="font-bold text-center">Fazer Quiz</span>
            </Link>
            
            <Link to="/flashcards" className="group relative overflow-hidden h-full p-6 bg-white/70 dark:bg-neutral-800/60 backdrop-blur-md rounded-2xl border border-white/60 dark:border-neutral-700/50 hover:border-emerald-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-stone-900 dark:text-stone-100 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/10 shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-500/20 dark:to-teal-500/10 rounded-2xl text-emerald-600 dark:text-emerald-500 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Brain className="w-8 h-8" />
              </div>
              <span className="font-bold text-center">Revisar Flashcards</span>
            </Link>
            
            <Link to="/simulados" className="group relative overflow-hidden h-full p-6 bg-white/70 dark:bg-neutral-800/60 backdrop-blur-md rounded-2xl border border-white/60 dark:border-neutral-700/50 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-stone-900 dark:text-stone-100 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-4 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-500/20 dark:to-cyan-500/10 rounded-2xl text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Activity className="w-8 h-8" />
              </div>
              <span className="font-bold text-center">Iniciar Simulado</span>
            </Link>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths */}
        <section className="bg-white/70 dark:bg-neutral-800/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/60 dark:border-neutral-700/50 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            Pontos Fortes
          </h2>
          <div className="space-y-4">
            {topModules.length > 0 ? topModules.map(m => (
              <div key={m.id} className="relative overflow-hidden group p-4 bg-white/40 dark:bg-neutral-900/40 border border-stone-100 dark:border-neutral-700/50 rounded-xl flex items-center justify-between shadow-sm">
                <div className="absolute bottom-0 left-0 h-1.5 bg-stone-100 dark:bg-neutral-800 w-full">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-r-full" style={{ width: `${m.avg}%` }}></div>
                </div>
                <span className="text-stone-800 dark:text-stone-200 font-semibold relative z-10">{m.title}</span>
                <Badge variant="default" className="bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 backdrop-blur-md border border-emerald-200/50 dark:border-emerald-800/50 relative z-10 px-3 py-1 font-bold text-sm rounded-lg">
                  {m.avg}%
                </Badge>
              </div>
            )) : (
              <div className="text-center p-6 bg-stone-50/50 dark:bg-neutral-900/30 rounded-xl border border-stone-100 dark:border-neutral-800">
                <p className="text-stone-500 dark:text-stone-400">Faça quizzes para descobrir seus pontos fortes.</p>
              </div>
            )}
          </div>
        </section>

        {/* Improvements */}
        <section className="bg-white/70 dark:bg-neutral-800/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/60 dark:border-neutral-700/50 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400 transform rotate-180" />
            </div>
            Pontos a Melhorar
          </h2>
          <div className="space-y-4">
            {bottomModules.length > 0 ? bottomModules.map(m => (
              <div key={m.id} className="relative overflow-hidden group p-4 bg-white/40 dark:bg-neutral-900/40 border border-stone-100 dark:border-neutral-700/50 rounded-xl flex items-center justify-between shadow-sm">
                <div className="absolute bottom-0 left-0 h-1.5 bg-stone-100 dark:bg-neutral-800 w-full">
                  <div className="h-full bg-gradient-to-r from-red-400 to-amber-500 rounded-r-full" style={{ width: `${m.avg}%` }}></div>
                </div>
                <span className="text-stone-800 dark:text-stone-200 font-semibold relative z-10">{m.title}</span>
                <Badge variant="default" className="bg-red-100/80 text-red-700 dark:bg-red-900/50 dark:text-red-300 backdrop-blur-md border border-red-200/50 dark:border-red-800/50 relative z-10 px-3 py-1 font-bold text-sm rounded-lg">
                  {m.avg}%
                </Badge>
              </div>
            )) : (
              <div className="text-center p-6 bg-stone-50/50 dark:bg-neutral-900/30 rounded-xl border border-stone-100 dark:border-neutral-800">
                <p className="text-stone-500 dark:text-stone-400">Faça quizzes para identificar onde você pode melhorar.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Achievements */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg text-amber-600 dark:text-amber-500">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Conquistas Recentes</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {progress.achievements.slice(-4).reverse().map(achId => {
            const ach = allAchievements?.find(a => a.id === achId);
            if (!ach) return null;
            return (
              <div key={ach.id} className="bg-white/70 dark:bg-neutral-800/60 backdrop-blur-md p-5 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 shadow-sm hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-400/60 dark:hover:border-amber-500/50 transition-all duration-300 flex flex-col gap-3 group relative overflow-hidden">
                <div className="absolute -inset-10 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
                <div className="text-4xl drop-shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 transform-gpu">{ach.icon}</div>
                <div className="relative z-10 mt-1">
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base leading-tight">{ach.title}</h3>
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">{ach.description}</p>
                </div>
              </div>
            );
          })}
          {progress.achievements.length === 0 && (
            <div className="col-span-full p-8 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-md rounded-2xl border border-dashed border-stone-300 dark:border-neutral-600 text-center">
              <Award className="w-12 h-12 text-stone-300 dark:text-neutral-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">Nenhuma conquista ainda</h3>
              <p className="text-stone-500 dark:text-stone-400 mt-1">
                Continue estudando e completando lições para desbloquear medalhas!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
