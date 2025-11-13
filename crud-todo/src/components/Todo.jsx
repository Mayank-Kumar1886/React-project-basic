import React, { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
   const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved && saved !== "undefined" ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      return [];
    }
  });
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todos.some((todo) => todo.text.toLowerCase() === inputValue.trim())) {
      alert("Task already exists");
      setInputValue("");
    } else {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        checked: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  // Date and Time

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      setDateTime(`${date} - ${time}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id) => {
    return setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClear = () => {
    setTodos([]);
  };

  const handleCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <h2 className="date-time">{dateTime}</h2>
      </header>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="todo-input"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="todo-btn">
              Add Task
            </button>
          </div>
        </form>
      </section>
      <section className="todoList">
        <ul>
          {todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className={`todo-item ${todo.checked ? "completed" : ""}`}
              >
                <span>{todo.text}</span>
                <button
                  className="check-btn"
                  onClick={() => handleCheck(todo.id)}
                >
                  <MdCheck />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(todo.id)}
                >
                  <MdDeleteForever />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="clear-btn" onClick={handleClear}>
        Clear all
      </section>
    </section>
  );
};

export default Todo;
