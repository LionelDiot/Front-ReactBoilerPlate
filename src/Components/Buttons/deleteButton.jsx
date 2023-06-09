import React from "react";

const DeleteButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeleteButton;