import React, { useEffect, useState } from "react";
import Match from "../../Components/Match/Match";
import { Level, QuizProps } from "../../Components/Quiz/Quiz";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { retrieveQuiz } from "../../utils/Storage";

import "./PlayMatch.css";

export default function PlayMatch() {
  const { id } = useParams() as { id: string };
  const [quiz, setQuiz] = useState<QuizProps>({
    subject: "",
    level: Level.FACIL,
    questions: [],
    creatorUID: "",
  });

  async function getQuiz() {
    const retrievedQuiz: QuizProps | undefined = await retrieveQuiz(id);
    if (retrievedQuiz) {
      setQuiz(retrievedQuiz);
    }
  }

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <div className="mtchpage-container">
      <Header />
      <div className="mtchplay-wrapper">
        <Match quiz={quiz} />{" "}
      </div>
    </div>
  );
}
