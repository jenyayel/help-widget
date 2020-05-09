import { useRef, useEffect } from 'preact/hooks';

export const useIsMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
    });
    return isMounted;
};

export const useTimeout = (callback: () => void, delay: number) => {
    const savedCallback = useRef(callback);
    useEffect(() => {
        setTimeout(savedCallback.current, delay);
    }, [delay]);
};
