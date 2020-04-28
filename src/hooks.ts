import { useRef, useEffect } from 'preact/hooks';

export const useIsMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
    });
    return isMounted;
};
