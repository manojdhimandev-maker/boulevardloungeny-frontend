import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ListFilter,
  LayoutGrid,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { menu } from '@/data/menu';
import type { PageId } from '@/components/Navbar';

type MenuPageProps = {
  onNavigate: (page: PageId, categoryId?: string) => void;
  initialCategory?: string;
};

export type ViewMode = 'pdf-replica' | 'bistro' | 'grid' | 'document';

const pdfDocumentSpreads = [
  { id: 'cocktails', imageSrc: '/menu/BOULEVARD LOUNGE MENU-4_page-0002.jpg', title: 'Craft Cocktails' },
  { id: 'bottle-reserve', imageSrc: '/menu/BOULEVARD LOUNGE MENU-4_page-0003.jpg', title: 'Bottle Reserve' },
  { id: 'hookah-vault', imageSrc: '/menu/BOULEVARD LOUNGE MENU-4_page-0004.jpg', title: 'Hookah Vault' },
  { id: 'appetizers-salads', imageSrc: '/menu/BOULEVARD LOUNGE MENU-4_page-0005.jpg', title: 'Appetizers & Salads' },
  { id: 'pasta-mains', imageSrc: '/menu/BOULEVARD LOUNGE MENU-4_page-0006.jpg', title: 'Pasta & Mains' },
  { id: 'platters-sandwiches', imageSrc: '/menu/BOULEVARD LOUNGE MENU-4_page-0007.jpg', title: 'Platters & Desserts' },
  { id: 'happy-hour', imageSrc: '/menu/BOULEVARD LOUNGE MENU-4_page-0008.jpg', title: 'Happy Hour' },
];

// ─── INSTA PHOTO PATHS ───────────────────────────────────────────────────────
const INSTA_COCKTAIL = '/instaposts-imeages/menu_card_cocktails.jpg';
const INSTA_BOTTLE_LEFT = '/instaposts-imeages/menu_card_bottles.jpg';
const INSTA_BOTTLE_RIGHT = '/instaposts-imeages/vip_suite_champagne.jpg';
const INSTA_APPETIZER = '/instaposts-imeages/candlelit_intimate_dining.jpg';
const INSTA_SALAD = '/instaposts-imeages/salad.png';
const INSTA_PASTA = '/instaposts-imeages/menu_card_mains.jpg';
const INSTA_MAINS = '/instaposts-imeages/main_course2.jpg';
const INSTA_DESSERT = '/instaposts-imeages/drink_love_bomb.jpg';

