import React from "react";
import EditQuiz from "../../Components/EditQuiz/EditQuiz";
import Header from "../../Components/Header/Header";
import "../CreateQuizPage/CreateQuizPage.css";

function EditQuizPage() {
  return (
    <div className="quizpage-container">
      <Header />
      <div className="crt-wrapper">
        <EditQuiz />
      </div>
    </div>
  );
}

export default EditQuizPage;
