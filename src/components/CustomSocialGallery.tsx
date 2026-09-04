import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const socialPosts = [
  {
    image: '/instaposts-imeages/event_afro_house.jpg',
    likes: '1,420',
    comments: '88',
    caption: 'Staten Island nights hit different at Boulevard 🔥 #BoulevardLounge #StatenIslandNightlife',
  },
  {
    image: '/instaposts-imeages/artisanal_tequila_shots.jpg',
    likes: '980',
    comments: '45',
    caption: 'Love Spell Martini pours all night long 🍸 #CraftCocktails #BoulevardNights',
  },
  {
    image: '/instaposts-imeages/menu_card_hookah.jpg',
    likes: '2,150',
    comments: '112',
    caption: 'Smoke. Sip. Stay a while 💨 Fresh pineapple fruit head hookah! #HookahLounge',
  },
  {
    image: '/instaposts-imeages/event_vip_saturday.jpg',
    likes: '1,890',
    comments: '76',
    caption: 'Birthday celebrations done right with VIP bottle service! 🍾🎂 #BoulevardSaturdays',
  },
];

export const CustomSocialGallery: React.FC = () => {
  return (
    <section className="relative py-10 sm:py-16 md:py-24 bg-ink-900/60 border-b border-gold-400/20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 section-tag">
            <InstagramIcon size={14} className="text-gold-400" />
            @BOULEVARDLOUNGENY
          </div>
          <h2 className="section-title text-4xl sm:text-5xl uppercase tracking-wider">
            SEE WHAT THE WEEKEND LOOKS LIKE.
          </h2>
          <p className="section-desc mx-auto mt-2">
            Real moments from our weekend DJ sessions, cocktail pours, and guest celebrations.
          </p>
        </div>

        {/* 4 INSTAGRAM CARD GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPosts.map((post, idx) => (
            <a
              key={idx}
              href="https://instagram.com/boulevardloungeny"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-sm overflow-hidden border border-gold-400/20 hover:border-gold-400/60 transition-all duration-500 group relative block shadow-xl"
            >
              <div className="relative h-72 overflow-hidden bg-ink-950">
                <img
                  src={post.image}
                  alt="Boulevard Social Post"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-ink-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-ink-100">
                  <div className="flex items-center gap-1.5 font-bold font-fashion text-lg">
                    <Heart size={20} className="text-gold-400 fill-current" /> {post.likes}
                  </div>
                  <div className="flex items-center gap-1.5 font-bold font-fashion text-lg">
                    <MessageCircle size={20} className="text-gold-400 fill-current" /> {post.comments}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-ink-950/90 border-t border-gold-400/15">
                <p className="text-xs text-ink-300 line-clamp-2 italic">
                  "{post.caption}"
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="mt-14 text-center">
          <a
            href="https://instagram.com/boulevardloungeny"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold py-4 px-8 text-sm inline-flex items-center gap-2"
          >
            <InstagramIcon size={18} /> FOLLOW @BOULEVARDLOUNGENY
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomSocialGallery;
