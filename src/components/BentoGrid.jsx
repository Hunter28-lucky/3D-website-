export default function BentoGrid({ scrollPercent }) {
    // Only show when hero is gone (after 60% scroll)
    const showBento = scrollPercent > 0.6;
    const bentoOpacity = showBento ? Math.min((scrollPercent - 0.6) / 0.2, 1) : 0;

    const bentoItems = [
        {
            title: "Lightning Fast",
            description: "Experience blazing performance with our optimized architecture",
            icon: "⚡",
            className: "md:col-span-2 md:row-span-2",
        },
        {
            title: "Modern Design",
            description: "Clean and intuitive interfaces",
            icon: "🎨",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            title: "Secure",
            description: "Enterprise-grade security",
            icon: "🔒",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            title: "Scalable",
            description: "Grows with your needs seamlessly across any platform",
            icon: "📈",
            className: "md:col-span-2 md:row-span-1",
        },
        {
            title: "24/7 Support",
            description: "Always here to help",
            icon: "💬",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            title: "Analytics",
            description: "Deep insights at your fingertips",
            icon: "📊",
            className: "md:col-span-1 md:row-span-1",
        },
    ];

    if (!showBento) return null;

    return (
        <section
            className="fixed inset-0 z-15 flex items-center justify-center px-8"
            style={{
                opacity: bentoOpacity,
                transition: 'opacity 0.3s ease-out',
                pointerEvents: bentoOpacity > 0.5 ? 'auto' : 'none',
            }}
        >
            <div className="max-w-6xl w-full">
                <h2
                    className="text-3xl md:text-5xl font-bold text-center mb-12"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                    <span className="gradient-text">Why Choose Us</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-fr">
                    {bentoItems.map((item, index) => (
                        <div
                            key={index}
                            className={`glass rounded-2xl p-6 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300 ${item.className}`}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            <div>
                                <span className="text-4xl mb-4 block">{item.icon}</span>
                                <h3
                                    className="text-xl font-semibold mb-2"
                                    style={{ color: 'var(--primary)' }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
