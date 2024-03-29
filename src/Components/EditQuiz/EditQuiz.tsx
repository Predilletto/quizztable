import React, { useContext, useEffect, useState } from "react";
import { Level, QuizProps } from "../Quiz/Quiz";
import CreateQuestion from "../CreateQuestion/CreateQuestion";
import Question, { QuestionProps } from "../Question/Question";
import { OptionProps } from "../Option";
import { addQuiz, editQuiz, retrieveQuiz } from "../../utils/Storage";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import EditQuestion from "../EditQuestion/EditQuestion";

import "../CreateQuiz/CreateQuiz.css";
import DialogBox from "../DialogBox/DialogBox";

export default function EditQuiz() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState<Level>(Level.FACIL);
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [showCreate, setShowCreate] = useState("");
  const { id } = useParams() as { id: string };
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [editableQuestion, setEditableQuestion] = useState<QuestionProps>({
    idx: -1,
    title: "",
    options: [],
  });
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
      setSubject(retrievedQuiz.subject);
      setLevel(retrievedQuiz.level);
      setQuestions(retrievedQuiz.questions);
    }
  }

  function handleDialog(message: string) {
    setMessage(message);
    setShowDialog(true);
  }

  function handleClose() {
    setShowDialog(false);
  }

  async function saveQuiz() {
    if (questions.length < 1) {
      handleDialog("Impossível criar um Quiz sem questões D: ");
      return;
    }

    if (subject.length > 5) {
      const quiz: QuizProps = {
        id,
        subject,
        level,
        questions,
        creatorUID: user?.uid,
      };
      await editQuiz(quiz);
      handleDialog("editado com sucesso!");
      navigate("/list-quiz");
    } else {
      handleDialog("Crie um assunto de pelo 5 caracteres");
    }
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
      handleDialog("Termine de editar antes de deletar algo");
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

  function addQuestion(title: string, options: Array<OptionProps>) {
    const idx = questions.length + 1;
    const question: QuestionProps = { title, options, idx };
    setQuestions((prevQuestions) => [...prevQuestions, question]);
    setShowCreate("");
  }

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <div className="quiz-container">
      <DialogBox message={message} isOpen={showDialog} onClose={handleClose} />
      <h1>EDIT SEU QUIZ</h1>
      <h2>Assunto: </h2>
      <input
        className="subject-input"
        type="text"
        value={subject}
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

      <button className="btn-quiz" onClick={() => saveQuiz()}>
        Edit Quiz
      </button>
      <button className="btn-quiz" onClick={() => navigate("/home")}>
        Cancel
      </button>
    </div>
  );
}
