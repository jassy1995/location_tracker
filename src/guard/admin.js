import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Store } from "../store";

export default function AdminGuard({ children }) {
  const { state } = useContext(Store);
  const { wesabiUser, isAdmin } = state;
  console.log(wesabiUser);
  console.log(isAdmin);
  let location = useLocation();
  return wesabiUser && isAdmin ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
