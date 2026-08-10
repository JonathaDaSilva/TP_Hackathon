# Deploy gratuito — Vercel + Render + Neon

Guia passo a passo pra colocar o ProOvo no ar sem custo, sem cartão de crédito.

| Camada | Serviço | Por quê |
|---|---|---|
| Frontend | [Vercel](https://vercel.com) | Free tier permanente, deploy automático a cada push |
| Backend | [Render](https://render.com) | Único PaaS com free tier real pra Docker em 2026 (750h/mês, sem cartão) |
| Banco (Postgres) | [Neon](https://neon.tech) | Free pra sempre, sem trial, "acorda" sozinho na primeira conexão |

**Ordem importa**: banco → backend → frontend (cada etapa usa uma URL gerada pela anterior).

---

## 1. Neon (Postgres)

1. Crie uma conta em [neon.tech](https://neon.tech) (sem cartão) e um novo projeto/database.
   - **Versão do Postgres**: escolha **16**, pra bater exatamente com o `postgres:16-alpine` do `docker-compose.yml` local — elimina qualquer diferença de comportamento entre o ambiente local e produção. (17/18 também funcionariam sem problema pro que a aplicação usa, mas não há motivo pra divergir do que já está testado localmente.)
   - **Região**: São Paulo é a escolha certa se o público é brasileiro — mais perto do usuário final. Só um detalhe: o Render (backend) não tem região no Brasil, então a viagem backend↔banco continua cruzando pra fora independentemente da região do Neon; não tem como evitar isso ficando 100% no free tier.
   - **Neon Auth**: **não ative**. É um serviço de autenticação próprio do Neon (login/sessão gerenciados por eles) — este projeto já tem autenticação completa e funcionando (Spring Security + JWT, `Usuario`/senha com bcrypt, decisão deliberada registrada no `CLAUDE.md`). Ativar o Neon Auth só criaria tabelas extras (`neon_auth.*`) que a aplicação nunca vai usar.
2. No painel do projeto, copie a **connection string**. Ela vem parecida com:
   ```
   postgresql://usuario:senha@ep-xxxxx.região.aws.neon.tech/nomedobanco?sslmode=require
   ```
   ⚠️ Use a **connection string direta** (o host **sem** `-pooler` no nome). O Neon também oferece uma variante com PgBouncer (host com `-pooler`), recomendada pra cenários serverless/alta concorrência — não é o nosso caso (uma única instância do Render, HikariCP já faz o pooling do lado da aplicação) e o modo de pooling por transação do PgBouncer pode dar problema com `PREPARE`/comandos de sessão que o Flyway usa ao rodar as migrations no boot.
3. Quebre a connection string em **3 partes** pro Render (o Spring separa URL/usuário/senha, ao contrário da string única do Neon):
   - `DB_URL` → `jdbc:postgresql://ep-xxxxx.região.aws.neon.tech/nomedobanco?sslmode=require` (repare no prefixo `jdbc:` e que usuário/senha **não** entram aqui)
   - `DB_USER` → `usuario`
   - `DB_PASSWORD` → `senha`
4. Não precisa criar tabelas manualmente — o Flyway roda as migrations sozinho no primeiro boot do backend.

## 2. Render (backend)

1. Suba o código pro GitHub (se ainda não estiver lá).
2. No painel do Render: **New > Blueprint**, conecte o repositório. Ele vai ler o [render.yaml](render.yaml) da raiz e propor o serviço `proovo-backend`.
3. Antes de confirmar, preencha as variáveis marcadas como manuais no blueprint:
   - `DB_URL`, `DB_USER`, `DB_PASSWORD` → os 3 valores do Neon (passo 1).
   - `CORS_ALLOWED_ORIGINS` → deixe o valor padrão do blueprint por enquanto (`https://SEU-PROJETO.vercel.app,https://*.vercel.app`); você ajusta o domínio real depois que a Vercel gerar a URL definitiva (passo 3).
   - `JWT_SECRET` já vem marcado como `generateValue: true` — o Render gera um valor aleatório sozinho, não mexa.
4. Deploy. A primeira build demora (Maven baixa dependências) — acompanhe os logs. Quando subir, teste `https://proovo-backend.onrender.com/actuator/health` (troque pelo nome real do seu serviço) — deve responder `{"status":"UP"}`.
5. **Isso é free tier**: depois de 15 min sem tráfego o serviço dorme e a próxima requisição demora ~30-60s pra acordar. Normal, não é bug.

## 3. Vercel (frontend)

1. Importe o repositório na Vercel.
2. Como é um monorepo, configure **Root Directory = `frontend`** nas configurações do projeto.
3. Framework preset: Vite (a Vercel detecta sozinha; build command `npm run build`, output `dist`).
4. Em **Environment Variables**, adicione:
   - `VITE_API_URL` = `https://proovo-backend.onrender.com/api` (a URL do Render do passo 2, **com** `/api` no final).

     ⚠️ **Isso é obrigatório.** O `frontend/.env.production` commitado no repo tem `VITE_API_URL=/api` (caminho relativo) — funciona só no deploy via Docker/nginx (que faz proxy interno pro backend), não na Vercel. Sem essa variável configurada aqui, o front tenta chamar a própria Vercel em vez do Render e toda chamada de API vai dar 404.
   - `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` — copie os mesmos valores que já estão no seu `frontend/.env` local.
5. Deploy. Anote a URL final (ex: `https://proovo.vercel.app`).

## 4. Fechando o CORS

Com a URL definitiva da Vercel em mãos, volte no Render (**Environment** do serviço `proovo-backend`) e ajuste `CORS_ALLOWED_ORIGINS` pro domínio real, por exemplo:
```
https://proovo.vercel.app,https://*.vercel.app
```
(o `https://*.vercel.app` continua ali de propósito — cobre as URLs de preview que a Vercel gera pra cada branch/PR). Salvar a variável já dispara um redeploy automático do backend.

---

## Troubleshooting rápido

- **Erro de CORS no console do navegador**: o domínio da Vercel não está (ou não bate exatamente) em `CORS_ALLOWED_ORIGINS` no Render. Confira se não sobrou `www.` ou barra final divergente.
- **API retorna 404 em tudo**: `VITE_API_URL` não foi configurada na Vercel (ou foi configurada sem o `/api` no final) — ver passo 3.4.
- **Primeira requisição do dia demora ~1 min**: esperado, é o cold start do free tier do Render (e possivelmente do Neon junto). Não precisa mexer em nada.
- **Backend sobe mas `/actuator/health` nunca fica UP**: geralmente é `DB_URL`/`DB_USER`/`DB_PASSWORD` errados — confira se copiou os 3 campos certos da connection string do Neon (não cole a string inteira em `DB_URL`).
