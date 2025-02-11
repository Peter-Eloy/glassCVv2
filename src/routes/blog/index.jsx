// src/routes/blog/index.jsx
import { Routes, Route } from "react-router-dom";
import BlogList from "../../pages/blog/BlogList";
import BlogPost from "../../pages/blog/BlogPost";

const BlogRoutes = () => {
  return (
    <Routes>
      <Route index element={<BlogList />} />
      <Route path=":postId" element={<BlogPost />} />
    </Routes>
  );
};

export default BlogRoutes;
