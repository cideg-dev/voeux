
import React, { useState, useCallback, useEffect } from 'react';
import { Snowflake, Send, RefreshCcw, Heart, TreePine, Gift, Star, Quote, CandyCane } from 'lucide-react';
import BackgroundStars from './components/BackgroundStars';
import { generatePersonalizedWish } from './services/geminiService';
import { AppStatus } from './types';

const TypewriterText: React.FC<{ text: string; speed?: number; className?: string }> = ({ text, speed = 40, className = "" }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span className={className}>{displayedText}</span>;
};

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setStatus(AppStatus.LOADING);
    const generatedWish = await generatePersonalizedWish(name.trim());
    setWish(generatedWish);
    setStatus(AppStatus.SUCCESS);
  }, [name]);

  const reset = () => {
    setName('');
    setWish('');
    setStatus(AppStatus.IDLE);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-[#031003] text-slate-100 selection:bg-red-500/40 overflow-hidden">
      <BackgroundStars />

      {/* Sapins décoratifs sur les côtés */}
      <div className="fixed bottom-[-20px] left-[-20px] z-20 opacity-40 md:opacity-100 sway pointer-events-none">
        <TreePine className="w-32 h-32 md:w-64 md:h-64 text-green-800 fill-green-900/50" />
      </div>
      <div className="fixed bottom-[-40px] right-[-20px] z-20 opacity-40 md:opacity-100 sway pointer-events-none" style={{ animationDelay: '1.5s' }}>
        <TreePine className="w-40 h-40 md:w-80 md:h-80 text-green-800 fill-green-900/50" />
      </div>

      <main className="relative z-30 w-full max-w-2xl">
        <header className="text-center mb-10 reveal-text">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-red-700/30 mb-8 border-2 border-amber-500/40 shadow-2xl shadow-red-900/50">
            <Gift className="w-6 h-6 text-red-400 animate-bounce" />
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-amber-200 font-christmas">Petit Papa Noël arrive...</span>
            <CandyCane className="w-6 h-6 text-red-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-christmas font-bold mb-4 tracking-tighter leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            <span className="block text-white">Vœux de</span>
            <span className="text-festive">2026</span>
          </h1>
          
          <div className="flex items-center justify-center gap-3">
             <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-amber-500" />
             <p className="text-amber-100 text-2xl font-playfair italic">Par la Famille DAVI</p>
             <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
        </header>

        <div className="glass-card p-1 rounded-[3.5rem] overflow-hidden">
          <div className="bg-gradient-to-br from-red-950/90 via-black/80 to-green-950/90 p-8 md:p-14 rounded-[3.4rem] relative">
            {/* Decorations */}
            <Star className="absolute top-6 left-6 text-amber-400 w-8 h-8 animate-pulse" />
            <Star className="absolute top-6 right-6 text-amber-400 w-8 h-8 animate-pulse" style={{ animationDelay: '1s' }} />

            {status === AppStatus.IDLE || status === AppStatus.LOADING ? (
              <form onSubmit={handleSubmit} className="space-y-10 text-center animate-in fade-in slide-in-from-top-10 duration-1000">
                <div className="space-y-4">
                  <h2 className="text-2xl font-christmas text-amber-200 tracking-widest uppercase">Préparez votre cœur</h2>
                  <div className="relative group max-w-sm mx-auto">
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom complet..."
                      required
                      disabled={status === AppStatus.LOADING}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-8 py-6 text-2xl text-center focus:outline-none focus:ring-4 focus:ring-red-600/30 focus:border-red-500/50 transition-all placeholder:text-slate-600 text-amber-50 font-playfair"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === AppStatus.LOADING || !name.trim()}
                  className="w-full relative group bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-4 transition-all transform active:scale-95 shadow-2xl shadow-red-900/60"
                >
                  <Gift className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span className="text-2xl font-christmas tracking-[0.1em] uppercase">Ouvrir mes vœux</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <div className="space-y-12 py-4 animate-in zoom-in fade-in duration-1000">
                <div className="relative text-center">
                  <Quote className="absolute -top-10 -left-6 w-20 h-20 text-amber-500/10" />
                  <div className="relative z-10">
                    <div className="min-h-[160px] text-3xl md:text-4xl font-playfair italic leading-[1.4] px-4">
                      <TypewriterText text={wish} className="text-festive" />
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-white/10">
                       <div className="flex justify-center gap-4 mb-4">
                          <Star className="text-amber-400 fill-amber-400 w-5 h-5" />
                          <Heart className="text-red-500 fill-red-500 w-6 h-6 animate-ping" />
                          <Star className="text-amber-400 fill-amber-400 w-5 h-5" />
                       </div>
                       <p className="text-xs uppercase tracking-[0.5em] text-amber-500 font-bold mb-2">Avec toute notre affection</p>
                       <h3 className="text-4xl md:text-5xl font-christmas text-white tracking-widest">La Famille DAVI</h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button
                    onClick={reset}
                    className="bg-white/5 hover:bg-white/10 text-slate-300 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border-2 border-white/10 group"
                  >
                    <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                    <span className="font-christmas tracking-widest">Nouveau Destinataire</span>
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Vœux de la Famille DAVI',
                          text: wish + " - Joyeuses fêtes !",
                          url: window.location.href
                        });
                      }
                    }}
                    className="bg-green-600/20 hover:bg-green-600/30 text-green-200 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border-2 border-green-500/30 group shadow-lg shadow-green-950/50"
                  >
                    <Star className="w-5 h-5 text-amber-400 group-hover:scale-150 transition-transform" />
                    <span className="font-christmas tracking-widest uppercase">Partager la Joie</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-20 text-center space-y-6 opacity-80">
          <div className="flex justify-center items-center gap-8">
             <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20" />
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_10px_red]" />
                <div className="w-3 h-3 rounded-full bg-green-600 shadow-[0_0_10px_green]" />
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_amber]" />
             </div>
             <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <p className="text-amber-200/40 text-sm font-christmas tracking-[0.3em] uppercase">
            Puisse 2026 être une année de paix et de lumière
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
