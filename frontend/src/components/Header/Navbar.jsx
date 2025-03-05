import { Button } from "./Button";

export default function Navbar() {
  const accessToken = window.localStorage.getItem("ACCESS");

  return (
    <nav>
      <div className="nav-left">
        <Button title="Главная страница" href="" />
        <Button title="Добавить статью" href="/add-page" />
        <Button title="Тест брокера" href="/test-broker" />
      </div>
      <div className="nav-right">
        {accessToken ? (
          <Button
            title="Выход"
            href="/login"
            onClick={() => {
              window.localStorage.removeItem("ACCESS");
              window.location.href = "/login";
            }}
          />
        ) : (
          <>
            <Button title="Вход" href="/login" />
            <Button title="Регистрация" href="/register" />
          </>
        )}
      </div>
    </nav>
  );
}
