import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API_URL_AUTH } from "../config";


export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = {
      username,
      password,
    };
    const response = await axios.post(
      `${API_URL_AUTH}/token/`,
      post
    );
    const { access, refresh } = response.data;
    window.localStorage.setItem("ACCESS", access);
    window.localStorage.setItem("REFRESH", refresh);
    window.location.href = "/";
    setUsername("");
    setPassword("");
  };

  return (
    <div className="auth-form">
      <h2>Вход</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя пользователя"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button">
          Войти
        </button>
        <Link to={"/recovery-password"}>
          <button type="submit" className="btn-form-login">
            Не помню пароль
          </button>
        </Link>
      </form>
    </div>
  );
}
