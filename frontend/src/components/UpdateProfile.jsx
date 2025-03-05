import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { apiAuth, API_URL_AUTH } from "../config";
import deafaultAvatar from "../images/default_avatar.png";

export function UpdateProfile() {
  const [userCurrent, setUserCurrent] = useState(null);
  const accessToken = window.localStorage.getItem("ACCESS");
  const decoded = jwtDecode(accessToken);
  const userId = decoded.user_id;
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const userGet = async () => {
      if (accessToken) {
        try {
          const userData = await apiAuth();
          setUserCurrent(userData);
          setUsername(userData.username);
          setFirstName(userData.first_name);
          setLastName(userData.last_name);
          setEmail(userData.email);
          setBio(userData.bio);
        } catch (error) {
          console.error("Ошибка при получении данных пользователя:", error);
        }
      }
    };
    userGet();
  }, [accessToken]);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("bio", bio);
    formData.append("email", email);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    try {
      const response = await axios.put(
        `${API_URL_AUTH}/users/${userId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Профиль обновлен:", response.data);
      setNotification("Профиль успешно обновлен!");
      setUserCurrent(response.data);
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
      setNotification(
        "Ошибка при обновлении профиля. Пожалуйста, попробуйте еще раз."
      );
    }
    // window.location.href = "/profile";
  };

  return (
    <div className="content">
      <div className="edit-profile-form">
        <h3>Редактирование профиля</h3>
        <div className="profile-edit-container">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Логин"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Имя:</label>
              <input
                type="text"
                placeholder="First Name"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Фамилия:</label>
              <input
                type="text"
                placeholder="Last Name"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>О себе:</label>
              <textarea
                placeholder="Bio"
                value={bio}
                className="form-control"
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Загрузить новый аватар:</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleAvatarChange}
              />
            </div>

            <button type="submit" className="button">
              Сохранить изменения
            </button>
          </form>
          {notification && <div className="notification">{notification}</div>}
          {userCurrent && (
            <div className="avatar-preview">
              <h4>Текущий аватар</h4>
              <div className="avatar-container">
                {userCurrent.avatar_url ? (
                  <img src={userCurrent.avatar_url} alt="avatar" />
                ) : (
                  <img src={deafaultAvatar} alt="deafault avatar" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
