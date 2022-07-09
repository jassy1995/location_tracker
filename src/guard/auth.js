import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Store } from "../store";

export default function AuthGuard({ children }) {
  const { state } = useContext(Store);
  const { wesabiUser } = state;
  console.log(wesabiUser);
  let location = useLocation();
  return wesabiUser ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
