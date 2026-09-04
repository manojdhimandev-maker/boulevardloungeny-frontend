import { useState, useEffect } from 'react';
import { Palette, Check, Sparkles, X } from 'lucide-react';

export type ThemeId = 'noir' | 'red-black' | 'emerald-black' | 'cobalt-white';

type ThemeOption = {
  id: ThemeId;
  name: string;
  subtitle: string;
  bgPreview: string;
  accentPreview: string;
  badge: string;
};

export const themes: ThemeOption[] = [
  {
    id: 'noir',
    name: 'Sample 1: Champagne Gold & Pitch Black',
    subtitle: 'Metallic champagne gold highlights on deep onyx black background (Default Luxury Theme)',
    bgPreview: 'bg-[#060606]',
    accentPreview: 'bg-[#fbbf24]',
    badge: 'Gold & Black',
  },
  {
    id: 'red-black',
    name: 'Sample 2: Crimson Red & Jet Black',
    subtitle: 'Vivid crimson red accents on pitch jet black charcoal & dark obsidian glass',
    bgPreview: 'bg-[#050505]',
    accentPreview: 'bg-[#ef4444]',
    badge: 'Red & Black',
  },
  {
    id: 'emerald-black',
    name: 'Sample 3: Electric Emerald & Jet Black',
    subtitle: 'Luminous emerald mint green badges on dark charcoal obsidian',
    bgPreview: 'bg-[#040605]',
    accentPreview: 'bg-[#10b981]',
    badge: 'Emerald & Black',
  },
  {
    id: 'cobalt-white',
    name: 'Sample 4: Royal Blue & Crisp White',
    subtitle: 'Bright crisp white main site background with vivid royal cobalt blue accents & cards',
    bgPreview: 'bg-white',
    accentPreview: 'bg-[#2563eb]',
    badge: 'Blue & White',
  },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>(() => {
    try {
      return (localStorage.getItem('blvd_theme') as ThemeId) || 'noir';
    } catch {
      return 'noir';
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
    try {
      localStorage.setItem('blvd_theme', activeTheme);
    } catch {
      // ignore
    }
  }, [activeTheme]);

  const selectTheme = (id: ThemeId) => {
    setActiveTheme(id);
    setIsOpen(false);
  };

  const currentThemeObj = themes.find((t) => t.id === activeTheme) || themes[0];

  return (
    <>
      {/* FLOATING THEME SWITCHER BUTTON */}
      <div className="fixed bottom-20 left-5 z-40 animate-fade-up">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gold-gradient text-ink-950 font-bold text-xs shadow-2xl hover:scale-105 transition-all border border-gold-400/40"
          title="Click to switch website color combinations"
        >
          <Palette size={16} />
          <span>Theme: {currentThemeObj.badge}</span>
          <span className="w-2 h-2 rounded-full bg-ink-950 animate-pulse" />
        </button>
      </div>

      {/* THEME SELECTOR MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md glass-panel rounded-3xl border border-gold-500/40 p-6 sm:p-8 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 grid place-items-center w-8 h-8 rounded-full bg-ink-900 text-ink-300 hover:text-gold-200 hover:bg-ink-800 transition-colors border border-gold-500/30"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-gold-400" />
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-300 font-semibold">
                Website Theme Combinations
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-ink-50 font-bold">Select Theme Palette</h3>
            <p className="text-xs text-ink-300 mt-1">
              Switch live between dark mode luxury themes (Gold & Black, Red & Black, Emerald & Black) and light mode (Royal Blue & Crisp White).
            </p>

            {/* THEME OPTIONS LIST */}
            <div className="mt-6 space-y-3">
              {themes.map((t) => {
                const isSelected = activeTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => selectTheme(t.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-gold-400 bg-gold-900/30 shadow-lg glow-gold'
                        : 'border-ink-700/60 bg-ink-900/50 hover:border-gold-500/40 hover:bg-ink-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* COLOR PREVIEW SWATCH */}
                      <div className="shrink-0 flex -space-x-1.5 overflow-hidden p-1 rounded-xl border border-ink-600 bg-ink-950">
                        <div className={`w-5 h-5 rounded-full ${t.bgPreview} border border-black/20`} />
                        <div className={`w-5 h-5 rounded-full ${t.accentPreview} border border-black/20`} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-base text-ink-50 font-bold truncate">{t.name}</h4>
                        </div>
                        <p className="text-[0.7rem] text-ink-300 leading-snug mt-0.5 line-clamp-2">{t.subtitle}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="shrink-0 w-6 h-6 rounded-full bg-gold-gradient text-ink-950 grid place-items-center font-bold">
                        <Check size={14} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-ink-700/60 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gold-gradient text-ink-950 font-bold py-3 rounded-full text-xs sm:text-sm hover:shadow-lg transition-all"
              >
                Apply Selected Theme
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
