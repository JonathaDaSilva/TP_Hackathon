import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { api, getFieldErrors } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Breadcrumb } from "../components/Breadcrumb";
import contatoImg from "../assets/images/Fale_conosco.jpg";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const TIPOS_CONTATO = ["Dúvida", "Feedback", "Sugestão"] as const;

export function Contato() {
    const { usuario } = useAuth();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [tipo, setTipo] = useState<(typeof TIPOS_CONTATO)[number] | "">("");
    const [mensagem, setMensagem] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [errosCampo, setErrosCampo] = useState<Record<string, string>>({});

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setEnviando(true);
        setErrosCampo({});

        try {
            await api.post("/contato", { nome, email, tipo, mensagem });

            if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
                try {
                    await emailjs.send(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ID,
                        { nome, email, tipo, mensagem },
                        { publicKey: EMAILJS_PUBLIC_KEY }
                    );
                } catch (emailJsError) {
                    console.warn("Falha ao enviar notificação via EmailJS:", emailJsError);
                }
            }

            toast.success("Mensagem enviada com sucesso. Em breve entraremos em contato.");
            setNome("");
            setEmail("");
            setTipo("");
            setMensagem("");
        } catch (err) {
            const camposInvalidos = getFieldErrors(err);
            if (camposInvalidos) {
                setErrosCampo(camposInvalidos);
            } else {
                toast.error("Não foi possível enviar sua mensagem. Tente novamente.");
            }
        } finally {
            setEnviando(false);
        }
    }

    const cartao = (
        <div className="w-full max-w-lg">
            {usuario && (
                <div className="mb-4">
                    <Breadcrumb items={[{ label: "Painel", to: "/home" }, { label: "Fale conosco" }]} />
                </div>
            )}

            <div className="rounded-xl border border-cream-border bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold text-gray-900">Fale Conosco</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Tem uma dúvida, feedback ou sugestão? Escreva para a gente.
                </p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
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
                        <label className="block text-sm font-medium text-gray-700">Assunto</label>
                        <select
                            required
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value as (typeof TIPOS_CONTATO)[number])}
                            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:border-sage-600 focus:outline-none"
                        >
                            <option value="" disabled>
                                Selecione o motivo
                            </option>
                            {TIPOS_CONTATO.map((opcao) => (
                                <option key={opcao} value={opcao}>
                                    {opcao}
                                </option>
                            ))}
                        </select>
                        {errosCampo.tipo && <p className="mt-1 text-xs text-red-600">{errosCampo.tipo}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mensagem</label>
                        <textarea
                            required
                            minLength={5}
                            rows={3}
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:border-sage-600 focus:outline-none"
                        />
                        {errosCampo.mensagem && <p className="mt-1 text-xs text-red-600">{errosCampo.mensagem}</p>}
                    </div>

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

    // Visitante (sem login): metade da tela com imagem, metade com o formulário.
    if (!usuario) {
        return (
            <div className="grid min-h-[calc(100vh-57px)] lg:grid-cols-2">
                <div className="flex items-center justify-center bg-cream-50 px-4 py-8">
                    {cartao}
                </div>
                <div className="hidden lg:block">
                    <img src={contatoImg} alt="" className="h-full w-full object-cover" />
                </div>
            </div>
        );
    }

    // Usuário logado: layout compacto dentro do painel (sidebar), sem a imagem.
    return (
        <div className="flex justify-center bg-cream-50 px-4 py-6">
            {cartao}
        </div>
    );
}
