"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useWaveSurfer } from "@/utils/customeHook";
const WaveTrack = () => {
    const searchParams = useSearchParams();
    const fileName = searchParams.get("audio");
    const ref = useRef<HTMLDivElement>(null);

    const optionsMemo = useMemo(() => {
        return {
            waveColor: "rgb(200, 0, 200)",
            progressColor: "rgb(100, 0, 100)",
            url: `/api?audio=${fileName}`,
        };
    }, []);
    const wavesurfer = useWaveSurfer(ref, optionsMemo);

    return <div ref={ref}>abcdasdas</div>;
};
export default WaveTrack;
