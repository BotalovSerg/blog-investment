export default function RecoveryPassword() {
  return (
    <div className="auth-form">
      <h2>Восстановление пароля</h2>
      <form action="">
        <input type="text" placeholder="E-mail" />
        <button type="submit" className="button">
          Отправить
        </button>
      </form>
    </div>
  );
}
