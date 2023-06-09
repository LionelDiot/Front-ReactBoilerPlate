import React, { useState } from "react";

const Article = ({ article }) => {

  return (
        <>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <p>Created at: {article.created_at}</p>
          <p>Updated at: {article.updated_at}</p>
        </>
  );
};

export default Article;