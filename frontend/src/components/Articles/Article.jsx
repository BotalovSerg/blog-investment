import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiService, API_URL } from "../../config";

export default function Article() {
  const params = useParams();
  const { articleId } = params;
  const [post, setPost] = useState([]);
  const [listComments, setListComments] = useState([]);
  const [commentText, setCommetText] = useState("");
  const accessToken = window.localStorage.getItem("ACCESS");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await apiService(`articles/${articleId}/`);
        setPost(data);
        setListComments(data.comments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = {
      text: commentText,
      article: articleId,
    };
    const response = await axios.post(`${API_URL}/comments/`, post, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setListComments((prev) => [...prev, response.data]);
    setCommetText("");
  };

  const formatDate = (dateSrting) => {
    const dateFormat = new Date(dateSrting).toLocaleString("ru-RU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return dateFormat;
  };

  return (
    <div className="content">
      <h2>{post.title}</h2>
      <div>{post.content}</div>
      <p>
        Автор:
        {post.author && ` ${post.author.first_name} ${post.author.last_name}`}
      </p>
      <section className="comments">
        <div className="comments-header">Комментарии</div>
        <div className="comments-tree">
          {listComments && listComments.length ? (
            listComments.map((comment) => (
              <div className="comment-root" key={comment.id}>
                <div className="comment-auhor">
                  <span className="comment_witget_fio">
                    Автор: {comment.user.first_name}
                  </span>
                  <span className="comment_date">
                    {formatDate(comment.time_create)}
                  </span>
                </div>
                <div className="comment-text">{comment.text}</div>
              </div>
            ))
          ) : (
            <div className="comment-root">Комментариев пока нет</div>
          )}
        </div>
        <>
          {accessToken && (
            <div className="comment-form">
              <form className="form-comment-input" onSubmit={handleSubmit}>
                <textarea
                  name=""
                  value={commentText}
                  onChange={(e) => setCommetText(e.target.value)}
                  className="comment-input"
                  placeholder="Комментарий"
                  required
                ></textarea>
                <button type="submit" className="button btn-comment-input">
                  Оставить комментарий
                </button>
              </form>
            </div>
          )}
        </>
      </section>
    </div>
  );
}
