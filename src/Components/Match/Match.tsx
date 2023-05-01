import React from "react";
import { QuizProps } from "../Quiz/Quiz";
import QuestionPaging from "../QuestionPaging/QuestionPaging";

interface MatchProps {
  quiz: QuizProps;
}

export default function Match({ quiz }: MatchProps) {
  return (
    <div>
      <h1>{quiz.subject}</h1>
      <QuestionPaging questions={quiz.questions} />
    </div>
  );
}
