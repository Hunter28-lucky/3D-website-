import { useRef, useState } from 'react';

export default function FloatingVideo({ scrollPercent }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Timing parameters
    const videoStartAt = 0.5;
    const videoEndAt = 0.8;
    const videoDisappearAt = 0.85;
    const videoGoneAt = 0.95;
    const videoStartDistance = 2000;
    const videoStartScale = 2.5;
    const disappearDistance = 2000;

    let videoZ = -videoStartDistance;
    let videoScale = videoStartScale;
    let videoOpacity = 0;

    if (scrollPercent < videoStartAt) {
        // Not visible yet
        videoOpacity = 0;
        videoZ = -videoStartDistance;
        videoScale = videoStartScale;
    } else if (scrollPercent >= videoStartAt && scrollPercent <= videoEndAt) {
        // Transitioning IN
        const progress = (scrollPercent - videoStartAt) / (videoEndAt - videoStartAt);
        videoZ = -videoStartDistance + progress * videoStartDistance;
        videoScale = videoStartScale - progress * (videoStartScale - 1);
        const fadeProgress = Math.pow(progress, 1.5);
        videoOpacity = fadeProgress;
    } else if (scrollPercent > videoEndAt && scrollPercent < videoDisappearAt) {
        // Fully visible
        videoZ = 0;
        videoScale = 1;
        videoOpacity = 1;
    } else if (scrollPercent >= videoDisappearAt && scrollPercent <= videoGoneAt) {
        // Transitioning OUT
        const disappearProgress = (scrollPercent - videoDisappearAt) / (videoGoneAt - videoDisappearAt);
        videoZ = -disappearProgress * disappearDistance;
        videoScale = 1 - disappearProgress * 0.5;
        videoOpacity = 1 - disappearProgress;
    } else {
        // Gone
        videoOpacity = 0;
        videoZ = -disappearDistance;
        videoScale = 0.5;
    }

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div
            className="fixed top-1/2 left-1/2 z-20"
            style={{
                perspective: '1000px',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <div
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                    width: '60vw',
                    maxWidth: '800px',
                    aspectRatio: '16/9',
                    transform: `translateZ(${videoZ}px) scale(${Math.max(videoScale, 0.1)})`,
                    opacity: Math.max(videoOpacity, 0),
                    boxShadow: '0 25px 80px rgba(0, 212, 255, 0.25), 0 10px 30px rgba(0, 212, 255, 0.15)',
                    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                }}
                onClick={handlePlayPause}
            >
                <video
                    ref={videoRef}
                    playsInline
                    loop
                    preload="auto"
                    className="w-full h-full object-cover"
                >
                    <source
                        src="/Abstract_Sci-Fi_Environment_VJ_Motion_Background_dark_theme_Free_footage_720p_1.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Play Overlay */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center"
                            style={{
                                background: 'rgba(0, 212, 255, 0.2)',
                                border: '2px solid rgba(0, 212, 255, 0.5)',
                            }}
                        >
                            <div
                                className="w-0 h-0 ml-1"
                                style={{
                                    borderLeft: '20px solid white',
                                    borderTop: '12px solid transparent',
                                    borderBottom: '12px solid transparent',
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
