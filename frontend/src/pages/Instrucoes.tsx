import { Breadcrumb } from "../components/Breadcrumb";
import { IconBook } from "../components/icons";

export function Instrucoes() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-8">
      <Breadcrumb items={[{ label: "Painel", to: "/home" }, { label: "Instruções" }]} />

      <h1 className="mt-3 text-2xl font-semibold text-gray-900">Instruções</h1>
      <p className="mt-1 text-sm text-gray-500">Guia de como usar a plataforma ProOvo.</p>

      <div className="mt-6 flex flex-col items-center rounded-xl border border-cream-border bg-white p-10 text-center shadow-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 text-sage-700">
          <IconBook className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-base font-semibold text-gray-900">Em desenvolvimento</h2>
        <p className="mt-2 max-w-sm text-sm text-gray-500">
          Esta página vai reunir um guia completo de como cadastrar lotes, responder a
          triagem e interpretar o relatório final. Em breve estará disponível.
        </p>
      </div>
    </div>
  );
}
