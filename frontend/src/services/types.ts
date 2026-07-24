export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  expiraEm: string;
  usuario: Usuario;
}

export interface Lote {
  id: number;
  identificacao: string;
  criadoEm: string;
}
