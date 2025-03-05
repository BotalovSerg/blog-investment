import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addArticle } from "../../slices/ArticlSlice";
import { selectTags } from "../../slices/TagsSlice";
import { API_URL } from "../../config";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();

  const tags = useSelector(selectTags);
  const accessToken = window.localStorage.getItem("ACCESS");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = {
      title,
      summary,
      content,
      tags: selectedTags,
    };
    const response = await axios.post(`${API_URL}/articles/`, post, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(addArticle(response.data));
    setTitle("");
    setSummary("");
    setContent("");
    setSelectedTags([]);
    window.location.href = `/article/${response.data.id}`;
  };

  const toggleTag = (tagl) => {
    setSelectedTags((prev) =>
      prev.includes(tagl) ? prev.filter((id) => id !== tagl) : [...prev, tagl]
    );
  };

  return (
    <div className="content">
      <h2>Добавить статью</h2>
      {accessToken ? (
        <form onSubmit={handleSubmit} className="narrow-form">
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Summary"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <textarea
            placeholder="Content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="tag-selector">
            <h4>Выберите теги:</h4>
            <div className="tag-options">
              {tags.map((tag) => (
                <label key={tag.id}>
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag.name}
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => toggleTag(tag.id)}
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="button">
            Опубликовать
          </button>
        </form>
      ) : (
        <div>Для добавления статьи авторизуйтесь.</div>
      )}
    </div>
  );
}
