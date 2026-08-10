import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api, getErrorMessage, getFieldErrors } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { caminhoIniciarTriagem } from "../services/preferences";
import { Breadcrumb } from "../components/Breadcrumb";
import { IconPencil, IconTrash } from "../components/icons";
import { Button } from "../components/Button";
import type { Lote, LotePagina } from "../services/types";

const TAMANHO_PAGINA = 10;

export function Home() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [novaIdentificacao, setNovaIdentificacao] = useState("");
  const [erroIdentificacao, setErroIdentificacao] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [edicaoTexto, setEdicaoTexto] = useState("");
  const [erroEdicao, setErroEdicao] = useState<string | null>(null);

  useEffect(() => {
    carregarLotes(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function carregarLotes(paginaAlvo: number) {
    setCarregando(true);
    try {
      const { data } = await api.get<LotePagina>("/lotes", {
        params: { pagina: paginaAlvo, tamanho: TAMANHO_PAGINA },
      });
      setLotes(data.conteudo);
      setPagina(data.pagina);
      setTotalPaginas(Math.max(data.totalPaginas, 1));
    } catch (err) {
      toast.error(getErrorMessage(err, "Não foi possível carregar seus lotes."));
    } finally {
      setCarregando(false);
    }
  }

  async function handleCriar(e: FormEvent) {
    e.preventDefault();
    if (!novaIdentificacao.trim()) return;

    setErroIdentificacao(null);

    try {
      await api.post<Lote>("/lotes", { identificacao: novaIdentificacao });
      setNovaIdentificacao("");
      toast.success("Lote cadastrado com sucesso.");
      // Lote novo entra ordenado por criadoEm desc, então volta pra 1ª página.
      await carregarLotes(0);
    } catch (err) {
      const camposInvalidos = getFieldErrors(err);
      if (camposInvalidos?.identificacao) {
        setErroIdentificacao(camposInvalidos.identificacao);
      } else {
        toast.error(getErrorMessage(err, "Não foi possível criar o lote."));
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
      toast.success("Lote atualizado com sucesso.");
    } catch (err) {
      const camposInvalidos = getFieldErrors(err);
      setErroEdicao(camposInvalidos?.identificacao ?? getErrorMessage(err, "Não foi possível atualizar o lote."));
    }
  }

  async function excluirLote(id: number) {
    try {
      await api.delete(`/lotes/${id}`);
      toast.success("Lote excluído com sucesso.");
      // Se era o último item da página (e não a 1ª), volta uma página.
      const paginaAlvo = lotes.length === 1 && pagina > 0 ? pagina - 1 : pagina;
      await carregarLotes(paginaAlvo);
    } catch (err) {
      toast.error(getErrorMessage(err, "Não foi possível excluir o lote."));
    }
  }

  function irParaPaginaAnterior() {
    if (pagina > 0) carregarLotes(pagina - 1);
  }

  function irParaProximaPagina() {
    if (pagina + 1 < totalPaginas) carregarLotes(pagina + 1);
  }

  function iniciarTriagem(loteId: number) {
    navigate(caminhoIniciarTriagem(loteId));
  }

  function verDetalhes(lote: Lote) {
    navigate(`/lotes/${lote.id}/triagens/${lote.ultimaTriagemId}`);
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
          <Button type="submit" className="mt-5 h-fit">
            Adicionar
          </Button>
        </form>
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
                  {lote.ultimaTriagemId == null ? (
                    <Button size="sm" onClick={() => iniciarTriagem(lote.id)}>
                      Iniciar Triagem
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => verDetalhes(lote)}>
                      Ver detalhes
                    </Button>
                  )}
                  <button
                    onClick={() => iniciarEdicao(lote)}
                    aria-label="Editar lote"
                    title="Editar"
                    className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-cream-100 hover:text-sage-700"
                  >
                    <IconPencil />
                  </button>
                  <button
                    onClick={() => excluirLote(lote.id)}
                    aria-label="Excluir lote"
                    title="Excluir"
                    className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <IconTrash />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {!carregando && totalPaginas > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <button
            onClick={irParaPaginaAnterior}
            disabled={pagina === 0}
            className="font-medium text-sage-700 hover:underline disabled:cursor-not-allowed disabled:text-gray-300 disabled:no-underline"
          >
            Anterior
          </button>
          <span>
            Página {pagina + 1} de {totalPaginas}
          </span>
          <button
            onClick={irParaProximaPagina}
            disabled={pagina + 1 >= totalPaginas}
            className="font-medium text-sage-700 hover:underline disabled:cursor-not-allowed disabled:text-gray-300 disabled:no-underline"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
