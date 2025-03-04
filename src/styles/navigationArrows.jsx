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
