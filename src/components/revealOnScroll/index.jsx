import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const RevealOnScroll = ({ children, delay = 0, sx = {} }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

RevealOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  sx: PropTypes.object,
};

export default RevealOnScroll;
