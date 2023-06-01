import React from "react";
import { QuestionProps as QuestionProps } from "../Question/Question";
import { DeleteQuizFunc, EditQuizFunc } from "../Matches/Matches";
import { useNavigate } from "react-router-dom";
import "../Matches/Matches.css";

export enum Level {
  FACIL = "Fácil",
  MEDIO = "Médio",
  DIFICIL = "Difícil",
}

export type QuizProps = {
  id?: string;
  subject: string;
  level: Level;
  questions: Array<QuestionProps>;
  creatorUID: string | undefined;
};

type Props = {
  auth: boolean;
  quiz: QuizProps;
  deleteQuiz: DeleteQuizFunc;
  editQuiz: EditQuizFunc;
};

function Quiz({ quiz, deleteQuiz, editQuiz, auth }: Props) {
  const navigate = useNavigate();

  return (
    <li className="mtc-li">
      <div onClick={() => navigate(`/match/${quiz.id}`)} className="sbj-li">
        {quiz.subject}{" "}
      </div>
      {auth ? (
        <div className="sbj-opts-wrapper">
          <div className={`lvl-li ${quiz.level}`}>{quiz.level}</div>
          <button
            onClick={() => navigate(`/edit/${quiz.id}`)}
            className="edit-btn"
          >
            {" "}
            <img
              src="https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Edit-01-32.png"
              width={18}
              height={18}
            />{" "}
          </button>
          <button className="remove-btn" onClick={() => deleteQuiz(quiz.id)}>
            {" "}
            X{" "}
          </button>
        </div>
      ) : (
        ""
      )}
    </li>
  );
}

export default Quiz;
