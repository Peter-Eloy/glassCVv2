// src/theme/styled.js
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const GlassBox = styled(Box)(({ theme, variant = "default" }) => ({
  ...theme.styles.glass.base,
  background: theme.colors.glass.background,
  borderColor: theme.colors.glass.border,
  ...(variant === "shine" && theme.styles.glass.shine),
}));

export const ShineOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    -45deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transform: rotate(-45deg);
  animation: ${({ theme }) => theme.animations.shine} 4s
    cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;

export const AnimatedText = styled.div`
  font-family: "Playfair Display", serif;
  animation: ${({ theme }) => theme.animations.fadeIn} 1s ease-in;
  color: ${({ theme }) => theme.colors.text.primary};
`;
