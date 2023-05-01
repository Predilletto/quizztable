import React from "react";

export type OptionProps = { text: string; correct: boolean };
function Option(option: OptionProps) {
  return (
    <div className="opcao">
      <p>{option.text}</p>
    </div>
  );
}

export default Option;
