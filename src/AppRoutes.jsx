import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Catalogo } from "./Pages/Catalogo";
import { Cadastro } from "./Pages/Cadastro";
import { Login } from "./Pages/Login";
import { Pedido } from "./Pages/Pedido";
import { CadProd } from "./Pages/ADM/CadProd";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/cadastroProd" element={<CadProd />} />
      </Routes>
    </Router>
  );
}
