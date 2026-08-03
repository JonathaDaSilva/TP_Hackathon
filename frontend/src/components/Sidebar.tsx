import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IconBook } from "./icons";

function IconInicio() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function IconTriagem() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  );
}

function IconContato() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 4h16v14H7l-3 3V4z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { label: "Início", to: "/home", icon: IconInicio },
  { label: "Triagem", to: "/home", icon: IconTriagem },
  { label: "Instruções", to: "/instrucoes", icon: IconBook },
  { label: "Fale conosco", to: "/contato", icon: IconContato },
];

export function Sidebar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col self-start overflow-y-auto bg-ink-950 text-cream-100">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-sage-600">
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
        <Link to="/home" className="text-base font-semibold text-white">
          ProOvo
        </Link>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const ativo =
            item.to === "/home"
              ? location.pathname === "/home" || location.pathname.startsWith("/lotes")
              : location.pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition ${
                ativo
                  ? "bg-ink-800 font-medium text-white"
                  : "text-cream-100/70 hover:bg-ink-900 hover:text-white"
              }`}
            >
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ink-800 px-3 py-4">
        <p className="px-3 text-[11px] font-medium uppercase tracking-wide text-cream-100/40">
          Conta
        </p>
        <p className="mt-1 truncate px-3 text-sm text-cream-100/80">{usuario?.nome}</p>
        <button
          onClick={handleLogout}
          className="mt-2 w-full rounded-md border border-ink-700 px-3 py-2 text-sm text-cream-100/90 hover:bg-ink-900"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
