// MenuButton.jsx
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ChatComponent from "../chatComponent";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useWelcome } from "../../contexts/welcomeContext";
import { useTheme } from "../../contexts";
import { WELCOME_STAGES } from "../../components/welcomeExperience/stages";

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
  border-bottom: 50px solid rgba(0, 191, 255, 0.8); // Neon blue color with transparency
  transition: all 0.3s ease-in-out;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  filter: drop-shadow(0 0 10px rgba(0, 191, 255, 0.8)) // Neon glow effect
    drop-shadow(0 0 20px rgba(0, 191, 255, 0.6))
    drop-shadow(0 0 30px rgba(0, 191, 255, 0.4));

  &:hover {
    border-bottom-color: rgba(0, 191, 255, 1); // Brighter neon blue on hover
    filter: drop-shadow(0 0 15px rgba(0, 191, 255, 1)) // Enhanced glow on hover
      drop-shadow(0 0 30px rgba(0, 191, 255, 0.8))
      drop-shadow(0 0 45px rgba(0, 191, 255, 0.6));
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

const MenuButton = ({ forceOpen = false }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();
  const { welcomeStage } = useWelcome();
  const { isMenuOpen, toggleMenu, setMenuOpen } = useTheme();

  // Force the menu open during MENU stage
  useEffect(() => {
    if (welcomeStage === WELCOME_STAGES.MENU || forceOpen) {
      setMenuOpen(true);
    }
  }, [welcomeStage, forceOpen, setMenuOpen]);

  // Prevent closing during MENU stage
  const handleToggle = () => {
    if (welcomeStage === WELCOME_STAGES.MENU) {
      return; // Don't allow closing during MENU stage
    }
    toggleMenu();
  };

  const handleAIChatClick = (e) => {
    e.stopPropagation(); // Prevent menu from closing when clicking the AI Chat button
    setChatOpen(true);
    // Don't close menu - let it persist
  };

  const handleBlogClick = (e) => {
    e.stopPropagation();
    navigate("/blog");
    // Don't close menu - let it persist
  };

  const handleSkillsClick = (e) => {
    e.stopPropagation();
    navigate("/skills");
    // Don't close menu - let it persist
  };

  const handleSrcNow = (e) => {
    e.stopPropagation();
    navigate("/portfolio");
    // Don't close menu - let it persist
  };

  const handleHomeClick = (e) => {
    e.stopPropagation();
    navigate("/");
    // Don't close menu - let it persist
  };

  return (
    <>
      <MenuButtonContainer
        onClick={handleToggle}
        data-testid="menu-button"
        data-stage={welcomeStage}
      >
        <Triangle isOpen={isMenuOpen} />
        <MenuOptions isOpen={isMenuOpen}>
          <Option isOpen={isMenuOpen} position="left" onClick={handleAIChatClick}>
            AI Chat
          </Option>
          <Option isOpen={isMenuOpen} position="left" onClick={handleSkillsClick}>
            Skill.Scan
          </Option>
          <Option isOpen={isMenuOpen} position="right" onClick={handleSrcNow}>
            Src.Now
          </Option>
          <Option isOpen={isMenuOpen} position="right" onClick={handleBlogClick}>
            Life.Bits
          </Option>
          {/* <Option isOpen={isMenuOpen} position="right">
            Option 5
          </Option>
          <Option isOpen={isMenuOpen} position="right">
            Option 6
          </Option> */}
        </MenuOptions>
      </MenuButtonContainer>
      <ChatComponent open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

MenuButton.propTypes = {
  forceOpen: PropTypes.bool,
};

export default MenuButton;
