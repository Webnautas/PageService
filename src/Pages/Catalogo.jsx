import { useState, useEffect } from "react";
import "./Catalogo.css";
import Produto from "../Componentes/Produto";
import ShopCart from "../assets/ShopCart.svg";
import search from "../assets/search.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Catalogo() {
  const [produtos, setProdutos] = useState([]); //para os produtos da API
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // Buscar produtos da API ao carregar a pagina
  useEffect(() => {
    axios
      .get("http://localhost:8081/produtos") // ip do endpoint do back
      .then((response) => {
        setProdutos(response.data); // Atualiza o estado com os produtos recebidos
      })
      .catch((error) => {
        console.error("Erro ao buscar os produtos:", error);
      });
  }, []);

  const handleAddToCart = (item) => {
    console.log("Item adicionado: ", item);
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCartItems, { ...item, quantity: 1 }];
    });

    setCartCount((prevCount) => prevCount + 1);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevCartItems) => {
      const itemToRemove = prevCartItems.find((cartItem) => cartItem.id === id);

      if (itemToRemove.quantity > 1) {
        return prevCartItems.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }

      return prevCartItems.filter((cartItem) => cartItem.id !== id);
    });

    setCartCount((prevCount) => prevCount - 1);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleFinalizeOrder = () => {
    if (cartItems.length > 0) {
      localStorage.setItem("carrinho", JSON.stringify(cartItems));
      navigate("/pedido");
    } else {
      alert("Seu carrinho está vazio!");
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.valor * item.quantity, 0);

  return (
    <div className="container">
      <header>
        <div className="header_content">
          <img className="imgsearch" src={search} alt="search" />
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
            {produtos.map((produto) => {
              return (
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
              );
            })}
          </div>
        </div>
      </main>
      <footer>
        <div className="footer_content">
          <h3>Desenvolvido pelo Webnautas</h3>
          <a href="https://github.com/Webnautas">GitHub</a>
        </div>
      </footer>

      {isCartOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Carrinho</h2>
            <button onClick={toggleCart} className="close-modal">
              X
            </button>
            {cartItems.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              <>
                <ul className="cart-list">
                  {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                      {item.nome} - R$ {item.valor.toFixed(2)} (Quantidade: {item.quantity})
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="remove-button"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="total-price">
                  <strong>Total: R$ {totalPrice.toFixed(2)}</strong>
                </div>
                <button onClick={handleFinalizeOrder} className="finalize-button">
                  Finalizar Pedido
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
