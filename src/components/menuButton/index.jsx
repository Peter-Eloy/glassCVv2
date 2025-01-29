// MenuButton.jsx
import React, { useState } from "react";
import styled from "@emotion/styled";

const MenuButtonContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1300;

  &:hover {
    transform: translateX(-50%) scale(1.05);
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 50px solid rgba(112, 180, 235, 0.2);
  transition: all 0.3s ease-in-out;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  backdrop-filter: blur(10px);
  filter: drop-shadow(0 4px 6px rgba(148, 11, 11, 0.1));

  &:hover {
    border-bottom-color: rgba(255, 255, 255, 0.3);
  }
`;

const MenuOptions = styled.div`
  position: absolute;
  top: ${(props) => (props.isOpen ? "-10%" : "100%")};
  left: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  transform: translateX(-50%);
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
  padding-top: 20px;
  flex-wrap: wrap;
  width: max-content;
`;

const Option = styled.button`
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  color: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: translateX(
    ${(props) =>
      props.position === "left"
        ? props.isOpen
          ? "-80px"
          : "-40px"
        : props.isOpen
        ? "80px"
        : "40px"}
  );
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(
        ${(props) =>
          props.position === "left"
            ? props.isOpen
              ? "-80px"
              : "-40px"
            : props.isOpen
            ? "80px"
            : "40px"}
      )
      scale(1.05);
  }
`;

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuButtonContainer isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <Triangle isOpen={isOpen} />
      <MenuOptions isOpen={isOpen}>
        <Option isOpen={isOpen} position="left">
          Option 1
        </Option>
        <Option isOpen={isOpen} position="left">
          Option 2
        </Option>
        <Option isOpen={isOpen} position="left">
          Option 3
        </Option>
        <Option isOpen={isOpen} position="right">
          Option 4
        </Option>
        <Option isOpen={isOpen} position="right">
          Option 5
        </Option>
        <Option isOpen={isOpen} position="right">
          Option 6
        </Option>
      </MenuOptions>
    </MenuButtonContainer>
  );
};

export default MenuButton;
