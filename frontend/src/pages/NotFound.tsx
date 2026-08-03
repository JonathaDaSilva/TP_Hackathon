import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-sm font-medium text-green-700">Erro 404</p>
      <h1 className="mt-2 text-3xl font-bold text-green-950">Página não encontrada</h1>
      <p className="mt-3 text-gray-600">
        O endereço que você acessou não existe ou foi movido.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-green-700 px-6 py-3 font-medium text-white hover:bg-green-800"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
