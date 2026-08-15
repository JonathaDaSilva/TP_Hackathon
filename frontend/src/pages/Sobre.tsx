interface MembroEquipe {
  nome: string;
  papel: string;
  curso: string;
  local: string;
}

const COORDENACAO: MembroEquipe = {
  nome: "Dayse H. L. S.",
  papel: "Coordenação do Projeto",
  curso: "Docente",
  local: "Instituto de Ciências Biológicas e da Saúde (ICBS)",
};

const EQUIPE: MembroEquipe[] = [
  {
    nome: "Sofia R. P.",
    papel: "Aluno(a) de Graduação",
    curso: "Medicina Veterinária",
    local: "Campus Betim",
  },
  {
    nome: "Sofia C. L. B.",
    papel: "Aluno(a) de Graduação",
    curso: "Medicina Veterinária",
    local: "Campus Betim",
  },
  {
    nome: "Vinicius V. M.",
    papel: "Aluno(a) de Graduação",
    curso: "Medicina Veterinária",
    local: "Campus Lourdes",
  },
  {
    nome: "Ana Clara M. S.",
    papel: "Aluno(a) de Graduação",
    curso: "Medicina Veterinária",
    local: "Campus Betim",
  },
  {
    nome: "Jonathan S. S.",
    papel: "Aluno(a) de Graduação",
    curso: "Engenharia de Software",
    local: "Campus Lourdes",
  },
];

const CORES_DESTAQUE = ["bg-sage-600", "bg-[#c9973f]"];

function CartaoMembro({ membro, indice }: { membro: MembroEquipe; indice: number }) {
  const inicial = membro.nome.charAt(0).toUpperCase();
  const corDestaque = CORES_DESTAQUE[indice % CORES_DESTAQUE.length];

  return (
    <div className="group overflow-hidden rounded-xl border border-cream-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className={`h-1.5 w-full ${corDestaque}`} />
      <div className="p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-lg font-semibold text-sage-800">
          {inicial}
        </div>
        <p className="font-display mt-4 text-base text-ink-950">{membro.nome}</p>
        <p className="mt-1 text-sm font-medium text-sage-700">{membro.papel}</p>
        <p className="mt-2 text-xs text-gray-500">{membro.curso}</p>
        <p className="text-xs text-gray-400">{membro.local}</p>
      </div>
    </div>
  );
}

/** Mascote: a galinha da marca coçando a cabeça, em dúvida, olhando pra um "?" */
function MascoteDuvida() {
  return (
    <svg viewBox="0 0 360 320" className="mx-auto w-full max-w-sm" aria-hidden="true">
      {/* manchas decorativas ao fundo */}
      <circle cx="175" cy="185" r="150" className="fill-sage-100" />
      <circle cx="300" cy="55" r="42" className="fill-cream-100" />
      <circle cx="45" cy="260" r="26" className="fill-cream-100" />

      {/* sombra no chão */}
      <ellipse cx="155" cy="283" rx="58" ry="9" className="fill-ink-950" opacity="0.08" />

      {/* rabo/penas */}
      <path
        d="M108 200c-14-4-24-16-22-30 10-2 22 4 28 16 4-10 14-16 24-14-2 16-14 28-30 28z"
        className="fill-ink-700"
      />

      {/* corpo */}
      <ellipse cx="155" cy="212" rx="56" ry="62" className="fill-ink-800" />

      {/* asa (levantada, tipo "dando de ombros") */}
      <path
        d="M112 190c-18 2-32 18-30 38 14 6 32-2 38-18 4-8 2-16-8-20z"
        className="fill-ink-700"
      />

      {/* pernas */}
      <line x1="138" y1="266" x2="134" y2="290" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-ink-800" />
      <line x1="172" y1="266" x2="176" y2="290" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-ink-800" />
      <ellipse cx="129" cy="292" rx="9" ry="4" className="fill-ink-800" />
      <ellipse cx="181" cy="292" rx="9" ry="4" className="fill-ink-800" />

      {/* cabeça (levemente inclinada, olhando pro "?") */}
      <circle cx="172" cy="132" r="40" className="fill-ink-800" />

      {/* crista */}
      <circle cx="158" cy="94" r="9" className="fill-[#c9973f]" />
      <circle cx="172" cy="88" r="10" className="fill-[#c9973f]" />
      <circle cx="187" cy="93" r="9" className="fill-[#c9973f]" />

      {/* bico */}
      <path d="M208 132l20-6-4 16-16 4z" className="fill-[#c9973f]" />

      {/* olho */}
      <circle cx="188" cy="126" r="9" className="fill-cream-50" />
      <circle cx="191" cy="123" r="4" className="fill-ink-950" />

      {/* pontinhos de "pensando..." subindo até a interrogação */}
      <circle cx="235" cy="95" r="5" className="fill-[#c9973f]" opacity="0.55" />
      <circle cx="252" cy="72" r="7" className="fill-[#c9973f]" opacity="0.75" />

      {/* interrogação */}
      <text
        x="292"
        y="72"
        fontSize="78"
        fontWeight="700"
        textAnchor="middle"
        className="fill-[#c9973f]"
        style={{ fontFamily: "'Bona Nova SC', serif" }}
        transform="rotate(-8 292 72)"
      >
        ?
      </text>
    </svg>
  );
}

export function Sobre() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
      {/* Hero: texto + mascote lado a lado */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-600">Quem somos</p>
          <h1 className="font-display mt-3 text-4xl text-ink-950">Apresentação da Equipe</h1>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-gray-700">
            <p>
              Somos uma equipe multidisciplinar formada por profissionais e estudantes das áreas de Medicina
              Veterinária e Engenharia de Software da Pontifícia Universidade Católica, comprometidos com o
              desenvolvimento de soluções digitais inovadoras e acessíveis.
            </p>
            <p>
              Unimos conhecimento técnico, criatividade e dedicação para criar um site que atenda às
              necessidades dos produtores de ovos de forma prática, eficiente e intuitiva, contribuindo para a
              melhoria da produção e da gestão das propriedades.
            </p>
            <p>
              Acreditamos que a tecnologia deve ser acessível, funcional e capaz de gerar impactos positivos no
              dia a dia dos produtores. Por isso, dedicamos nossos esforços à construção de uma plataforma
              simples, confiável e de qualidade, oferecendo informações e ferramentas que auxiliem na tomada de
              decisões e promovam o desenvolvimento sustentável da avicultura de postura.
            </p>
          </div>
        </div>

        <MascoteDuvida />
      </div>

      {/* Coordenação: cartão em destaque, horizontal */}
      <div className="mt-20">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-sage-600" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-600">Coordenação</p>
        </div>

        <div className="mt-5 flex flex-col items-center gap-5 rounded-xl border border-cream-border border-l-4 border-l-sage-600 bg-white p-6 shadow-sm sm:flex-row sm:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sage-100 text-2xl font-semibold text-sage-800">
            {COORDENACAO.nome.charAt(0)}
          </div>
          <div>
            <p className="font-display text-lg text-ink-950">{COORDENACAO.nome}</p>
            <p className="mt-0.5 text-sm font-medium text-sage-700">{COORDENACAO.papel}</p>
            <p className="mt-1 text-xs text-gray-500">
              {COORDENACAO.curso} · {COORDENACAO.local}
            </p>
          </div>
        </div>
      </div>

      {/* Equipe: grade de cartões */}
      <div className="mt-14">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#c9973f]" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-600">Equipe</p>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EQUIPE.map((membro, indice) => (
            <CartaoMembro key={membro.nome} membro={membro} indice={indice} />
          ))}
        </div>
      </div>
    </div>
  );
}
