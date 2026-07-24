import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route path="/home" element={<Home />} />
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
