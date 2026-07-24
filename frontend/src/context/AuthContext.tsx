import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, clearToken, getToken, setToken } from "../services/api";
import type { AuthResponse, Usuario } from "../services/types";

interface AuthContextValue {
  usuario: Usuario | null;
  carregando: boolean;
  login: (email: string, senha: string) => Promise<void>;
  registrar: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setCarregando(false);
      return;
    }

    api
      .get<Usuario>("/usuarios/me")
      .then((res) => setUsuario(res.data))
      .catch(() => clearToken())
      .finally(() => setCarregando(false));
  }, []);

  async function login(email: string, senha: string) {
    const { data } = await api.post<AuthResponse>("/auth/login", { email, senha });
    setToken(data.token);
    setUsuario(data.usuario);
  }

  async function registrar(nome: string, email: string, senha: string) {
    const { data } = await api.post<AuthResponse>("/auth/registrar", { nome, email, senha });
    setToken(data.token);
    setUsuario(data.usuario);
  }

  function logout() {
    clearToken();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
