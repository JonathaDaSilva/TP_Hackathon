import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export function PublicLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {children ?? <Outlet />}
    </div>
  );
}
