import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Outlet />
    </div>
  );
}
