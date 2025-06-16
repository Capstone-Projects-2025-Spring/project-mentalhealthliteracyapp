import "./main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Sidebar from "./components/Sidebar";
import { routeList } from "./pages/Pages";
import Resources from "./pages/Resources";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Sidebar />
      <main>
        <Routes>
          {routeList.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </Router>
  </StrictMode>
);
