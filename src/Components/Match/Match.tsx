import React from "react";
import { QuizProps } from "../Quiz/Quiz";
import QuestionPaging from "../QuestionPaging/QuestionPaging";

import "./Match.css";

interface MatchProps {
  quiz: QuizProps;
}

export default function Match({ quiz }: MatchProps) {
  return (
    <div className="mtch-container">
      <h1>{quiz.subject}</h1>
      <QuestionPaging questions={quiz.questions} />
    </div>
  );
}
