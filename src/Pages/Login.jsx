import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export function Login() {
  const navigate = useNavigate();

  function handleClick(event) {
    navigate("/cadastro");
    console.log("Ola mundo");
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Função chamada para enviar o formulario para a API
  const logar = async (e) => {
    e.preventDefault(); //esvita que a pagina recarregue

    console.log({ username, password });

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nome: username,
          senha: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        //caso de  tudo certo
        alert("Login realizado com sucesso!");
      } else {
        alert(data.message || "Erro no login. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro ao tentar logar", error);
    }
  };

  return (
    <body className="login">
      <div className="login-container">
        <div className="avatar">
          <img src="/src/assets/11796039.png" alt="Avatar" />
        </div>

        <h2 className="login-title">LOGIN</h2>

        <form onSubmit={logar}>
          <div className="input-group">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
            <span className="supporting-text">example1997</span>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="label-text">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="input-text"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <span className="supporting-text">Verifique o Capslock</span>
          </div>

          <button className="login-button" type="submit">
            Entrar
          </button>
        </form>

        <div className="ou-section">ou</div>

        <button className="google-login">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          ;
        </button>

        <button className="register-button" type="button" onClick={handleClick}>
          Cadastrar
        </button>

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
    </body>
  );
}
