import React, { useEffect, useState } from "react";
import Match from "../../Components/Match/Match";
import { Level, QuizProps } from "../../Components/Quiz/Quiz";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";

export default function PlayMatch() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<QuizProps>({
    subject: "",
    level: Level.FACIL,
    questions: [],
  });

  useEffect(() => {
    const retrievedQuiz: QuizProps | null = JSON.parse(
      localStorage.getItem("Quiz" + id) || ""
    );
    if (retrievedQuiz) {
      setQuiz(retrievedQuiz);
    }
  });

  return (
    <div>
      <Header />
      <Match quiz={quiz} />{" "}
    </div>
  );
}
