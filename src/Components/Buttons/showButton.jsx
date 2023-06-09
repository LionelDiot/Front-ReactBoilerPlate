import React from "react";

const ShowButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      Show
    </button>
  );
};

export default ShowButton;