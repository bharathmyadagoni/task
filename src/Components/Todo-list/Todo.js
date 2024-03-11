import React, { useState } from "react";
import classes from "./Todo.module.css";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showOptions, setShowOptions] = useState({});

  const addTask = () => {
    if (title.trim() !== "") {
      if (editIndex !== null) {
        // If editing, update the task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { title, description };
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        // If not editing, add a new task
        setTasks([...tasks, { title, description }]);
      }
      // Clear input fields
      setTitle("");
      setDescription("");
      // Hide options after adding/editing
      setShowOptions(false);
    }
  };

  const editTask = (taskIndex) => {
    const taskToEdit = tasks[taskIndex];
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setEditIndex(taskIndex);
    // Show options after clicking "Edit"
    setShowOptions(taskIndex);
  };
  const editingTask = (index) => {
    setShowOptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    // Hide options after deleting
    setShowOptions((prevState) => {
      const updatedOptions = { ...prevState };
      delete updatedOptions[index];
      return updatedOptions;
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes["text-container"]}>
          <h1 className={classes["first-title"]}>GYIZER</h1>
          <h6 className={classes["second-title"]}>TodoApp</h6>
        </div>
      </div>
      <div className={classes["input-container"]}>
        <div className={classes.inputs}>
          <input
            className={classes.input}
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={classes.input}
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
  <button className={classes["add-button"]} onClick={addTask}>
          {editIndex !== null ? "UPDATE" : "➕"}
        </button>
      </div>
      <div className="p-3">
        <div className={`row p-2 p-md-5 ${classes.tasks}`}>
          {tasks.length < 1 ? (
            <h1 className={classes["Empty-task"]}>No Tasks</h1>
          ) : (
            ""
          )}

          {tasks.map((task, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className={classes["single-task"]}>
                <div>
                  <h6 className={classes["task-title"]}>{task.title}</h6>
                  <p className={classes["task-description"]}>
                    {task.description}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => editingTask(index)}
                    className={classes.info}
                  >
                 <HiOutlineInformationCircle/>
                  </button>
                  {showOptions[index] && (
                    <div>
                      <button
                        className={classes.edit}
                        onClick={() => editTask(index)}
                      >
                        <TbEdit />
                      </button>
                      <button
                        className={classes.delete}
                        onClick={() => deleteTask(index)}
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
