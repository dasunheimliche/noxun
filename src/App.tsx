import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home-page";
import PostDetailsPage from "@/pages/post-details-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
