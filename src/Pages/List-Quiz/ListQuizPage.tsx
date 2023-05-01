import React from "react";
import Header from "../../Components/Header/Header";

import "./ListQuizPage.css";
import Matches from "../../Components/Matches/Matches";

export default function ListQuizPage() {
  return (
    <div className="listpage-container">
      <Header />
      <Matches />{" "}
    </div>
  );
}
