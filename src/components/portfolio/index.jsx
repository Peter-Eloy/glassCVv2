import { useState, useMemo } from "react";
import { Box, Grid, Chip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CategoryCard from "../portfolio/categoryCard";
import ProjectDetailModal from "../portfolio/projectDetailModal";
import { useTheme } from "../../contexts";
import categories from "../../data/portfolio/portfolioCategories";

const GLOW = "0, 191, 255";

const allProjects = categories.flatMap((category) =>
  category.subcategories.map((project) => ({
    ...project,
    categoryId: category.id,
    categoryTitle: category.title,
  }))
);

const Portfolio = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState(categoryId || "all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = useMemo(
    () => [{ id: "all", title: "All Projects" }, ...categories],
    []
  );

  const visibleProjects =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((project) => project.categoryId === activeFilter);

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    navigate(filterId === "all" ? "/portfolio" : `/portfolio/${filterId}`);
  };

  return (
    <Box sx={{ height: "100%", overflow: "auto", p: 2, pt: 4 }}>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center", mb: 3 }}>
        {filters.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.title}
            onClick={() => handleFilterClick(filter.id)}
            sx={{
              bgcolor:
                activeFilter === filter.id
                  ? `rgba(${GLOW}, 0.18)`
                  : isDarkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
              border: `1px solid ${
                activeFilter === filter.id ? `rgba(${GLOW}, 0.6)` : "transparent"
              }`,
              color: activeFilter === filter.id ? `rgb(${GLOW})` : "inherit",
              fontWeight: activeFilter === filter.id ? 600 : 400,
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </Box>

      <Grid container spacing={3}>
        {visibleProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <CategoryCard
              title={project.title}
              description={project.description}
              categoryLabel={project.categoryTitle}
              status={project.status}
              isExpanded={false}
              onClick={() => setSelectedProject(project)}
            />
          </Grid>
        ))}
      </Grid>

      <ProjectDetailModal
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </Box>
  );
};

export default Portfolio;
