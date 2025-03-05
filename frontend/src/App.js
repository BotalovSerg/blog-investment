import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import Articles from "./components/Articles/Articles";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header/Header";
import PostForm from "./components/Articles/AddArticle";
import Article from "./components/Articles/Article";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import Answers from "./components/AnswersToTest/Answers";
import Profile from "./components/Profile";
import { UpdateProfile } from "./components/UpdateProfile";
import RecoveryPassword from "./components/RecoveryPassword";
import { fetchTags } from "./slices/TagsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Sidebar />

        <Routes>
          <Route path="" element={<Articles />}></Route>
          <Route path="add-page" element={<PostForm />}></Route>
          <Route path="article/:articleId" element={<Article />}></Route>
          <Route path="login" element={<LoginForm />}></Route>
          <Route path="register" element={<RegisterForm />}></Route>
          <Route path="test-broker" element={<Answers />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="update-profile" element={<UpdateProfile />}></Route>
          <Route
            path="recovery-password"
            element={<RecoveryPassword />}
          ></Route>
        </Routes>
      </main>
      <footer>
        <p>&copy; 2024 Investment Explorer. Все права защищены.</p>
      </footer>
    </>
  );
}

export default App;
