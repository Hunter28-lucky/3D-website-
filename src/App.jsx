import { useState, useEffect } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import FloatingVideo from './components/FloatingVideo';
import MagicBento from './components/MagicBento';
import './index.css';

function App() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = Math.min(scrollTop / docHeight, 1);
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Background Video */}
      <BackgroundVideo scrollPercent={scrollPercent} />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection scrollPercent={scrollPercent} />

      {/* Floating Video */}
      <FloatingVideo scrollPercent={scrollPercent} />

      {/* Magic Bento Grid - appears after hero text fades, disappears before video */}
      {(() => {
        // Timing: appear after hero text (15%), disappear before video (45%)
        const bentoStartAt = 0.22;
        const bentoFullAt = 0.30;
        const bentoHoldUntil = 0.35;
        const bentoGoneAt = 0.50;
        const startDistance = 2000;
        const startScale = 0.5;

        let bentoZ = -startDistance;
        let bentoScale = startScale;
        let bentoOpacity = 0;

        if (scrollPercent < bentoStartAt) {
          // Not visible yet - in the distance
          bentoOpacity = 0;
          bentoZ = -startDistance;
          bentoScale = startScale;
        } else if (scrollPercent >= bentoStartAt && scrollPercent <= bentoFullAt) {
          // Coming from distance to center
          const progress = (scrollPercent - bentoStartAt) / (bentoFullAt - bentoStartAt);
          bentoZ = -startDistance + progress * startDistance;
          bentoScale = startScale + progress * (1 - startScale);
          bentoOpacity = Math.pow(progress, 1.2);
        } else if (scrollPercent > bentoFullAt && scrollPercent < bentoHoldUntil) {
          // Fully visible at center
          bentoZ = 0;
          bentoScale = 1;
          bentoOpacity = 1;
        } else if (scrollPercent >= bentoHoldUntil && scrollPercent <= bentoGoneAt) {
          // Going away into the front
          const disappearProgress = (scrollPercent - bentoHoldUntil) / (bentoGoneAt - bentoHoldUntil);
          bentoZ = disappearProgress * startDistance;
          bentoScale = 1 + disappearProgress * 0.5;
          bentoOpacity = 1 - Math.pow(disappearProgress, 0.8);
        } else {
          // Gone
          bentoOpacity = 0;
          bentoZ = startDistance;
          bentoScale = 1.5;
        }

        return (
          <div
            className="fixed top-1/2 left-1/2 z-15"
            style={{
              perspective: '1000px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                transform: `translateZ(${bentoZ}px) scale(${Math.max(bentoScale, 0.1)})`,
                opacity: Math.max(bentoOpacity, 0),
                transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                willChange: 'transform, opacity',
              }}
            >
              <MagicBento
                spotlightRadius={260}
                enableTilt
                enableMagnetism
                glowColor="0, 212, 255"
              />
            </div>
          </div>
        );
      })()}

      {/* Scroll Progress Indicator */}
      <div className="glass fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full flex items-center gap-4">
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${scrollPercent * 100}%`,
              background: 'var(--gradient)',
            }}
          />
        </div>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {Math.round(scrollPercent * 100)}%
        </span>
      </div>
    </div>
  );
}

export default App;
