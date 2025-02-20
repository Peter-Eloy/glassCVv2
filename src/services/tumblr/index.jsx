// src/services/tumblr/index.jsx
import axios from "axios";
import { TUMBLR_CONFIG } from "./config";

const tumblrApi = axios.create({
  baseURL: TUMBLR_CONFIG.API_BASE,
  timeout: 10000,
});

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

const extractMedia = (post) => {
  const media = [];
  if (post.type === "photo" && post.photos) {
    media.push(
      ...post.photos.map((photo) => ({
        type: "image",
        url: photo.original_size.url,
        width: photo.original_size.width,
        height: photo.original_size.height,
      }))
    );
  }
  return media;
};

const pageCache = new Map();

const prefetchPage = async (page = 1, limit = 6, tag = null) => {
  const cacheKey = `${page}-${limit}-${tag}`;
  if (pageCache.has(cacheKey)) return;

  try {
    const offset = (page - 1) * limit;
    const response = await tumblrApi.get(
      `/blog/${TUMBLR_CONFIG.BLOG_URL}/posts`,
      {
        params: {
          api_key: TUMBLR_CONFIG.API_KEY,
          limit,
          offset,
          tag: tag || undefined,
          filter: "raw",
        },
      }
    );

    if (response.data?.response?.posts) {
      const result = {
        posts: response.data.response.posts.map((post) => ({
          id: post.id,
          title: post.title || getExcerpt(post.body || post.text || "", 50),
          excerpt: getExcerpt(post.body || post.text || ""),
          content: post.body || post.text || "",
          tags: post.tags || [],
          noteCount: post.note_count || 0,
          url: post.post_url,
          media: extractMedia(post),
        })),
        total: response.data.response.total_posts,
        hasNextPage: offset + limit < response.data.response.total_posts,
      };
      pageCache.set(cacheKey, result);
    }
  } catch (error) {
    console.error("Error prefetching page:", error);
  }
};

export const tumblrService = {
  getPosts: async (page = 1, limit = 6, tag = null) => {
    try {
      const offset = (page - 1) * limit;
      const cacheKey = `${page}-${limit}-${tag}`;

      if (pageCache.has(cacheKey)) {
        return pageCache.get(cacheKey);
      }

      const response = await tumblrApi.get(
        `/blog/${TUMBLR_CONFIG.BLOG_URL}/posts`,
        {
          params: {
            api_key: TUMBLR_CONFIG.API_KEY,
            limit,
            offset,
            tag: tag || undefined,
            filter: "raw",
          },
        }
      );

      if (!response.data?.response?.posts) {
        return { posts: [], total: 0, hasNextPage: false };
      }

      const result = {
        posts: response.data.response.posts.map((post) => ({
          id: post.id,
          title: post.title || getExcerpt(post.body || post.text || "", 50),
          excerpt: getExcerpt(post.body || post.text || ""),
          content: post.body || post.text || "",
          tags: post.tags || [],
          noteCount: post.note_count || 0,
          url: post.post_url,
          media: extractMedia(post),
        })),
        total: response.data.response.total_posts,
        hasNextPage: offset + limit < response.data.response.total_posts,
      };

      pageCache.set(cacheKey, result);

      if (result.hasNextPage) {
        prefetchPage(page + 1, limit, tag);
      }

      return result;
    } catch (error) {
      console.error("Tumblr API Error:", error);
      return { posts: [], total: 0, hasNextPage: false };
    }
  },

  getFullPost: async (postId) => {
    try {
      const response = await tumblrApi.get(
        `/blog/${TUMBLR_CONFIG.BLOG_URL}/posts`,
        {
          params: {
            api_key: TUMBLR_CONFIG.API_KEY,
            id: postId,
            filter: "raw",
          },
        }
      );

      if (!response.data?.response?.posts?.[0]) {
        throw new Error("Post not found");
      }

      const post = response.data.response.posts[0];
      return {
        id: post.id,
        title: post.title || getExcerpt(post.body || post.text || "", 50),
        content: post.body || post.text || "",
        tags: post.tags || [],
        noteCount: post.note_count || 0,
        url: post.post_url,
        media: extractMedia(post),
      };
    } catch (error) {
      console.error("Error fetching full post:", error);
      throw error;
    }
  },

  clearCache: () => pageCache.clear(),
};

export default tumblrService;
