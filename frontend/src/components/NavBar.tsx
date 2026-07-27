import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function NavBar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-semibold text-green-800">
          ProOvo
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/contato" className="text-gray-600 hover:text-green-800">
            Fale Conosco
          </Link>
          {usuario ? (
            <>
              <Link to="/home" className="text-gray-600 hover:text-green-800">
                Meus Lotes
              </Link>
              <span className="text-gray-400">{usuario.nome}</span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-gray-700 hover:bg-gray-200"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-green-800">
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="rounded-md bg-green-700 px-3 py-1.5 text-white hover:bg-green-800"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
