// src/pages/blog/index.jsx
import { useState, useEffect } from "react";
import { Box, Grid, Typography, Skeleton } from "@mui/material";
import { useTheme } from "../../contexts";
import GlassContainer from "../../components/glassContainer";
import BlogPostDialog from "../../components/blogPostDialog";
import { tumblrService } from "../../services/tumblr";
import styled from "@emotion/styled";

const FilterButton = styled.button`
  padding: 8px 16px;
  margin: 0 8px;
  background: ${(props) =>
    props.active
      ? props.isDarkMode
        ? "rgba(0, 191, 255, 0.2)"
        : "rgba(33, 53, 71, 0.1)"
      : "transparent"};
  border: 1px solid
    ${(props) =>
      props.isDarkMode
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(33, 53, 71, 0.12)"};
  border-radius: 20px;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#213547")};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);

  &:hover {
    background: ${(props) =>
      props.isDarkMode ? "rgba(0, 191, 255, 0.3)" : "rgba(33, 53, 71, 0.2)"};
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.isDarkMode ? "rgba(0, 191, 255, 0.5)" : "rgba(33, 53, 71, 0.5)"};
  }
`;

const BlogCard = styled(GlassContainer)`
  cursor: pointer;
  aspect-ratio: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px) scale(1.02);
  }
`;

const FILTERS = [
  { id: "all", label: "All Posts" },
  { id: "tech", label: "Tech" },
  { id: "coding", label: "Coding" },
  { id: "design", label: "Design" },
  { id: "lifestyle", label: "Lifestyle" },
];

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchPosts(activeFilter);
  }, [activeFilter]);

  const fetchPosts = async (filter) => {
    try {
      setLoading(true);
      let data;
      if (filter === "all") {
        data = await tumblrService.getLatestPosts(9);
      } else {
        data = await tumblrService.searchPosts(filter, 1, 9);
      }
      setPosts(data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      // TODO: Add error handling UI
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Filters Section */}
      <GlassContainer
        sx={{
          mb: 4,
          py: 2,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {FILTERS.map((filter) => (
          <FilterButton
            key={filter.id}
            active={activeFilter === filter.id}
            isDarkMode={isDarkMode}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.label}
          </FilterButton>
        ))}
      </GlassContainer>

      {/* Posts Grid */}
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(9)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <BlogCard>
                  <Box sx={{ p: 3 }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={200}
                      sx={{ borderRadius: "8px", mb: 2 }}
                    />
                    <Skeleton variant="text" width="80%" height={32} />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </Box>
                </BlogCard>
              </Grid>
            ))
          : posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <BlogCard onClick={() => handlePostClick(post)}>
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: isDarkMode ? "#fff" : "#213547",
                        fontWeight: 500,
                        mb: 2,
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(0, 0, 0, 0.7)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post.summary}
                    </Typography>
                    {post.tags && (
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        {post.tags.map((tag, index) => (
                          <Typography
                            key={index}
                            variant="caption"
                            sx={{
                              color: isDarkMode
                                ? "rgba(0, 191, 255, 0.9)"
                                : "#213547",
                              backgroundColor: isDarkMode
                                ? "rgba(0, 191, 255, 0.1)"
                                : "rgba(33, 53, 71, 0.1)",
                              padding: "2px 8px",
                              borderRadius: "12px",
                            }}
                          >
                            #{tag}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                </BlogCard>
              </Grid>
            ))}
      </Grid>

      <BlogPostDialog
        open={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </Box>
  );
};

export default BlogPage;
