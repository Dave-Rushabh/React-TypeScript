import React, { useState, useRef, useEffect } from "react";
import "./TaskWidget.css";
import { TaskCollection } from "../../Type Models/Task";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  task: TaskCollection;
  tasks: TaskCollection[];
  setTasks: React.Dispatch<React.SetStateAction<TaskCollection[]>>;
  index: number;
};

const TaskWidget = ({ task, tasks, setTasks, index }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string | number>(task.task);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        } else {
          return task;
        }
      })
    );
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (event: React.FormEvent, id: number) => {
    event.preventDefault();
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, task: editTask };
        } else {
          return task;
        }
      })
    );
    setEditMode(!editMode);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided, snapshot) => (
          <form
            ref={provided.innerRef}
            className={`tasks__single ${snapshot.isDragging ? "drag" : ""}`}
            onSubmit={(event) => handleEdit(event, task.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {editMode ? (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  value={editTask}
                  onChange={(event) => setEditTask(event.target.value)}
                  className="tasks__single--edit"
                />
              </>
            ) : (
              <>
                {task.isDone ? (
                  <s className="tasks__single--text">{task.task}</s> // <s> tag is a strike through tag
                ) : (
                  <span className="tasks__single--text">{task.task}</span>
                )}
              </>
            )}

            <div className="icons">
              <span
                className="icon"
                onClick={() => {
                  if (!editMode && !task.isDone) {
                    setEditMode(!editMode);
                  }
                }}
              >
                <AiFillEdit />
              </span>
              <span className="icon" onClick={() => handleDelete(task.id)}>
                <AiTwotoneDelete />
              </span>
              <span className="icon" onClick={() => handleDone(task.id)}>
                <MdDone />
              </span>
            </div>
          </form>
        )}
      </Draggable>
    </>
  );
};

export default TaskWidget;
