import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { menu, type MenuSubItem } from '@/data/menu';
import type { PageId } from './Navbar';

type BoulevardMenuSectionProps = {
  onNavigate: (page: PageId, categoryId?: string) => void;
};

const categoryCards = [
  {
    id: 'mains',
    tag: 'FINE DINING & PASTA',
    title: 'Pasta & Main Courses',
    description: 'Char-grilled skirt steak, egg-battered chicken francese, and artisanal seafood pastas.',
    image: '/instaposts-imeages/menu_card_mains.jpg',
    imageAlt: 'Fine dining luxury steak and dish',
    targetCategoryId: 'pasta-craft',
  },
  {
    id: 'cocktails',
    tag: 'THE CRAFT BAR',
    title: 'Craft Cocktails',
    description: 'Our mixologists brew artful pours with 24k gold leaf, smoke bubbles, and edible flowers.',
    image: '/instaposts-imeages/menu_card_cocktails.jpg',
    imageAlt: 'Signature crafted cocktail',
    featured: true,
    targetCategoryId: 'craft-cocktails',
  },
  {
    id: 'hookah',
    tag: 'HOOKAH VAULT',
    title: 'Hookah Vault',
    description: 'Love Spell, Boulevard Nights, Blue Mist Luxe, White Peach Guava & custom fruit heads.',
    image: '/instaposts-imeages/menu_card_hookah.jpg',
    imageAlt: 'Golden hookah pipe',
    targetCategoryId: 'house-signature-blends',
  },
  {
    id: 'vip',
    tag: 'EXCLUSIVE BOTTLES',
    title: 'Bottle Reserve',
    description: 'Don Julio 1942, Clase Azul Reposado, Casamigos, and Champagne bottle service.',
    image: '/instaposts-imeages/menu_card_bottles.jpg',
    imageAlt: 'VIP lounge bottle service ambiance',
    targetCategoryId: 'premium-bottle-reserve',
  },
];

const menuTabs = [
  { id: 'CRAFT COCKTAILS', label: 'CRAFT COCKTAILS', targetCategoryId: 'craft-cocktails' },
  { id: 'APPETIZERS', label: 'APPETIZERS', targetCategoryId: 'appetizers' },
  { id: 'PASTA & MAINS', label: 'PASTA & MAINS', targetCategoryId: 'pasta-craft' },
  { id: 'BOTTLE RESERVE', label: 'BOTTLE RESERVE', targetCategoryId: 'premium-bottle-reserve' },
];

export const BoulevardMenuSection: React.FC<BoulevardMenuSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('CRAFT COCKTAILS');
  const [activeCard, setActiveCard] = useState<string>('cocktails');

  // Find active items based on active tab
  const currentTabConfig = menuTabs.find((t) => t.id === activeTab);
  const activeItems: MenuSubItem[] = React.useMemo(() => {
    if (!currentTabConfig) return [];
    for (const section of menu) {
      for (const group of section.groups) {
        if (group.id === currentTabConfig.targetCategoryId) {
          return group.items;
        }
      }
    }
    return menu[0]?.groups[0]?.items || [];
  }, [currentTabConfig]);

  const handleCardClick = (card: typeof categoryCards[number]) => {
    setActiveCard(card.id);
    onNavigate('menu', card.targetCategoryId);
  };

  const handleTabClick = (tab: typeof menuTabs[number]) => {
    setActiveTab(tab.id);
    onNavigate('menu', tab.targetCategoryId);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-5 sm:px-8 py-[100px]">
      {/* TOP CENTERED HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="font-fashion text-xs tracking-[0.25em] font-semibold text-gold-400 uppercase block mb-3">
          CULINARY & SPIRITS
        </span>
        <h2 className="font-fashion text-4xl sm:text-5xl lg:text-6xl font-light text-ink-100 leading-tight mb-4">
          The Boulevard Menu
        </h2>
        <p className="font-body text-xs sm:text-sm text-ink-300 font-light leading-relaxed max-w-xl mx-auto">
          Immerse yourself in an extraordinary culinary journey. Every dish and cocktail is crafted with passion and precision.
        </p>
      </div>

      {/* 4 FEATURED CATEGORY CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {categoryCards.map((card) => {
          const isSelected = activeCard === card.id;
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`group cursor-pointer relative h-[380px] sm:h-[420px] rounded-sm overflow-hidden border transition-all duration-500 shadow-xl flex flex-col justify-end p-6 ${
                isSelected
                  ? 'border-gold-400 ring-1 ring-gold-400/50 glow-gold scale-[1.02]'
                  : 'border-gold-400/20 hover:border-gold-400/60 hover:-translate-y-1'
              }`}
            >
              {/* CARD BACKGROUND IMAGE */}
              <div className="absolute inset-0 z-0">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
              </div>

              {/* CARD OVERLAY CONTENT */}
              <div className="relative z-10">
                <span className="font-fashion text-[11px] tracking-[0.22em] font-semibold text-gold-400 uppercase block mb-2">
                  {card.tag}
                </span>
                <h3 className="font-fashion text-2xl sm:text-3xl font-light text-ink-100 leading-tight mb-2 group-hover:text-gold-300 transition-colors">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="font-body text-xs text-ink-300 font-light leading-relaxed mb-4 line-clamp-3">
                    {card.description}
                  </p>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('menu', card.targetCategoryId);
                  }}
                  className="inline-flex items-center gap-1.5 font-fashion text-[11px] font-semibold tracking-[0.18em] uppercase text-gold-400 group-hover:gap-2.5 transition-all"
                >
                  VIEW CATEGORY <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CATEGORY TABS NAVBAR WITH GOLD ACTIVE UNDERLINE */}
      <div className="border-b border-gold-400/20 mb-10">
        <div className="flex items-center justify-center gap-8 sm:gap-12 overflow-x-auto no-scrollbar">
          {menuTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`pb-4 text-xs sm:text-sm font-fashion tracking-[0.2em] font-semibold uppercase whitespace-nowrap transition-all relative ${
                  isActive
                    ? 'text-gold-400'
                    : 'text-ink-300 hover:text-ink-100'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-400 rounded-full shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE CATEGORY ITEMS GRID PREVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeItems.slice(0, 4).map((item) => (
          <div
            key={item.name}
            onClick={() => onNavigate('menu', currentTabConfig?.targetCategoryId)}
            className="cursor-pointer group glass-panel rounded-sm p-4 border border-gold-400/20 hover:border-gold-400/50 transition-all flex flex-col justify-between"
          >
            {item.image && (
              <div className="h-40 rounded-sm overflow-hidden mb-3 bg-ink-950 border border-gold-400/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-fashion text-lg text-ink-100 font-light group-hover:text-gold-400 transition-colors">
                  {item.name}
                </h4>
                <span className="font-fashion text-base text-gold-400 font-normal ml-2">${item.price}</span>
              </div>
              {item.description && (
                <p className="font-body text-xs text-ink-300 mt-1 line-clamp-2 font-light">{item.description}</p>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-gold-400/15 flex items-center justify-between">
              <span className="font-fashion text-[11px] tracking-[0.18em] uppercase text-gold-400 font-semibold group-hover:underline">
                Explore & Order &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FULL MENU BUTTON */}
      <div className="mt-12 text-center">
        <button
          onClick={() => onNavigate('menu')}
          className="btn-gold py-3.5 px-8 text-[10px] tracking-[0.18em]"
        >
          EXPLORE FULL MENU PROGRAM &rarr;
        </button>
      </div>
    </section>
  );
};

export default BoulevardMenuSection;
