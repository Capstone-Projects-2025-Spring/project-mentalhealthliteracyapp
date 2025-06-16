import "./main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Sidebar from "./components/Sidebar";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Tutorial from "./pages/Tutorial";
import Video from "./pages/Video";
import Resources from "./pages/Resources";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="video" element={<Video />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </main>
    </Router>
  </StrictMode>
);
