import { useState } from "react";
import "./Cadastro.css";

export function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

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
        const data = await response.json();
        alert("Cadastro realizado com sucesso!");
        console.log(data);
      } else {
        const errorData = await response.json();
        alert("Erro ao cadastrar: " + errorData.erro);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com a API.");
    }
  };
  return (
    <div className="background">
      <div className="background-login">
        <h2 className="titulo">Create Account</h2>
        <div className="text-inputs">
          <div className="input-field">
            <label htmlFor="nome" className="label-text">
              Nome
            </label>
            <input
              id="nome"
              className="input-text"
              type="text"
              placeholder="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="cpf" className="label-text">
              CPF
            </label>
            <input
              id="cpf"
              className="input-text"
              type="text"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="senha" className="label-text">
              Senha
            </label>
            <input
              id="senha"
              className="input-text"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="confirmarSenha" className="label-text">
              Confirmar Senha
            </label>
            <input
              id="confirmarSenha"
              className="input-text"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>
        </div>

        <div className="cadastrar">
          <button className="cadastrar-button" onClick={handleCadastro}>
            CADASTRAR
          </button>
        </div>
      </div>
    </div>
  );
}
