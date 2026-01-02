
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

      {/* Sapins décoratifs fixes en arrière-plan */}
      <div className="fixed bottom-[-40px] left-[-30px] z-10 opacity-30 md:opacity-80 sway pointer-events-none">
        <TreePine className="w-48 h-48 md:w-96 md:h-96 text-green-900 fill-green-950/40" />
      </div>
      <div className="fixed bottom-[-60px] right-[-30px] z-10 opacity-30 md:opacity-80 sway pointer-events-none" style={{ animationDelay: '2s' }}>
        <TreePine className="w-56 h-56 md:w-[450px] md:h-[450px] text-green-900 fill-green-950/40" />
      </div>

      <main className="relative z-30 w-full max-w-2xl">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-red-700/40 mb-8 border-2 border-amber-400/50 shadow-2xl shadow-red-900/50 animate-bounce">
            <Gift className="w-6 h-6 text-red-300" />
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-amber-100 font-christmas">Magie de la Famille DAVI</span>
            <CandyCane className="w-6 h-6 text-red-300" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-christmas font-bold mb-4 tracking-tighter leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
            <span className="block text-white">Bonne Année</span>
            <span className="text-festive-gradient">2026</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4">
             <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-amber-500" />
             <p className="text-amber-100 text-2xl font-playfair italic">Meilleurs Vœux</p>
             <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
        </header>

        <div className="glass-card p-1 rounded-[3.5rem] overflow-hidden">
          <div className="bg-gradient-to-br from-red-950/95 via-black/90 to-green-950/95 p-8 md:p-14 rounded-[3.4rem] relative">
            {/* Étoiles scintillantes dans les coins */}
            <Star className="absolute top-8 left-8 text-amber-400 w-8 h-8 animate-pulse" />
            <Star className="absolute top-8 right-8 text-amber-400 w-8 h-8 animate-pulse" style={{ animationDelay: '1.5s' }} />

            {status === AppStatus.IDLE || status === AppStatus.LOADING ? (
              <form onSubmit={handleSubmit} className="space-y-12 text-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-christmas text-amber-200 tracking-widest uppercase">Qui Papa Noël doit-il gâter ?</h2>
                  <div className="relative group max-w-sm mx-auto">
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom..."
                      required
                      disabled={status === AppStatus.LOADING}
                      className="w-full bg-white/5 border-2 border-amber-500/20 rounded-2xl px-8 py-6 text-3xl text-center focus:outline-none focus:ring-4 focus:ring-red-600/30 focus:border-red-500/50 transition-all placeholder:text-slate-700 text-amber-50 font-playfair"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === AppStatus.LOADING || !name.trim()}
                  className="w-full relative group bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white font-bold py-7 rounded-2xl flex items-center justify-center gap-5 transition-all transform active:scale-95 shadow-2xl shadow-red-950/80"
                >
                  <Gift className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                  <span className="text-3xl font-christmas tracking-widest uppercase">Découvrir mes vœux</span>
                  <Send className="w-6 h-6" />
                </button>
              </form>
            ) : (
              <div className="space-y-12 py-4 animate-in zoom-in fade-in duration-1000">
                <div className="relative text-center">
                  <Quote className="absolute -top-12 -left-8 w-24 h-24 text-amber-500/10" />
                  <div className="relative z-10">
                    <div className="min-h-[180px] text-3xl md:text-5xl font-playfair italic leading-[1.3] px-2">
                      <TypewriterText text={wish} className="text-festive-gradient" />
                    </div>
                    
                    <div className="mt-16 pt-10 border-t border-amber-500/20">
                       <div className="flex justify-center gap-6 mb-6">
                          <Star className="text-amber-400 fill-amber-400 w-6 h-6 animate-pulse" />
                          <Heart className="text-red-500 fill-red-500 w-8 h-8 animate-ping" />
                          <Star className="text-amber-400 fill-amber-400 w-6 h-6 animate-pulse" />
                       </div>
                       <p className="text-sm uppercase tracking-[0.6em] text-amber-500 font-bold mb-3">Avec tout l'amour de</p>
                       <h3 className="text-5xl md:text-6xl font-christmas text-white tracking-[0.1em] drop-shadow-md">La Famille DAVI</h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button
                    onClick={reset}
                    className="bg-white/5 hover:bg-white/10 text-slate-300 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border-2 border-white/10 group"
                  >
                    <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-1000" />
                    <span className="font-christmas text-xl tracking-widest">Autre Message</span>
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Vœux de la Famille DAVI 2026',
                          text: wish + " ✨ Joyeuses Fêtes !",
                          url: window.location.href
                        });
                      }
                    }}
                    className="bg-red-600/30 hover:bg-red-600/40 text-red-100 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border-2 border-red-500/40 group shadow-lg shadow-red-950/50"
                  >
                    <Star className="w-6 h-6 text-amber-400 group-hover:scale-150 transition-transform" />
                    <span className="font-christmas text-xl tracking-widest uppercase">Partager la Magie</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-20 text-center space-y-6 opacity-80">
          <div className="flex justify-center items-center gap-10">
             <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
             <div className="flex gap-4">
                <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_15px_red] animate-pulse" />
                <div className="w-4 h-4 rounded-full bg-green-600 shadow-[0_0_15px_green] animate-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_15px_amber] animate-pulse" style={{ animationDelay: '0.6s' }} />
             </div>
             <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-amber-500/30 to-transparent" />
          </div>
          <p className="text-amber-200/50 text-base font-christmas tracking-[0.4em] uppercase">
            Que 2026 illumine votre vie de mille feux
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
