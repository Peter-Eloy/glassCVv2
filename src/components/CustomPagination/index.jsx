import { Box, Pagination } from "@mui/material";
import { NavigationArrow } from "../../styles/navigationArrows";
import { useTheme } from "../../contexts";
import PropTypes from "prop-types";

/**
 * Reusable pagination component with navigation arrows and page dots
 * Matches the blog page design with glowing arrows and fixed bottom positioning
 * Responsive arrow positioning for different screen sizes
 */
const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showArrows = true,
  loading = false,
}) => {
  const { isDarkMode } = useTheme();

  if (loading || totalPages <= 1) {
    return null;
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      {/* Previous Arrow */}
      {showArrows && currentPage > 1 && (
        <NavigationArrow
          className="prev"
          onClick={handlePrevClick}
          aria-label="Previous page"
        />
      )}

      {/* Pagination Dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 2,
          position: "fixed",
          bottom: "70px",
          left: 0,
          right: 0,
          zIndex: 10,
          backdropFilter: "blur(8px)",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => onPageChange(value)}
          hidePrevButton
          hideNextButton
          size="large"
          sx={{
            "& .MuiPaginationItem-root": {
              color: isDarkMode ? "#fff" : "#213547",
              "&.Mui-selected": {
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        />
      </Box>

      {/* Next Arrow */}
      {showArrows && currentPage < totalPages && (
        <NavigationArrow
          className="next"
          onClick={handleNextClick}
          aria-label="Next page"
        />
      )}
    </>
  );
};

CustomPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  showArrows: PropTypes.bool,
  loading: PropTypes.bool,
};

export default CustomPagination;
