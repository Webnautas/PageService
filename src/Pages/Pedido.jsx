import { useState, useEffect } from "react";
import "./Pedido.css";

export function Pedido() {
  const [itensPedido, setItensPedido] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderNumber, setOrderNumber] = useState(""); 

  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    setItensPedido(carrinho);
    setTotal(carrinho.reduce((acc, item) => acc + item.price, 0));

    const generatedOrderNumber = generateOrderNumber();
    setOrderNumber(generatedOrderNumber); 

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const pedidoData = {
        userId: user.id,
        orderNumber: generatedOrderNumber,
        items: carrinho,
        total: carrinho.reduce((acc, item) => acc + item.price, 0),
      };

      
      fetch("http://nossoservidor.com/api/orders", { // paulo tenta fazer isso aqui basicamente vai guardar o numero aleatorio do nossos pedidos 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, 
        },
        body: JSON.stringify(pedidoData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Pedido salvo com sucesso:", data);
        })
        .catch((error) => {
          console.error("Erro ao salvar o pedido:", error);
        });
    }
  }, []);

  
  function generateOrderNumber() {
    const now = new Date();
    const datePart = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `#${datePart}${randomPart}`;
  }

  return (
    <div className="pedido-container">
      <p className="payment-info">Está quase pronto =) Verifique seu pedido!</p>
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
      <div className="pix-title">REALIZE O PAGAMENTO </div>
      <div className="retangulo1">
      <span className="supporting-text" id="sup-ped">Webnautas Software Solutions - NuBank </span>
        <div className="qrcode"> <img  src="/src/assets/qrcode-pix.png"/> </div>
        
        <span className="supporting-text" id="sup-ped">Se preferir use o Codigo Copia e cola </span>
        <div className="pix-code">
        00020126330014BR.GOV.BCB.PIX0111425430308405204000053039865802BR5909Webnautas6011jaboticabal62070503***63041037
        </div>
        
      </div>
      
      <div className="order-info">Informe o seu número de pedido no caixa :)</div>
      <div className="retangulo2">
        <div className="order-number">{orderNumber}</div> 
      </div>
      
    </div>
  );
}
