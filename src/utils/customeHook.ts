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

    // Read from localStorage only after mount.
    // If we did this in useState's initializer (even with `window` guards),
    // the server-rendered HTML could differ from the client’s initial render in the browser,
    // causing hydration issues.
    const item = window.localStorage.getItem(key);
    useEffect(() => {
        try {
            if (item) {
                setValue(JSON.parse(item));
            }
        } catch (e) {
            console.log(e);
        }
        return () => {
            // Reset the mounted flag when key changes, so that the next effect
            // doesn't accidentally write an old value under the new key.
            isMounted.current = false;
        };
    }, [key]);

    useEffect(() => {
        // Skip writing on the very first render (when we're still reading from localStorage).
        if (isMounted.current) {
            window.localStorage.setItem(key, JSON.stringify(value));
        } else {
            isMounted.current = true;
        }
    }, [key, value]);

    return [value, setValue];
}
