import React, { useState, useEffect } from "react";
import Article from './article';
import ShowButton from '../Buttons/showButton';
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3000/articles", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticles();
  }, []);


  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Article article={article} />
            <Link to={`/article/${article.id}`}>
              <ShowButton />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
