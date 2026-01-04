import { useState, useEffect, useRef } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import FloatingVideo from './components/FloatingVideo';
import MagicBento from './components/MagicBento';
import FloatingLines from './components/FloatingLines';
import './index.css';

// Lerp function for smooth interpolation
const lerp = (start, end, factor) => start + (end - start) * factor;

function App() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    // Update target scroll on actual scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollRef.current = Math.min(scrollTop / docHeight, 1);
    };

    // Lerp animation loop for smooth scroll
    const animate = () => {
      // Lerp factor: 0.12 = responsive but smooth (was 0.08 which was laggy)
      currentScrollRef.current = lerp(currentScrollRef.current, targetScrollRef.current, 0.12);

      // Update state for re-render
      setScrollPercent(currentScrollRef.current);

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // Empty dependency - only run once

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
        const bentoHoldUntil = 0.47;
        const bentoGoneAt = 0.50;
        const startDistance = 500;
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

      {/* FloatingLines Background - appears after video disappears */}
      {(() => {
        // Timing: appear right after video goes (85%), smooth blend in
        const linesStartAt = 0.85;  // Start earlier, right as video fades
        const linesFullAt = 0.98;   // Longer transition for smooth blend

        let linesOpacity = 0;

        if (scrollPercent < linesStartAt) {
          // Not visible yet
          linesOpacity = 0;
        } else if (scrollPercent >= linesStartAt && scrollPercent <= linesFullAt) {
          // Smooth fade in with easeInOut curve
          const progress = (scrollPercent - linesStartAt) / (linesFullAt - linesStartAt);
          // Smoother easing: cubic ease-in-out
          linesOpacity = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        } else {
          // Fully visible
          linesOpacity = 1;
        }

        return (
          <div
            className="fixed inset-0"
            style={{
              zIndex: 30,
              pointerEvents: 'auto',
              opacity: linesOpacity,
              willChange: 'opacity',
              cursor: 'default',
            }}
          >
            <FloatingLines
              enabledWaves={['top', 'middle', 'bottom']}
              lineCount={11}
              lineDistance={14.5}
              bendRadius={30}
              bendStrength={15}
              animationSpeed={2}
              interactive
              mouseDamping={0.05}
              parallax
              parallaxStrength={0.2}
              mixBlendMode="normal"
            />
          </div>
        );
      })()}

      {/* Scroll Progress Indicator */}
      <div className="glass fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-full flex items-center gap-4">
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
