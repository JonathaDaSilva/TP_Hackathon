import type { ReactNode } from "react";
import loginImg from "../assets/images/Login.jpg";

interface AuthLayoutProps {
  titulo: string;
  subtitulo: string;
  children: ReactNode;
}

export function AuthLayout({ titulo, subtitulo, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-[calc(100vh-57px)] lg:grid-cols-2">
      <div className="flex items-center justify-center bg-cream-50 px-4 py-16">
        {children}
      </div>

      <div className="relative hidden overflow-hidden bg-ink-950 lg:flex lg:items-center lg:justify-center">
        <img className="absolute inset-0 h-full w-full object-cover" src={loginImg} alt="" />
        <div className="absolute inset-0 bg-ink-950/50" />

        <div className="relative max-w-sm px-10 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sage-600">
            <span className="h-3 w-3 rounded-full bg-white" />
          </span>
          <h2 className="mt-6 text-2xl font-semibold text-white">{titulo}</h2>
          <p className="mt-3 text-sm leading-relaxed text-cream-100/70">{subtitulo}</p>
        </div>
      </div>
    </div>
  );
}
