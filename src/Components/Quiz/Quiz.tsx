import React from "react";
import { QuestionProps as QuestionProps } from "../Question";

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
};

function Quiz({ subject: subject, level: level, questions }: QuizProps) {
  return (
    <div>
      <p> Genero: {subject} </p>
      <p> Nivel: {level} </p>
      {questions.map((question) => (
        <ul key={question.title}>
          {question.title}
          {question.options.map((option) => (
            <li key={option.text}>{option.text}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default Quiz;
