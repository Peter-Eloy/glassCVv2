// components/welcomeExperience/guidedText/index.jsx
import { useEffect, useState } from "react";
import "./styles.css";

const GuidedText = ({ text, targetRef, active, onComplete }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [animationState, setAnimationState] = useState("initial"); // 'initial', 'visible', 'shining', 'fadeout'

  useEffect(() => {
    if (targetRef?.current && active) {
      const updatePosition = () => {
        const rect = targetRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top - 40, // Position above the element
          left: rect.left + rect.width / 2, // Center horizontally
        });
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);

      // Animation sequence timings
      const fadeInDuration = 800;
      const shineDelay = 800;
      const shineDuration = 1000;
      const fadeOutDelay = shineDelay + shineDuration;
      const fadeOutDuration = 800;
      const totalDuration = fadeOutDelay + fadeOutDuration;

      // Start animation sequence
      const sequence = async () => {
        setAnimationState("visible");

        setTimeout(() => {
          setAnimationState("shining");
        }, shineDelay);

        setTimeout(() => {
          setAnimationState("fadeout");
        }, fadeOutDelay);

        setTimeout(() => {
          onComplete?.();
        }, totalDuration);
      };

      sequence();

      return () => {
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [targetRef, active, onComplete]);

  if (!active || !targetRef?.current) return null;

  return (
    <div
      className={`guided-text ${animationState}`}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
      }}
    >
      {text}
    </div>
  );
};

export default GuidedText;
