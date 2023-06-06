import React, { useContext, useEffect, useState } from "react";
import { QuestionProps } from "../Question/Question";
import { OptionProps } from "../Option";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./QuestionPaging.css";
import { useNavigate } from "react-router-dom";
import DialogBox from "../DialogBox/DialogBox";

interface QuestionPagingProps {
  questions: Array<QuestionProps>;
}

export default function QuestionPaging({ questions }: QuestionPagingProps) {
  const [changeQuestion, setChangeQuestion] = useState(0);
  const [question, setQuestion] = useState<QuestionProps | null>(null);
  const [active, setActive] = useState("disabled");
  const [countRight, setCountRight] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage(
        `Você acertou ${countRight} questões de ${questions.length} 	\u{1F44C} `
      );
      setShowDialog(true);
    }
  }, [changeQuestion, questions]);

  function nextQuestion() {
    setChangeQuestion(changeQuestion + 1);
    setQuestion(questions[changeQuestion]);
  }

  function handleClose() {
    setShowDialog(false);
    navigate("/home");
  }

  function isCorrect(option: OptionProps) {
    if (questions.length > changeQuestion) {
      if (option.correct) {
        setActive("active");
        toast.success("Correta resposta \u{1F600}", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          setCountRight(countRight + 1);
          setActive("disabled");

          nextQuestion();
        }, 1500);
      } else {
        setActive("active");
        toast.error("Resposta errada \u{1F61E}", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          setActive("disabled");

          nextQuestion();
        }, 1500);
      }
    }
  }

  return (
    <div className="question-wrapper">
      <DialogBox isOpen={showDialog} onClose={handleClose} message={message} />
      <ToastContainer />
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
