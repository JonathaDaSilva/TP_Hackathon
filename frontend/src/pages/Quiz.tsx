import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { api, getErrorMessage } from "../services/api";
import { Breadcrumb } from "../components/Breadcrumb";
import type { CategoriaComPerguntas, Cenario, TriagemResultado } from "../services/types";

interface PerguntaComCategoria {
  categoriaId: number;
  categoriaNome: string;
  itemNaCategoria: number;
  totalNaCategoria: number;
  pergunta: CategoriaComPerguntas["perguntas"][number];
}

const CENARIO_ESTILO: Record<Cenario, string> = {
  ESTAVEL: "bg-sage-100 text-sage-800",
  ATENCAO: "bg-amber-100 text-amber-800",
  ALERTA: "bg-red-100 text-red-800",
};

export function Quiz() {
  const { loteId } = useParams<{ loteId: string }>();

  const [categorias, setCategorias] = useState<CategoriaComPerguntas[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<TriagemResultado | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get<CategoriaComPerguntas[]>("/questionario");
        setCategorias(data);
      } catch (err) {
        toast.error(getErrorMessage(err, "Não foi possível carregar o questionário."));
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  const perguntasFlat = useMemo<PerguntaComCategoria[]>(
    () =>
      categorias.flatMap((categoria) =>
        categoria.perguntas.map((pergunta, indice) => ({
          categoriaId: categoria.id,
          categoriaNome: categoria.nome,
          itemNaCategoria: indice + 1,
          totalNaCategoria: categoria.perguntas.length,
          pergunta,
        }))
      ),
    [categorias]
  );

  const totalRespondidas = Object.keys(respostas).length;
  const atual = perguntasFlat[indiceAtual];
  const ehUltima = indiceAtual === perguntasFlat.length - 1;
  const respostaAtualSelecionada = atual ? respostas[atual.pergunta.id] : undefined;

  function selecionarResposta(perguntaId: number, opcaoId: number) {
    setRespostas((atual) => ({ ...atual, [perguntaId]: opcaoId }));
  }

  function handleVoltar() {
    setIndiceAtual((indice) => Math.max(0, indice - 1));
  }

  async function handleProxima() {
    if (!ehUltima) {
      setIndiceAtual((indice) => indice + 1);
      return;
    }

    setEnviando(true);
    try {
      const payload = {
        respostas: perguntasFlat.map(({ pergunta }) => ({
          perguntaId: pergunta.id,
          opcaoRespostaId: respostas[pergunta.id],
        })),
      };
      const { data } = await api.post<TriagemResultado>(`/lotes/${loteId}/triagens`, payload);
      setResultado(data);
    } catch (err) {
      toast.error(getErrorMessage(err, "Não foi possível enviar a triagem."));
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <div className="mx-auto max-w-4xl px-8 py-8">
        <p className="text-sm text-gray-500">Carregando questionário...</p>
      </div>
    );
  }

  if (perguntasFlat.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-8 py-8">
        <p className="text-sm text-gray-500">
          O questionário de triagem ainda não está disponível. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <Breadcrumb
        items={[{ label: "Painel", to: "/home" }, { label: "Triagem", to: "/home" }, { label: `Lote ${loteId}` }]}
      />

      <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="rounded-xl border border-cream-border bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Categorias</p>
          <ul className="mt-3 space-y-2.5">
            {categorias.map((categoria) => {
              const ativa = !resultado && categoria.id === atual?.categoriaId;
              return (
                <li key={categoria.id} className="flex items-center gap-2 text-sm">
                  <span className={`h-2 w-2 rounded-full ${ativa ? "bg-sage-700" : "bg-cream-border"}`} />
                  <span className={ativa ? "font-medium text-gray-900" : "text-gray-400"}>{categoria.nome}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 border-t border-cream-border pt-4">
            <p className="text-xs text-gray-500">
              {totalRespondidas} de {perguntasFlat.length} concluídas
            </p>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-cream-100">
              <div
                className="h-1.5 rounded-full bg-sage-700 transition-all"
                style={{ width: `${(totalRespondidas / perguntasFlat.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {resultado ? (
          <div className="rounded-xl border border-cream-border bg-white p-6 text-center shadow-sm">
            <span
              className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${CENARIO_ESTILO[resultado.cenario]}`}
            >
              {resultado.cenarioRotulo}
            </span>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {resultado.pontuacaoTotal}
              <span className="text-lg font-normal text-gray-400">/60</span>
            </p>
            <p className="mt-1 text-sm text-gray-500">Pontuação total da triagem</p>

            <p className="mt-6 rounded-md bg-cream-50 p-3 text-xs text-gray-500">
              Relatório completo com diagnóstico e dicas de manejo em breve — por enquanto, esse é
              o resultado numérico da triagem.
            </p>

            <Link
              to="/home"
              className="mt-6 inline-block rounded-md bg-sage-700 px-4 py-2 text-sm font-medium text-white hover:bg-sage-800"
            >
              Voltar para meus lotes
            </Link>
          </div>
        ) : (
          atual && (
            <div className="rounded-xl border border-cream-border bg-white p-6 shadow-sm">
              <p className="text-xs text-gray-400">
                {atual.categoriaNome} · item {atual.itemNaCategoria} de {atual.totalNaCategoria}
              </p>
              <h1 className="mt-1 text-lg font-semibold text-gray-900">{atual.pergunta.enunciado}</h1>

              <div className="mt-4 space-y-2">
                {atual.pergunta.opcoes.map((opcao) => (
                  <label
                    key={opcao.id}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2.5 text-sm transition ${
                      respostaAtualSelecionada === opcao.id
                        ? "border-sage-600 bg-sage-50 text-gray-900"
                        : "border-cream-border text-gray-700 hover:border-sage-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`pergunta-${atual.pergunta.id}`}
                      checked={respostaAtualSelecionada === opcao.id}
                      onChange={() => selecionarResposta(atual.pergunta.id, opcao.id)}
                    />
                    {opcao.texto}
                  </label>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleVoltar}
                  disabled={indiceAtual === 0}
                  className="rounded-md border border-cream-border px-4 py-2 text-sm text-gray-700 hover:border-sage-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleProxima}
                  disabled={respostaAtualSelecionada === undefined || enviando}
                  className="rounded-md bg-sage-700 px-4 py-2 text-sm font-medium text-white hover:bg-sage-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {ehUltima ? (enviando ? "Enviando..." : "Enviar") : "Próxima"}
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <Link to="/home" className="mt-6 inline-block text-sm text-sage-700 hover:underline">
        Voltar para meus lotes
      </Link>
    </div>
  );
}
