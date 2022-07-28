import React from "react";
import "./InputField.css";

const InputField = () => {
  return (
    <>
      <form className="input">
        <input
          type="text"
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
