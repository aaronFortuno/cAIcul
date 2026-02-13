
import React, { useState, useEffect, useCallback } from 'react';
import { Level, Problem, UserStats, ValidationResult, Language, Theme } from './types';
import { PROBLEMS_CA } from './problems-ca';
import { PROBLEMS_ES } from './problems-es';
import { PROBLEMS_EN } from './problems-en';
import { TRANSLATIONS } from './translations';
import { validateSolution } from './services/geminiService';
import StatsBoard from './components/StatsBoard';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ca');
  const [theme, setTheme] = useState<Theme>('dark');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [inputs, setInputs] = useState({ dades: '', operacions: '', resposta: '' });
  const [stats, setStats] = useState<UserStats>({ correctCount: 0, streak: 0 });
  const [isValidating, setIsValidating] = useState(false);
  const [feedback, setFeedback] = useState<ValidationResult | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const getProblemDB = useCallback(() => {
    if (lang === 'es') return PROBLEMS_ES;
    if (lang === 'en') return PROBLEMS_EN;
    return PROBLEMS_CA;
  }, [lang]);

  const selectNewProblem = useCallback((level: Level) => {
    const db = getProblemDB();
    const available = db.filter(p => p.level === level);
    const random = available[Math.floor(Math.random() * available.length)];
    setCurrentProblem(random);
    setInputs({ dades: '', operacions: '', resposta: '' });
    setFeedback(null);
  }, [getProblemDB]);

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
    selectNewProblem(level);
  };

  const handleValidate = async () => {
    if (!currentProblem || !inputs.dades || !inputs.operacions || !inputs.resposta) {
      alert("Si us plau, omple tots els camps.");
      return;
    }

    setIsValidating(true);
    const result = await validateSolution(currentProblem, inputs.dades, inputs.operacions, inputs.resposta, lang);
    setFeedback(result);
    setIsValidating(false);

    if (result.isCorrect) {
      setStats(prev => ({ correctCount: prev.correctCount + 1, streak: prev.streak + 1 }));
    } else {
      setStats(prev => ({ ...prev, streak: 0 }));
    }
  };

  const LanguageSelector = () => (
    <div className="flex gap-1.5 md:gap-2">
      {(['ca', 'es', 'en'] as Language[]).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all ${
            lang === l ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  const ThemeToggle = () => (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
      aria-label="Canviar tema"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );

  const CalculatorToggle = () => (
    <button
      onClick={() => setShowCalculator(!showCalculator)}
      className={`p-1.5 rounded-lg transition-colors shadow-sm text-xl ${
        showCalculator 
          ? 'bg-indigo-600 text-white' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
      title="Calculadora"
    >
      🖩
    </button>
  );

  // Component per renderitzar el títol estilitzat "cAIcul"
  const StyledTitle = ({ className = "" }: { className?: string }) => (
    <h1 className={`${className} font-bold tracking-tight select-none`}>
      c<span className="text-indigo-600 dark:text-indigo-400">AI</span>cul
    </h1>
  );

  if (!selectedLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-4xl w-full">
          <header className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-8">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <StyledTitle className="text-5xl md:text-7xl text-indigo-900 dark:text-white mb-4" />
            <p className="text-lg text-indigo-600 dark:text-indigo-300">{t.subtitle}</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(Level).map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleLevelSelect(lvl)}
                className="group bg-white dark:bg-gray-900 p-8 rounded-3xl border-2 border-transparent hover:border-indigo-400 dark:hover:border-indigo-500 shadow-md hover:shadow-xl transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {t.levels[lvl]}
                  </span>
                  <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const hasFeedback = feedback !== null;
  const mainButtonAction = hasFeedback ? () => selectNewProblem(selectedLevel) : handleValidate;
  const mainButtonText = hasFeedback ? t.nextProblem : (isValidating ? t.validating : t.btnValidate);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors">
      <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-40 px-4 md:px-6 py-3 mb-8 transition-colors shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
              onClick={() => setSelectedLevel(null)}
              className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium whitespace-nowrap"
            >
              ← {t.home}
            </button>
            <span className="h-5 w-px bg-gray-200 dark:bg-gray-700" />
            <StyledTitle className="text-xl text-indigo-900 dark:text-white" />
            <span className="h-5 w-px bg-gray-200 dark:bg-gray-700 hidden md:block" />
            <h2 className="hidden md:block font-bold text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{t.levels[selectedLevel]}</h2>
          </div>
          
          <div className="hidden sm:block">
            <StatsBoard stats={stats} t={t} />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <CalculatorToggle />
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
        <div className="sm:hidden mt-3 pt-3 border-t dark:border-gray-800 flex justify-center">
          <StatsBoard stats={stats} t={t} />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 flex flex-col gap-6">
            {currentProblem && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-indigo-50 dark:border-indigo-900/30">
                <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  {t.statementTitle}
                </span>
                <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-100 font-medium">
                  {currentProblem.enunciat}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">{t.labelData}</label>
                <textarea
                  tabIndex={1}
                  className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-indigo-300 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all resize-none text-gray-900 dark:text-white"
                  placeholder={t.placeholderData}
                  value={inputs.dades}
                  onChange={(e) => setInputs(prev => ({ ...prev, dades: e.target.value }))}
                />
              </div>

              <div className="md:row-span-2 bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col">
                <label className="block text-sm font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">{t.labelOps}</label>
                <textarea
                  tabIndex={2}
                  className="w-full flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-indigo-300 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all resize-none font-mono text-gray-900 dark:text-white min-h-[150px]"
                  placeholder={t.placeholderOps}
                  value={inputs.operacions}
                  onChange={(e) => setInputs(prev => ({ ...prev, operacions: e.target.value }))}
                />
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">{t.labelAnswer}</label>
                <textarea
                  tabIndex={3}
                  className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-indigo-300 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all resize-none font-bold text-indigo-600 dark:text-indigo-400"
                  placeholder={t.placeholderAnswer}
                  value={inputs.resposta}
                  onChange={(e) => setInputs(prev => ({ ...prev, resposta: e.target.value }))}
                />
              </div>
            </div>

            <button
              onClick={mainButtonAction}
              disabled={isValidating}
              tabIndex={4}
              className={`w-full py-5 rounded-3xl font-bold text-xl shadow-lg transition-all transform active:scale-95 ${
                isValidating 
                  ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500' 
                  : hasFeedback
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-1'
                    : 'bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:-translate-y-1'
              }`}
            >
              {isValidating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.validating}
                </span>
              ) : mainButtonText}
            </button>
          </div>

          <div className="lg:col-span-1">
            {feedback && (
              <div className={`rounded-3xl p-6 border-2 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col ${
                feedback.isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{feedback.isCorrect ? '🎉' : '🤔'}</span>
                  <h3 className={`text-lg font-bold ${feedback.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                    {feedback.isCorrect ? t.feedbackCorrect : t.feedbackIncorrect}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6 text-sm font-medium">{feedback.feedbackText}</p>
                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700 border-opacity-50 flex-1">
                  <div className="bg-white dark:bg-gray-800 bg-opacity-60 p-2.5 rounded-xl">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase block mb-0.5">{t.labelData}</span>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{feedback.points.dades}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 bg-opacity-60 p-2.5 rounded-xl">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase block mb-0.5">{t.labelOps}</span>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{feedback.points.operacions}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 bg-opacity-60 p-2.5 rounded-xl">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase block mb-0.5">{t.labelAnswer}</span>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{feedback.points.resposta}</p>
                  </div>
                </div>
              </div>
            )}
            
            {!feedback && (
              <div className="bg-indigo-900 dark:bg-indigo-950 rounded-3xl p-8 text-white transition-colors shadow-lg h-full flex flex-col justify-center">
                <h4 className="font-bold text-lg mb-4">{t.tipTitle}</h4>
                <p className="text-indigo-200 text-sm leading-relaxed">{t.tipText}</p>
              </div>
            )}
          </div>
        </div>

        {showCalculator && <Calculator onClose={() => setShowCalculator(false)} />}
      </main>
    </div>
  );
};

export default App;
