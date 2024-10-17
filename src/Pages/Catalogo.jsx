import { useState } from "react";
import "./Catalogo.css";
import Produto from "../Componentes/Produto";
import ShopCart from "../assets/ShopCart.svg";
import search from "../assets/search.svg";

export function Catalogo() {
  return (
    <div className="container">
      <div className="head">
        <header>
          <ul>
            <li>
              <img src={search}></img>
            </li>
            <li>Pizzas Salgadas</li>
            <li>Pizzas Doces</li>
            <li>Bebidas</li>
            <li>
              <img className="cart" src={ShopCart}></img>
            </li>
          </ul>
        </header>
      </div>
      <body>
        <div className="card">
          <Produto />
          <Produto />

          <Produto />

          <Produto />

          <Produto />

          <Produto />
        </div>
      </body>
      <div className="footer">teste</div>
    </div>
  );
}
