import { useState, useEffect } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
};

// wavesurfer hook
export const useWaveSurfer = (
    ref: React.RefObject<HTMLDivElement>,
    options: Omit<WaveSurferOptions, "container">
) => {
    const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
    useEffect(() => {
        if (!ref.current) return;
        const ws = WaveSurfer.create({
            ...options,
            container: ref.current,
        });
        setWaveSurfer(ws);
        return () => {
            ws.destroy();
        };
    }, [options, ref]);
    return waveSurfer;
};
