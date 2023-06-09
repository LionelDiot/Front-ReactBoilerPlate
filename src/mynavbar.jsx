import React from "react";
import { Link } from "react-router-dom";
import { useSetAtom, useAtomValue } from "jotai";
import { currentUserAtom } from "./Atoms/currentuser";
import { UserIdAtom } from "./Atoms/userid";
import { loggedInAtom } from "./Atoms/loggedin";

export default function MyNavbar({ darkMode, toggleDarkMode }) {
  const loggedIn = useAtomValue(loggedInAtom);
  const user = useAtomValue(currentUserAtom);
  const setUser = useSetAtom(currentUserAtom);
  const setUserId = useSetAtom(UserIdAtom);
  const handleLogout = () => {
    fetch("http://localhost:3000/users/sign_out", {
      method: "delete",
      headers: {
        Authorization: `${user}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(
          ` all my data pas trié ? : ${JSON.stringify(responseData.user)}`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setUser(null);
    setUserId(null);
  };
  return (
    <nav>
      <div>
        <Link to="/">FaitBouillirPlat</Link>
      </div>
      <button onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <ul>
        {loggedIn ? (
          <>
            <li>
              <Link to="/myprofile">Mon Profil</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Se déconnecter</button>
            </li>
            <li>
            <Link to="/articles/new">Ecrire un article</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">S'inscrire</Link>
            </li>
            <li>
              <Link to="/login">Se connecter</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
