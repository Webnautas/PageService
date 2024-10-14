import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Catalogo } from "./Pages/Catalogo";
import { Cadastro } from "./Pages/Cadastro";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}
