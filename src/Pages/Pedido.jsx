import { useState, useEffect } from "react"; // Importar useEffect
import "./Pedido.css";

export function Pedido() {
  // Estado para armazenar os dados dos itens do pedido
  const [itensPedido, setItensPedido] = useState([]);
  const [total, setTotal] = useState(0);

  // Simulando a requisição ao back-end
  useEffect(() => {
    // Simulação de dados do back-end
    const fetchData = async () => {
      const dadosDoBackEnd = {
        itens: [
          { nome: 'Item 1', preco: 10.00 },
          { nome: 'Item 2', preco: 20.00 },
          { nome: 'Item 3', preco: 15.00 },
        ],
        total: 45.00,
      };

      // Atualizando o estado com os dados recebidos
      setItensPedido(dadosDoBackEnd.itens);
      setTotal(dadosDoBackEnd.total);
    };

    fetchData();
  }, []);

  return (
    <div className="pedido-container">
      <p className="payment-info">Está quase pronto =) Realize seu pagamento!</p>
      
      <div className="pix-title">PIX COPIA E COLA</div>
      <div className="retangulo1"><div className="pix-code">
        00020126360014BR.GOV.BCB.PIX0114+55999999999950200000BR5204000053039865405100.005802BR5914Nome do Recebedor6010Nome do Banco62160512ABC123456789630489E7
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
                <span>{item.nome}</span>
                <span>R$ {item.preco.toFixed(2)}</span>
              </li>
            ))
          ) : (
            <p>Carregando itens...</p>
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

export default Pedido;
