// src/services/tumblr/index.jsx
import axios from "axios";

const TUMBLR_API_KEY = "dDXxkQHaQ1LY8F8K21DwBD8uxlK5waChbh4onCSekDoIUxHO7I";
const BLOG_URL = "peter-eloy.tumblr.com";
const API_BASE = "https://api.tumblr.com/v2";

// Create axios instance with default config
const tumblrApi = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Helper to clean HTML tags and get excerpt
const getExcerpt = (text = "", maxLength = 150) => {
  // First try body, if not found try title
  const cleanText = text
    ?.replace(/<[^>]+>/g, "") // Remove HTML tags
    ?.replace(/\n/g, " ") // Replace newlines with spaces
    ?.trim();

  if (!cleanText) return "";

  return cleanText.length > maxLength
    ? `${cleanText.substring(0, maxLength)}...`
    : cleanText;
};

// Service functions
export const tumblrService = {
  // Get posts with optional tag filtering
  getPosts: async (tag = null, limit = 9) => {
    try {
      const response = await tumblrApi.get(`/blog/${BLOG_URL}/posts`, {
        params: {
          api_key: TUMBLR_API_KEY,
          limit,
          tag: tag || undefined,
          filter: "text",
        },
      });

      if (!response.data?.response?.posts) {
        return { posts: [] };
      }

      return {
        posts: response.data.response.posts.map((post) => {
          // Extract content based on post type
          const content = post.body || post.text || "";
          const title = post.title || getExcerpt(content, 50);

          return {
            id: post.id,
            title: title,
            excerpt: getExcerpt(content),
            content: content,
            date: new Date(post.date).toLocaleDateString(),
            tags: post.tags || [],
            noteCount: post.note_count || 0,
            url: post.post_url,
          };
        }),
      };
    } catch (error) {
      console.error("Tumblr API Error:", error);
      return { posts: [] };
    }
  },
};

export default tumblrService;
