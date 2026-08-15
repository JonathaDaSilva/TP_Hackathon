import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, buttonClasses } from "./Button";

export function NavBar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const inicial = usuario?.nome.trim().charAt(0).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <nav className="flex w-full items-center justify-between px-6 py-3">
        <Link to="/" className="font-display text-xl tracking-wide text-sage-800">
          ProOvo
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <Link to="/sobre" className="text-gray-600 hover:text-sage-700">
            Sobre Nós
          </Link>
          <Link to="/contato" className="text-gray-600 hover:text-sage-700">
            Fale Conosco
          </Link>
          {usuario && (
            <Link to="/home" className="text-gray-600 hover:text-sage-700">
              Meus Lotes
            </Link>
          )}

          <div className="h-5 w-px bg-gray-200" />

          {usuario ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-gray-700">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-100 text-xs font-semibold text-sage-800">
                  {inicial}
                </span>
                {usuario.nome}
              </span>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className={buttonClasses({ variant: "secondary", size: "sm" })}>
                Entrar
              </Link>
              <Link to="/cadastro" className={buttonClasses({ variant: "primary", size: "sm" })}>
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
