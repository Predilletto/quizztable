import React, { useEffect, useState } from "react";
import { OptionProps } from "../Option";
import CreateOption from "../CreateOption/CreateOption";
import Question from "../Question";
import "./CreateQuestion.css";

interface Props {
  addQuestion: (title: string, options: Array<OptionProps>) => void;
}

export default function CreateQuestion(props: Props) {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<OptionProps[]>([]);
  const [count, setCount] = useState(1);
  function addOption(text: string, correct: boolean) {
    const option: OptionProps = { text, correct };
    setOptions((prevOptions) => [...prevOptions, option]);
  }

  function handleCreate(title: string, options: Array<OptionProps>) {
    props.addQuestion(title, options);
    setTitle("");
    setOptions([]);
    setCount(count + 1);
  }

  useEffect(() => {}, [options]);

  return (
    <div className="qst-wrapper">
      <h3>Questao {count}/10</h3>
      <h3>Titulo:</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <CreateOption addOption={addOption} options={options} />

      <button onClick={() => handleCreate(title, options)}>
        {" "}
        Create Question{" "}
      </button>
    </div>
  );
}
