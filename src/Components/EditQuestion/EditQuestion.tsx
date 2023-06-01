import React, { useEffect, useState } from "react";
import { OptionProps } from "../Option";
import CreateOption from "../CreateOption/CreateOption";
import Question, { QuestionProps } from "../Question/Question";
import "../CreateQuestion/CreateQuestion.css";

interface Props {
  question: QuestionProps;
  saveQuestion: (
    title: string,
    options: Array<OptionProps>,
    idx: number
  ) => void;
}

export default function EditQuestion(props: Props) {
  const [idx, setIdx] = useState(props.question.idx);
  const [title, setTitle] = useState(props.question.title);
  const [options, setOptions] = useState<OptionProps[]>(props.question.options);
  const [unique, setUnique] = useState(true);

  function addOption(text: string, correct: boolean) {
    if (options.length > 4) {
      alert("Apenas 5 opções válidas por questão!");
      return;
    }

    if (text.length < 1) {
      alert("Opções vazias não podem ser adicionadas :(");
      return;
    }
    if (unique && correct) {
      alert("Só uma resposta pode ser certa :D ");
      return;
    }
    if (correct) {
      setUnique(true);
    }
    const idx = options.length + 1;
    const option: OptionProps = { text, correct, idx };
    setOptions((prevOptions) => [...prevOptions, option]);
  }

  function deleteOption(idx: number) {
    const removedOption = options.find((option) => option.idx === idx);
    const newOptions = options.filter((option) => option.idx !== idx);
    const updatedOptions = newOptions.map((option, index) => ({
      ...option,
      idx: index + 1,
    }));

    if (removedOption?.correct) {
      setUnique(false);
    }

    setOptions(updatedOptions);
  }

  function handleEdit(title: string, options: Array<OptionProps>, idx: number) {
    if (title.length < 6) {
      alert("A pergunta precisa ter pelo menos 6 caracteres");
      return;
    }

    if (unique) {
      props.saveQuestion(title, options, idx);
      setTitle("");
      setOptions([]);
      setUnique(false);
    } else {
      alert("É necessário uma Alternativa correta!");
    }
  }

  useEffect(() => {}, [options]);

  return (
    <div className="qst-wrapper">
      <h3>Titulo:</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <CreateOption
        addOption={addOption}
        options={options}
        deleteOption={deleteOption}
      />

      <button onClick={() => handleEdit(title, options, idx)}>
        {" "}
        Edit Question{" "}
      </button>
    </div>
  );
}
