import React, { useEffect } from "react";
import "../Pages/Catalogo.css";

const Cart = ({ cartItems }) => {
  return (
    <div className="container">
      <header className="header_content">
        <h1>Carrinho de Compras</h1>
      </header>
      <main className="cart-main">
        {cartItems.length > 0 ? (
          cartItems.map((items, index) => (
            <div key={index} className="card">
              <img src={items.image} alt={items.name} className="imgcart" />
              <h2>{items.name}</h2>
              <p>Quantidade: {item.quantity}</p>
              <p>Preço: R${item.price}</p>
            </div>
          ))
        ) : (
          <p>O carrinho está vazio.</p>
        )}
      </main>
      <footer className="footer_content">
        <button onClick={() => window.history.back()}>Voltar</button>
      </footer>
    </div>
  );
};

export default Cart;
