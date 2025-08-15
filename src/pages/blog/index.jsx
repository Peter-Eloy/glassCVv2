import { useState, useEffect } from "react";
import { Box, Grid, Typography, Skeleton, Pagination } from "@mui/material";
import { useTheme } from "../../contexts";
import GlassContainer from "../../components/glassContainer";
import BlogPostDialog from "../../components/blogPostDialog";
import TradingViewIdeas from "../../components/tradingViewIdeas";
import { tumblrService } from "../../services/tumblr";
import { NavigationArrow } from "../../styles/navigationArrows";
import styled from "@emotion/styled";

const POSTS_PER_PAGE = 6;
const CATEGORY_TAGS = ["tech", "coding", "finance", "lifestyle"];
const FILTERS = [
  { id: "all", label: "All Posts" },
  { id: "tech", label: "Tech Bits" },
  { id: "coding", label: "Code Wins" },
  { id: "finance", label: "Trade Talk" },
  { id: "lifestyle", label: "Life Hacks" },
];

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

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      const tagParam = activeFilter === "all" ? CATEGORY_TAGS : activeFilter;

      const response = await tumblrService.getPosts(
        page,
        POSTS_PER_PAGE,
        tagParam
      );
      setPosts(response.posts);
      setTotalPosts(response.total);
      setLoading(false);
    };

    fetchPosts();
  }, [activeFilter, page]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", py: 2, ml: 3 }}>
        {FILTERS.map((filter) => (
          <StyledButton
            key={filter.id}
            $active={activeFilter === filter.id}
            $isDarkMode={isDarkMode}
            onClick={() => {
              setActiveFilter(filter.id);
              setPage(1);
            }}
          >
            {filter.label}
          </StyledButton>
        ))}
      </Box>

      <Box sx={{ position: "relative", flex: 1, mx: 6 }}>
        {!loading && page > 1 && (
          <NavigationArrow
            className="prev"
            onClick={() => setPage(page - 1)}
            style={{ left: 280 }}
          />
        )}

        {activeFilter === "finance" ? (
          <TradingViewIdeas postsPerPage={POSTS_PER_PAGE} />
        ) : (
          <Grid container spacing={3}>
            {loading
              ? Array.from(new Array(POSTS_PER_PAGE)).map((_, index) => (
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
                ))
              : posts.map((post) => (
                  <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <ClickableBox onClick={() => setSelectedPost(post)}>
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
                            {post.title}
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
                            {post.cleanExcerpt || post.excerpt}
                          </Typography>
                        </Box>
                      </BlogCard>
                    </ClickableBox>
                  </Grid>
                ))}
          </Grid>
        )}

        {!loading && page * POSTS_PER_PAGE < totalPosts && (
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
        {!loading && totalPosts > POSTS_PER_PAGE && (
          <Pagination
            count={Math.ceil(totalPosts / POSTS_PER_PAGE)}
            page={page}
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

      <BlogPostDialog
        open={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </Box>
  );
};

export default BlogPage;
