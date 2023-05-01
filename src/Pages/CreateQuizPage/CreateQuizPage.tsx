import React from "react";
import Header from "../../Components/Header/Header";
import CreateQuiz from "../../Components/CreateQuiz/CreateQuiz";
import "./CreateQuizPage.css";

function CreateQuizPage() {
  return (
    <div className="quizpage-container">
      <Header />
      <div className="crt-wrapper">
        <CreateQuiz />
      </div>
    </div>
  );
}

export default CreateQuizPage;
