import { Link } from "react-router-dom";
import "./Button.css";

export function Button(props) {
  const { title, href, onClick } = props;
  return (
    <Link to={href}>
      <button className="btn-header" onClick={onClick}>
        {title}
      </button>
    </Link>
  );
}
