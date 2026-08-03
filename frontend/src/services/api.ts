import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const TOKEN_KEY = "avicola_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * O backend retorna 400 de duas formas: um mapa campo->mensagem (erros de
 * validação do Bean Validation) ou um objeto { mensagem } (regras de negócio,
 * ex: e-mail em formato inválido). Esta função só reconhece o primeiro formato.
 */
export function getFieldErrors(error: unknown): Record<string, string> | null {
  if (!axios.isAxiosError(error) || error.response?.status !== 400) {
    return null;
  }

  const data = error.response.data;
  if (data && typeof data === "object" && !("mensagem" in data)) {
    return data as Record<string, string>;
  }

  return null;
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data && typeof data === "object" && "mensagem" in data) {
      return String((data as { mensagem: unknown }).mensagem);
    }
  }
  return fallback;
}
