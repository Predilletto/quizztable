import React from "react";
import { useNavigate } from "react-router-dom";

import "./Menu.css";

export default function Menu() {
  const navigate = useNavigate();
  const clickHandler = {
    crt: () => navigate("/create-quiz"),
    lst: () => navigate("list-quiz"),
  };

  return (
    <div className="menu-container">
      <ul className="ul-menu">
        <li onClick={clickHandler.crt}>Crie seu proprio quiz</li>
        <li onClick={clickHandler.lst}>Ache um Quiz</li>
      </ul>
    </div>
  );
}
