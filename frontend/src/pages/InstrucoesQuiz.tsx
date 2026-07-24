import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPularInstrucoesQuiz, setPularInstrucoesQuiz } from "../services/preferences";
import { Breadcrumb } from "../components/Breadcrumb";

const DICAS = [
  "Responda com base no que você observou nos últimos dias no galpão, não só no momento exato do preenchimento.",
  "Seja o mais honesto possível — mesmo respostas que indicam um problema ajudam a gerar um diagnóstico mais preciso.",
  "Tenha em mãos informações recentes sobre alimentação, água, comportamento das aves e qualidade dos ovos.",
  "O quiz leva poucos minutos e pode ser refeito sempre que quiser acompanhar a evolução do lote.",
  "O resultado é um apoio à decisão e não substitui a avaliação de um profissional/veterinário.",
];

export function InstrucoesQuiz() {
  const { loteId } = useParams<{ loteId: string }>();
  const navigate = useNavigate();
  const [confirmouLeitura, setConfirmouLeitura] = useState(false);
  const [naoMostrarNovamente, setNaoMostrarNovamente] = useState(getPularInstrucoesQuiz());

  function handleContinuar() {
    setPularInstrucoesQuiz(naoMostrarNovamente);
    navigate(`/lotes/${loteId}/quiz`);
  }

  return (
    <div className="mx-auto max-w-xl px-8 py-8">
      <Breadcrumb items={[{ label: "Painel", to: "/home" }, { label: "Triagem", to: "/home" }, { label: "Instruções" }]} />

      <h1 className="mt-3 text-2xl font-semibold text-gray-900">Antes de começar</h1>
      <p className="mt-2 text-sm text-gray-500">
        Siga estas orientações para responder o quiz de triagem da melhor forma possível.
      </p>

      <div className="mt-6 rounded-xl border border-cream-border bg-white p-6 shadow-sm">
        <ul className="space-y-3">
          {DICAS.map((dica) => (
            <li key={dica} className="flex gap-3 text-sm text-gray-700">
              <span className="mt-0.5 text-sage-700">•</span>
              <span>{dica}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-3 border-t border-cream-border pt-5">
          <label className="flex items-start gap-2 text-sm text-gray-800">
            <input
              type="checkbox"
              checked={confirmouLeitura}
              onChange={(e) => setConfirmouLeitura(e.target.checked)}
              className="mt-0.5 accent-sage-700"
            />
            Li e entendi as instruções acima.
          </label>

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={naoMostrarNovamente}
              onChange={(e) => setNaoMostrarNovamente(e.target.checked)}
              className="mt-0.5 accent-sage-700"
            />
            Não mostrar esta tela novamente.
          </label>
        </div>
      </div>

      <button
        type="button"
        disabled={!confirmouLeitura}
        onClick={handleContinuar}
        className="mt-6 w-full rounded-md bg-sage-700 py-2 font-medium text-white hover:bg-sage-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continuar para o quiz
      </button>
    </div>
  );
}
