import React, { useState } from "react";

const ArticleForm = ({ article = {}, onSubmit }) => {
  const [title, setTitle] = useState(article.title || "");
  const [content, setContent] = useState(article.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = { title, content };
    onSubmit(newArticle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ArticleForm;