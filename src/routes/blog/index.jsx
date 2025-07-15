// src/routes/blog/index.jsx
import { Routes, Route } from "react-router-dom";
import BlogPage from "../../pages/blog";

const BlogRoutes = () => {
  return (
    <Routes>
      <Route index element={<BlogPage />} />
    </Routes>
  );
};

export default BlogRoutes;
