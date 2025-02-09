export const TOUR_CONFIG = {
  splashScreen: {
    fadeInDelay: 500, // Delay before showing Hello
    displayTime: 2000, // How long to show the splash screen
    fadeOutTime: 500, // How long the fade out animation takes
    text: "Hello", // The text to display
    letterAppearDuration: 200, // Duration for each letter to appear/disappear
    letterShineDelay: 100, // Delay for shine effect relative to letter appearance
  },
  guidedText: {
    fadeInDuration: 800,
    shineDelay: 800,
    shineDuration: 1000,
    fadeOutDelay: 1800, // shineDelay + shineDuration
    fadeOutDuration: 800,
  },
  tourSteps: [
    {
      id: "contact",
      type: "text",
      text: "Here you can find my contact information",
      targetRef: "firstGlassContainerRef",
    },
    {
      id: "stack",
      type: "text",
      text: "Click to explore my tech stack",
      targetRef: "stackedGlassRef",
    },
    {
      id: "menu",
      type: "menu",
      text: "Access quick navigation here",
      action: "handleMenuOpen",
    },
  ],
};

export default TOUR_CONFIG;
