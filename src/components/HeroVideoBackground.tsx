import React, { useState, useEffect, useRef } from 'react';

const heroVideos = [
  '/creating_cocktail.mp4',
  '/zippo_hookah_nyc_1786838287_3964609220871727428_70254809970.mp4',
  '/dj_booth_video.mp4',
  '/boulevard_saturdays.mp4',
  '/story_hero_video_web.mp4',
];

export const HeroVideoBackground: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const currentVideo = videoRefs.current[activeVideoIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [activeVideoIndex]);

  const handleVideoEnd = () => {
    setActiveVideoIndex((prevIndex) => (prevIndex + 1) % heroVideos.length);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-ink-950">
      {heroVideos.map((videoSrc, idx) => {
        const isActive = idx === activeVideoIndex;
        return (
          <video
            key={videoSrc}
            ref={(el) => {
              videoRefs.current[idx] = el;
            }}
            src={videoSrc}
            muted
            autoPlay={idx === 0}
            preload="auto"
            playsInline
            onEnded={handleVideoEnd}
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-opacity duration-1000 ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          />
        );
      })}

      {/* BALANCED LIGHTER GRADIENT OVERLAYS FOR HIGH VISIBILITY & LEGIBILITY */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-ink-950/80 via-ink-950/35 to-ink-950 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-ink-950/85 via-ink-950/25 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroVideoBackground;
