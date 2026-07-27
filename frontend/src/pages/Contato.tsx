import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { api, getFieldErrors } from "../services/api";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState<"idle" | "sucesso" | "erro">("idle");
  const [errosCampo, setErrosCampo] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setStatus("idle");
    setErrosCampo({});

    try {
      // Registra a mensagem no backend (histórico) — é aqui que a validação de
      // campos acontece.
      await api.post("/contato", { nome, email, mensagem });

      // Envia a notificação por e-mail direto do navegador via EmailJS
      // (gratuito, sem precisar de servidor de e-mail). Se não estiver
      // configurado ou falhar, a mensagem já foi salva mesmo assim.
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            { nome, email, mensagem },
            { publicKey: EMAILJS_PUBLIC_KEY }
          );
        } catch (emailJsError) {
          console.warn("Falha ao enviar notificação via EmailJS:", emailJsError);
        }
      }

      setStatus("sucesso");
      setNome("");
      setEmail("");
      setMensagem("");
    } catch (err) {
      const camposInvalidos = getFieldErrors(err);
      if (camposInvalidos) {
        setErrosCampo(camposInvalidos);
      } else {
        setStatus("erro");
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-57px)] justify-center bg-cream-50 px-4 py-16">
      <div className="w-full max-w-lg rounded-xl border border-cream-border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Fale Conosco</h1>
        <p className="mt-1 text-sm text-gray-500">
          Tem uma dúvida, feedback ou sugestão? Escreva para a gente.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              required
              minLength={2}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:border-sage-600 focus:outline-none"
            />
            {errosCampo.nome && <p className="mt-1 text-xs text-red-600">{errosCampo.nome}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:border-sage-600 focus:outline-none"
            />
            {errosCampo.email && <p className="mt-1 text-xs text-red-600">{errosCampo.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mensagem</label>
            <textarea
              required
              minLength={5}
              rows={5}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:border-sage-600 focus:outline-none"
            />
            {errosCampo.mensagem && <p className="mt-1 text-xs text-red-600">{errosCampo.mensagem}</p>}
          </div>

          {status === "sucesso" && (
            <p className="text-sm text-sage-700">
              Mensagem enviada com sucesso. Em breve entraremos em contato.
            </p>
          )}
          {status === "erro" && (
            <p className="text-sm text-red-600">
              Não foi possível enviar sua mensagem. Tente novamente.
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-md bg-sage-700 py-2 font-medium text-white hover:bg-sage-800 disabled:opacity-60"
          >
            {enviando ? "Enviando..." : "Enviar mensagem"}
          </button>
        </form>
      </div>
    </div>
  );
}
