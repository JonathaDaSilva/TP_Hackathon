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

export interface OpcaoResposta {
  id: number;
  texto: string;
}

export interface Pergunta {
  id: number;
  enunciado: string;
  opcoes: OpcaoResposta[];
}

export interface CategoriaComPerguntas {
  id: number;
  nome: string;
  perguntas: Pergunta[];
}

export type Cenario = "ESTAVEL" | "ATENCAO" | "ALERTA";

export interface TriagemResultado {
  id: number;
  loteId: number;
  pontuacaoTotal: number;
  cenario: Cenario;
  cenarioRotulo: string;
  respondidoEm: string;
}
