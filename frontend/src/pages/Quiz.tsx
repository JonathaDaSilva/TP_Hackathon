import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";

const CATEGORIAS = [
  { nome: "Ambiente do Galpão", status: "atual" as const },
  { nome: "Saúde do Lote", status: "pendente" as const },
  { nome: "Qualidade dos Ovos", status: "pendente" as const },
];

export function Quiz() {
  const { loteId } = useParams<{ loteId: string }>();

  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <Breadcrumb items={[{ label: "Painel", to: "/home" }, { label: "Triagem", to: "/home" }, { label: `Lote ${loteId}` }]} />

      <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="rounded-xl border border-cream-border bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Categorias</p>
          <ul className="mt-3 space-y-2.5">
            {CATEGORIAS.map((categoria) => (
              <li key={categoria.nome} className="flex items-center gap-2 text-sm">
                <span
                  className={`h-2 w-2 rounded-full ${
                    categoria.status === "atual" ? "bg-sage-700" : "bg-cream-border"
                  }`}
                />
                <span className={categoria.status === "atual" ? "font-medium text-gray-900" : "text-gray-400"}>
                  {categoria.nome}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-cream-border pt-4">
            <p className="text-xs text-gray-500">0 de 12 concluídas</p>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-cream-100">
              <div className="h-1.5 w-0 rounded-full bg-sage-700" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-cream-border bg-white p-6 shadow-sm">
          <p className="text-xs text-gray-400">Ambiente do Galpão · item 1</p>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">Pergunta 1</h1>

          <div className="mt-4 space-y-2 opacity-60">
            {["Opção A", "Opção B", "Opção C"].map((opcao) => (
              <label
                key={opcao}
                className="flex cursor-not-allowed items-center gap-2.5 rounded-md border border-cream-border px-3 py-2.5 text-sm text-gray-500"
              >
                <input type="radio" disabled name="pergunta-placeholder" />
                {opcao}
              </label>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-md border border-cream-border px-4 py-2 text-sm text-gray-400"
            >
              Voltar
            </button>
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-md bg-cream-border px-4 py-2 text-sm text-gray-400"
            >
              Próxima
            </button>
          </div>

          <p className="mt-6 rounded-md bg-cream-50 p-3 text-xs text-gray-500">
            Prévia de layout — as perguntas, opções e a lógica de pontuação deste quiz ainda
            dependem do conteúdo que a equipe de negócios vai entregar. Assim que o conteúdo
            estiver pronto, esta tela passa a funcionar de verdade.
          </p>
        </div>
      </div>

      <Link to="/home" className="mt-6 inline-block text-sm text-sage-700 hover:underline">
        Voltar para meus lotes
      </Link>
    </div>
  );
}
