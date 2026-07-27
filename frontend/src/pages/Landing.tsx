import { Link } from "react-router-dom";
import { HeroIllustration } from "../components/HeroIllustration";

const RECURSOS = [
  {
    titulo: "Triagem em minutos",
    descricao: "Responda um quiz rápido e direto sobre o galpão e a qualidade dos ovos.",
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    titulo: "Diagnóstico claro",
    descricao: "Veja na hora se o lote está Estável, em Atenção ou em Alerta.",
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    titulo: "Plano de ação em PDF",
    descricao: "Baixe recomendações práticas de manejo para agir imediatamente.",
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M12 18v-6M9.5 14.5L12 12l2.5 2.5" />
      </svg>
    ),
  },
];

export function Landing() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-800">
              Feito para o pequeno e médio avicultor
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-sage-800 sm:text-5xl">
              ProOvo: triagem rápida da saúde do seu lote
            </h1>

            <p className="mt-5 text-lg text-gray-600">
              Responda um quiz simples sobre o galpão e a qualidade dos ovos e receba um
              plano de ação preventivo em PDF, na hora.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/cadastro"
                className="rounded-md bg-sage-700 px-6 py-3 text-center font-medium text-white shadow-sm transition hover:bg-sage-800"
              >
                Começar agora
              </Link>
              <Link
                to="/login"
                className="rounded-md border border-gray-300 bg-white px-6 py-3 text-center font-medium text-gray-700 transition hover:border-sage-600 hover:text-sage-700"
              >
                Já tenho conta
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {RECURSOS.map((recurso) => (
            <div
              key={recurso.titulo}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sage-100 text-sage-800">
                {recurso.icone}
              </div>
              <h2 className="mt-4 text-base font-semibold text-gray-900">{recurso.titulo}</h2>
              <p className="mt-1.5 text-sm text-gray-600">{recurso.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="border-t border-gray-200 pt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Aviso importante
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
            Os resultados apresentados por esta plataforma têm caráter exclusivamente
            informativo e educacional, servindo como apoio à tomada de decisão no manejo do
            plantel. Este sistema não realiza diagnóstico veterinário e não substitui, em
            nenhuma hipótese, a avaliação técnica de um médico veterinário ou profissional
            habilitado.
          </p>
        </div>
      </section>
    </div>
  );
}
