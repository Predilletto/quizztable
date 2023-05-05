import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import LoginIcon from "../LoginIcon/LoginIcon";

export default function Header() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/home");
  }

  return (
    <div className="header-app">
      <h1 onClick={() => handleClick()}>Quizzing</h1>
      <LoginIcon />
    </div>
  );
}
