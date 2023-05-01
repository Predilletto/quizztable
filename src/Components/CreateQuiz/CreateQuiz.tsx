import React, { useState } from "react";
import { Level, QuizProps } from "../Quiz/Quiz";
import CreateQuestion from "../CreateQuestion/CreateQuestion";
import { QuestionProps } from "../Question";
import { OptionProps } from "../Option";

import "./CreateQuiz.css";
import { addQuiz } from "../../utils/Storage";

export default function CreateQuiz() {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState<Level>(Level.FACIL);
  const [questions, setQuestions] = useState<QuestionProps[]>([]);

  function createQuiz(): void {
    const quiz: QuizProps = { subject, level, questions };
    addQuiz(quiz);
    localStorage.setItem(`Quiz${quiz.subject}`, JSON.stringify(quiz));
  }

  function addQuestion(title: string, options: Array<OptionProps>) {
    const question: QuestionProps = { title, options };
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  }

  return (
    <div className="quiz-container">
      <h1>Crie seu Quiz!</h1>
      <h2>Assunto: </h2>
      <input
        className="subject-input"
        type="text"
        placeholder="Sobre qual assunto vamos questionar?..."
        onChange={(e) => setSubject(e.target.value)}
      />
      <h3>Nivel:</h3>
      <div className="radio-wrapper">
        <label htmlFor="facil">
          <input
            id="facil"
            type="radio"
            value={Level.FACIL}
            checked={level === Level.FACIL}
            onChange={() => setLevel(Level.FACIL)}
          />
          <span id="facil">Facil</span>
        </label>
        <label htmlFor="medio">
          <input
            id="medio"
            type="radio"
            value={Level.MEDIO}
            checked={level === Level.MEDIO}
            onChange={() => setLevel(Level.MEDIO)}
          />
          <span id="medio">Médio</span>
        </label>
        <label>
          <input
            type="radio"
            value={Level.DIFICIL}
            checked={level === Level.DIFICIL}
            onChange={() => setLevel(Level.DIFICIL)}
          />
          <span id="dificil">Dificil</span>
        </label>
      </div>

      <CreateQuestion addQuestion={addQuestion} />
      <button className="btn-quiz" onClick={() => createQuiz()}>
        {" "}
        Create Quiz{" "}
      </button>
    </div>
  );
}
