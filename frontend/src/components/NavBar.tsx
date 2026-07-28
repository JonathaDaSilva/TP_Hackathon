import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        <Link to="/" className="text-lg font-semibold text-sage-800">
          ProOvo
        </Link>

        <div className="flex items-center gap-5 text-sm">
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
              <button
                onClick={handleLogout}
                className="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:border-sage-600 hover:text-sage-700"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:border-sage-600 hover:text-sage-700"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="rounded-md bg-sage-700 px-3 py-1.5 font-medium text-white hover:bg-sage-800"
              >
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
