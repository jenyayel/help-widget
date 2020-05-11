import { useRef, useEffect } from 'preact/hooks';

export const useIsMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
    });
    return isMounted;
};

/** Schedules method for later and returns cancellation method. */
export const useTimeout = (callback: () => void, delay: number) => {
    const savedCallback = useRef(callback);
    const cancel = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        cancel.current = setTimeout(savedCallback.current, delay);
    }, [delay]);

    return () => cancel.current && clearTimeout(cancel.current);
};
