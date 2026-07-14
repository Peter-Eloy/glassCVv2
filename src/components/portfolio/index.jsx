import { useState, useMemo, useEffect } from "react";
import { Box, Grid, Typography, Pagination } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import GlassContainer from "../glassContainer";
import ProjectDetailModal from "../portfolio/projectDetailModal";
import { useTheme } from "../../contexts";
import { NavigationArrow } from "../../styles/navigationArrows";
import categories from "../../data/portfolio/portfolioCategories";
import styled from "@emotion/styled";

const PROJECTS_PER_PAGE = 6;

const allProjects = categories.flatMap((category) =>
  category.subcategories.map((project) => ({
    ...project,
    categoryId: category.id,
    categoryTitle: category.title,
  }))
);

const StyledButton = styled.button`
  padding: 6px 22px;
  margin: 0 8px;
  background: ${({ $active, $isDarkMode }) =>
    $active
      ? $isDarkMode
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"
      : "transparent"};
  border: 1px solid
    ${({ $isDarkMode }) =>
      $isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"};
  border-radius: 20px;
  color: ${({ $isDarkMode }) => ($isDarkMode ? "#fff" : "#213547")};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  transform-origin: center center;

  &:hover {
    background: ${({ $isDarkMode }) =>
      $isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)"};
    transform: translateY(-2px);
  }
`;

const PortfolioCard = styled(GlassContainer)`
  height: 100%;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ClickableBox = styled(Box)`
  cursor: pointer;
`;

const Portfolio = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState(categoryId || "all");
  const [page, setPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setActiveFilter(categoryId || "all");
    setPage(1);
  }, [categoryId]);

  const filters = useMemo(
    () => [{ id: "all", title: "All Projects" }, ...categories],
    []
  );

  const filteredProjects =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((project) => project.categoryId === activeFilter);

  const totalProjects = filteredProjects.length;
  const visibleProjects = filteredProjects.slice(
    (page - 1) * PROJECTS_PER_PAGE,
    page * PROJECTS_PER_PAGE
  );

  const handleFilterClick = (filterId) => {
    setPage(1);
    navigate(filterId === "all" ? "/portfolio" : `/portfolio/${filterId}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", py: 2, pt: 4 }}>
        {filters.map((filter) => (
          <StyledButton
            key={filter.id}
            $active={activeFilter === filter.id}
            $isDarkMode={isDarkMode}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.title}
          </StyledButton>
        ))}
      </Box>

      <Box sx={{ position: "relative", flex: 1, mx: 6, overflow: "auto" }}>
        {page > 1 && (
          <NavigationArrow
            className="prev"
            onClick={() => setPage(page - 1)}
            style={{ left: 280 }}
          />
        )}

        <Grid container spacing={3}>
          {visibleProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ClickableBox onClick={() => setSelectedProject(project)}>
                <PortfolioCard>
                  <Box sx={{ p: 3, height: "180px" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        height: "52px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: "auto",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {project.description}
                    </Typography>
                  </Box>
                </PortfolioCard>
              </ClickableBox>
            </Grid>
          ))}
        </Grid>

        {page * PROJECTS_PER_PAGE < totalProjects && (
          <NavigationArrow
            className="next"
            onClick={() => setPage(page + 1)}
            style={{ right: 280 }}
          />
        )}
      </Box>

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
        {totalProjects > PROJECTS_PER_PAGE && (
          <Pagination
            count={Math.ceil(totalProjects / PROJECTS_PER_PAGE)}
            page={page}
            onChange={(e, value) => setPage(value)}
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
        )}
      </Box>

      <ProjectDetailModal
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </Box>
  );
};

export default Portfolio;
