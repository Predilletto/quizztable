import React, { useContext, useRef, useState } from "react";
import { Level, QuizProps } from "../Quiz/Quiz";
import CreateQuestion from "../CreateQuestion/CreateQuestion";
import Question, { QuestionProps } from "../Question/Question";
import { OptionProps } from "../Option";
import { addQuiz } from "../../utils/Storage";
import { useNavigate } from "react-router-dom";

import "./CreateQuiz.css";
import { AuthContext } from "../../Contexts/AuthContext";
import EditQuestion from "../EditQuestion/EditQuestion";

export default function CreateQuiz() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState<Level>(Level.FACIL);
  const [editableQuestion, setEditableQuestion] = useState<QuestionProps>({
    idx: -1,
    title: "",
    options: [],
  });
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [showCreate, setShowCreate] = useState("");
  const createQuestionRef = useRef<HTMLDivElement>(null);

  async function createQuiz() {
    if (questions.length < 1) {
      alert("Impossível criar um Quiz sem questões D: ");
      return;
    }

    if (subject.length > 5) {
      const quiz: QuizProps = {
        subject,
        level,
        questions,
        creatorUID: user?.uid,
      };
      await addQuiz(quiz);
      navigate("/list-quiz");
    } else {
      alert("Crie um assunto de pelo 5 caracteres");
    }
  }

  function addQuestion(title: string, options: Array<OptionProps>) {
    const idx = questions.length + 1;
    const question: QuestionProps = { title, options, idx };
    setQuestions((prevQuestions) => [...prevQuestions, question]);
    setShowCreate("");
  }

  function handleEdit(idx: number) {
    console.log(idx);
    const question = questions.find((q) => q.idx === idx);
    if (question) {
      setEditableQuestion(question);
      setShowCreate("edit");
    }
  }

  function editQuestion(
    title: string,
    options: Array<OptionProps>,
    idx: number
  ) {
    const updatedQuestion: QuestionProps = {
      title,
      options,
      idx,
    };
    questions[idx - 1] = updatedQuestion;
    setQuestions([...questions]);
    setShowCreate("");
  }

  function deleteQuestions(idx: number) {
    if (showCreate === "edit") {
      alert("Termine de editar antes de deletar algo");
      return;
    }
    const newQuestions = questions.filter((question) => question.idx !== idx);
    const updatedQuestions = newQuestions.map((question, index) => ({
      ...question,
      idx: index + 1,
    }));
    setQuestions(updatedQuestions);
  }
  function handleShow() {
    setShowCreate("add");
  }

  function viewerComponent() {
    switch (showCreate) {
      case "add":
        return <CreateQuestion addQuestion={addQuestion} />;
      case "edit":
        return (
          <EditQuestion
            question={editableQuestion}
            saveQuestion={editQuestion}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="quiz-container">
      <h1>CRIE SEU QUIZ!</h1>
      <h2>Assunto: </h2>
      <input
        className="subject-input"
        type="text"
        placeholder="Sobre qual assunto vamos questionar?..."
        onChange={(e) => setSubject(e.target.value)}
      />
      <h3>Nível:</h3>
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
      <h3> Questões </h3>
      <ul className="qst-ul">
        {questions.length < 1 && !showCreate ? (
          <li>
            <h4>Nenhuma questão ainda</h4>
          </li>
        ) : (
          questions.map((question, index) => (
            <Question
              key={index}
              idx={question.idx}
              title={question.title}
              options={question.options}
              handleEdit={handleEdit}
              deleteQuestion={deleteQuestions}
            />
          ))
        )}
      </ul>
      {showCreate !== "add" ? (
        <button className="btn-quiz-add" onClick={handleShow}>
          +
        </button>
      ) : null}
      {viewerComponent()}

      <button className="btn-quiz" onClick={() => createQuiz()}>
        {" "}
        Create Quiz{" "}
      </button>
      <button className="btn-quiz" onClick={() => navigate("/home")}>
        Cancel
      </button>
    </div>
  );
}
