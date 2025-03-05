import React, { useState } from "react";

export function ExpandingTitle(props) {
  const { title, questions } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h3 onClick={toggleExpand} style={{ cursor: "pointer", color: "blue" }}>
        {isExpanded ? (
          <div>
            <span>-</span> {title}
          </div>
        ) : (
          <div>
            <span>+</span> {title}
          </div>
        )}
      </h3>
      {isExpanded && (
        <div style={{ marginLeft: "20px", lineHeight: "1.5" }}>
          {questions.map((q) => (
            <div key={q.id}>
              <p>
                <strong>{q.question}</strong>
              </p>
              <p>{q.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
