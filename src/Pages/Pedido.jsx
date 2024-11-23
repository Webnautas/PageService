import { useState, useEffect } from "react";
import "./Pedido.css";

export function Pedido() {
  const [itensPedido, setItensPedido] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    setItensPedido(carrinho);
    setTotal(carrinho.reduce((acc, item) => acc + item.price, 0));
  }, []);

  return (
    <div className="pedido-container">
      <p className="payment-info">Está quase pronto =) Realize seu pagamento!</p>
      <div className="pix-title">PIX COPIA E COLA</div>
      <div className="retangulo1">
        <div className="pix-code">
          00020126360014BR.GOV.BCB.PIX0114+55999999999950200000BR5204000053039865405100.005802BR5914Nome
          do Recebedor6010Nome do Banco62160512ABC123456789630489E7
        </div>
      </div>
      <div className="order-info">Informe o seu número de pedido no caixa :)</div>
      <div className="retangulo2">
        <div className="order-number">#123456</div>
      </div>
      <div className="itens-pedido">
        <h2>Itens do Pedido</h2>
        <ul>
          {itensPedido.length > 0 ? (
            itensPedido.map((item, index) => (
              <li key={index} className="item">
                <span>{item.name}</span>
                <span>R$ {item.price.toFixed(2)}</span>
              </li>
            ))
          ) : (
            <p>Seu carrinho está vazio.</p>
          )}
        </ul>
        <div className="total">
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}


