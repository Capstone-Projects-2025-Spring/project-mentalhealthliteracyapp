import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import Sidebar from "./components/Sidebar";
import Welcome from "./pages/Welcome";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import Tutorial from "./pages/Tutorial";
import Video from "./pages/Video";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Topbar />
      <div id="app-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="video" element={<Video />} />
        </Routes>
      </div>
    </Router>
  </StrictMode>
);
