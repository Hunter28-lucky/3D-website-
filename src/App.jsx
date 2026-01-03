import { useState, useEffect } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import FloatingVideo from './components/FloatingVideo';
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
