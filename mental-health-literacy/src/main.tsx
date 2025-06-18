import "./main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeList } from "./pages/Pages";
import MainLayout from "./pages/MainLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {routeList.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
