// src/components/siteVisitorCounter/index.jsx

const SiteVisitorCounter = () => {
  // Only tracks website visits - not GitHub
  const websiteUrl = encodeURIComponent("https://petereloy.dev/website-only");

  // Create counter URL (simplified, no need for theme since it's invisible)
  const counterUrl = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${websiteUrl}`;

  return (
    <img
      src={counterUrl}
      alt=""
      width="1"
      height="1"
      style={{
        position: "absolute",
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default SiteVisitorCounter;
