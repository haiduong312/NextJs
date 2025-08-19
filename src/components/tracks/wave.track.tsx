"use client";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { useSearchParams } from "next/navigation";
const WaveTrack = () => {
    const searchParams = useSearchParams();
    const fileName = searchParams.get("audio");
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref.current) {
            WaveSurfer.create({
                container: ref.current,
                waveColor: "rgb(200, 0, 200)",
                progressColor: "rgb(100, 0, 100)",
                url: `/api?audio=${fileName}`,
            });
        }
    }, []);
    return <div ref={ref}>abcdasdas</div>;
};
export default WaveTrack;
