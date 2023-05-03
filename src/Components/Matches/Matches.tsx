import React, { useEffect, useState } from "react";
import Quiz, { QuizProps } from "../Quiz/Quiz";

import "./Matches.css";
import { useNavigate } from "react-router-dom";
import { getQuizzes, removeQuiz } from "../../utils/Storage";

export default function Matches() {
  const [quizzes, setQuizzes] = useState<QuizProps[]>([]);
  const navigate = useNavigate();

  async function deleteQuiz(id: string | undefined) {
    await removeQuiz(id);
    const filteredQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(filteredQuizzes);
  }

  async function getQuizList() {
    const quizzes = await getQuizzes();
    console.log(quizzes);
    setQuizzes(quizzes as Array<QuizProps>);
  }

  useEffect(() => {
    getQuizList();
  }, []);

  return (
    <div className="mtch-wrapper">
      <h1>Quiz disponiveis</h1>
      <ul>
        {quizzes.map((quiz, index) => (
          <li className="mtc-li" key={index}>
            <div
              onClick={() => navigate(`/match/${quiz.id}`)}
              className="sbj-li"
            >
              {quiz.subject}{" "}
            </div>
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
                onClick={() => deleteQuiz(quiz.id)}
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
