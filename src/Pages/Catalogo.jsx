import { useState } from "react"; 
import "./Catalogo.css";
import Produto from "../Componentes/Produto";
import ShopCart from "../assets/ShopCart.svg";
import search from "../assets/search.svg";

export function Catalogo() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    setCartCount(cartCount + 1);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    setCartCount(cartCount - 1);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

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
      {isCartOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Carrinho</h2>
            <button onClick={toggleCart} className="close-modal">X</button>
            {cartItems.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              <>
                <ul className="cart-list">
                  {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                      {item.name} - R$ {item.price.toFixed(2)}
                      <button onClick={() => handleRemoveFromCart(index)} className="remove-button">Remover</button>
                    </li>
                  ))}
                </ul>
                <div className="total-price">
                  <strong>Total: R$ {totalPrice.toFixed(2)}</strong>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
