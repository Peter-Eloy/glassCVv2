// src/services/tumblr/index.jsx
import axios from "axios";
import { TUMBLR_CONFIG } from "./config";

// ============= HELPER FUNCTIONS =============

/**
 * Creates an axios instance for Tumblr API
 */
const tumblrApi = axios.create({
  baseURL: TUMBLR_CONFIG.API_BASE,
  timeout: 10000,
});

/**
 * Extracts a clean title from a post
 * @param {Object} post - The Tumblr post object
 * @returns {string} - The title
 */
const getPostTitle = (post) => {
  // If the post already has a title, use it
  if (post.title) {
    return post.title;
  }

  // Check for H1 tags in the content
  const h1Match = (post.body || post.text || "").match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match && h1Match[1]) {
    // Remove any HTML tags inside the H1
    return h1Match[1].replace(/<[^>]+>/g, "").trim();
  }

  // If no H1, extract first sentence with more generous length
  const bodyText = getExcerpt(post.body || post.text || "", 200);

  // Try to get the first sentence
  const sentenceMatch = bodyText.match(/^[^.!?]*[.!?]/);
  if (sentenceMatch && sentenceMatch[0].length > 10) {
    return sentenceMatch[0].trim();
  }

  // If no clear sentence break, use first 100 chars
  return bodyText.substring(0, 100) + (bodyText.length > 100 ? "..." : "");
};

/**
 * Extracts a plain text excerpt from HTML content
 * @param {string} text - The HTML text
 * @param {number} maxLength - Maximum length of excerpt
 * @returns {string} - The clean excerpt
 */
const getExcerpt = (text = "", maxLength = 150) => {
  // First remove any H1 tags and their content
  const withoutH1 = text?.replace(/<h1[^>]*>.*?<\/h1>/gi, "");

  // Then proceed with normal cleaning
  const cleanText = withoutH1
    ?.replace(/<[^>]+>/g, "")
    ?.replace(/\n/g, " ")
    ?.trim();

  if (!cleanText) return "";
  return cleanText.length > maxLength
    ? `${cleanText.substring(0, maxLength)}...`
    : cleanText;
};

/**
 * Creates a clean excerpt that doesn't repeat the title
 * @param {Object} post - The Tumblr post object
 * @param {string} title - The post title
 * @returns {string} - Clean excerpt without title
 */
const createCleanExcerpt = (post, title, maxLength = 150) => {
  let excerpt = getExcerpt(post.body || post.text || "", maxLength);

  // Remove title from the beginning of excerpt
  if (title) {
    if (excerpt.startsWith(title)) {
      excerpt = excerpt.substring(title.length).trim();
      // Clean up punctuation at the beginning
      excerpt = excerpt.replace(/^[^\w]+/, "").trim();
    }

    // Also check for title followed by space
    const titleWithSpace = title + " ";
    if (excerpt.startsWith(titleWithSpace)) {
      excerpt = excerpt.substring(titleWithSpace.length).trim();
    }
  }

  return excerpt || "Read more...";
};

/**
 * Extracts media (images) from a post
 * @param {Object} post - The Tumblr post object
 * @returns {Array} - Array of media objects
 */
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

/**
 * Formats a raw Tumblr post into a consistent structure
 * @param {Object} post - Raw Tumblr post
 * @returns {Object} - Formatted post
 */
const formatPost = (post) => {
  const title = getPostTitle(post);
  return {
    id: post.id,
    title,
    excerpt: getExcerpt(post.body || post.text || ""),
    cleanExcerpt: createCleanExcerpt(post, title),
    content: post.body || post.text || "",
    tags: post.tags || [],
    noteCount: post.note_count || 0,
    url: post.post_url,
    media: extractMedia(post),
    timestamp: post.timestamp,
  };
};

// Cache for storing fetched pages
const pageCache = new Map();

/**
 * Prefetches the next page of results
 */
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
        posts: response.data.response.posts.map(formatPost),
        total: response.data.response.total_posts,
        hasNextPage: offset + limit < response.data.response.total_posts,
      };
      pageCache.set(cacheKey, result);
    }
  } catch (error) {
    console.error("Error prefetching page:", error);
  }
};

// ============= EXPORTED FUNCTIONS =============

export const tumblrService = {
  /**
   * Fetches posts from Tumblr with pagination and optional tag filtering
   */
  getPosts: async (page = 1, limit = 6, tag = null) => {
    try {
      console.info("📝 Fetching blog posts from Tumblr API - because who doesn't love fresh content?", { page, limit, tag });
      
      const offset = (page - 1) * limit;
      const cacheKey = `${page}-${limit}-${
        Array.isArray(tag) ? tag.join(",") : tag
      }`;

      if (pageCache.has(cacheKey)) {
        console.info("⚡ Cache hit! Serving you pre-loaded blog posts faster than you can say 'optimization'");
        return pageCache.get(cacheKey);
      }

      // If tag is an array (for "all" filter), we need to handle multiple requests
      if (Array.isArray(tag)) {
        // Fetch posts for each tag
        const allTagPromises = tag.map((singleTag) =>
          tumblrApi.get(`/blog/${TUMBLR_CONFIG.BLOG_URL}/posts`, {
            params: {
              api_key: TUMBLR_CONFIG.API_KEY,
              limit: 50, // Fetch more to ensure we have enough after filtering
              tag: singleTag,
              filter: "raw",
            },
          })
        );

        const responses = await Promise.all(allTagPromises);

        // Combine and deduplicate posts by ID
        let allPosts = [];

        responses.forEach((response) => {
          if (response.data?.response?.posts) {
            allPosts = [...allPosts, ...response.data.response.posts];
          }
        });

        // Remove duplicates (same post might have multiple tags)
        const uniquePosts = Array.from(
          new Map(allPosts.map((post) => [post.id, post])).values()
        );

        // Sort by date (newest first)
        uniquePosts.sort(
          (a, b) => new Date(b.timestamp * 1000) - new Date(a.timestamp * 1000)
        );

        // Paginate the results
        const paginatedPosts = uniquePosts.slice(offset, offset + limit);

        const result = {
          posts: paginatedPosts.map(formatPost),
          total: uniquePosts.length,
          hasNextPage: offset + limit < uniquePosts.length,
        };

        pageCache.set(cacheKey, result);
        return result;
      } else {
        // Fetch posts with a single tag
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
          posts: response.data.response.posts.map(formatPost),
          total: response.data.response.total_posts,
          hasNextPage: offset + limit < response.data.response.total_posts,
        };

        console.info("📚 Blog posts loaded successfully!", { 
          postsCount: result.posts.length, 
          totalAvailable: result.total,
          hasMore: result.hasNextPage ? "Yes, there's more!" : "That's all folks!"
        });

        pageCache.set(cacheKey, result);

        if (result.hasNextPage) {
          prefetchPage(page + 1, limit, tag);
        }

        return result;
      }
    } catch (error) {
      console.error("Tumblr API Error:", error);
      return { posts: [], total: 0, hasNextPage: false };
    }
  },

  /**
   * Fetches a single post by ID
   */
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
      return formatPost(post);
    } catch (error) {
      console.error("Error fetching full post:", error);
      throw error;
    }
  },

  /**
   * Clears the cache
   */
  clearCache: () => pageCache.clear(),
};

export default tumblrService;
