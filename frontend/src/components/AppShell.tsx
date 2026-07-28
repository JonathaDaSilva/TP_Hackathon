import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cream-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}
