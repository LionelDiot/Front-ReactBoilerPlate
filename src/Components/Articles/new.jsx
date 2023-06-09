import React from "react";
import ArticleForm from "./form";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { useNavigate } from "react-router-dom";

const NewArticlePage = () => {
  const navigate = useNavigate();
  const user = useAtomValue(currentUserAtom);
  const handleCreateArticle = async (article) => {
    const { title, content } = article;
  
    try {
      const response = await fetch("http://localhost:3000/articles", {
        method: "POST",
        headers: {
          Authorization: `${user}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article: {
            title,
            content,
            private: false,
          },
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const slug = data.id;
        console.log(` LE SLUUUUUUUUUUGG ${slug}`);
      // Redirect to the article show page using the slug
        navigate(`/article/${slug}`);
      } else {
        // Handle error response
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div>
      <h1>New Article</h1>
      <ArticleForm onSubmit={handleCreateArticle} />
    </div>
  );
};

export default NewArticlePage;
