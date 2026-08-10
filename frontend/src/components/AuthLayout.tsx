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
      {/* Formulário com a foto ao fundo — o card do formulário é opaco, então
          a foto só "respira" no espaço ao redor dele. */}
      <div className="relative flex items-center justify-center overflow-hidden px-4 py-16">
        <img className="absolute inset-0 h-full w-full object-cover" src={loginImg} alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/75 via-cream-50/40 to-cream-50/75" />
        <div className="relative w-full max-w-sm">{children}</div>
      </div>

      {/* Lado sem foto — texto grande e fundo com identidade própria. */}
      <div className="relative hidden overflow-hidden bg-ink-950 lg:flex lg:items-center lg:justify-center">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-sage-600/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-12rem] right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-sage-800/30 blur-3xl" />

        <div className="relative max-w-md px-10 text-center">
          <img src="/ovo-white.png" alt="" className="mx-auto h-16 w-16" />
          <p className="font-display mt-3 text-2xl tracking-wide text-sage-100">ProOvo</p>
          <h2 className="font-display mt-8 text-4xl leading-[1.15] text-white">{titulo}</h2>
          <p className="mt-5 text-base leading-relaxed text-cream-100/70">{subtitulo}</p>
        </div>
      </div>
    </div>
  );
}
