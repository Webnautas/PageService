import { useState } from "react";
import "./Cadastro.css";

export function Cadastro() {
 
  return (
    <div className="background">
      <div className="background-login">
        <h2 className="titulo">Create Account</h2>
        <div className="text-inputs">
          <div className="input-field">
            <label className="label-text">Nome</label>
            <input className="input-text" type="text" placeholder="Nome Completo" />
          </div>

          <div className="input-field">
            <label className="label-text">CPF</label>
            <input className="input-text" type="text" placeholder="Digite seu CPF" />
          </div>

          <div className="input-field">
            <label className="label-text">Senha</label>
            <input className="input-text" type="password" placeholder="Digite sua senha" />
          </div>

          <div className="input-field">
            <label className="label-text">Confirmar Senha</label>
            <input className="input-text" type="password" placeholder="Confirme sua senha" />
          </div>
        </div>

        <div className="cadastrar">
          <button className="cadastrar-button">CADASTRAR</button>
        </div>
      </div>
    </div>
  );
};
