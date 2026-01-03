import { useEffect, useRef } from 'react';

export default function BackgroundVideo({ scrollPercent }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !video.duration) return;

        video.currentTime = scrollPercent * video.duration;
    }, [scrollPercent]);

    return (
        <div className="fixed top-0 left-0 w-full h-full z-0">
            <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
            >
                <source
                    src="/Abstract_Sci-Fi_Environment_VJ_Motion_Background_dark_theme_Free_footage_720p_1.mp4"
                    type="video/mp4"
                />
            </video>
        </div>
    );
}