export default function MenuPage({ onNavigate, initialCategory }: MenuPageProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>(initialCategory || 'cocktails');
  const [viewMode, setViewMode] = useState<ViewMode>('pdf-replica');
  const navScrollRef = useRef<HTMLDivElement>(null);

  const scrollNav = (dir: 'left' | 'right') => {
    if (navScrollRef.current) {
      navScrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const jumpToCategory = (id: string) => {
    setActiveSectionId(id);
    const el = document.getElementById(`menu-section-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 180;
      for (const sec of menu) {
        const el = document.getElementById(`menu-section-${sec.id}`);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSectionId(sec.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#080808] text-white">
      {/* ── STICKY NAV BAR ── */}
      <div className="sticky top-16 sm:top-20 z-40 mb-6 sm:mb-10 mx-2 sm:mx-8 p-1.5 sm:p-2 bg-ink-950/95 backdrop-blur-xl border border-gold-400/30 rounded-sm shadow-2xl flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Category pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 w-full md:w-auto md:flex-1 min-w-0">
          <button onClick={() => scrollNav('left')} aria-label="Scroll left"
            className="p-1.5 rounded-sm bg-ink-950/80 border border-gold-400/30 text-white hover:text-gold-200 hover:border-gold-400/60 transition-all shrink-0">
            <ChevronLeft size={16} />
          </button>
          <div ref={navScrollRef} className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1 w-full">
            {menu.map((sec) => (
              <button key={sec.id} onClick={() => jumpToCategory(sec.id)}
                className={`px-3 py-1.5 rounded-sm text-[10px] sm:text-[11px] font-fashion font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-all shrink-0 ${activeSectionId === sec.id
                    ? 'bg-gold-400 text-black border border-gold-400 shadow-md shadow-gold-400/20'
                    : 'bg-ink-950/80 border border-gold-400/30 text-white hover:text-gold-200 hover:border-gold-400/60'
                  }`}>{sec.label}</button>
            ))}
          </div>
          <button onClick={() => scrollNav('right')} aria-label="Scroll right"
            className="p-1.5 rounded-sm bg-ink-950/80 border border-gold-400/30 text-white hover:text-gold-200 hover:border-gold-400/60 transition-all shrink-0">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* View mode buttons */}
        <div className="flex items-center justify-center gap-1.5 bg-ink-950/80 p-1 rounded-sm border border-gold-400/30 w-full md:w-auto overflow-x-auto scrollbar-none shrink-0">
          {([
            ['pdf-replica', 'PDF REPLICA', FileText],
            ['bistro', 'BISTRO', ListFilter],
            ['grid', 'GRID', LayoutGrid],
            ['document', 'SPREADS', Layers],
          ] as const).map(([mode, label, Icon]) => (
            <button key={mode} onClick={() => setViewMode(mode as ViewMode)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-sm text-[9px] sm:text-[10px] font-fashion font-bold tracking-[0.14em] uppercase transition-all flex items-center gap-1.5 whitespace-nowrap ${
                viewMode === mode
                  ? 'bg-gold-400 text-black border border-gold-400 shadow-md shadow-gold-400/20'
                  : 'bg-ink-950/80 border border-gold-400/30 text-white hover:text-gold-200 hover:border-gold-400/60'
              }`}>
              <Icon size={12} className="shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* PDF REPLICA VIEW                                                  */}
      {/* ================================================================ */}
      {viewMode === 'pdf-replica' && (
        <div className="space-y-0">
          {/* ── PAGE 2: CRAFT COCKTAILS ── */}
          <section id="menu-section-cocktails" className="scroll-mt-32 w-full flex justify-center py-6 sm:py-10 px-4 sm:px-6 bg-[#080808]">
            {/* Desktop Pixel-Accurate Canvas (xl and above) */}
            <div
              className="hidden xl:block relative shrink-0 overflow-hidden shadow-2xl"
              style={{
                width: '1241px',
                height: '1754px',
                background: '#1B1B1B',
                backgroundImage: 'radial-gradient(circle at 50% 30%, #252525 0%, #1B1B1B 55%, #151515 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
              }}
            >
              {/* Logo */}
              <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <img src="/updatedLogo.png" alt="The Boulevard Lounge" style={{ height: '145px', width: '145px', borderRadius: '50%', border: '3px solid #D4AF37', boxShadow: '0 10px 25px rgba(212,175,55,0.4)', backgroundColor: '#000000', objectFit: 'cover', margin: '0 auto' }} />
              </div>

              {/* Header Title Section */}
              <div style={{ position: 'absolute', top: '215px', left: 0, right: 0, textAlign: 'center' }}>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '61px', fontWeight: 700, color: '#B58A3B', letterSpacing: '0.1em', lineHeight: 1, margin: 0 }}>
                  DRINKS
                </h1>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 600, color: '#F4F2EE', letterSpacing: '0.15em', margin: '10px 0 0 0' }}>
                  CRAFT COCKTAILS
                </h2>
                <div style={{
                  width: '236px',
                  height: '5px',
                  margin: '18px auto 0 auto',
                  background: 'linear-gradient(to right, #E1B74F 0%, #D2A23C 55%, #8C5E18 100%)',
                }} />
              </div>

              {/* Vertical Column Divider */}
              <div style={{
                position: 'absolute',
                left: '620px',
                top: '392px',
                width: '1px',
                height: '951px',
                background: '#86652A',
                opacity: 0.6,
              }} />

              {/* LEFT COLUMN */}
              <div style={{ position: 'absolute', left: '100px', top: '389px', width: '480px' }} className="space-y-[22px]">
                {[
                  { name: 'LIQUID GOLD', price: '$26', desc: 'Casamigos Reposado, Remy Martin VSOP, Pineapple & Mango, topped with prosecco: A rich taste of 24k gold leaf on top.' },
                  { name: 'MON CHERI', price: '$21', desc: 'Vodka, Elderflower, Italian Cherry Juice, Cranberry Juice, finished with a romantic smoke bubble.' },
                  { name: 'SUNRISE KISS', price: '$28', desc: 'Clase Azul, Grand Marnier, Pineapple Juice, with a cherry gradient: A luxury.' },
                  { name: 'LOVE BOMB', price: '$22', desc: 'Gin, Elderflower, Hibiscus, Raspberry, prosecco: A sexy glittery explosion while a hibiscus flower descends to the bottom.' },
                  { name: 'SPA SPRITZ', price: '$17', desc: 'Gin, cucumber juice, lime juice, prosecco: An effortlessly refreshing sip for pure relaxation.' },
                  { name: 'MELON MONROE', price: '$18', desc: 'Casamigos Blanco, Watermelon, jalapeño, Lime and agave: A perfect touch of spice, dangerously good.' },
                  { name: 'AFTERGLOW', price: '$17', desc: 'Aperol, Vanilla Vodka, Vanilla syrup, lemon juice: A perfect light bittersweet sip from day to night.' },
                  { name: 'BERRY BLVD', price: '$18', desc: 'Gin, Chambord, lemon juice, raspberry: A smooth blend of sour and sweet.' },
                  { name: 'RUM AWAY WITH ME', price: '$21', desc: 'Dark and Coconut Rum, Tropical fruity flavors with a hint of citrus: A Vacation in every sip.' },
                ].map((item) => (
                  <div key={item.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 600, color: '#B58A3B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {item.name}
                      </span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 500, color: '#B58A3B', whiteSpace: 'nowrap' }}>
                        {item.price}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Arial', 'Helvetica', sans-serif", fontSize: '15px', lineHeight: 1.4, color: '#EEECE8', margin: 0, fontWeight: 400 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ position: 'absolute', left: '660px', top: '389px', width: '480px' }} className="space-y-[24px]">
                {[
                  { name: 'THE NEXT BEST THING', price: '$17', desc: 'Vanilla Vodka, Passion Fruit, sour citrus, topped with Prosecco: Simple and sweet.' },
                  { name: 'FKN FIG MARTINI', price: '$19', desc: 'Fig and Vanilla vodka, Elderflower, Cranberry Juice: a perfect balance of tart and sweet.' },
                  { name: 'EMBER OLD FASHION', price: '$19', desc: 'Bourbon, Blood orange, Angostura Bitters and Orange Bitters: A Smoked wood finish.' },
                ].map((item) => (
                  <div key={item.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '27px', fontWeight: 600, color: '#B58A3B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {item.name}
                      </span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '25px', fontWeight: 500, color: '#B58A3B', whiteSpace: 'nowrap' }}>
                        {item.price}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Arial', 'Helvetica', sans-serif", fontSize: '16px', lineHeight: 1.45, color: '#EEECE8', margin: 0, fontWeight: 400 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Cocktail Image */}
              <div
                style={{
                  position: 'absolute',
                  left: '680px',
                  top: '917px',
                  width: '440px',
                  height: '425px',
                  transform: 'rotate(2deg)',
                  border: '4px solid #B58A3B',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  overflow: 'hidden',
                }}
              >
                <img src={INSTA_COCKTAIL} alt="Craft Cocktail" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              </div>

              {/* Footer Section */}
              <div style={{ position: 'absolute', top: '1410px', left: 0, right: 0, textAlign: 'center' }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#E4E0D9', letterSpacing: '2.5px', textTransform: 'uppercase', margin: 0 }}>
                  2636 Hylan Boulevard, Suite 115 • RSVP &amp; VIP Bottle Service: (718) 799-4232
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '11px', color: '#E4E0D9', letterSpacing: '2px', fontStyle: 'italic', margin: '6px 0 0 0' }}>
                  20% service fee added to all bills
                </p>
              </div>
            </div>

            {/* Mobile / Responsive Card View (xl:hidden) */}
            <div className="xl:hidden w-full max-w-3xl bg-[#1B1B1B] border border-[#B58A3B]/30 rounded-2xl p-5 sm:p-8 shadow-2xl space-y-6">
              <div className="text-center">
                <img src="/updatedLogo.png" alt="The Boulevard Lounge" className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-gold-300 shadow-xl shadow-gold-400/35 bg-black object-cover mx-auto mb-3" />
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#B58A3B] tracking-wider leading-none">DRINKS</h1>
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#F4F2EE] tracking-widest mt-1">CRAFT COCKTAILS</h2>
                <div className="w-32 h-1 mx-auto mt-3 bg-gradient-to-r from-[#E1B74F] via-[#D2A23C] to-[#8C5E18] rounded-full" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {[
                  { name: 'LIQUID GOLD', price: '$26', desc: 'Casamigos Reposado, Remy Martin VSOP, Pineapple & Mango, topped with prosecco: A rich taste of 24k gold leaf on top.' },
                  { name: 'MON CHERI', price: '$21', desc: 'Vodka, Elderflower, Italian Cherry Juice, Cranberry Juice, finished with a romantic smoke bubble.' },
                  { name: 'SUNRISE KISS', price: '$28', desc: 'Clase Azul, Grand Marnier, Pineapple Juice, with a cherry gradient: A luxury.' },
                  { name: 'LOVE BOMB', price: '$22', desc: 'Gin, Elderflower, Hibiscus, Raspberry, prosecco: A sexy glittery explosion while a hibiscus flower descends to the bottom.' },
                  { name: 'SPA SPRITZ', price: '$17', desc: 'Gin, cucumber juice, lime juice, prosecco: An effortlessly refreshing sip for pure relaxation.' },
                  { name: 'MELON MONROE', price: '$18', desc: 'Casamigos Blanco, Watermelon, jalapeño, Lime and agave: A perfect touch of spice, dangerously good.' },
                  { name: 'AFTERGLOW', price: '$17', desc: 'Aperol, Vanilla Vodka, Vanilla syrup, lemon juice: A perfect light bittersweet sip from day to night.' },
                  { name: 'BERRY BLVD', price: '$18', desc: 'Gin, Chambord, lemon juice, raspberry: A smooth blend of sour and sweet.' },
                  { name: 'RUM AWAY WITH ME', price: '$21', desc: 'Dark and Coconut Rum, Tropical fruity flavors with a hint of citrus: A Vacation in every sip.' },
                  { name: 'THE NEXT BEST THING', price: '$17', desc: 'Vanilla Vodka, Passion Fruit, sour citrus, topped with Prosecco: Simple and sweet.' },
                  { name: 'FKN FIG MARTINI', price: '$19', desc: 'Fig and Vanilla vodka, Elderflower, Cranberry Juice: a perfect balance of tart and sweet.' },
                  { name: 'EMBER OLD FASHION', price: '$19', desc: 'Bourbon, Blood orange, Angostura Bitters and Orange Bitters: A Smoked wood finish.' },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-serif text-lg font-semibold text-[#B58A3B] uppercase tracking-wide">{item.name}</span>
                      <span className="font-serif text-lg font-medium text-[#B58A3B] shrink-0">{item.price}</span>
                    </div>
                    <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <div className="w-full max-w-md mx-auto h-64 sm:h-72 border-4 border-[#B58A3B] rounded-xl overflow-hidden shadow-2xl rotate-1">
                  <img src={INSTA_COCKTAIL} alt="Craft Cocktail" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="pt-4 border-t border-[#B58A3B]/30 text-center space-y-1">
                <p className="font-sans text-[10px] sm:text-xs text-[#E4E0D9] tracking-widest uppercase">2636 Hylan Boulevard, Suite 115 • RSVP & VIP Bottle Service: (718) 799-4232</p>
                <p className="font-serif text-[10px] sm:text-xs text-[#E4E0D9] italic">20% service fee added to all bills</p>
              </div>
            </div>
          </section>

          {/* ── PAGE 3: BOTTLE RESERVE ── */}
          <section id="menu-section-bottle-reserve" className="scroll-mt-32 w-full bg-[#0a0a0a] min-h-screen flex flex-col lg:flex-row">
            {/* LEFT ambient photo (desktop only) */}
            <div className="hidden lg:block w-[28%] relative overflow-hidden shrink-0">
              <img src={INSTA_BOTTLE_LEFT} alt="Whiskey & Bottles" className="w-full h-full object-cover block" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/65" />
            </div>

            {/* Left gold border line */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-[#B58A3B] to-transparent shrink-0" />

            {/* CENTER column content */}
            <div className="flex-1 bg-[#0e0e0e] px-5 sm:px-12 py-12 lg:py-16 text-center flex flex-col justify-center">
              <img src="/updatedLogo.png" alt="Boulevard Lounge" className="w-14 h-14 rounded-full border-2 border-gold-300 shadow-xl shadow-gold-400/35 bg-black object-cover mx-auto mb-4" />

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F2EE] tracking-wide leading-tight">
                BOTTLE RESERVE
              </h2>
              <p className="font-sans text-xs font-bold text-[#B58A3B] tracking-[0.3em] mt-2 uppercase">
                PREMIUM BOTTLE RESERVE
              </p>

              <div className="mt-10 flex flex-col gap-6 max-w-xl mx-auto w-full">
                {[
                  { name: 'DON JULIO 1942 TEQUILA', price: '$565' },
                  { name: 'CLASE AZUL REPOSADO TEQUILA', price: '$525' },
                  { name: 'PATRÓN SILVER TEQUILA', price: '$295' },
                  { name: 'CASAMIGOS REPOSADO / BLANCO', price: '$295' },
                  { name: "TITO'S HANDMADE VODKA", price: '$295' },
                  { name: 'GREY GOOSE VODKA', price: '$295' },
                  { name: 'MOËT & CHANDON CHAMPAGNE', price: '$295' },
                  { name: 'VEUVE CLICQUOT BRUT CHAMPAGNE', price: '$295' },
                ].map((item) => (
                  <div key={item.name} className="border-b border-[#B58A3B]/10 pb-3 last:border-b-0">
                    <p className="font-serif text-base sm:text-lg font-semibold text-[#B58A3B] tracking-wider uppercase">
                      {item.name}
                    </p>
                    <p className="font-serif text-xl sm:text-2xl text-[#F4F2EE] mt-1 font-medium">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile Ambient Image preview */}
              <div className="lg:hidden mt-8 rounded-xl overflow-hidden border border-[#B58A3B]/30 h-48 sm:h-64 max-w-xl mx-auto w-full">
                <img src={INSTA_BOTTLE_RIGHT} alt="Bottle Service" className="w-full h-full object-cover" />
              </div>

              <div className="mt-10 pt-4 border-t border-[#B58A3B]/30">
                <p className="text-[#B58A3B] text-[10px] sm:text-xs tracking-widest uppercase font-sans">
                  2636 Hylan Boulevard, Suite 115 • RSVP & VIP Bottle Service: (718) 799-4232
                </p>
                <p className="text-[#E4E0D9] text-[10px] sm:text-xs italic mt-1 font-serif">
                  20% service fee added to all bills
                </p>
              </div>
            </div>

            {/* Right gold border line */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-[#B58A3B] to-transparent shrink-0" />

            {/* RIGHT ambient photo (desktop only) */}
            <div className="hidden lg:block w-[28%] relative overflow-hidden shrink-0">
              <img src={INSTA_BOTTLE_RIGHT} alt="Bottle Service" className="w-full h-full object-cover block" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-black/65" />
            </div>
          </section>

          {/* ── PAGE 4: HOOKAH VAULT ── */}
          <section id="menu-section-hookah-vault" className="scroll-mt-32 relative overflow-hidden flex flex-col lg:flex-row bg-[#080808] min-h-screen">
            {/* Left: hookah video */}
            <div className="w-full lg:w-[40%] h-64 sm:h-80 lg:h-auto relative shrink-0">
              <video src="/instaposts-imeages/shisha_hookah_lounge_web.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/10 to-black/60" />
            </div>

            {/* Right: menu content */}
            <div className="flex-1 px-5 sm:px-12 lg:px-20 py-10 lg:py-16 flex flex-col max-w-4xl">
              {/* Header */}
              <div className="text-center lg:text-right mb-8">
                <img src="/updatedLogo.png" alt="Boulevard Lounge" className="w-12 h-12 rounded-full border-2 border-gold-300 shadow-xl shadow-gold-400/35 bg-black object-cover mx-auto lg:ml-auto lg:mr-0 mb-3" />
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F2EE] tracking-wide leading-tight">
                  HOOKAH VAULT
                </h2>
                <p className="font-sans text-xs font-bold text-[#B58A3B] tracking-[0.3em] uppercase mt-1">
                  PREMIUM SHISHA BLENDS
                </p>
              </div>

              {/* CLASSIC PROFILES */}
              <div className="mb-6">
                <h3 className="font-sans text-sm sm:text-base font-bold text-[#B58A3B] tracking-widest uppercase text-center mb-4">
                  CLASSIC PROFILES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1px_1fr] gap-4 sm:gap-6">
                  <div>
                    <p className="font-serif text-base text-[#B58A3B] italic mb-2 text-center">Serbetli</p>
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-1">
                      {['Lime Peach Ice', 'Watermelon Ice', 'Passion Fruit Ice', 'Strawberry Ice', 'Blueberry Ice', 'Lemon Mint', 'Mint', 'Sweet Melon'].map(f => (
                        <p key={f} className="font-sans text-xs text-[#EEECE8] leading-relaxed">• {f}</p>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:block bg-[#B58A3B]/30 w-px" />
                  <div>
                    <p className="font-serif text-base text-[#B58A3B] italic mb-2 text-center">Adalya</p>
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-1">
                      {['Love 66', 'Lady Killer', 'Berlin Nights', 'Baku Nights', 'Blue Dragon', 'Mi Amor'].map(f => (
                        <p key={f} className="font-sans text-xs text-[#EEECE8] leading-relaxed">• {f}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex-1 h-px bg-[#B58A3B]/40" />
                  <span className="font-serif text-2xl text-[#F4F2EE] font-semibold">$50</span>
                  <div className="flex-1 h-px bg-[#B58A3B]/40" />
                </div>
              </div>

              {/* EXOTIC BOLD PROFILES */}
              <div className="mb-6">
                <h3 className="font-sans text-sm sm:text-base font-bold text-[#B58A3B] tracking-widest uppercase text-center sm:text-left mb-4">
                  EXOTIC BOLD PROFILES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1px_1fr] gap-4 sm:gap-6">
                  <div>
                    <p className="font-serif text-base text-[#B58A3B] italic mb-2">Dark Side</p>
                    <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">• Berrycolamist <span className="text-[10px] text-[#E4E0D9]">(Forest Berries & Cola)</span></p>
                    <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">• Citrusmist</p>
                    <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">• Skymist</p>
                  </div>
                  <div className="hidden sm:block bg-[#B58A3B]/30 w-px" />
                  <div>
                    <p className="font-serif text-base text-[#B58A3B] italic mb-2">Must Have</p>
                    <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">• Exotixmist <span className="text-[10px] text-[#E4E0D9]">(Mango, Passionfruit)</span></p>
                    <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">• Dessertmist</p>
                    <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">• Pinkislandmist.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex-1 h-px bg-[#B58A3B]/40" />
                  <span className="font-serif text-2xl text-[#F4F2EE] font-semibold">$60</span>
                  <div className="flex-1 h-px bg-[#B58A3B]/40" />
                </div>
              </div>

              {/* Bottom right info boxes */}
              <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3 justify-end">
                <div className="border border-[#B58A3B] rounded-lg p-3 text-center sm:min-w-[140px]">
                  <p className="font-serif text-sm text-[#B58A3B] italic font-semibold mb-1">Upgrade Base:</p>
                  <p className="font-sans text-xs text-[#EEECE8] leading-normal">Milk $10 | Wine $15<br />Fruit $20</p>
                </div>
                <div className="border border-[#B58A3B] rounded-lg p-3 text-center sm:min-w-[140px]">
                  <p className="font-serif text-sm text-[#B58A3B] italic font-semibold mb-1">Hookah Damage:</p>
                  <p className="font-sans text-xs text-[#EEECE8] leading-normal">Base $200 | Bowl $100<br />Kaloud $60</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-[#B58A3B]/30 text-center">
                <p className="color-[#B58A3B] text-[10px] sm:text-xs tracking-widest uppercase font-sans">
                  2636 Hylan Boulevard, Suite 115 • RSVP & VIP Bottle Service: (718) 799-4232
                </p>
                <p className="text-[#E4E0D9] text-[10px] sm:text-xs italic mt-1 font-serif">
                  20% service fee added to all bills
                </p>
              </div>
            </div>
          </section>

          {/* ── PAGE 5: APPETIZERS & FRESH SALADS ── */}
          <section id="menu-section-appetizers-salads" className="scroll-mt-32 bg-[radial-gradient(ellipse_at_50%_0%,_#131208_0%,_#0a0a0a_70%)] min-h-screen">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 space-y-8">
              <div className="text-center pt-4">
                <img src="/updatedLogo.png" alt="Boulevard Lounge" className="w-14 h-14 rounded-full border-2 border-gold-300 shadow-xl shadow-gold-400/35 bg-black object-cover mx-auto" />
              </div>

              {/* TOP HALF: APPETIZERS + Photo */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#B58A3B] tracking-wide">
                    APPETIZERS
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {[
                      { name: 'GOLDEN CRISPY CALAMARI', price: '$16.95', desc: 'Lightly breaded and seasoned, served with house-made zesty marinara.' },
                      { name: 'SOUTH SHORE BAKED CLAMS', price: '$16.95', desc: 'Littleneck clams baked with seasoned garlic scampi butter wine sauce.' },
                      { name: 'SIGNATURE LOUNGE WINGS', price: '$14.95', desc: 'Crispy wings tossed in classic BBQ or Buffalo: side of ranch or blue cheese.' },
                      { name: 'LOUNGE TENDERS', price: '$13.95', desc: 'Pieces of hand-tossed white meat chicken tenders fried golden crisp.' },
                      { name: 'THE BIG CHEESE STICKS', price: '$11.95', desc: 'Golden-fried mozzarella logs paired with a warm rich marinara side.' },
                      { name: 'THE HYLAN BRUSCHETTA', price: '$13.95', desc: 'Crisp rustic bread crusts loaded with diced tomatoes, onions, garlic, olive oil.' },
                      { name: 'HIGH-PILE NACHOS', price: '$14.95', desc: 'Chicken, chili, cheddar cheese and guacamole.' },
                    ].map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="font-serif text-base sm:text-lg font-semibold text-[#B58A3B] tracking-wide uppercase">{item.name}</h4>
                          <span className="font-serif text-base font-semibold text-[#F4F2EE] shrink-0">{item.price}</span>
                        </div>
                        <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative w-full h-64 sm:h-80 lg:h-[420px] rounded-xl lg:rounded-none overflow-hidden border-2 border-[#B58A3B]">
                  <img src={INSTA_APPETIZER} alt="Charcuterie Platter" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* BOTTOM HALF: Photo + FRESH SALADS */}
              <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start pt-6 border-t border-[#B58A3B]/20">
                <div className="order-2 lg:order-1 relative w-full h-64 sm:h-80 lg:h-[420px] rounded-xl lg:rounded-none overflow-hidden border-2 border-[#B58A3B]">
                  <img src={INSTA_SALAD} alt="Caesar Salad" className="w-full h-full object-cover" />
                </div>

                <div className="order-1 lg:order-2 space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F2EE] tracking-wide">
                      FRESH <span className="text-[#B58A3B]">SALADS</span>
                    </h2>
                    <p className="font-sans text-xs text-[#EEECE8] tracking-wide mt-1">
                      Enhancements: Chicken +$5 | Steak +$7 | Shrimp +$7
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {[
                      { name: "THE EMPEROR'S CAESAR", price: '$14.95', desc: 'Romaine hearts, shaved parmigiano, garlic croutons, house dressing.' },
                      { name: 'THE STATEN ROCKET ARUGULA SALAD', price: '$14.95', desc: 'Arugula, fresh berries, cranberries, walnuts, and goat or blue cheese with raspberry dressing.' },
                      { name: 'THE CAPRESE CLASSIC', price: '$14.95', desc: 'Fresh mozzarella, vine tomatoes, basil & balsamic reduction.' },
                      { name: 'THE BOULEVARD GREEK', price: '$14.95', desc: 'Cucumbers, tomatoes, Kalamata olives, red onion & feta cheese.' },
                    ].map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="font-serif text-base sm:text-lg font-semibold text-[#B58A3B] tracking-wide uppercase">{item.name}</h4>
                          <span className="font-serif text-base font-semibold text-[#F4F2EE] shrink-0">{item.price}</span>
                        </div>
                        {item.desc && <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">{item.desc}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-[#B58A3B]/30 text-center">
                <p className="text-[#B58A3B] text-[10px] sm:text-xs tracking-widest uppercase font-sans">
                  2636 Hylan Boulevard, Suite 115 • RSVP & VIP Bottle Service: (718) 799-4232
                </p>
                <p className="text-[#E4E0D9] text-[10px] sm:text-xs italic mt-1 font-serif">
                  20% service fee added to all bills
                </p>
              </div>
            </div>
          </section>

          {/* ── PAGE 6: PASTA CRAFT & MAIN COURSES ── */}
          <section id="menu-section-pasta-mains" className="scroll-mt-32 bg-[radial-gradient(ellipse_at_50%_100%,_#131208_0%,_#0a0a0a_70%)] min-h-screen">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 space-y-8">
              {/* TOP HALF: Pasta photo + PASTA CRAFT */}
              <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
                <div className="order-2 lg:order-1 relative w-full h-64 sm:h-80 lg:h-[420px] rounded-xl lg:rounded-none overflow-hidden border-2 border-[#B58A3B]">
                  <img src={INSTA_PASTA} alt="Pasta Craft" className="w-full h-full object-cover" />
                </div>

                <div className="order-1 lg:order-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#B58A3B] tracking-wide">
                      PASTA CRAFT
                    </h2>
                    <img src="/updatedLogo.png" alt="Boulevard Lounge" className="w-12 h-12 rounded-full border-2 border-gold-300 shadow-xl shadow-gold-400/35 bg-black object-cover" />
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'THE HYLAN VODKA PENNE', price: '$17.95', desc: 'Penne in our velvety pink vodka cream sauce.' },
                      { name: 'THE GRAND SEAFOOD PASTA', price: '$20.95', desc: 'Fiery rosa sauce, fresh diced tomatoes, ocean calamari, and tender clam meat.' },
                      { name: 'SUN-KISSED PESTO PASTA', price: '$20.95', desc: 'Tender pasta tossed in rich pesto sauce, topped with fresh cherry tomatoes and creamy burrata.' },
                    ].map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="font-serif text-base sm:text-lg font-semibold text-[#B58A3B] tracking-wide uppercase">{item.name}</h4>
                          <span className="font-serif text-base font-semibold text-[#F4F2EE] shrink-0">{item.price}</span>
                        </div>
                        {item.desc && <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">{item.desc}</p>}
                      </div>
                    ))}
                  </div>

                  {/* SAUCES / ADD box */}
                  <div className="grid grid-cols-2 border border-[#B58A3B]/40 rounded-lg overflow-hidden bg-[#0d0d0d]">
                    <div className="p-3 sm:p-4 border-r border-[#B58A3B]/40">
                      <p className="font-serif text-xs sm:text-sm font-bold text-[#B58A3B] tracking-widest mb-1">SAUCES</p>
                      <p className="font-sans text-[11px] text-[#EEECE8] leading-relaxed">ALFREDO SAUCE<br />GARLIC AND OIL</p>
                    </div>
                    <div className="p-3 sm:p-4">
                      <p className="font-serif text-xs sm:text-sm font-bold text-[#B58A3B] tracking-widest mb-1">ADD</p>
                      <p className="font-sans text-[11px] text-[#EEECE8] leading-relaxed">CHICKEN $5 | STEAK $7 |<br />SHRIMP $7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM HALF: MAIN COURSES + Photo */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start pt-6 border-t border-[#B58A3B]/20">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#B58A3B] tracking-wide">
                    MAIN COURSES
                  </h2>
                  <div className="space-y-4">
                    {[
                      { name: 'THE HYLAN SIZZLER', price: '$27.95', desc: 'Char-grilled skirt steak, garlic mashed potatoes, roasted seasonal vegetables.' },
                      { name: 'THE STATEN FRANCESE', price: '$23.95', desc: 'Egg-battered chicken pan-seared in a velvety white wine, lemon, and butter reduction.' },
                      { name: 'THE SOUTH SHORE SALMON', price: '$25.95', desc: 'Pan-roasted filet with garlic-dill cream sauce, mashed potatoes, and seasonal greens.' },
                      { name: 'THE HYLAN HOOK FISH TACOS', price: '$17.95', desc: 'Tempura salmon topped with guacamole, cilantro, chipotle sauce, and a kick of hot sauce.' },
                    ].map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="font-serif text-base sm:text-lg font-semibold text-[#B58A3B] tracking-wide uppercase">{item.name}</h4>
                          <span className="font-serif text-base font-semibold text-[#F4F2EE] shrink-0">{item.price}</span>
                        </div>
                        <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative w-full h-64 sm:h-80 lg:h-[440px] rounded-xl lg:rounded-none overflow-hidden border-2 border-[#B58A3B]">
                  <img src={INSTA_MAINS} alt="Main Courses" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-[#B58A3B]/30 text-center">
                <p className="text-[#B58A3B] text-[10px] sm:text-xs tracking-widest uppercase font-sans">
                  2636 Hylan Boulevard, Suite 115 • RSVP & VIP Bottle Service: (718) 799-4232
                </p>
                <p className="text-[#E4E0D9] text-[10px] sm:text-xs italic mt-1 font-serif">
                  20% service fee added to all bills
                </p>
              </div>
            </div>
          </section>

          {/* ── PAGE 7: PLATTERS, SANDWICHES, DESSERTS & CAFÉS ── */}
          <section id="menu-section-platters-sandwiches" className="scroll-mt-32 bg-[radial-gradient(ellipse_at_50%_0%,_#131208_0%,_#0a0a0a_70%)] min-h-screen">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 space-y-8">
              <div className="text-center pt-2">
                <img src="/updatedLogo.png" alt="Boulevard Lounge" className="w-14 h-14 rounded-full border-2 border-gold-300 shadow-xl shadow-gold-400/35 bg-black object-cover mx-auto" />
              </div>

              {/* Two-column layout on desktop, stacked on mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* LEFT COLUMN: PLATTERS + SANDWICHES */}
                <div className="space-y-8">
                  {/* LOUNGE PLATTERS */}
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#B58A3B] tracking-wide mb-5">
                      LOUNGE PLATTERS
                    </h2>
                    <div className="space-y-4">
                      {[
                        { name: 'THE ARTISAN RESERVE BOARD', price: '$31.95', desc: 'Artisan beef sausage, beef prosciutto, rich Greek feta, fresh mozzarella, and sharp pecorino.' },
                        { name: 'THE TRIPLE THREAT DIP', price: '$16.95', desc: 'House-made tzatziki, signature hummus, and spicy whipped feta served with warm pita.' },
                        { name: 'THE LOUNGE SLIDERS', price: '$18.95', desc: '4 mini beef brioche sliders topped with American cheese, pickles, served with golden fries.' },
                        { name: 'THE TODT HILL TRUFFLE FRIES', price: '$13.95', desc: 'Golden fries tossed in aromatic truffle oil & aged parmesan.' },
                        { name: 'LOUNGE CUT FRIES', price: '$10.95', desc: 'Crispy seasoned house fries.' },
                      ].map((item) => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex justify-between items-baseline gap-2">
                            <h4 className="font-serif text-base sm:text-lg font-semibold text-[#B58A3B] tracking-wide uppercase">{item.name}</h4>
                            <span className="font-serif text-base font-semibold text-[#F4F2EE] shrink-0">{item.price}</span>
                          </div>
                          {item.desc && <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">{item.desc}</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-[#B58A3B]/30" />

                  {/* GOURMET SANDWICHES */}
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#B58A3B] tracking-wide mb-5">
                      GOURMET SANDWICHES
                    </h2>
                    <div className="space-y-4">
                      {[
                        { name: 'THE HYLAN PASTRAMI', price: '$16.95', desc: 'Sliced hot pastrami, fresh mozzarella, lettuce, tomato, chipotle glaze, seasoned fries.' },
                        { name: 'THE TENDER HERO', price: '$16.95', desc: 'Crispy golden chicken tenders, melted mozzarella, lettuce, tomato, chipotle mayo, fries.' },
                        { name: 'THE PRIME LOUNGE BURGER', price: '$16.95', desc: 'White cheese, lettuce, tomato and pickles, served with french fries.' },
                      ].map((item) => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex justify-between items-baseline gap-2">
                            <h4 className="font-serif text-base sm:text-lg font-semibold text-[#B58A3B] tracking-wide uppercase">{item.name}</h4>
                            <span className="font-serif text-base font-semibold text-[#F4F2EE] shrink-0">{item.price}</span>
                          </div>
                          <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: DESSERTS + CAFÉS */}
                <div className="space-y-8">
                  {/* DESSERTS */}
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#B58A3B] tracking-wide mb-5">
                      DESSERTS
                    </h2>
                    <div className="space-y-4">
                      {[
                        { name: 'THE MIDNIGHT BUZZ TIRAMISU', price: '$12.95', desc: 'Classic espresso soaked ladyfingers with whipped mascarpone.' },
                        { name: 'DECADENT DARK MOUSSE', price: '$12.95', desc: 'With Vanilla Ice cream.' },
                      ].map((item) => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex justify-between items-baseline gap-2">
                            <h4 className="font-serif text-base sm:text-lg font-semibold text-[#B58A3B] tracking-wide uppercase">{item.name}</h4>
                            <span className="font-serif text-base font-semibold text-[#F4F2EE] shrink-0">{item.price}</span>
                          </div>
                          {item.desc && <p className="font-sans text-xs text-[#EEECE8] leading-relaxed">{item.desc}</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-[#B58A3B]/30" />

                  {/* CAFÉS & SOFT DRINKS */}
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#B58A3B] tracking-wide mb-5">
                      CAFÉS & SOFT DRINKS
                    </h2>
                    <div className="space-y-3">
                      {[
                        { name: 'ESPRESSO / MACCHIATO', price: '$4.00' },
                        { name: 'SAN PELLEGRINO', price: '$4.00' },
                        { name: 'DOUBLE ESPRESSO / LATTE', price: '$6.00' },
                        { name: 'CAPPUCCINO', price: '$6.00' },
                        { name: 'PREMIUM SODAS', price: '$4.50', desc: 'Coke, Diet Coke, Sprite, Ginger Ale.' },
                      ].map((item) => (
                        <div key={item.name} className="space-y-0.5">
                          <div className="flex justify-between items-baseline gap-2">
                            <h4 className="font-serif text-base font-semibold text-[#B58A3B] tracking-wide uppercase">{item.name}</h4>
                            <span className="font-serif text-base font-semibold text-[#F4F2EE] shrink-0">{item.price}</span>
                          </div>
                          {item.desc && <p className="font-sans text-xs text-[#EEECE8]">{item.desc}</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coffee photo */}
                  <div className="border border-[#B58A3B] rounded-xl overflow-hidden h-56 sm:h-64 mt-6">
                    <img src={INSTA_DESSERT} alt="Boulevard Coffee & Desserts" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-[#B58A3B]/30 text-center">
                <p className="text-[#B58A3B] text-[10px] sm:text-xs tracking-widest uppercase font-sans">
                  2636 Hylan Boulevard, Suite 115 • RSVP & VIP Bottle Service: (718) 799-4232
                </p>
                <p className="text-[#E4E0D9] text-[10px] sm:text-xs italic mt-1 font-serif">
                  20% service fee added to all bills
                </p>
              </div>
            </div>
          </section>

          {/* ── PAGE 8: THE SUNSET SOIRÉE (HAPPY HOUR) ── */}
          <section id="menu-section-happy-hour" className="scroll-mt-32 relative overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-16 bg-[#080808]">
            <div className="absolute top-0 left-0 w-1/4 h-full opacity-30 bg-gradient-to-br from-[#B58A3B] to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/4 h-full opacity-30 bg-gradient-to-bl from-[#B58A3B] to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/5 h-1/2 opacity-20 bg-gradient-to-tr from-[#86652A] to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-1/5 h-1/2 opacity-20 bg-gradient-to-tl from-[#86652A] to-transparent pointer-events-none" />

            <div className="absolute inset-4 sm:inset-6 border-2 border-[#B58A3B] pointer-events-none" />

            <div className="relative text-center max-w-xl w-full py-4 space-y-6">
              <img src="/updatedLogo.png" alt="Boulevard Lounge" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-gold-300 shadow-xl shadow-gold-400/35 bg-black object-cover mx-auto" />

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F2EE] tracking-wide leading-tight">
                THE SUNSET SOIRÉE
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#B58A3B]" />
                <span className="font-serif text-xl sm:text-2xl text-[#B58A3B] italic font-semibold">Happy Hours</span>
                <div className="flex-1 h-px bg-[#B58A3B]" />
              </div>

              <p className="font-sans text-xs sm:text-sm font-bold text-[#F4F2EE] tracking-widest uppercase">
                SUNDAY THROUGH THURSDAY | 5:00 PM – 9:00 PM
              </p>

              <div className="space-y-6 pt-2">
                <div>
                  <h3 className="font-serif text-xl text-[#B58A3B] italic">Hookah Vault</h3>
                  <p className="font-sans text-xs text-[#EEECE8]">(Light Blends Only)</p>
                  <p className="font-serif text-3xl text-[#F4F2EE] font-bold mt-1">$40</p>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#B58A3B] italic mb-1">Appetizers & Fresh Salads</h3>
                  <p className="font-sans text-xs text-[#EEECE8] leading-relaxed max-w-md mx-auto">
                    • The Emperor's Caesar &nbsp;• Signature Lounge Wings &nbsp;• Lounge Tenders<br />
                    • The Big Cheese Sticks &nbsp;• The Hylan Bruschetta
                  </p>
                  <p className="font-serif text-3xl text-[#F4F2EE] font-bold mt-1">$10</p>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#B58A3B] italic">House Desserts</h3>
                  <p className="font-serif text-3xl text-[#F4F2EE] font-bold mt-1">$10</p>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#B58A3B] italic">Select Beers</h3>
                  <p className="font-sans text-xs text-[#EEECE8]">(Import & Domestic)</p>
                  <p className="font-serif text-3xl text-[#F4F2EE] font-bold mt-1">$5</p>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#B58A3B] italic">House Wines</h3>
                  <p className="font-serif text-3xl text-[#F4F2EE] font-bold mt-1">$7</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#B58A3B]/30 text-center">
                <p className="text-[#B58A3B] text-[10px] sm:text-xs tracking-widest uppercase font-sans">
                  2636 Hylan Boulevard, Suite 115 • RSVP & VIP Bottle Service: (718) 799-4232
                </p>
                <p className="text-[#E4E0D9] text-[10px] sm:text-xs italic mt-1 font-serif">
                  20% service fee added to all bills
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ================================================================ */}
      {/* PDF DOCUMENT SPREADS VIEW (original images)                      */}
      {/* ================================================================ */}
      {viewMode === 'document' && (
        <div className="space-y-12 max-w-4xl mx-auto px-4">
          {pdfDocumentSpreads.map((spread) => (
            <div key={spread.id} id={`menu-section-${spread.id}`} className="scroll-mt-32 rounded-xl overflow-hidden shadow-2xl">
              <img src={spread.imageSrc} alt={spread.title} className="w-full h-auto block" />
            </div>
          ))}
        </div>
      )}

      {/* ================================================================ */}
      {/* BISTRO / GRID MODES                                              */}
      {/* ================================================================ */}
      {(viewMode === 'bistro' || viewMode === 'grid') && (
        <div className="space-y-20 max-w-7xl mx-auto px-4 sm:px-8">
          {menu.map((section) => (
            <div key={section.id} id={`menu-section-${section.id}`} className="scroll-mt-32 space-y-8">
              {/* Category header */}
              <div className="relative rounded-2xl p-6 sm:p-10 bg-[#0f0f0f] border border-[#B58A3B]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
                <div className="space-y-2 max-w-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B58A3B] block">— CATEGORY SELECTION</span>
                  <h2 className="font-fashion text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F4F2EE] tracking-tight">{section.label}</h2>
                  <p className="text-xs sm:text-sm text-[#EEECE8] font-light leading-relaxed">
                    {section.groups[0]?.blurb || 'Handcrafted signature selection crafted with premium spirits & ingredients.'}
                  </p>
                </div>
                <div className="w-full md:w-56 h-32 rounded-xl overflow-hidden border border-[#B58A3B]/40 shadow-xl shrink-0 bg-black">
                  <img src={section.groups[0]?.image || INSTA_COCKTAIL} alt={section.label} className="w-full h-full object-cover" />
                </div>
              </div>

              {section.groups.map((group) => (
                <div key={group.id} className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between border-b border-[#B58A3B]/20 pb-3 gap-3">
                    <div>
                      <h3 className="font-fashion text-2xl font-semibold text-[#B58A3B]">{group.title}</h3>
                      <p className="text-xs text-[#EEECE8]">{group.blurb}</p>
                    </div>
                    {group.enhancements && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#B58A3B]/10 border border-[#B58A3B]/30 text-[#B58A3B] text-xs font-semibold">
                        <Info size={14} /> {group.enhancements}
                      </div>
                    )}
                  </div>

                  {/* Bistro mode */}
                  {viewMode === 'bistro' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {group.items.map((item) => (
                        <div key={item.name} className="bg-[#0f0f0f] rounded-2xl p-5 border border-[#B58A3B]/20 hover:border-[#B58A3B]/60 transition-all shadow-xl flex items-center justify-between gap-4 group">
                          {item.image && (
                            <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#B58A3B]/30 shrink-0 bg-black">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-baseline justify-between gap-3">
                              <h4 className="font-fashion text-lg font-semibold text-[#F4F2EE] group-hover:text-[#B58A3B] transition-colors truncate">{item.name}</h4>
                              <span className="font-fashion text-xl font-bold text-[#B58A3B] shrink-0">${item.price}</span>
                            </div>
                            {item.description && <p className="text-xs text-[#EEECE8] font-light leading-relaxed line-clamp-2">{item.description}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Grid mode */}
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.items.map((item) => (
                        <div key={item.name} className="bg-[#0f0f0f] rounded-2xl p-5 border border-[#B58A3B]/20 hover:border-[#B58A3B]/60 transition-all shadow-xl flex flex-col space-y-3 group">
                          {item.image && (
                            <div className="relative h-44 rounded-xl overflow-hidden bg-black border border-[#B58A3B]/20">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <span className="absolute bottom-2.5 right-2.5 font-fashion text-lg font-bold text-black bg-gradient-to-r from-[#B58A3B] via-[#F4E7C5] to-[#86652A] px-3 py-0.5 rounded-lg shadow-lg">${item.price}</span>
                            </div>
                          )}
                          <div className="flex items-baseline justify-between gap-3">
                            <h4 className="font-fashion text-lg font-semibold text-[#F4F2EE] group-hover:text-[#B58A3B] transition-colors">{item.name}</h4>
                            {!item.image && <span className="font-fashion text-lg font-bold text-[#B58A3B] shrink-0">${item.price}</span>}
                          </div>
                          {item.description && <p className="text-xs text-[#EEECE8] font-light leading-relaxed">{item.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-20 text-center max-w-xl mx-auto px-4 py-8 rounded-3xl bg-[#0f0f0f] border border-[#B58A3B]/30 shadow-2xl space-y-4 mx-4 sm:mx-auto">
        <div className="w-12 h-12 bg-[#B58A3B]/10 text-[#B58A3B] rounded-full grid place-items-center mx-auto border border-[#B58A3B]/40">
          <Sparkles size={24} />
        </div>
        <h3 className="font-fashion text-2xl text-[#F4F2EE] font-semibold">Reserve Your Table</h3>
        <p className="text-xs text-[#EEECE8] leading-relaxed font-light">
          Experience our craft cocktails, fine dining, and VIP lounge atmosphere live at Staten Island's premier lounge.
        </p>
        <button onClick={() => onNavigate('reservations')}
          className="btn-gold py-3 px-8 text-xs inline-flex items-center gap-2">
          BOOK TABLE NOW <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
