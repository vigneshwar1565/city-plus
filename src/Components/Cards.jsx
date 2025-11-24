import React from "react";
import "../App.css";

const Card = ({ children, className = "", onClick }) => {
  const handleClick = () => {
    console.log("handleClick Card clicked");
    if (onClick) {
      onClick();
    }
  };

  const cardClasses = `card ${
    onClick ? "card-clickable" : ""
  } ${className}`.trim();

  return (
    <div className={cardClasses} onClick={onClick ? handleClick : undefined}>
      {children}
    </div>
  );
};

export default Card;
