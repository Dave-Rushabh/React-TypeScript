import React, { useRef } from "react";
import "./InputField.css";

interface Props {
  task: string | number;
  setTask: React.Dispatch<React.SetStateAction<string | number>>;
  handleAdd: (event: React.FormEvent) => void;
}

const InputField = ({ task, setTask, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        className="input"
        onSubmit={(event) => {
          handleAdd(event);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          className="input__box"
          placeholder="Enter new task"
        />
        <button className="input_submit" type="submit">
          Go
        </button>
      </form>
    </>
  );
};

export default InputField;
