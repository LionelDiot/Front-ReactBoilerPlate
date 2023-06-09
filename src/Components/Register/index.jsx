import React, { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { UserIdAtom } from "../../Atoms/userid";

export default function Register() {
  const [user, setUser] = useAtom(currentUserAtom);
  const [error, setError] = useState('');
  const setId = useSetAtom(UserIdAtom);

  const saveProfile = async (event) => {
    event.preventDefault();
    const formUsername = event.target.elements.usernameArea.value;
    const formEmail = event.target.elements.emailArea.value;
    const formPassword = event.target.elements.passwordArea.value;
    const data = {
      user: {
        username: formUsername,
        email: formEmail,
        password: formPassword,
      }, 
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        setId(responseData.user.id)
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
      <h1>Create a new profile here</h1>
      <form onSubmit={saveProfile}>
        <label>
          Username:
          <input
            type="text"
            name="usernameArea"
            placeholder="Enter a username"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="emailArea"
            placeholder="Enter an email"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="passwordArea"
            placeholder="Enter a valid password (one maj one number 8 char min)."
          />
        </label>

        <button type="submit">Create Profile</button>
      </form>
    </>
  );
}
