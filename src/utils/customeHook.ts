import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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

export default function useLocalStorage<T>(
    key: string,
    defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
    const isMounted = useRef(false);
    const [value, setValue] = useState<T>(defaultValue);

    // Chỉ đọc localStorage sau khi mount (client-only)
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setValue(JSON.parse(item));
            }
        } catch (e) {
            console.warn("useLocalStorage read error:", e);
        }

        return () => {
            isMounted.current = false;
        };
    }, [key]);

    // Viết lại localStorage khi value thay đổi
    useEffect(() => {
        if (isMounted.current) {
            try {
                window.localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn("useLocalStorage write error:", e);
            }
        } else {
            isMounted.current = true;
        }
    }, [key, value]);

    return [value, setValue];
}
