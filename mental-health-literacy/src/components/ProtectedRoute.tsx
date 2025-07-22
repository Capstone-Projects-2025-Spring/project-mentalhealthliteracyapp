import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getUser } from "utils/GetUserHook";

function ProtectedRoute(props: { children: React.ReactNode }) {
  const user = useSelector((state: any) => {
    return state.user.user;
  });
  // If user not signed in, redirect to main page
  return <>{user ? <>{props.children}</> : <Navigate to="/"></Navigate>}</>;
}

export default ProtectedRoute;
