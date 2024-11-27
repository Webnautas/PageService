import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadProd.css";

export function CadProd() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não conferem!");
      return;
    }

    const cliente = { nome, cpf, senha };

    try {
      const response = await fetch("http://localhost:8081/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert("Erro ao cadastrar: " + errorData.erro);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com a API.");
    }
  };

  const formatCpf = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  return (
    <div className="background">
      <div className="header_content">
        <li>CATALOGO</li>
        <li>CADASTRAR PRODUTO</li>
      </div>
      <div className="background-login">
        <h2 className="titulo">CADASTRO DE PRODUTO</h2>
        <div className="text-inputs">
          <div className="input-field">
            <label htmlFor="id" className="label-text">
              ID
            </label>
            <input
              id="id"
              className="input-text"
              type="text"
              placeholder="Id do produto"
              value={nome}
              onChange={(e) => setID(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="nome" className="label-text">
              Nome
            </label>
            <input
              id="Nome"
              className="input-text"
              type="text"
              placeholder="Nome do produto"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
            />
            <span className="supporting-text"></span>
          </div>

          <div className="input-field">
            <label htmlFor="preco" className="label-text">
              Preço
            </label>
            <input
              id="preco"
              className="input-text"
              type="password"
              placeholder="Digite o valor do produto"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <span className="supporting-text"></span>
          </div>

          <div className="input-field">
            <label htmlFor="confirmarSenha" className="label-text">
              Descrição de Produto
            </label>
            <input
              id="confirmarSenha"
              className="input-text"
              type="password"
              placeholder="Descrição do produto"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <span className="supporting-text"></span>
          </div>
        </div>

        <div className="botões">
          <button className="button-cadastro" onClick={handleCadastro}>
            CADASTRAR
          </button>
          <button className="button_excluir" onClick={<></>}>
            EXCLUIR
          </button>
          <button className="button_alterar" onClick={<></>}>
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}
