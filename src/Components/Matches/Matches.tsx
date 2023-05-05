import React, { useContext, useEffect, useState } from "react";
import Quiz, { QuizProps } from "../Quiz/Quiz";

import "./Matches.css";
import { useNavigate } from "react-router-dom";
import { getQuizzes, removeQuiz } from "../../utils/Storage";
import { AuthContext } from "../../Contexts/AuthContext";

export type DeleteQuizFunc = (id: string | undefined) => void;

export default function Matches() {
  const { user } = useContext(AuthContext);

  const [userList, setUserList] = useState<QuizProps[]>([]);
  const [quizzes, setQuizzes] = useState<QuizProps[]>([]);
  const navigate = useNavigate();

  async function deleteQuiz(id: string | undefined) {
    await removeQuiz(id);
    const filteredQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(filteredQuizzes);
  }

  async function getQuizList() {
    const quizzes = await getQuizzes();
    const userQuizzes = quizzes.filter((quiz) => quiz.creatorUID === user?.uid);
    setUserList(userQuizzes as Array<QuizProps>);
    const otherQuizzes = quizzes.filter(
      (quiz) => quiz.creatorUID !== user?.uid
    );
    setQuizzes(otherQuizzes as Array<QuizProps>);
  }

  useEffect(() => {
    getQuizList();
  }, []);

  return (
    <div className="mtch-wrapper">
      <h1> Seus Quiz Criados </h1>
      <ul>
        {userList.length > 0
          ? userList.map((quiz, index) => (
              <Quiz quiz={quiz} deleteQuiz={deleteQuiz} key={index} />
            ))
          : "Nenhum Quiz criado ainda :( "}
      </ul>

      <h1>Quiz disponiveis</h1>
      <ul>
        {quizzes.map((quiz, index) => (
          <Quiz quiz={quiz} deleteQuiz={deleteQuiz} key={index} />
        ))}
      </ul>
    </div>
  );
}
