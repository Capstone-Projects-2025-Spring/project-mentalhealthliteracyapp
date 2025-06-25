import "./main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { routeList } from "./pages/Pages";
import MainLayout from "./pages/MainLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            {routeList.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  </StrictMode>
);
