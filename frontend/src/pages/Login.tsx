import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage, getFieldErrors } from "../services/api";
import { AuthLayout } from "../components/AuthLayout";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [errosCampo, setErrosCampo] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro(null);
    setErrosCampo({});
    setEnviando(true);

    try {
      await login(email, senha);
      navigate("/home");
    } catch (err) {
      const camposInvalidos = getFieldErrors(err);
      if (camposInvalidos) {
        setErrosCampo(camposInvalidos);
      } else if (axios.isAxiosError(err) && err.response?.status === 401) {
        setErro("E-mail ou senha inválidos.");
      } else {
        setErro(getErrorMessage(err, "Não foi possível entrar. Tente novamente."));
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthLayout
      titulo="Bem-vindo(a) de volta"
      subtitulo="Acompanhe a saúde dos seus lotes e retome de onde parou."
    >
      <div className="w-full max-w-sm rounded-xl border border-cream-border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Entrar</h1>
        <p className="mt-1 text-sm text-gray-500">Acesse sua conta para continuar a triagem.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:border-sage-600 focus:outline-none"
            />
            {errosCampo.email && <p className="mt-1 text-xs text-red-600">{errosCampo.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:border-sage-600 focus:outline-none"
            />
            {errosCampo.senha && <p className="mt-1 text-xs text-red-600">{errosCampo.senha}</p>}
          </div>

          {erro && <p className="text-sm text-red-600">{erro}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-md bg-sage-700 py-2 font-medium text-white hover:bg-sage-800 disabled:opacity-60"
          >
            {enviando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-600">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="font-medium text-sage-700 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
