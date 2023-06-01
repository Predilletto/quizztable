import React from "react";
import { OptionProps } from "../Option";
import "./Question.css";
import EditQuestion from "../EditQuestion/EditQuestion";

export type QuestionProps = {
  idx: number;
  title: string;
  options: Array<OptionProps>;
};

interface Props {
  handleEdit: (idx: number) => void;
  deleteQuestion: (idx: number) => void;
}

export default function Question({
  idx,
  title,
  options,
  handleEdit: editQuestion,
  deleteQuestion,
}: QuestionProps & Props) {
  return (
    <li className="qst-li">
      <p>{title}</p>
      <button className="btn-qst" onClick={() => editQuestion(idx)}>
        edit
      </button>
      <button className="btn-qst" onClick={() => deleteQuestion(idx)}>
        X
      </button>
    </li>
  );
}
