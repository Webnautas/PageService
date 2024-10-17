import { useState } from "react";
import "./Catalogo.css";
import Produto from "../Componentes/Produto";
import ShopCart from "../assets/ShopCart.svg";
import search from "../assets/search.svg";

export function Catalogo() {
  return (
    <div className="container">
      <header>
        <div className="header_content">
          <img src={search} alt="search" />
          <p>Pizzas</p>
          <p>Bebidas</p>
          <img src={ShopCart} alt="cart" />
        </div>
      </header>
      <main>
        <div className="card">
          <div className="produto">
            <Produto />
          </div>
        </div>
      </main>
      <footer>
        <div className="footer_content">
          <div className="footer_contacts">
            <h3>Logo</h3>
            <p>Frase da empresa</p>
            <a href="#">Insta </a>
            <a href="#">Face </a>
            <a href="#">whats</a>
          </div>
          <div className="footer_list">
            <h3>Desenvolvido pelo Webnautas</h3>
            <a href="https://github.com/Webnautas">github</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
