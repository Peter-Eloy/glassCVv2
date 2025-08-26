// src/services/github/cv.js
import axios from "axios";

const REPO_OWNER = "Peter-Eloy";
const REPO_NAME = "glassCVv2";
const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;

// Create an axios instance with default headers
const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    // Add auth token if available
    ...(import.meta.env.VITE_GITHUB_TOKEN && {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }),
  },
});

export const getLatestCVDownloadUrls = async () => {
  try {
    console.log("📄 Time to fetch the latest CV! Knocking on GitHub's door to get the freshest resume files...");
    
    const response = await githubApi.get(
      `/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`
    );
    const assets = response.data.assets;
    
    console.log("🎉 GitHub responded with", assets?.length || 0, "CV assets! Ready to impress some recruiters!");

    if (!assets || assets.length === 0) {
      console.error("No assets found in the latest release");
      return {};
    }

    // Create a map of language codes to their respective download URLs
    const urls = {
      EN: assets.find((asset) => asset.name === "Peter_Eloy_CV_EN.pdf")
        ?.browser_download_url,
      ES: assets.find((asset) => asset.name === "Peter_Eloy_CV_ES.pdf")
        ?.browser_download_url,
      DE: assets.find((asset) => asset.name === "Peter_Eloy_CV_DE.pdf")
        ?.browser_download_url,
    };

    // Filter out any undefined URLs
    const availableLanguages = Object.keys(Object.fromEntries(
      Object.entries(urls).filter(([_, url]) => url !== undefined)
    ));
    
    console.log("🌍 CV available in these languages:", availableLanguages.join(", "), "- polyglot professional at your service!");
    
    return Object.fromEntries(
      Object.entries(urls).filter(([_, url]) => url !== undefined)
    );
  } catch (error) {
    console.error("Error fetching CV download URLs:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);

      // Handle rate limiting
      if (
        error.response.status === 403 &&
        error.response.data.message.includes("rate limit")
      ) {
        console.error(
          "GitHub API rate limit exceeded. Consider adding a GITHUB_TOKEN to .env"
        );
      }
    }
    throw error;
  }
};
