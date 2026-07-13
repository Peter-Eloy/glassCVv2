import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Chip, CircularProgress, Pagination } from "@mui/material";
import { useTheme } from "../../contexts";
import { tumblrService } from "../../services/tumblr";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "tech", label: "Tech" },
  { id: "coding", label: "Code" },
  { id: "finance", label: "Finance" },
  { id: "lifestyle", label: "Life" },
];

const POSTS_PER_PAGE = 5;
const CATEGORY_TAGS = ["tech", "coding", "finance", "lifestyle"];

const MobileBlog = () => {
  const { isDarkMode } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const tagParam = activeFilter === "all" ? CATEGORY_TAGS : activeFilter;
      const response = await tumblrService.getPosts(page, POSTS_PER_PAGE, tagParam);
      setPosts(response.posts);
      setTotalPosts(response.total);
      setLoading(false);
    };

    fetchPosts();
  }, [activeFilter, page]);

  return (
    <Box sx={{ padding: "80px 16px 120px 16px", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Blog
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
        Thoughts on tech, code, and life
      </Typography>

      {/* Filter Chips */}
      <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 2, mb: 1 }}>
        {FILTERS.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.label}
            onClick={() => {
              setActiveFilter(filter.id);
              setPage(1);
            }}
            sx={{
              bgcolor: activeFilter === filter.id
                ? isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
                : isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              border: `1px solid ${
                activeFilter === filter.id
                  ? isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"
                  : "transparent"
              }`,
              color: "inherit",
              flexShrink: 0,
            }}
          />
        ))}
      </Box>

      {/* Posts */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {posts.map((post) => (
            <Card
              key={post.id}
              onClick={() => setSelectedPost(post)}
              sx={{
                mb: 2,
                background: isDarkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.02)",
                border: `1px solid ${
                  isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
                }`,
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: "1rem" }}>
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 2,
                  }}
                >
                  {post.cleanExcerpt || post.excerpt}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    {new Date(post.date).toLocaleDateString()}
                  </Typography>
                  {post.tags?.slice(0, 2).map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.65rem",
                        bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          {totalPosts > POSTS_PER_PAGE && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={Math.ceil(totalPosts / POSTS_PER_PAGE)}
                page={page}
                onChange={(e, value) => setPage(value)}
                size="small"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: isDarkMode ? "#fff" : "#213547",
                  },
                  "& .Mui-selected": {
                    bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <Box
          onClick={() => setSelectedPost(null)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              background: isDarkMode ? "#1e1e1e" : "#fff",
              borderRadius: 3,
              maxHeight: "80vh",
              overflow: "auto",
              width: "100%",
              maxWidth: 500,
              p: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              {selectedPost.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                lineHeight: 1.8,
                mb: 3,
              }}
              dangerouslySetInnerHTML={{ __html: selectedPost.body }}
            />
            <Chip
              label="Close"
              onClick={() => setSelectedPost(null)}
              sx={{
                bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MobileBlog;
