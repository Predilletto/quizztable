import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className="header-app">
      <h1 onClick={() => handleClick()}>Quizzing</h1>
    </div>
  );
}
