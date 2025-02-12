import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "../../contexts/index";
import { useWelcome } from "../../contexts/welcomeContext";
import MenuButton from "../menuButton";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { WELCOME_STAGES } from "../../components/welcomeExperience/stages";

const StyledArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: fixed;
  top: 27px;
  left: 27px;
  z-index: 1300;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;

  &:before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    border-left: 3px solid rgba(0, 191, 255, 0.9);
    border-bottom: 3px solid rgba(0, 191, 255, 0.9);
    transform: rotate(45deg);
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 8px rgba(0, 191, 255, 0.9))
      drop-shadow(0 0 16px rgba(0, 191, 255, 0.7))
      drop-shadow(0 0 24px rgba(0, 191, 255, 0.5))
      drop-shadow(0 0 32px rgba(0, 191, 255, 0.3));
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: scale(1.05);
  }

  &:hover:before {
    border-color: rgba(0, 191, 255, 1);
    filter: drop-shadow(0 0 10px rgba(0, 191, 255, 1))
      drop-shadow(0 0 20px rgba(0, 191, 255, 0.8))
      drop-shadow(0 0 30px rgba(0, 191, 255, 0.6))
      drop-shadow(0 0 40px rgba(0, 191, 255, 0.4));
    transform: rotate(45deg) scale(1.1);
  }
`;

/**
 * Description placeholder
 *
 * @returns {*}
 */
const AppMenu = ({ forceMenuOpen = false }) => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { welcomeStage } = useWelcome();

  const shouldForceMenuOpen =
    location.pathname === "/" &&
    (forceMenuOpen || welcomeStage === WELCOME_STAGES.MENU);

  return (
    <>
      <MenuButton forceOpen={shouldForceMenuOpen} />
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          background: "transparent",
          borderBottom: `1px solid ${
            isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"
          }`,
        }}
      >
        <Toolbar>
          {location.pathname !== "/" && (
            <StyledArrowButton
              onClick={() => navigate("/")}
              aria-label="Back to home"
            />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

AppMenu.propTypes = {
  forceMenuOpen: PropTypes.bool,
};

export default AppMenu;
