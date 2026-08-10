# ProOvo — Plataforma de Manejo e Saúde Avícola

MVP de hackathon: triagem técnica da saúde de lotes avícolas via quiz ponderado, com plano de ação preventivo (relatório completo ainda não implementado). Desenvolvedor único (Jonathan).

## Stack

- **Backend**: Java 21, Spring Boot 4.1.0 (Maven), PostgreSQL, Flyway, Spring Security + JWT (autenticação manual, sem OAuth/Identity), Lombok, springdoc-openapi (Swagger em `/swagger-ui/index.html`), Actuator (`/actuator/health`).
- **Frontend**: React + TypeScript + Vite, Tailwind CSS v4 (config via `@theme` no `index.css`, sem `tailwind.config.js`), React Router v7, `sonner` (toasts), `@emailjs/browser`.
- **Infra**: Docker Compose (postgres + backend + frontend/nginx), Dockerfiles multi-stage em `backend/` e `frontend/`.

## Como rodar

```bash
docker compose up --build -d
```
- Frontend: http://localhost:5173
- Backend/Swagger: http://localhost:8080/swagger-ui/index.html
- Health: http://localhost:8080/actuator/health

`.env` na raiz (copiar de `.env.example`) para `JWT_SECRET`/SMTP (não usado mais, ver seção EmailJS). `frontend/.env` tem `VITE_API_URL` + as 3 chaves do EmailJS (`VITE_EMAILJS_SERVICE_ID/TEMPLATE_ID/PUBLIC_KEY`, já configuradas pelo usuário).

**Sem H2/perfil de teste** — os testes do backend rodam contra o Postgres real.

## Arquitetura do backend — DDD leve

Decisão consciente: **não é DDD tático completo** (sem bounded contexts, sem módulos separados) — é um único módulo Maven com pacotes por camada, escolhido deliberadamente por ser um MVP de hackathon com pouco tempo. Padrão a seguir sempre que adicionar algo novo:

```
com.avicola.api
├── domain/model/        entidades ricas: construtor privado + factory estática (Xxx.criar/registrar/concluir),
│                        sem setters públicos, validação inline (ex: validarNome), Lombok @Getter + @NoArgsConstructor(PROTECTED)
├── domain/vo/           Value Objects @Embeddable que validam no construtor (Email, Identificacao)
├── domain/repository/   interfaces PURAS (sem import de Spring Data) — contrato do domínio
├── infrastructure/
│   └── persistence/     *JpaRepository (Spring Data, package-private) + *RepositoryImpl (package-private,
│                        implementa a interface do domínio) — só esse pacote conhece JPA/Spring Data
├── service/              orquestração (@Service @RequiredArgsConstructor), regra de "dono do recurso"
│                        sempre via query (ex: loteRepository.buscarPorIdEUsuarioId), nunca .equals() manual
├── controller/           @RestController, pega usuarioId via AuthenticatedUser.getUsuarioId() (claim JWT)
├── dto/                  uma classe não-record por feature (ex: LoteDtos) contendo records aninhados
│                        XxxRequest/XxxResponse com Bean Validation
├── exception/            GlobalExceptionHandler (@RestControllerAdvice) — mapeamentos já prontos, reaproveitar:
│                        ConflitoException→409, CredenciaisInvalidasException→401,
│                        RecursoNaoEncontradoException→404, MethodArgumentNotValidException→400 (campo→msg),
│                        IllegalArgumentException→400 ({"mensagem":...}), Exception→500 (logado)
├── security/             JwtService, JwtAuthenticationFilter, AuthenticatedUser (extrai usuarioId do JWT)
├── config/                SecurityConfig, OpenApiConfig — só @Configuration de infra
└── seed/                  QuestionarioSeeder (CommandLineRunner) + QuestionarioSeedData (dados estáticos)
```

**Exemplo de referência**: `Lote`/`LoteRepository`/`LoteRepositoryImpl`/`LoteService`/`LoteController` — sempre olhar esses arquivos antes de criar uma feature nova, para manter o padrão.

### Schema do banco

