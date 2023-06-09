import React, { useState, useEffect } from "react";
import Article from "./article";
import DeleteButton from "../Buttons/deleteButton";
import EditButton from "../Buttons/editButton";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { UserIdAtom } from "../../Atoms/userid";
import { loggedInAtom } from "../../Atoms/loggedin";
import { useParams } from "react-router-dom";

const ShowArticle = () => {
  const { articleSlug } = useParams();
  const user = useAtomValue(currentUserAtom);
  const userid = useAtomValue(UserIdAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState(false);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/articles/${articleSlug}`, {
          method: "get",
          headers: loggedIn ? {
            Authorization: `${user}`,
            "Content-Type": "application/json",
          } : {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        setArticle(responseData);
      } catch (error) {
        console.error("Error:", error);
        setArticle("Une erreur s'est produite lors de la récupération des données.");
      }
    };

    fetchArticleData();
  }, [articleSlug, user, loggedIn]);

  useEffect(() => {
    const checkAuthor = () => {
      console.log(`${article.user_id} = ${userid}`)
      // Check if the current user is the author
      // You can modify this logic based on your requirements
      if (article.user_id === userid) {
        setAuthor(true);
      } else {
        setAuthor(false);
      }
    };

    checkAuthor();
  }, [article, user]);

  const handleDelete = () => {
    // Handle delete button click
  };

  const handleEdit = () => {
    // Handle edit button click
  };

  return (
    <div>
      <h1>Show Article</h1>
      <Article article={article} />
      {author && (
        <>
          <DeleteButton handleClick={handleDelete} />
          <EditButton handleClick={handleEdit} />
        </>
      )}
    </div>
  );
};

export default ShowArticle;

