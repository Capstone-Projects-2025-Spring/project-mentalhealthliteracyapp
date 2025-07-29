import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import useUser from "utils/useUser";

function ProtectedRoute(props: { children: React.ReactNode }) {
  const user = useUser();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    console.log("[ProtectedRoute] User state:", user);

    // Check authentication state after delay to ensure user is loaded properly from Redux
    const timer = setTimeout(() => {
      setHasCheckedAuth(true);
      console.log("[ProtectedRoute] Authentication check completed, user:", user);
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

  // Show loading while checking authentication
  if (!hasCheckedAuth) {
    return <div>Loading...</div>;
  }

  // Check if user is authenticated: email if authenticated, null if not
  if (user && typeof user === 'string' && user.trim() !== '') {
    console.log("[ProtectedRoute] User authenticated, showing Profile");
    return <>{props.children}</>;
  }

  // If user is not authenticated, redirect
  console.log("[ProtectedRoute] User not authenticated, redirecting to welcome page");
  return <Navigate to="/" />;
}

export default ProtectedRoute;
