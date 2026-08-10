import { Link } from "react-router-dom";
import { buttonClasses } from "../components/Button";

export function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-sm font-medium text-sage-700">Erro 404</p>
      <h1 className="font-display mt-2 text-3xl text-ink-950">Página não encontrada</h1>
      <p className="mt-3 text-gray-600">
        O endereço que você acessou não existe ou foi movido.
      </p>
      <Link to="/" className={buttonClasses({ className: "mt-6" })}>
        Voltar para o início
      </Link>
    </div>
  );
}
