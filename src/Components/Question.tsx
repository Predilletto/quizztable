import React from "react";
import Option, { OptionProps } from "./Option";

export type QuestionProps = {
  title: string;
  options: Array<OptionProps>;
};

export default function Question({ title, options }: QuestionProps) {
  return (
    <div>
      <p>Titulo: {title} </p>
      {options.map((option, index) => (
        <Option key={index} text={option.text} correct={option.correct} />
      ))}
    </div>
  );
}
