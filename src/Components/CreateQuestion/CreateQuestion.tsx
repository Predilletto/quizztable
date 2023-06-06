import React, { useEffect, useState } from "react";
import { OptionProps } from "../Option";
import CreateOption from "../CreateOption/CreateOption";
import Question from "../Question/Question";
import "./CreateQuestion.css";
import DialogBox from "../DialogBox/DialogBox";

interface Props {
  addQuestion: (title: string, options: Array<OptionProps>) => void;
}
function CreateQuestion(props: Props) {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<OptionProps[]>([]);
  const [unique, setUnique] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");

  function handleDialog(message: string) {
    setMessage(message);
    setShowDialog(true);
  }

  function handleClose() {
    setShowDialog(false);
  }

  function addOption(text: string, correct: boolean) {
    if (options.length > 4) {
      handleDialog("Apenas 5 opções válidas por questão!");
      return;
    }

    if (text.length < 1) {
      handleDialog("Opções vazias não podem ser adicionadas :(");
      return;
    }
    if (unique && correct) {
      handleDialog("Só uma resposta pode ser certa :D ");
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

  function handleCreate(title: string, options: Array<OptionProps>) {
    if (title.length < 6) {
      handleDialog("A pergunta precisa ter pelo menos 6 caracteres");
      return;
    }

    if (unique) {
      props.addQuestion(title, options);
      setTitle("");
      setOptions([]);
      setUnique(false);
    } else {
      handleDialog("É necessário uma Alternativa correta!");
    }
  }

  useEffect(() => {}, [options]);

  return (
    <div className="qst-wrapper">
      <DialogBox message={message} isOpen={showDialog} onClose={handleClose} />
      <h3>Titulo:</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <CreateOption
        addOption={addOption}
        options={options}
        deleteOption={deleteOption}
      />

      <button onClick={() => handleCreate(title, options)}>
        {" "}
        Create Question{" "}
      </button>
    </div>
  );
}

export default CreateQuestion;
