import { useState } from "react";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { IconMenu } from "./icons";

export function AppShell({ children }: { children?: ReactNode }) {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream-50">
      <Sidebar aberta={sidebarAberta} onFechar={() => setSidebarAberta(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barra superior — só aparece abaixo de lg, onde a sidebar vira gaveta */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-cream-border bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarAberta(true)}
            aria-label="Abrir menu"
            className="rounded-md p-1.5 text-ink-800 hover:bg-cream-100"
          >
            <IconMenu className="h-5 w-5" />
          </button>
          <span className="font-display text-base tracking-wide text-ink-950">ProOvo</span>
        </header>

        <main className="min-w-0 flex-1">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
