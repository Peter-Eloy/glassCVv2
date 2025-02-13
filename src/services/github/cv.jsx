// src/services/github/cv.js
import axios from "axios";

const GITHUB_API =
  "https://api.github.com/repos/Peter-Eloy/glassCVv2/releases/latest";

export const getLatestCVDownloadUrls = async () => {
  try {
    const response = await axios.get(GITHUB_API);
    const assets = response.data.assets;

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
    throw error;
  }
};
