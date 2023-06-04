import React, { useContext, useEffect, useState } from "react";
import { QuestionProps } from "../Question/Question";
import { OptionProps } from "../Option";

import "./QuestionPaging.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

interface QuestionPagingProps {
  questions: Array<QuestionProps>;
}

export default function QuestionPaging({ questions }: QuestionPagingProps) {
  const [changeQuestion, setChangeQuestion] = useState(0);
  const [question, setQuestion] = useState<QuestionProps | null>(null);
  const [active, setActive] = useState("disabled");
  const [countRight, setCountRight] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length > 0) {
      setQuestion(questions[0]);
    }
  }, [questions]);

  useEffect(() => {
    if (changeQuestion < questions.length) {
      setQuestion(questions[changeQuestion]);
    } else if (questions.length > 0 && changeQuestion === questions.length) {
      alert(`s Você acertou ${countRight} questões de ${questions.length}`);

      navigate("/home");
    }
  }, [changeQuestion, questions]);

  function nextQuestion() {
    setChangeQuestion(changeQuestion + 1);
    setQuestion(questions[changeQuestion]);
  }

  function isCorrect(option: OptionProps) {
    if (questions.length > changeQuestion) {
      if (option.correct) {
        setActive("active");
        setTimeout(() => {
          setCountRight(countRight + 1);
          setActive("disabled");
          alert("correct :D");
          nextQuestion();
        }, 500);
      } else {
        setActive("active");
        setTimeout(() => {
          setActive("disabled");
          alert("failed :D");
          nextQuestion();
        }, 500);
      }
    }
  }

  return (
    <div className="question-wrapper">
      {question ? (
        <>
          <h2>{question.title}</h2>
          <ul className="selector-wrapper">
            {question.options.map((option, index) => (
              <li
                className={`selection ${
                  option.correct ? "correct-opt" : "incorrect-opt"
                } ${active}`}
                onClick={() => isCorrect(option)}
                key={index}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
