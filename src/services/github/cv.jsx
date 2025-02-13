// src/services/github/cv.js
import axios from "axios";

const REPO_OWNER = "Peter-Eloy";
const REPO_NAME = "glassCVv2";
const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;

export const getLatestCVDownloadUrls = async () => {
  try {
    const response = await axios.get(GITHUB_API);
    const assets = response.data.assets;

    if (!assets || assets.length === 0) {
      console.error("No assets found in the latest release");
      return {};
    }

    return {
      EN: assets.find((asset) => asset.name === "Peter_Eloy_CV_EN.pdf")
        ?.browser_download_url,
      ES: assets.find((asset) => asset.name === "Peter_Eloy_CV_ES.pdf")
        ?.browser_download_url,
      DE: assets.find((asset) => asset.name === "Peter_Eloy_CV_DE.pdf")
        ?.browser_download_url,
    };
  } catch (error) {
    console.error("Error fetching CV download URLs:", error);
    // Log more detailed error information
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    throw error;
  }
};
