import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicLayout } from "./components/PublicLayout";
import { AppShell } from "./components/AppShell";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Home } from "./pages/Home";
import { Contato } from "./pages/Contato";
import { InstrucoesQuiz } from "./pages/InstrucoesQuiz";
import { Quiz } from "./pages/Quiz";
import { Instrucoes } from "./pages/Instrucoes";
import { NotFound } from "./pages/NotFound";

// O "Fale conosco" é acessível tanto por visitantes quanto por usuários
// logados — por isso escolhe o layout (navbar pública x sidebar do painel)
// em vez de ficar fixo em um dos dois grupos de rotas.
function ContatoRoute() {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <div className="flex justify-center p-10 text-gray-500">Carregando...</div>;
  }

  if (usuario) {
    return (
      <AppShell>
        <Contato />
      </AppShell>
    );
  }

  return (
    <PublicLayout>
      <Contato />
    </PublicLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors closeButton />
        <Routes>
          <Route path="/contato" element={<ContatoRoute />} />

          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route path="/home" element={<Home />} />
              <Route path="/instrucoes" element={<Instrucoes />} />
              <Route path="/lotes/:loteId/instrucoes" element={<InstrucoesQuiz />} />
              <Route path="/lotes/:loteId/quiz" element={<Quiz />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
