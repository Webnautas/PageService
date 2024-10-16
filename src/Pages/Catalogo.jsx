import { useState } from "react";
import "./Catalogo.css";
import Produto from "../Componentes/Produto";

export function Catalogo() {
  return (
    <div className="container">
      <div className="header">
        <header>
          <ul>
            <li>
              <a href="/catalogo">CATALOGO</a>
            </li>
            <li>
              <a href="/cadastro">CADASTRO</a>
            </li>
          </ul>
        </header>
      </div>

      <div className="card">
        <Produto />
      </div>
      <footer> teste</footer>
    </div>
  );
}
