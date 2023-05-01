import React, { useEffect, useState } from "react";
import Quiz, { QuizProps } from "../Quiz/Quiz";

import "./Matches.css";
import { useNavigate } from "react-router-dom";
import { getQuizzes } from "../../utils/Storage";

export default function Matches() {
  const [quizzes, setQuizzes] = useState<QuizProps[]>([]);
  const navigate = useNavigate();

  function removeQuiz(key: string) {
    localStorage.removeItem("Quiz" + key);
  }

  async function teste() {
    const quizzes = await getQuizzes();
    setQuizzes(quizzes as Array<QuizProps>);
  }

  useEffect(() => {
    teste();
  }, []);

  return (
    <div className="mtch-wrapper">
      <h1>Quiz disponiveis</h1>
      <ul>
        {quizzes.map((quiz, index) => (
          <li
            onClick={() => navigate(`/match/${quiz.subject}`)}
            className="mtc-li"
            key={index}
          >
            <div className="sbj-li">{quiz.subject} </div>
            <div className="sbj-opts-wrapper">
              <div className={`lvl-li ${quiz.level}`}>{quiz.level}</div>
              <button className="edit-btn">
                {" "}
                <img
                  src="https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Edit-01-32.png"
                  width={18}
                  height={18}
                />{" "}
              </button>
              <button
                className="remove-btn"
                onClick={() => removeQuiz(quiz.subject)}
              >
                {" "}
                X{" "}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
