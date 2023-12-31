import React from "react";
import userAuth from "./userAuth";
import { useLoginModal } from "./useLoginModal";
import { redirect } from "next/navigation";

interface ProtectedRoute {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRoute) {
  const isAuthenticated = userAuth();

  return isAuthenticated ? children : redirect("/");
}
