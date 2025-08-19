"use client";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
const WaveTrack = () => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref.current) {
            WaveSurfer.create({
                container: ref.current,
                waveColor: "rgb(200, 0, 200)",
                progressColor: "rgb(100, 0, 100)",
                url: "/audio/hoidanit.m4a",
            });
        }
    }, []);
    return <div ref={ref}>abcdasdas</div>;
};
export default WaveTrack;
