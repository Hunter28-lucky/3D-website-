export default function HeroSection({ scrollPercent }) {
    // Calculate 3D transforms based on scroll
    const zMove = scrollPercent * 1500;
    const scale = Math.max(1 - scrollPercent * 0.4, 0.1);
    const opacity = Math.max(1 - scrollPercent * 2.5, 0);

    const heroStyle = {
        transform: `translateZ(-${zMove}px) scale(${scale})`,
        opacity: opacity,
    };

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-10 pointer-events-none"
            style={{ perspective: '1000px' }}
        >
            <div
                className="text-center"
                style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                    ...heroStyle
                }}
            >
                <p
                    className="text-xs sm:text-sm uppercase tracking-[0.35em] mb-8"
                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}
                >
                    Welcome to the vision
                </p>
                <h1
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide mb-6"
                    style={{ fontFamily: "'Orbitron', sans-serif", lineHeight: 1 }}
                >
                    <span className="block text-white">The Future</span>
                    <span className="block gradient-text">Is Now</span>
                </h1>
                <p
                    className="text-sm sm:text-base max-w-md mx-auto"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                >
                    Scroll to explore the journey
                </p>
            </div>
        </div>
    );
}
