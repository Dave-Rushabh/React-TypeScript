import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import TasksList from "./components/TasksList/TasksList";
import { TaskCollection } from "./Type Models/Task";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App = () => {
  const [task, setTask] = useState<string | number>("");
  const [tasks, setTasks] = useState<TaskCollection[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskCollection[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (task) {
      setTasks([...tasks, { id: Date.now(), task: task, isDone: false }]);
      setTask("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    let add;
    let active = tasks;
    let complete = completedTasks;

    if (source.droppableId === "Tasks-List") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "Tasks-List") {
      active.splice(source.index, 0, add);
    } else {
      complete.splice(source.index, 0, add);
    }

    setCompletedTasks(complete);
    setTasks(active);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <span className="heading">Taskify</span>
          <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
          <TasksList
            tasks={tasks}
            setTasks={setTasks}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
        </div>
      </DragDropContext>
    </>
  );
};

export default App;
