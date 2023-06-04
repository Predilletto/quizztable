import React, { useState } from "react";
import "./CreateOption.css";
import { OptionProps } from "../Option";

interface Props {
  deleteOption: (idx: number) => void;
  addOption: (text: string, correct: boolean) => void;
  options: Array<OptionProps>;
}

export default function CreateOption(props: Props) {
  const [text, setText] = useState("");
  const [correct, setCorrect] = useState(false);

  function addHandler() {
    props.addOption(text, correct);
    setText("");
    setCorrect(false);
  }

  function removeHandler(idx: number) {
    props.deleteOption(idx);
  }

  const checkStyle = correct ? "correct" : "";

  return (
    <div className="opt-wrapper">
      <h3> Alternativas </h3>
      <ul className="list-wrapper">
        {props.options.map((option, index) => (
          <li
            key={index}
            className={option.correct ? "opt-li correct" : "opt-li"}
          >
            {option.idx} - {option.text}
            <button
              className="btn-li-opt"
              onClick={() => removeHandler(option.idx)}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <div className="opt-wrapper-ipt">
        <input
          type="text"
          placeholder="Option Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button id="add-opt" type="button" onClick={() => addHandler()}>
          +
        </button>
      </div>
      <label className={`check-opt ${checkStyle}`}>
        <input
          className="check-ipt"
          type="checkbox"
          checked={correct}
          onChange={(e) => setCorrect(e.target.checked)}
        />
        {correct ? "YAY !!!" : "Correta?"}
      </label>
    </div>
  );
}
