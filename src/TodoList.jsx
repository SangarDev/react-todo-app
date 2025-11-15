import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

export default function TodoList() {
  // State to hold all todos
  const [todos, setTodos] = useState([{ task: "Example", id: uuidv4() }]);

  // State for new task input
  const [newTodo, setNewTodo] = useState("");

  // Add a new task
  const addNewTask = () => {
    if (newTodo.trim() === "") return; // prevent empty tasks
    const newTask = { task: newTodo.trim(), id: uuidv4() };
    setTodos((prevTodos) => [...prevTodos, newTask]);
    setNewTodo(""); // clear input
  };

  // Update input value
  const updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  // Delete a task
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Update a single task
  const updateOne = (id) => {
    const updatedTask = prompt("Enter new task:");
    if (updatedTask && updatedTask.trim() !== "") {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, task: updatedTask.trim() } : todo
        )
      );
    }
  };

  
  // Convert all tasks to uppercase
  const convertAllToUpperCase = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, task: todo.task.toUpperCase() }))
    );
  };

  return (
    <div className="todo-container">
      <h2>My Todo List</h2>

      {/* Input and add button */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button onClick={addNewTask}>Add Task</button>
        <button onClick={convertAllToUpperCase} style={{ marginLeft: "10px" }}>
          Uppercase All
        </button>
      </div>

      <hr />

      {/* Task List */}
      <h3>Tasks</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.task}</span>
            <div>
              <button className="update-btn" onClick={() => updateOne(todo.id)}>
                Update One
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                style={{ marginLeft: "5px" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="footer">Made by Sangar Khan</p>
    </div>
  );
}
