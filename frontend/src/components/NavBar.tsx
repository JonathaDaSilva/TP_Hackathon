import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, buttonClasses } from "./Button";
import { IconClose, IconMenu } from "./icons";

export function NavBar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  function fechar() {
    setMenuAberto(false);
  }

  function handleLogout() {
    fechar();
    logout();
    navigate("/");
  }

  const inicial = usuario?.nome.trim().charAt(0).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <nav className="flex w-full items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="font-display text-xl tracking-wide text-sage-800" onClick={fechar}>
          ProOvo
        </Link>

        {/* Links — visíveis a partir de md; abaixo disso viram o menu hambúrguer */}
        <div className="hidden items-center gap-5 text-sm md:flex">
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

        <button
          type="button"
          onClick={() => setMenuAberto((atual) => !atual)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 md:hidden"
        >
          {menuAberto ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </nav>

      {menuAberto && (
        <div className="border-t border-gray-200 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1 text-sm">
            <Link
              to="/sobre"
              onClick={fechar}
              className="rounded-md px-2 py-2.5 text-gray-700 hover:bg-gray-50"
            >
              Sobre Nós
            </Link>
            <Link
              to="/contato"
              onClick={fechar}
              className="rounded-md px-2 py-2.5 text-gray-700 hover:bg-gray-50"
            >
              Fale Conosco
            </Link>
            {usuario && (
              <Link
                to="/home"
                onClick={fechar}
                className="rounded-md px-2 py-2.5 text-gray-700 hover:bg-gray-50"
              >
                Meus Lotes
              </Link>
            )}
          </div>

          <div className="mt-3 border-t border-gray-100 pt-3">
            {usuario ? (
              <div className="flex items-center justify-between gap-3 px-2">
                <span className="flex items-center gap-2 text-sm text-gray-700">
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
              <div className="flex flex-col gap-2 px-2">
                <Link
                  to="/login"
                  onClick={fechar}
                  className={buttonClasses({ variant: "secondary", size: "sm" })}
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  onClick={fechar}
                  className={buttonClasses({ variant: "primary", size: "sm" })}
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
