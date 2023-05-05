import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Menu.css";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Menu() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const clickHandler = {
    crt: () => navigate("/create-quiz"),
    crtAnon: () => alert("You shold be logged to create an Quizz"),
    lst: () => navigate("/list-quiz"),
  };

  return (
    <div className="menu-container">
      <ul className="ul-menu">
        <li
          onClick={user?.isAnonymous ? clickHandler.crtAnon : clickHandler.crt}
        >
          Crie seu proprio quiz
        </li>
        <li onClick={clickHandler.lst}>Ache um Quiz</li>
      </ul>
    </div>
  );
}
