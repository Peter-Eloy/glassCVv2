import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "../../contexts/index";
import { glassStyles } from "../../styles/glassEffects";
import styled from "@emotion/styled";

const ShineContainer = styled(Box)`
  &.shine {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: shine 2s infinite;
    }

    @keyframes shine {
      0% {
        left: -100%;
        opacity: 0;
      }
      20% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
      80% {
        opacity: 0.5;
      }
      100% {
        left: 150%;
        opacity: 0;
      }
    }
  }
`;

const GlassContainerStacked = ({
  children,
  isActive,
  onClick,
  index,
  height,
  showShine,
}) => {
  const { isDarkMode } = useTheme();
  const themeStyles = isDarkMode ? glassStyles.dark : glassStyles.light;

  return (
    <ShineContainer
      onClick={onClick}
      className={showShine && isActive ? "shine" : ""}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: height ? `${height}px` : "auto",
        padding: "0px",
        ...glassStyles.shared,
        ...themeStyles,
        cursor: "pointer",
        "&:hover": {
          transform: `translateY(${index * 5}px) translateY(-2px)`,
          transition: "transform 0.2s ease-in-out",
        },
        transform: `translateY(${index * 5}px)`,
        zIndex: isActive ? 100 : 10 - index,
        opacity: isActive ? 1 : 0.7,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden", // Important for shine effect
      }}
    >
      <Box
        sx={{
          padding: "20px",
          width: "100%",
          textAlign: "center",
          color: themeStyles.color,
        }}
      >
        {children}
      </Box>
    </ShineContainer>
  );
};

GlassContainerStacked.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  height: PropTypes.number,
};

const StackedGlassContainers = ({ containers, showShine }) => {
  const [containerOrder, setContainerOrder] = useState(containers);
  const [maxHeight, setMaxHeight] = useState(0);
  const containerRefs = useRef([]);

  useEffect(() => {
    containerRefs.current = containerRefs.current.slice(0, containers.length);

    const calculateMaxHeight = () => {
      const heights = containerRefs.current.map(
        (ref) => ref?.offsetHeight || 0
      );
      const newMaxHeight = Math.max(...heights);
      if (newMaxHeight !== maxHeight) {
        setMaxHeight(newMaxHeight);
      }
    };

    calculateMaxHeight();

    window.addEventListener("resize", calculateMaxHeight);
    return () => window.removeEventListener("resize", calculateMaxHeight);
  }, [containers, containerOrder, maxHeight]);

  const handleContainerClick = () => {
    setContainerOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      const firstElement = newOrder.shift();
      newOrder.push(firstElement);
      return newOrder;
    });
  };

  const stackingOffset = (containers.length - 1) * 5;
  const totalHeight = maxHeight + stackingOffset;

  return (
    <Box
      sx={{
        position: "relative",
        height: totalHeight,
        margin: "16px",
        overflow: "visible",
      }}
    >
      {/* Hidden containers for measurement */}
      <Box
        sx={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {containerOrder.map((content, index) => (
          <Box
            key={`measure-${index}`}
            ref={(el) => (containerRefs.current[index] = el)}
            sx={{ padding: "20px" }}
          >
            {content}
          </Box>
        ))}
      </Box>

      {/* Visible stacked containers */}
      {containerOrder.map((content, index) => (
        <GlassContainerStacked
          key={`container-${index}`}
          index={index}
          isActive={index === 0}
          onClick={handleContainerClick}
          height={maxHeight}
          showShine={showShine && index === 0} // Only show shine on active container
        >
          {content}
        </GlassContainerStacked>
      ))}
    </Box>
  );
};

GlassContainerStacked.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  height: PropTypes.number,
  showShine: PropTypes.bool,
};

StackedGlassContainers.propTypes = {
  containers: PropTypes.arrayOf(PropTypes.node).isRequired,
  showShine: PropTypes.bool,
};

export default StackedGlassContainers;
