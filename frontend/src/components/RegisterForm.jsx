import axios from "axios";
import { useState } from "react";
import { API_URL_AUTH } from "../config";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrorMessage("Пароли не совпадают");
      return;
    }
    const post = {
      username,
      password,
    };
    const responseRegister = await axios.post(
      `${API_URL_AUTH}/users/`,
      post
    );
    setErrorMessage("");
    console.log("Registration", responseRegister.data);

    const response = await axios.post(`${API_URL_AUTH}/token/`, post);
    const { access, refresh } = response.data;
    window.localStorage.setItem("ACCESS", access);
    window.localStorage.setItem("REFRESH", refresh);
    window.location.href = "/profile";
    setUsername("");
    setPassword("");
  };

  return (
    <div className="auth-form">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Логин"
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
        <input
          type="password"
          placeholder="Подтвердите пароль"
          required
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" className="button">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
