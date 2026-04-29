import { useState, useEffect } from 'react';

/**
 * Hook that tracks the visual viewport height.
 * This is the most accurate way to handle mobile keyboard layout shifts,
 * as it provides the height of the actual visible area above the keyboard.
 */
export const useVisualViewport = () => {
    const [viewportHeight, setViewportHeight] = useState<number>(
        window.visualViewport?.height || window.innerHeight
    );

    useEffect(() => {
        if (!window.visualViewport) return;

        const handleResize = () => {
            setViewportHeight(window.visualViewport!.height);
        };

        window.visualViewport.addEventListener('resize', handleResize);
        window.visualViewport.addEventListener('scroll', handleResize);

        return () => {
            window.visualViewport?.removeEventListener('resize', handleResize);
            window.visualViewport?.removeEventListener('scroll', handleResize);
        };
    }, []);

    return viewportHeight;
};

export default useVisualViewport;
