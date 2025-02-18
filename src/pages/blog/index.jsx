// src/pages/blog/index.jsx
import { useState, useEffect } from "react";
import { Box, Grid, Typography, Skeleton, Pagination } from "@mui/material";
import { useTheme } from "../../contexts";
import GlassContainer from "../../components/glassContainer";
import BlogPostDialog from "../../components/blogPostDialog";
import { tumblrService } from "../../services/tumblr";
import styled from "@emotion/styled";

const FilterButton = styled.button`
  padding: 6px 22px;
  margin: 0 8px;
  margin-left: 30px;
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
  height: 100%;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
  }
`;

const FILTERS = [
  { id: "all", label: "All Posts" },
  { id: "tech", label: "Tech Bits" },
  { id: "coding", label: "Code Wins" },
  { id: "finance", label: "Trade Talk" },
  { id: "lifestyle", label: "Life Hacks" },
];

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchPosts();
  }, [activeFilter, page]);

  const fetchPosts = async () => {
    setLoading(true);
    const tag = activeFilter === "all" ? null : activeFilter;
    const { posts } = await tumblrService.getPosts(tag, POSTS_PER_PAGE);
    setPosts(posts);
    setTotalPosts(posts.length);
    setLoading(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    setPage(1);
  };

  return (
    <Box
      sx={{
        // p: 3,
        // height: "calc(100vh - 64px)",
        // overflow: "hidden", // Prevent scrolling
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Filters */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2px",
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
        </Box>
      </Box>

      {/* Posts Grid */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {loading
          ? Array.from(new Array(POSTS_PER_PAGE)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                <BlogCard>
                  <Box
                    sx={{
                      p: 3,
                      height: "120px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Skeleton variant="text" height={22} width="80%" />
                    <Skeleton variant="text" height={10} />
                    <Skeleton variant="text" height={10} />
                    <Skeleton variant="text" height={10} width="60%" />
                  </Box>
                </BlogCard>
              </Grid>
            ))
          : posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <BlogCard onClick={() => setSelectedPost(post)}>
                  <Box
                    sx={{
                      p: 3,
                      height: "180px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: isDarkMode ? "#fff" : "#213547",
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
                        color: isDarkMode
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(0, 0, 0, 0.7)",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post.excerpt}
                    </Typography>

                    <Box
                      sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: 1,
                        borderColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: isDarkMode
                            ? "rgba(255, 255, 255, 0.6)"
                            : "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        {post.date}
                      </Typography>
                      {post.noteCount > 0 && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: isDarkMode
                              ? "rgba(255, 255, 255, 0.6)"
                              : "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          {post.noteCount} notes
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </BlogCard>
              </Grid>
            ))}
      </Grid>

      {/* Pagination */}
      {!loading && totalPosts > POSTS_PER_PAGE && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            "& .MuiPagination-ul": {
              "& .MuiPaginationItem-root": {
                color: isDarkMode ? "#fff" : "#213547",
                "&.Mui-selected": {
                  backgroundColor: isDarkMode
                    ? "rgba(0, 191, 255, 0.2)"
                    : "rgba(33, 53, 71, 0.1)",
                },
              },
            },
          }}
        >
          <Pagination
            count={Math.ceil(totalPosts / POSTS_PER_PAGE)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Post Dialog */}
      <BlogPostDialog
        open={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </Box>
  );
};

export default BlogPage;
