import React, { useEffect, useState } from "react";
import { QuestionProps } from "../Question";
import { OptionProps } from "../Option";

interface QuestionPagingProps {
  questions: Array<QuestionProps>;
}

export default function QuestionPaging({ questions }: QuestionPagingProps) {
  const [changeQuestion, setChangeQuestion] = useState(0);
  const [question, setQuestion] = useState<QuestionProps | null>(null);

  useEffect(() => {
    if (questions.length > 0) {
      setQuestion(questions[0]);
    }
  }, []);

  useEffect(() => {
    if (changeQuestion < questions.length) {
      setQuestion(questions[changeQuestion]);
    }
  }, [changeQuestion, questions]);

  function nextQuestion() {
    setChangeQuestion(changeQuestion + 1);
    setQuestion(questions[changeQuestion]);
  }

  function isCorrect(option: OptionProps) {
    if (option.correct && questions.length > changeQuestion) {
      alert("correct");
      nextQuestion();
    }
  }

  return (
    <div>
      {question ? (
        <>
          <h2>{question.title}</h2>
          <ul>
            {question.options.map((option, index) => (
              <li onClick={() => isCorrect(option)} key={index}>
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
