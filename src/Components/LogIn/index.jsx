import React, { useState } from "react";
import { useSetAtom } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { UserIdAtom } from "../../Atoms/userid";

export default function LogIn() {
  const setUser = useSetAtom(currentUserAtom);
  const setId = useSetAtom(UserIdAtom);
  const [error, setError] = useState('');
  
  const authenticate = async (event) => {
    event.preventDefault();
    const formUsername = event.target.elements.usernameArea.value;
    const formPassword = event.target.elements.passwordArea.value;
    const data = {
      user: {
        email: formUsername,
        password: formPassword,
      },
    };
  
    try {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(response.headers.get("Authorization"));
        console.log(responseData.user.id);
        setId(responseData.user.id);
        setUser(response.headers.get("Authorization"));
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };
  

  return (
    <>
      <h1>Connecte toi ici</h1>
      <form onSubmit={authenticate}>
        <label>
          Email:
          <input
            type="text"
            name="usernameArea"
            placeholder="Enter your  email"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="passwordArea"
            placeholder="Enter your password."
          />
        </label>

        <button type="submit">Connexion</button>
      </form>
    </>
  );
}