**Flyway** (`backend/src/main/resources/db/migration/V1__estrutura_inicial.sql`) controla o schema; `ddl-auto: validate` no Hibernate (não mais `update`). Baseline configurado (`baseline-on-migrate: true`, `baseline-version: 1`) para não quebrar o banco local já existente.

⚠️ **Incidente já vivido**: com `ddl-auto: update`, adicionar uma coluna NOT NULL numa tabela já populada falha silenciosamente (só WARN no log, app sobe mesmo assim) porque o Postgres recusa `ALTER TABLE ... ADD COLUMN ... NOT NULL` sem default em tabela não-vazia. Foi exatamente por isso que migramos para Flyway. **Toda mudança de schema agora é uma migration nova** (`V2__...sql`, etc.) — nunca mais editar entidade esperando o Hibernate resolver sozinho.

### Entidades existentes

- `Usuario` (nome, email VO único, senhaHash, lotes) — `Lote` (identificacao VO, usuario FK)
- `MensagemContato` (nome, email VO, tipo, mensagem) — formulário de contato
- `Categoria` → `Pergunta` (`@OneToMany` opcoes) → `OpcaoResposta` (peso 0-3) — conteúdo do quiz, populado via seed
- `Triagem` (lote FK, pontuacaoTotal, cenario enum) → `RespostaTriagem` (pergunta+opcao escolhida, pesoRegistrado snapshot)
- `Cenario` enum: `ESTAVEL(0-20)`, `ATENCAO(21-40)`, `ALERTA(41-60)` — `Cenario.calcular(total)`

## Arquitetura do frontend

```
src/
├── pages/            uma por rota
├── components/        NavBar (público, sticky), Sidebar (autenticado, sticky), AppShell (layout com sidebar),
│                       PublicLayout (layout com navbar), AuthLayout (split-screen Login/Cadastro),
│                       Breadcrumb, icons.tsx (IconPencil/IconTrash/IconBook — padrão pra CRUD)
├── context/           AuthContext (usuario, login/registrar/logout)
├── services/
│   ├── api.ts          instância axios única + interceptor JWT + getFieldErrors()/getErrorMessage()
│   ├── types.ts        um `interface` simples por recurso
│   └── preferences.ts  localStorage (flag "pular instruções do quiz")
└── App.tsx             rotas — ver padrão de layout condicional abaixo
```

### Padrão de layout: público x autenticado

- `PublicLayout` (NavBar no topo, sticky) envolve `/`, `/login`, `/cadastro`, 404.
- `AppShell` (Sidebar lateral, sticky) envolve `/home`, `/instrucoes`, `/lotes/:id/instrucoes`, `/lotes/:id/quiz` (dentro de `ProtectedRoute`).
- **`/contato` é especial**: não fica fixo em nenhum grupo — `ContatoRoute` (em `App.tsx`) escolhe `AppShell` ou `PublicLayout` dinamicamente conforme `usuario` estar logado ou não. `AppShell`/`PublicLayout` aceitam `children` opcional (fallback `<Outlet/>`) exatamente pra permitir esse uso fora do esquema de rotas aninhadas.
- Sidebar e NavBar são **sticky** (`position: sticky`, não `h-screen` fixo no container pai) — decisão importante: uma tentativa anterior de fixar a sidebar com `h-screen` no container quebrou em conteúdo mais alto que a viewport (sidebar cortava/sumia). O padrão certo: container `min-h-screen`, sidebar/navbar `sticky top-0` com `self-start` (sidebar) — a página rola inteira normalmente, sidebar/navbar acompanham.

### Paleta (Tailwind v4, `@theme` em `index.css`)

`sage-*` (verde principal, botões/links — usado em quase tudo), `ink-*` (fundo escuro da sidebar), `cream-*` (fundo/bordas da área autenticada). A Landing (`/`) usa a paleta `green-*` padrão do Tailwind e **foi pedido explicitamente pra não mexer nela** — é a única página fora do sistema de cores customizado.

### Toasts

