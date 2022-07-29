import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import { TaskCollection } from "./Type Models/Task";

const App = () => {
  const [task, setTask] = useState<string | number>("");
  const [tasks, setTasks] = useState<TaskCollection[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (task) {
      setTasks([...tasks, { id: Date.now(), task: task, isDone: false }]);
      setTask("");
    }
  };

  console.log({ tasks });
  return (
    <>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
      </div>
    </>
  );
};

export default App;
