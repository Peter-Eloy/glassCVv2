import { useState, useEffect } from "react";
import { Box, Grid, Typography, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "../../contexts";
import GlassContainer from "../glassContainer";
import { tradingViewService } from "../../services/tradingview";
import styled from "@emotion/styled";

// Use the same styling as BlogCard
const BlogCard = styled(GlassContainer)`
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

const TradingViewIdeas = ({ postsPerPage = 6 }) => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const response = await tradingViewService.getPublishedIdeas(page, postsPerPage);
        const formattedIdeas = response.ideas.map(idea => 
          tradingViewService.formatIdeaForDisplay(idea)
        );
        setIdeas(formattedIdeas);
      } catch (error) {
        console.error('Error fetching TradingView ideas:', error);
        setIdeas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [page, postsPerPage]);

  const handleIdeaClick = (idea) => {
    tradingViewService.openIdea(idea.url);
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from(new Array(postsPerPage)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
            <BlogCard>
              <Box sx={{ p: 3, height: "180px" }}>
                <Skeleton variant="text" height={32} width="80%" />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} width="60%" />
              </Box>
            </BlogCard>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {ideas.map((idea) => (
        <Grid item xs={12} sm={6} md={4} key={idea.id}>
          <ClickableBox onClick={() => handleIdeaClick(idea)}>
            <BlogCard>
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
                  {idea.title}
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
                  {idea.cleanExcerpt || idea.excerpt}
                </Typography>
              </Box>
            </BlogCard>
          </ClickableBox>
        </Grid>
      ))}
    </Grid>
  );
};

TradingViewIdeas.propTypes = {
  postsPerPage: PropTypes.number,
};

export default TradingViewIdeas;