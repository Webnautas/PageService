import { useState } from "react";
import "./CadastroProduto.css";

export function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const handleCadastro = () => {
    if (!nome || !preco || !descricao) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    const novoProduto = {
      id: produtoEditando ? produtoEditando.id : Date.now(), // Gera um ID único
      nome,
      preco: parseFloat(preco),
      descricao,
    };

    if (produtoEditando) {
      // Atualizar produto
      setProdutos((produtos) =>
        produtos.map((produto) =>
          produto.id === produtoEditando.id ? novoProduto : produto
        )
      );
      setProdutoEditando(null);
      alert("Produto atualizado com sucesso!");
    } else {
      // Adicionar produto
      setProdutos([...produtos, novoProduto]);
      alert("Produto cadastrado com sucesso!");
    }

    // Limpar campos
    setNome("");
    setPreco("");
    setDescricao("");
  };

  const handleEditar = (id) => {
    const produto = produtos.find((produto) => produto.id === id);
    setNome(produto.nome);
    setPreco(produto.preco.toString());
    setDescricao(produto.descricao);
    setProdutoEditando(produto);
  };

  const handleExcluir = (id) => {
    const produtosAtualizados = produtos.filter((produto) => produto.id !== id);
    setProdutos(produtosAtualizados);
    alert("Produto excluído com sucesso!");
  };

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
            <label htmlFor="preco" className="label-text">
              Preço
            </label>
            <input
              id="preco"
              className="input-text"
              type="number"
              placeholder="Preço do Produto"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
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
          <button className="cadastrar-button" onClick={handleCadastro}>
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
                  <strong>Preço:</strong> R$ {produto.preco.toFixed(2)}
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
