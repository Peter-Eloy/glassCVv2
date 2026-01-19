// src/styles/navigationArrows.jsx
import styled from "@emotion/styled";

export const NavigationArrow = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;

  /* Responsive positioning - arrows placed symmetrically at equal distances from viewport edges */
  /* Perfect mirror symmetry: same pixel value from left and right edges */
  &.prev {
    /* Mobile and small tablets - no sidebar */
    @media (max-width: 899px) {
      left: 10px;
    }
    /* Tablets and small laptops */
    @media (min-width: 900px) and (max-width: 1199px) {
      left: 226px;
    }
    /* MacBook Pro 13" and similar (1200-1439px) */
    @media (min-width: 1200px) and (max-width: 1439px) {
      left: 226px;
    }
    /* Standard laptops and MacBook Pro 14" (1440-1679px) */
    @media (min-width: 1440px) and (max-width: 1679px) {
      left: 221px;
    }
    /* Large screens and MacBook Pro 16" (1680px+) */
    @media (min-width: 1680px) {
      left: 216px;
    }
  }

  /* Responsive positioning for next arrow */
  /* Right arrow mirrors left arrow - same pixel distance from viewport edge */
  &.next {
    /* Mobile and small tablets */
    @media (max-width: 899px) {
      right: 10px;
    }
    /* Tablets and small laptops */
    @media (min-width: 900px) and (max-width: 1199px) {
      right: 226px; /* Perfect mirror of left arrow */
    }
    /* MacBook Pro 13" and similar (1200-1439px) */
    @media (min-width: 1200px) and (max-width: 1439px) {
      right: 226px; /* Perfect mirror of left arrow */
    }
    /* Standard laptops and MacBook Pro 14" (1440-1679px) */
    @media (min-width: 1440px) and (max-width: 1679px) {
      right: 221px; /* Perfect mirror of left arrow */
    }
    /* Large screens and MacBook Pro 16" (1680px+) */
    @media (min-width: 1680px) {
      right: 216px; /* Perfect mirror of left arrow */
    }
  }

  &:before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    border-left: 3px solid rgba(0, 191, 255, 0.9);
    border-bottom: 3px solid rgba(0, 191, 255, 0.9);
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 8px rgba(0, 191, 255, 0.9))
      drop-shadow(0 0 16px rgba(0, 191, 255, 0.7))
      drop-shadow(0 0 24px rgba(0, 191, 255, 0.5));
  }

  &.prev:before {
    transform: rotate(45deg);
  }

  &.next:before {
    transform: rotate(225deg);
  }

  &:hover:before {
    border-color: rgba(0, 191, 255, 1);
    filter: drop-shadow(0 0 10px rgba(0, 191, 255, 1))
      drop-shadow(0 0 20px rgba(0, 191, 255, 0.8))
      drop-shadow(0 0 30px rgba(0, 191, 255, 0.6));
    transform: rotate(45deg) scale(1.1);
  }

  &.next:hover:before {
    transform: rotate(225deg) scale(1.1);
  }
`;
