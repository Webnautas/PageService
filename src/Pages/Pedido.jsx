import { useState, useEffect } from "react";
import "./Pedido.css";

export function Pedido() {
  const [itensPedido, setItensPedido] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Recupera o carrinho do localStorage
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Filtra itens válidos e calcula o total
    const itensValidos = carrinho.filter(
      (item) => item && item.valor !== undefined && !isNaN(item.valor)
    );

    setItensPedido(itensValidos);

    // Calcula o total com base no campo `valor`
    const totalPedido = itensValidos.reduce((acc, item) => acc + Number(item.valor), 0);
    setTotal(totalPedido);

    // Gera o número do pedido
    const generatedOrderNumber = generateOrderNumber();
    setOrderNumber(generatedOrderNumber);

    // Envia os dados do pedido para o servidor
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const pedidoData = {
        userId: user.id,
        orderNumber: generatedOrderNumber,
        items: itensValidos,
        total: totalPedido,
      };

      fetch("http://nossoservidor.com/api/orders", {
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

  // Gera um número único para o pedido
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
                <span>{item.nome || "Item sem nome"}</span>
                <span>R$ {item.valor ? Number(item.valor).toFixed(2) : "0.00"}</span>
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
        <span className="supporting-text" id="sup-ped">Webnautas Software Solutions - NuBank</span>
        <div className="qrcode"><img src="/src/assets/qrcode-pix.png" alt="QR Code" /></div>

        <span className="supporting-text" id="sup-ped">Se preferir use o Código Copia e Cola</span>
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