Todo formulário (Login, Cadastro, Contato, CRUD de Lote) usa `sonner` (`toast.success`/`toast.error`) para feedback de sucesso/erro — `<Toaster/>` montado uma vez em `App.tsx`. **Erros de campo continuam inline** (near o input, via `getFieldErrors`) — só erros gerais (409, 401, 500, falha de rede) viram toast.

### EmailJS (Fale Conosco)

Envio de e-mail migrou de SMTP/backend para **EmailJS no frontend** (gratuito, sem servidor de e-mail) — decisão do usuário. O backend **só persiste** a mensagem (`ContatoService`, sem lógica de envio). `Contato.tsx` chama `emailjs.send(...)` best-effort (falha é só um `console.warn`, não impede o toast de sucesso, já que a mensagem já foi salva). Chaves em `frontend/.env`.

`/contato` sem login tem layout **split-screen** (formulário half, imagem `Fale_conosco.jpg` no outro half) — só na versão pública, não na logada.

## Fluxo do produto (estado atual)

1. Landing → Cadastro/Login (split-screen com imagem, senha forte 10-15 caracteres com maiúscula/minúscula/número/especial — checklist ao vivo em `PasswordStrength.tsx`, mesma regra validada no backend via `@Pattern`).
2. Home (`/home`): CRUD de Lotes (galpões), ícones lápis/lixeira padronizados (`icons.tsx`).
3. "Iniciar Triagem" → `/lotes/:id/instrucoes` (dicas + checkbox "não mostrar novamente", `InstrucoesQuiz.tsx`, já funcional) → `/lotes/:id/quiz`.
4. **Quiz (`Quiz.tsx`) — funcional com conteúdo real**: 20 perguntas / 10 categorias / pesos 0-3, entregues pela equipe de pesquisa (PDF). Busca via `GET /api/questionario`, navega pergunta a pergunta (painel de categorias com progresso à esquerda), envia via `POST /api/lotes/{id}/triagens`, mostra pontuação total + cenário (Estável/Atenção/Alerta) **sem** texto de diagnóstico/dicas.
5. **Relatório completo (textos de diagnóstico/dicas por cenário, PDF) — NÃO IMPLEMENTADO.** O PDF de conteúdo entregue pela equipe tem a seção "RELATÓRIO" incompleta (Estável pronto, Atenção com 1 bullet, Alerta vazio) — aguardando a equipe de pesquisa terminar. Quando o texto chegar: criar entidade/tabela de dicas por cenário (ou simplesmente DTOs estáticos, a decidir), endpoint de busca por `triagemId` (hoje não existe — `Triagem` não tem endpoint de leitura, só criação), e página de relatório (provavelmente `/lotes/:id/triagens/:triagemId` ou similar).
6. `/instrucoes` (item de menu "Instruções", separado do `/lotes/:id/instrucoes` do quiz) — página placeholder "em desenvolvimento", guia geral de uso ainda não escrito.

## Explicitamente fora de escopo até agora

- Texto de diagnóstico/dicas por cenário + geração de PDF do relatório (aguardando conteúdo).
- Histórico/listagem de triagens passadas de um lote (schema já suporta — `Triagem` não tem unicidade por lote, múltiplas triagens por lote são intencionais — só falta o endpoint `GET`).
- Testes automatizados (nenhum além do `AvicolaApiApplicationTests` padrão gerado pelo Spring Initializr).
- CI/CD.

## Convenções de trabalho combinadas com o usuário

- Prefere que eu **não suba Docker/rode E2E automaticamente** quando ele já pretende testar manualmente — perguntar ou confirmar o nível de verificação esperado antes de rodar a stack inteira.
- Mudanças de UI: sempre validar com `npx tsc --noEmit` + `npm run build` no mínimo; quando possível, checar visualmente via browser tool.
- Imagens grandes em `frontend/src/assets/images/` devem ser comprimidas (ffmpeg disponível no PATH do usuário) antes de commitar — já aconteceu duas vezes (Login.jpg 2MB→290KB, Fale_conosco.png 613KB→242KB convertido pra jpg).
- Commits: só quando pedido explicitamente (ainda não foi pedido nenhum commit nesta conversa — **checar `git status` no início de uma sessão nova**, pode haver trabalho não commitado).
