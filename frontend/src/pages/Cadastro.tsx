import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage, getFieldErrors } from "../services/api";
import { AuthLayout } from "../components/AuthLayout";
import { PasswordStrength } from "../components/PasswordStrength";

export function Cadastro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaFoiTocada, setSenhaFoiTocada] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [errosCampo, setErrosCampo] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro(null);
    setErrosCampo({});
    setEnviando(true);

    try {
      await registrar(nome, email, senha);
      navigate("/home");
    } catch (err) {
      const camposInvalidos = getFieldErrors(err);
      if (camposInvalidos) {
        setErrosCampo(camposInvalidos);
      } else if (axios.isAxiosError(err) && err.response?.status === 409) {
        setErro("Já existe uma conta cadastrada com este e-mail.");
      } else {
        setErro(getErrorMessage(err, "Não foi possível concluir o cadastro. Verifique os dados e tente novamente."));
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthLayout
      titulo="Comece a cuidar do seu plantel"
      subtitulo="Cadastre-se para acompanhar a saúde dos seus lotes e gerar relatórios de triagem."
    >
      <div className="w-full max-w-sm rounded-xl border border-cream-border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Criar conta</h1>
        <p className="mt-1 text-sm text-gray-500">Preencha os dados abaixo para começar.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              required
              minLength={2}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:border-sage-600 focus:outline-none"
            />
            {errosCampo.nome && <p className="mt-1 text-xs text-red-600">{errosCampo.nome}</p>}
          </div>

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
              minLength={10}
              maxLength={15}
              value={senha}
              onFocus={() => setSenhaFoiTocada(true)}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:border-sage-600 focus:outline-none"
            />
            {errosCampo.senha && <p className="mt-1 text-xs text-red-600">{errosCampo.senha}</p>}
            {senhaFoiTocada && <PasswordStrength senha={senha} />}
          </div>

          {erro && <p className="text-sm text-red-600">{erro}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-md bg-sage-700 py-2 font-medium text-white hover:bg-sage-800 disabled:opacity-60"
          >
            {enviando ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-600">
          Já tem conta?{" "}
          <Link to="/login" className="font-medium text-sage-700 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
