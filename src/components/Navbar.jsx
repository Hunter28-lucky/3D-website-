import { useEffect, useRef } from 'react';
import './Navbar.css';

export default function Navbar() {
    const containerRef = useRef(null);
    const pupilRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current || !pupilRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const iconCenter = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            };

            const dx = e.clientX - iconCenter.x;
            const dy = e.clientY - iconCenter.y;
            const angle = Math.atan2(dy, dx);
            const maxDist = 3;
            const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 50);
            const moveDist = (dist / 50) * maxDist;
            const moveX = Math.cos(angle) * moveDist;
            const moveY = Math.sin(angle) * moveDist;

            pupilRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <nav
            className="glass fixed top-5 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-full flex items-center justify-center gap-3"
            style={{
                width: 'fit-content',
                boxShadow: '0 0 15px rgba(0, 212, 255, 0.4), inset 0 0 10px rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
            }}
        >
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs"
                    style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        color: 'var(--primary)',
                    }}
                >
                    ◆
                </div>
                <span
                    className="text-sm font-bold tracking-widest"
                    style={{ fontFamily: "'Orbitron', sans-serif", color: 'var(--text)' }}
                >
                    NEXUS
                </span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex gap-4">
                {['Home', 'About', 'Work', 'Contact'].map((link) => (
                    <a
                        key={link}
                        href="#"
                        className="text-xs font-medium transition-colors hover:text-white"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                    >
                        {link}
                    </a>
                ))}
            </div>

            {/* Eye Button */}
            <div
                ref={containerRef}
                className="w-8 h-8 relative flex items-center justify-center"
            >
                <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                        border: '2px solid rgba(0, 212, 255, 0.3)',
                        background: 'transparent',
                        boxShadow: '0 0 15px rgba(0, 212, 255, 0.2)',
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                    >
                        <path
                            d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                            stroke="#00d4ff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle
                            ref={pupilRef}
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="#00d4ff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ transition: 'transform 0.08s ease-out' }}
                        />
                    </svg>
                </div>
            </div>
        </nav>
    );
}
