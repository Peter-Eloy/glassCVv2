// src/services/tumblr/index.jsx
import axios from "axios";
import { TUMBLR_CONFIG } from "./config";

const tumblrApi = axios.create({
  baseURL: TUMBLR_CONFIG.API_BASE,
  timeout: 10000,
});

// Helper to clean HTML tags and get excerpt
const getExcerpt = (text = "", maxLength = 150) => {
  const cleanText = text
    ?.replace(/<[^>]+>/g, "")
    ?.replace(/\n/g, " ")
    ?.trim();

  if (!cleanText) return "";

  return cleanText.length > maxLength
    ? `${cleanText.substring(0, maxLength)}...`
    : cleanText;
};

export const tumblrService = {
  getPosts: async (tag = null, limit = 6) => {
    try {
      const response = await tumblrApi.get(
        `/blog/${TUMBLR_CONFIG.BLOG_URL}/posts`,
        {
          params: {
            api_key: TUMBLR_CONFIG.API_KEY,
            limit,
            tag: tag || undefined,
            filter: "text",
          },
        }
      );

      if (!response.data?.response?.posts) {
        return { posts: [] };
      }

      return {
        posts: response.data.response.posts.map((post) => {
          const content = post.body || post.text || "";
          const title = post.title || getExcerpt(content, 50);

          return {
            id: post.id,
            title: title,
            excerpt: getExcerpt(content),
            content: content,
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
