/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";

const Task = ({
  taskId,
  taskName,
  taskPriority,
  taskCompleted,
  CompleteTask,
  UncompleteTask,
  DeleteTask,
  EditTask,
}) => {
  const handleChecked = (e) => {
    const Task = {
      id: taskId,
      name: taskName,
      priority: taskPriority,
      completed: taskCompleted,
    };
    if (taskCompleted) {
      UncompleteTask(Task);
    } else {
      CompleteTask(Task);
    }
  };
  return (
    <div className={[taskPriority, "TaskElement", taskCompleted].join(" ")}>
      <input
        type="checkbox"
        checked={taskCompleted}
        onChange={(e) => handleChecked(e)}
      />
      <p>{taskName}</p>
      {taskCompleted ? null : (
        <button
          onClick={() =>
            EditTask({
              id: taskId,
              name: taskName,
              priority: taskPriority,
              completed: taskCompleted,
            })
          }
        >
          Edit
        </button>
      )}
      <button
        onClick={() =>
          DeleteTask({
            id: taskId,
            name: taskName,
            priority: taskPriority,
            completed: taskCompleted,
          })
        }
      >
        Delete
      </button>
    </div>
  );
};

const TaskFrom = ({ AddTask, EditTask, taskToEdit, setTaskToEdit, clear }) => {
  const [Task, setTask] = useState({
    name: "",
    priority: "Low",
    id: null,
    completed: false,
  });

  const [selectedPriority, setSelectedPriority] = useState(Task.priority);

  useEffect(() => {
    setSelectedPriority(Task.priority);
  }, [Task]);

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({
        name: "",
        priority: "Low",
        id: null,
        completed: false,
      });
    }
  }, [taskToEdit]);

  const reset = () => {
    setTaskToEdit(null);
    setTask({
      name: "",
      priority: "Low",
      id: null,
      completed: false,
    });
  };

  const handleChange = (e) => {
    setTask({
      ...Task,
      [e.target.name]: e.target.value,
    });
  };
  const handleAdd = (e) => {
    if (Task.id === null) {
      AddTask(Task);
      reset();
    } else {
      EditTask(Task);
      reset();
    }
  };
  return (
    <div className="TaskForm">
      <input
        type="text"
        placeholder="Task Name"
        name="name"
        value={Task.name}
        onChange={(e) => handleChange(e)}
      />
      <select
        name="priority"
        value={selectedPriority}
        onChange={(e) => handleChange(e)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={(e) => handleAdd(e)}>Add</button>
      <button id="Reset" onClick={() => reset()}>
        Reset
      </button>
      <button onClick={() => clear()}>Clear</button>
    </div>
  );
};

const TasksContainer = ({
  tasks,
  CompleteTask,
  UncompleteTask,
  DeleteTask,
  EditTask,
}) => {
  return (
    <div className="TaskContainer">
      {tasks.map((task) => (
        <Task
          key={task.id}
          taskId={task.id}
          taskName={task.name}
          taskPriority={task.priority}
          taskCompleted={task.completed}
          CompleteTask={CompleteTask}
          UncompleteTask={UncompleteTask}
          DeleteTask={DeleteTask}
          EditTask={EditTask}
        />
      ))}
    </div>
  );
};

export const TaskList = () => {
  const [CompletedTasks, setCompletedTasks] = useState(
    localStorage.getItem("TaskItems")
      ? JSON.parse(localStorage.getItem("TaskItems")).CompletedTasks
      : []
  );
  const [UncompletedTasks, setUncompletedTasks] = useState(
    localStorage.getItem("TaskItems")
      ? JSON.parse(localStorage.getItem("TaskItems")).UncompletedTasks
      : []
  );
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const TaskItems = JSON.parse(localStorage.getItem("TaskItems"));
    if (TaskItems) {
      setCompletedTasks(TaskItems.CompletedTasks);
      setUncompletedTasks(TaskItems.UncompletedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "TaskItems",
      JSON.stringify({
        CompletedTasks,
        UncompletedTasks,
      })
    );
  }, [CompletedTasks, UncompletedTasks]);

  const AddTask = (task) => {
    task.id = new Date().getTime();
    console.log(task);
    setUncompletedTasks([...UncompletedTasks, task]);
  };

  const CompleteTask = (task) => {
    setUncompletedTasks(UncompletedTasks.filter((t) => t.id !== task.id));
    task.completed = true;
    setCompletedTasks([...CompletedTasks, task]);
  };

  const UncompleteTask = (task) => {
    setCompletedTasks(CompletedTasks.filter((t) => t.id !== task.id));
    task.completed = false;
    setUncompletedTasks([...UncompletedTasks, task]);
  };

  const EditTask = (task) => {
    if (task.completed) {
      setCompletedTasks(
        CompletedTasks.map((t) => (task.id == t.id ? task : t))
      );
    } else {
      setUncompletedTasks(
        UncompletedTasks.map((t) => (task.id == t.id ? task : t))
      );
    }
  };

  const DeleteTask = (task) => {
    const isDeleted = confirm("Are you sure you want to delete this task?");
    if (isDeleted) {
      if (task.completed) {
        setCompletedTasks(CompletedTasks.filter((t) => t.id !== task.id));
      } else {
        setUncompletedTasks(UncompletedTasks.filter((t) => t.id !== task.id));
      }
    }
  };

  const Clear = () => {
    const isCleared = confirm("Are you sure you want to clear all tasks?");
    if (isCleared) {
      setCompletedTasks([]);
      setUncompletedTasks([]);
    }
  };

  return (
    <section className="App">
      <h3>ToDo List</h3>
      <h4>Create a task and add a priority</h4>
      <TaskFrom
        AddTask={AddTask}
        EditTask={EditTask}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
        clear={Clear}
      />
      <hr />
      <h4>ToDo</h4>
      {UncompletedTasks.length > 0 ? (
        <TasksContainer
          tasks={UncompletedTasks}
          CompleteTask={CompleteTask}
          DeleteTask={DeleteTask}
          EditTask={setTaskToEdit}
        />
      ) : (
        <h5>No Task ToDo</h5>
      )}
      <hr />
      <h4>Completed</h4>
      {CompletedTasks.length > 0 ? (
        <TasksContainer
          tasks={CompletedTasks}
          UncompleteTask={UncompleteTask}
          DeleteTask={DeleteTask}
          EditTask={setTaskToEdit}
        />
      ) : (
        <h5>No Task Completed</h5>
      )}
    </section>
  );
};
