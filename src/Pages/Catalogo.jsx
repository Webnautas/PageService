import { useState, useEffect } from "react";
import "./Catalogo.css";
import Produto from "../Componentes/Produto";
import ShopCart from "../assets/ShopCart.svg";
import search from "../assets/search.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/produtos")
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error("Erro ao buscar os produtos:", error));
  }, []);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  const filteredProducts = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <div className="header_content">
          <img className="imgsearch" src={search} alt="search" onClick={() => setIsSearchOpen(!isSearchOpen)} />
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          <p>Pizzas</p>
          <p>Bebidas</p>
          <div className="cart-container" onClick={toggleCart}>
            <img className="imgcart" src={ShopCart} alt="cart" />
            <div className="cart-count">{cartCount}</div>
          </div>
        </div>
      </header>
      <main>
        <div className="card">
          <div className="produto">
            {filteredProducts.map((produto) => (
              <Produto
                key={produto.id}
                name={produto.nome}
                description={produto.descricao}
                price={produto.valor}
                onAddToCart={() =>
                  handleAddToCart({
                    id: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    valor: produto.valor,
                  })
                }
              />
            ))}
          </div>
        </div>
      </main>
    
    </div>
  );
}
