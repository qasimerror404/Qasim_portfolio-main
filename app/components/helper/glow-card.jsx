"use client"

import { useEffect, useState, useRef } from 'react';

const GLOW_CONFIG = {
  proximity: 40,
  spread: 80,
  blur: 12,
  gap: 32,
  vertical: false,
  opacity: 0,
};

const GlowCard = ({ children, identifier }) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Set mounted state - ensures DOM access happens only in browser
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run the DOM manipulation after component is mounted in browser
    if (!isMounted) return;

    const handleUpdate = (event) => {
      if (!event) return;
      
      const cards = cardsRef.current;
      
      for (const card of cards) {
        if (!card) continue;
        
        const cardBounds = card.getBoundingClientRect();

        if (
          event?.x > cardBounds.left - GLOW_CONFIG.proximity &&
          event?.x < cardBounds.left + cardBounds.width + GLOW_CONFIG.proximity &&
          event?.y > cardBounds.top - GLOW_CONFIG.proximity &&
          event?.y < cardBounds.top + cardBounds.height + GLOW_CONFIG.proximity
        ) {
          card.style.setProperty('--active', 1);
        } else {
          card.style.setProperty('--active', GLOW_CONFIG.opacity);
        }

        const cardCenter = [
          cardBounds.left + cardBounds.width * 0.5,
          cardBounds.top + cardBounds.height * 0.5,
        ];

        let angle =
          (Math.atan2(event?.y - cardCenter[1], event?.x - cardCenter[0]) *
            180) /
          Math.PI;

        angle = angle < 0 ? angle + 360 : angle;

        card.style.setProperty('--start', angle + 90);
      }
    };

    const restyle = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--gap', GLOW_CONFIG.gap);
        containerRef.current.style.setProperty('--blur', GLOW_CONFIG.blur);
        containerRef.current.style.setProperty('--spread', GLOW_CONFIG.spread);
        containerRef.current.style.setProperty(
          '--direction',
          GLOW_CONFIG.vertical ? 'column' : 'row'
        );
      }
    };

    // Query DOM elements only after mounting
    const container = document.querySelector(`.glow-container-${identifier}`);
    const cards = document.querySelectorAll(`.glow-card-${identifier}`);
    
    containerRef.current = container;
    cardsRef.current = cards;

    restyle();

    // Only add event listener if we're in the browser
    document.body.addEventListener('pointermove', handleUpdate);

    // Cleanup event listener
    return () => {
      document.body.removeEventListener('pointermove', handleUpdate);
    };
  }, [identifier, isMounted]);

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}>
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;