import { useState, useEffect } from "react";
import "./CadastroProduto.css";

export function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [valor, setvalor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);

  // Função para buscar todos os produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await fetch("http://localhost:8081/produtos");
      if (!response.ok) {
        throw new Error("Erro ao carregar produtos.");
      }
      const data = await response.json();
      setProdutos(data); // Atualiza o estado com a lista de produtos
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Erro ao carregar produtos!");
    }
  };

  // Função para cadastrar um novo produto
  const handleCadastro = async () => {
    if (!nome || !valor || !descricao) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    const novoProduto = {
      nome,
      valor: parseFloat(valor),
      descricao,
    };

    try {
      // Envia o novo produto para o backend
      const response = await fetch("http://localhost:8081/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoProduto),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar produto.");
      }

      // Após o cadastro, busca todos os produtos atualizados
      fetchProdutos();

      alert("Produto cadastrado com sucesso!");

      // Limpar campos de entrada
      setNome("");
      setvalor("");
      setDescricao("");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao cadastrar produto!");
    }
  };

  // Função para editar um produto
  const handleEditar = (id) => {
    const produto = produtos.find((produto) => produto.id === id);
    setNome(produto.nome);
    setvalor(produto.valor.toString());
    setDescricao(produto.descricao);
    setProdutoEditando(produto);
  };

  // Função para atualizar um produto no banco
  const handleAtualizar = async () => {
    if (!nome || !valor || !descricao || !produtoEditando) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    const produtoAtualizado = {
      ...produtoEditando,
      nome,
      valor: parseFloat(valor),
      descricao,
    };

    try {
      const response = await fetch(
        `http://localhost:8081/produtos/${produtoEditando.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produtoAtualizado),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar produto.");
      }

      fetchProdutos();

      alert("Produto atualizado com sucesso!");
      setProdutoEditando(null); // Limpa o produto em edição
      setNome("");
      setvalor("");
      setDescricao("");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto!");
    }
  };

  // Função para excluir um produto
  const handleExcluir = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/produtos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir produto.");
      }

      fetchProdutos();
      alert("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir produto!");
    }
  };

  // Carregar todos os produtos quando o componente for montado
  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="background-produto">
      <div className="background-cadastro">
        <h2 className="titulo">Cadastro de Produto</h2>
        <div className="text-inputs">
          <div className="input-field">
            <label htmlFor="nome" className="label-text">
              Nome do Produto
            </label>
            <input
              id="nome"
              className="input-text"
              type="text"
              placeholder="Nome do Produto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="valor" className="label-text">
              Preço
            </label>
            <input
              id="valor"
              className="input-text"
              type="number"
              placeholder="Preço do Produto"
              value={valor}
              onChange={(e) => setvalor(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="descricao" className="label-text">
              Descrição
            </label>
            <textarea
              id="descricao"
              className="input-text"
              placeholder="Descrição do Produto"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>

        <div className="cadastrar">
          <button
            className="cadastrar-button"
            onClick={produtoEditando ? handleAtualizar : handleCadastro}
          >
            {produtoEditando ? "Atualizar Produto" : "Cadastrar Produto"}
          </button>
        </div>
      </div>

      <div className="lista-produtos">
        <h2 className="titulo">Lista de Produtos</h2>
        {produtos.length === 0 ? (
          <p className="nenhum-produto">Nenhum produto cadastrado.</p>
        ) : (
          <ul className="produto-lista">
            {produtos.map((produto) => (
              <li key={produto.id} className="produto-item">
                <div>
                  <strong>Nome:</strong> {produto.nome}
                </div>
                <div>
                  <strong>Preço:</strong> R$ {produto.valor.toFixed(2)}
                </div>
                <div>
                  <strong>Descrição:</strong> {produto.descricao}
                </div>
                <div className="botoes">
                  <button
                    className="editar-button"
                    onClick={() => handleEditar(produto.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="excluir-button"
                    onClick={() => handleExcluir(produto.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
