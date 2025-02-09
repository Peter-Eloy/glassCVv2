// components/welcomeExperience/tourGuide/index.jsx
import { useState, useEffect } from "react";
import GuidedText from "../guidedText";

const TourGuide = ({ refs, onComplete, onMenuOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      type: "text",
      text: "Contact",
      targetRef: refs?.firstGlassContainerRef,
    },
    {
      type: "text",
      text: "Click Me",
      targetRef: refs?.stackedGlassRef,
    },
    {
      type: "menu",
      text: "Menu",
      action: onMenuOpen,
    },
  ];

  const handleStepComplete = () => {
    const nextStep = currentStep + 1;

    if (nextStep >= steps.length) {
      onComplete?.();
      return;
    }

    // If next step is menu, trigger menu open
    if (steps[nextStep].type === "menu") {
      steps[nextStep].action?.();
      // Wait a bit after menu opens before completing tour
      setTimeout(onComplete, 1000);
      return;
    }

    setCurrentStep(nextStep);
  };

  const currentStepData = steps[currentStep];

  if (!currentStepData || currentStepData.type === "menu") return null;

  return (
    <GuidedText
      text={currentStepData.text}
      targetRef={currentStepData.targetRef}
      active={true}
      onComplete={handleStepComplete}
    />
  );
};

export default TourGuide;
