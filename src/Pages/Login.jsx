import { useState } from "react";
import "./Login.css";

export function Login() {
 
  return(
    <div className="login-container">
      
      <div className="avatar">
        <img src="/src/assets/11796039.png" alt="Avatar" />
      </div>

      
      <h2 className="login-title">LOGIN</h2>

     
      <div className="input-group">
        <label htmlFor="username">Usuário</label>
        <input
          type="text"
          id="username"
          placeholder="Digite seu usuário"
        />
        <span className="supporting-text">example1997</span>
      </div>

     
      <div className="input-group">
        <label htmlFor="password" className="label-text">Senha</label>
        <input
          type="password"
          id="password"
          className="input-text"
          placeholder="Digite sua senha"
        />
        <span className="supporting-text">Vertifique-se do Capslock</span>
      </div>

 
      <button className="login-button">Entrar</button>

      
      <div className="ou-section">ou</div>

  
      <button className="google-login">
        <img src="/src/assets/300221.png" alt="Google" />
        Entrar com o Google
      </button>

      
      <button className="register-button">Cadastrar</button>

     
        <div className="social-icons">
            <button className="social-button">
                <img src="/src/assets/icons8-facebook-novo-50.png" alt="Facebook" />
            </button>
            <button className="social-button">
                <img src="/src/assets/x.png" alt="Twitter" />
            </button>
            <button className="social-button">
                <img src="/src/assets/icons8-instagram-50.png" alt="Instagram" />
            </button>
        </div>
    </div>
  );
};
