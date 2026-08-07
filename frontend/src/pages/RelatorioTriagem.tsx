import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { api, getErrorMessage } from "../services/api";
import { caminhoIniciarTriagem } from "../services/preferences";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/Button";
import type { Cenario, RelatorioTriagem as RelatorioTriagemDto } from "../services/types";

const CENARIO_ESTILO: Record<Cenario, string> = {
  ESTAVEL: "bg-sage-100 text-sage-800",
  ATENCAO: "bg-amber-100 text-amber-800",
  ALERTA: "bg-red-100 text-red-800",
};

export function RelatorioTriagem() {
  const { loteId, triagemId } = useParams<{ loteId: string; triagemId: string }>();
  const navigate = useNavigate();

  const [relatorio, setRelatorio] = useState<RelatorioTriagemDto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [baixando, setBaixando] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get<RelatorioTriagemDto>(`/lotes/${loteId}/triagens/${triagemId}`);
        setRelatorio(data);
      } catch (err) {
        toast.error(getErrorMessage(err, "Não foi possível carregar o relatório."));
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [loteId, triagemId]);

  async function handleBaixarPdf() {
    setBaixando(true);
    try {
      const response = await api.get(`/lotes/${loteId}/triagens/${triagemId}/relatorio.pdf`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `relatorio-triagem-${triagemId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(getErrorMessage(err, "Não foi possível gerar o PDF do relatório."));
    } finally {
      setBaixando(false);
    }
  }

  function handleRefazerTeste() {
    navigate(caminhoIniciarTriagem(Number(loteId)));
  }

  if (carregando) {
    return (
      <div className="mx-auto max-w-4xl px-8 py-8">
        <p className="text-sm text-gray-500">Carregando relatório...</p>
      </div>
    );
  }

  if (!relatorio) {
    return (
      <div className="mx-auto max-w-4xl px-8 py-8">
        <p className="text-sm text-gray-500">Relatório não encontrado.</p>
        <Link to="/home" className="mt-4 inline-block text-sm text-sage-700 hover:underline">
          Voltar para meus lotes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Painel", to: "/home" },
          { label: relatorio.loteIdentificacao, to: "/home" },
          { label: "Relatório" },
        ]}
      />

      <div className="mt-6 rounded-xl border border-cream-border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span
              className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${CENARIO_ESTILO[relatorio.cenario]}`}
            >
              {relatorio.cenarioRotulo}
            </span>
            <p className="font-tech mt-3 text-3xl font-bold text-gray-900">
              {relatorio.pontuacaoTotal}
              <span className="text-lg font-normal text-gray-400">/60</span>
            </p>
            <p className="text-sm text-gray-500">
              Triagem de {relatorio.loteIdentificacao} em {new Date(relatorio.respondidoEm).toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <Button type="button" variant="secondary" onClick={handleRefazerTeste}>
              Refazer o teste
            </Button>
            <Button type="button" onClick={handleBaixarPdf} disabled={baixando}>
              {baixando ? "Gerando PDF..." : "Baixar PDF"}
            </Button>
          </div>
        </div>

        <p className="mt-5 rounded-md bg-cream-50 p-4 text-sm italic text-gray-700">{relatorio.resumo}</p>

        <h2 className="mt-8 text-base font-semibold text-gray-900">Diagnóstico</h2>
        <ul className="mt-3 space-y-2.5">
          {relatorio.diagnostico.map((item, indice) => (
            <li key={indice} className="flex gap-2.5 text-sm text-gray-700">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sage-600" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-8 text-base font-semibold text-gray-900">Recomendações</h2>
        <ul className="mt-3 space-y-2.5">
          {relatorio.dicas.map((item, indice) => (
            <li key={indice} className="flex gap-2.5 text-sm text-gray-700">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sage-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/home" className="mt-6 inline-block text-sm text-sage-700 hover:underline">
        Voltar para meus lotes
      </Link>
    </div>
  );
}
