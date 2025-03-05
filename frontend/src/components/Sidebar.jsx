import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTags } from "../slices/TagsSlice";
import { apiAuth } from "../config";

export default function Sidebar() {
  const [userCurrent, setUserCurrent] = useState(null);

  const tags = useSelector(selectTags);
  const accessToken = window.localStorage.getItem("ACCESS");

  useEffect(() => {
    if (accessToken) {
      const userGet = async () => {
        setUserCurrent(await apiAuth());
      };
      userGet();
    }
  }, [accessToken]);

  return (
    <>
      <aside>
        <h3>Тэги</h3>
        {tags.map((tag) => (
          <span className="tag" key={tag.id}>
            #{tag.name.toLowerCase()}
          </span>
        ))}
        <h3>Личный кабинет</h3>
        {!accessToken ? (
          <div className="sidebar-buttons">
            <p id="profileStatus">Пожалуйста, войдите в систему.</p>
            <Link to={"/login"}>
              <button className="button">Войти</button>
            </Link>
          </div>
        ) : (
          <div className="sidebar-buttons">
            <p>Добро пожаловать, {userCurrent && userCurrent.username}!</p>
            <Link to={"/profile"}>
              <button className="button">Профиль</button>
            </Link>

            <button
              className="button"
              onClick={() => {
                window.localStorage.removeItem("ACCESS");
                window.location.href = "/login";
              }}
            >
              Выйти
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
