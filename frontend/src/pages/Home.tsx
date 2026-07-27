import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api, getErrorMessage, getFieldErrors } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { getPularInstrucoesQuiz } from "../services/preferences";
import { Breadcrumb } from "../components/Breadcrumb";
import type { Lote } from "../services/types";

export function Home() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [novaIdentificacao, setNovaIdentificacao] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [erroIdentificacao, setErroIdentificacao] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [edicaoTexto, setEdicaoTexto] = useState("");
  const [erroEdicao, setErroEdicao] = useState<string | null>(null);

  useEffect(() => {
    carregarLotes();
  }, []);

  async function carregarLotes() {
    setCarregando(true);
    try {
      const { data } = await api.get<Lote[]>("/lotes");
      setLotes(data);
    } catch {
      setErro("Não foi possível carregar seus lotes.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleCriar(e: FormEvent) {
    e.preventDefault();
    if (!novaIdentificacao.trim()) return;

    setErro(null);
    setErroIdentificacao(null);

    try {
      const { data } = await api.post<Lote>("/lotes", { identificacao: novaIdentificacao });
      setLotes((atual) => [data, ...atual]);
      setNovaIdentificacao("");
    } catch (err) {
      const camposInvalidos = getFieldErrors(err);
      if (camposInvalidos?.identificacao) {
        setErroIdentificacao(camposInvalidos.identificacao);
      } else {
        setErro(getErrorMessage(err, "Não foi possível criar o lote."));
      }
    }
  }

  function iniciarEdicao(lote: Lote) {
    setEditandoId(lote.id);
    setEdicaoTexto(lote.identificacao);
    setErroEdicao(null);
  }

  async function salvarEdicao(id: number) {
    setErroEdicao(null);

    try {
      const { data } = await api.put<Lote>(`/lotes/${id}`, { identificacao: edicaoTexto });
      setLotes((atual) => atual.map((l) => (l.id === id ? data : l)));
      setEditandoId(null);
    } catch (err) {
      const camposInvalidos = getFieldErrors(err);
      setErroEdicao(camposInvalidos?.identificacao ?? getErrorMessage(err, "Não foi possível atualizar o lote."));
    }
  }

  async function excluirLote(id: number) {
    try {
      await api.delete(`/lotes/${id}`);
      setLotes((atual) => atual.filter((l) => l.id !== id));
    } catch (err) {
      setErro(getErrorMessage(err, "Não foi possível excluir o lote."));
    }
  }

  function iniciarTriagem(loteId: number) {
    if (getPularInstrucoesQuiz()) {
      navigate(`/lotes/${loteId}/quiz`);
    } else {
      navigate(`/lotes/${loteId}/instrucoes`);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-8 py-8">
      <Breadcrumb items={[{ label: "Painel" }, { label: "Início" }]} />

      <h1 className="mt-3 text-2xl font-semibold text-gray-900">Olá, {usuario?.nome}</h1>
      <p className="mt-1 text-sm text-gray-500">Gerencie os galpões (lotes) que você acompanha.</p>

      <div className="mt-6 rounded-xl border border-cream-border bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900">Cadastrar lote</h2>
        <p className="mt-1 text-sm text-gray-500">Identifique o galpão/lote para iniciar a triagem.</p>

        <form onSubmit={handleCriar} className="mt-4 flex gap-2">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600">Identificação do lote</label>
            <input
              type="text"
              placeholder="ex: Galpão 01"
              value={novaIdentificacao}
              onChange={(e) => setNovaIdentificacao(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:border-sage-600 focus:outline-none"
            />
            {erroIdentificacao && <p className="mt-1 text-xs text-red-600">{erroIdentificacao}</p>}
          </div>
          <button
            type="submit"
            className="mt-5 h-fit rounded-md bg-sage-700 px-4 py-2 font-medium text-white hover:bg-sage-800"
          >
            Adicionar
          </button>
        </form>

        {erro && <p className="mt-3 text-sm text-red-600">{erro}</p>}
      </div>

      <div className="mt-6 divide-y divide-cream-border rounded-xl border border-cream-border bg-white shadow-sm">
        {carregando && <p className="p-5 text-sm text-gray-500">Carregando lotes...</p>}

        {!carregando && lotes.length === 0 && (
          <p className="p-5 text-sm text-gray-500">
            Você ainda não cadastrou nenhum lote. Adicione o primeiro acima.
          </p>
        )}

        {lotes.map((lote) => (
          <div key={lote.id} className="flex items-center justify-between gap-3 p-5">
            {editandoId === lote.id ? (
              <div className="flex-1">
                <input
                  type="text"
                  value={edicaoTexto}
                  onChange={(e) => setEdicaoTexto(e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-2 py-1 focus:border-sage-600 focus:outline-none"
                  autoFocus
                />
                {erroEdicao && <p className="mt-1 text-xs text-red-600">{erroEdicao}</p>}
              </div>
            ) : (
              <span className="font-medium text-gray-800">{lote.identificacao}</span>
            )}

            <div className="flex shrink-0 gap-2 text-sm">
              {editandoId === lote.id ? (
                <>
                  <button
                    onClick={() => salvarEdicao(lote.id)}
                    className="font-medium text-sage-700 hover:underline"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditandoId(null)}
                    className="text-gray-500 hover:underline"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => iniciarTriagem(lote.id)}
                    className="rounded-md bg-sage-700 px-3 py-1.5 text-white hover:bg-sage-800"
                  >
                    Iniciar Triagem
                  </button>
                  <button
                    onClick={() => iniciarEdicao(lote)}
                    className="text-gray-500 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirLote(lote.id)}
                    className="text-red-600 hover:underline"
                  >
                    Excluir
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
