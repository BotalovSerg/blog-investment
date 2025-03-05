import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setArticles } from "../../slices/ArticlSlice";
import { selectTags } from "../../slices/TagsSlice";
import { API_URL } from "../../config";

export default function Articles() {
  const dispatch = useDispatch();
  const { articles, articlesList } = useSelector((state) => state.articlesLoad);
  const tags = useSelector(selectTags);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_URL}/articles/`);
        dispatch(setArticles(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchArticles();
  }, [dispatch]);

  return (
    <div className="content">
      <div className="content-title">
        <h1>Добро пожаловать на Investment Explorer</h1>
        <h2>
          Здесь вы найдете актуальную информацию о инвестициях, финансовых
          инструментах и сможете подготовиться к тесту для доступа к
          высокорисковым ценным бумагам.
        </h2>
      </div>
      <hr />
      <h2>Последние статьи</h2>

      {articlesList.map((articleId) => (
        <div className="article" key={articleId}>
          <h3>{articles[articleId].title}</h3>
          <p>{articles[articleId].summary}</p>
          {articles[articleId].tags.map((tagId) => {
            const tag = tags.find((t) => t.id === tagId);
            if (tag) {
              return (
                <span className="tag" key={tag.id}>
                  #{tag.name}
                </span>
              );
            }
            return null;
          })}
          <Link to={`/article/${articleId}`}>
            <button className="button readMore">Читать далее</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
