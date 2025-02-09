// src/hooks/useWelcomeTour.js
import { useState, useEffect, useRef } from 'react';
import { CookieService } from '../services/cookieService';

const useWelcomeTour = () => {
    const [tourStep, setTourStep] = useState(-1); // -1: not started, 0: splash, 1+: tour steps
    const [showWelcome, setShowWelcome] = useState(false);

    // Refs for tour targets
    const firstGlassContainerRef = useRef(null);
    const stackedGlassRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        // Check if user has seen welcome
        const hasSeenWelcome = CookieService.hasSeenWelcome();
        setShowWelcome(!hasSeenWelcome);

        if (!hasSeenWelcome) {
            setTourStep(0); // Start with splash screen
        }
    }, []);

    const handleSplashComplete = () => {
        setTourStep(1); // Move to first tour step
    };

    const handleTourComplete = () => {
        setShowWelcome(false);
        CookieService.markWelcomeAsSeen();
    };

    const handleMenuOpen = () => {
        // Add any specific menu opening logic here
    };

    return {
        showWelcome,
        tourStep,
        refs: {
            firstGlassContainerRef,
            stackedGlassRef,
            menuButtonRef
        },
        handlers: {
            handleSplashComplete,
            handleTourComplete,
            handleMenuOpen
        }
    };
};

export default useWelcomeTour;