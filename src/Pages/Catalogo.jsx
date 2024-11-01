import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import "./Catalogo.css";
import Produto from "../Componentes/Produto";
import ShopCart from "../assets/ShopCart.svg";
import search from "../assets/search.svg";

export function Catalogo() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="container">
      <header>
        <div className="header_content">
          <img className="imgsearch" src={search} alt="search" />
          <p>Pizzas</p>
          <p>Bebidas</p>

          <div className="cart-container" onClick={() => navigate("/cart")}>
            {" "}
            {/* Navegação para a página do carrinho */}
            <img className="imgcart" src={ShopCart} alt="cart" />
            <div className="cart-count">{cartCount}</div>
          </div>
        </div>
      </header>
      <main>
        <div className="card">
          <div className="produto">
            <Produto onAddToCart={handleAddToCart} />
          </div>
        </div>
      </main>
      <footer>
        <div className="footer_content">
          <div className="footer_contacts">
            <h3>Logo</h3>
            <p>Frase da empresa</p>
            <a href="#">Insta</a>
            <a href="#">Face</a>
            <a href="#">Whats</a>
          </div>
          <div className="footer_list">
            <h3>Desenvolvido pelo Webnautas</h3>
            <a href="https://github.com/Webnautas">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
