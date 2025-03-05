import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiAuth } from "../config";
import deafaultAvatar from "../images/default_avatar.png";

export default function Profile() {
  const [userCurrent, setUserCurrent] = useState(null);
  const accessToken = window.localStorage.getItem("ACCESS");

  useEffect(() => {
    const userGet = async () => {
      if (accessToken) {
        try {
          const userData = await apiAuth();
          setUserCurrent(userData);
        } catch (error) {
          console.error("Ошибка при получении данных пользователя:", error);
        }
      }
    };
    userGet();
  }, [accessToken]);

  return (
    <div className="content">
      <h2>Личный кабинет</h2>
      {userCurrent ? (
        <>
          <div className="profile-header">
            <div className="circle-image">
              {userCurrent.avatar_url ? (
                <img src={userCurrent.avatar_url} alt="avatar" />
              ) : (
                <img src={deafaultAvatar} alt="deafault avatar" />
              )}
            </div>

            <div>
              <p>Username: {userCurrent.username}</p>
              <p>Имя: {userCurrent.first_name}</p>
              <p>Фамилия: {userCurrent.last_name}</p>
            </div>
            <Link to={"/update-profile"}>
              <button className="btn-profile-update" type="submit">
                Редактировать профиль
              </button>
            </Link>
          </div>
          <div className="profile-footer">
            <div>BIO: {userCurrent.bio}</div>
            <div>
              <h3>Мои статьи</h3>
            </div>
            <div>
              <h3>Мои закладки</h3>
            </div>
          </div>
        </>
      ) : (
        <p>Авторизуйтесь</p>
      )}
    </div>
  );
}
