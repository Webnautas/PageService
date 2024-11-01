import React from "react";
import "./Produto.css";
import { pizza } from "./data";

export default function Produto({ onAddToCart }) {
  const listItems = pizza.map((items) => (
    <div className="bodycard">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3Z4gvi7mZEpin_3jIwLHHgHaE7%26pid%3DApi&f=1&ipt=03da1b1595acf1146f7d20cb2967ad053678bdc13a370950a4ce6c6c44427430&ipo=images"
        alt="Imagem da Pizza"
      />

      <span className="child">
        <h1>{items.name}</h1>
        <p>{items.description}</p>
      </span>
      <div className="child2">
        <p>R$ {items.price.toFixed(2)} </p>
        <button onClick={onAddToCart}>Adicionar</button>
      </div>
    </div>
  ));

  return <li>{listItems}</li>;
}
