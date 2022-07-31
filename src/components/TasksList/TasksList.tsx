import React from "react";
import "./TasksList.css";
import { TaskCollection } from "../../Type Models/Task";
import TaskWidget from "../TaskWidget/TaskWidget";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  tasks: TaskCollection[];
  setTasks: React.Dispatch<React.SetStateAction<TaskCollection[]>>;
  completedTasks: TaskCollection[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<TaskCollection[]>>;
}

const TasksList = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="Tasks-List">
        {(provided, snapshot) => (
          <div
            className={`tasks ${snapshot.isDraggingOver ? "drag-active" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks__heading">Active Tasks</span>
            {tasks.map((task, index) => (
              <TaskWidget
                index={index}
                key={task.id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="Tasks-List-Completed">
        {(provided, snapshot) => (
          <div
            className={`tasks complete ${
              snapshot.isDraggingOver ? "drag-complete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks__heading">Completed Tasks</span>
            {completedTasks.map((task, index) => (
              <TaskWidget
                index={index}
                key={task.id}
                task={task}
                tasks={completedTasks}
                setTasks={setCompletedTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TasksList;
