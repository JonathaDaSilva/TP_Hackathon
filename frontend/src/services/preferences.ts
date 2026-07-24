const PULAR_INSTRUCOES_KEY = "proovo_pular_instrucoes_quiz";

export function getPularInstrucoesQuiz(): boolean {
  return localStorage.getItem(PULAR_INSTRUCOES_KEY) === "true";
}

export function setPularInstrucoesQuiz(pular: boolean): void {
  if (pular) {
    localStorage.setItem(PULAR_INSTRUCOES_KEY, "true");
  } else {
    localStorage.removeItem(PULAR_INSTRUCOES_KEY);
  }
}
