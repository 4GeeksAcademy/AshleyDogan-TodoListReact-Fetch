import React, { useEffect, useState } from "react";

import "../../styles/index.css";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/todo/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: ");
        }
        return response.json();
      })
      .then((data) => setTodo(data))
      .catch((error) => console.error(error));
  }, []);

  const addTask = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTask = { label: inputValue, done: false };

      fetch("https://playground.4geeks.com/apis/todo/", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          setTodo([...todo, data]);
          setInputValue("");
        })
        .catch((error) => console.error(error));
    }
  };

  const deleteTask = (taskId) => {
    fetch(`https://playground.4geeks.com/apis/todo/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting task");
        }
        return response.json();
      })
      .then(() => {
        setTodo(todo.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error(error));
  };

  const clearTasks = () => {
    Promise.all(
      todo.map((task) =>
        fetch(`https://playground.4geeks.com/apis/todo/${task.id}`, {
          method: "DELETE",
        })
      )
    )
      .then(() => setTodo([]))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container col-sm-7">
      <h1>to do list</h1>
      <div className="todoList">
        <div className="inline-row">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setTodo(todo.concat(inputValue));
                setInputValue("");
              }
            }}
            placeholder="What needs to be done?"
          ></input>
        </div>
        {todo.map((item, index) => (
          <div className="inline-row">
            <div id="hoverText">
              {item}{" "}
              <div id="hidden">
                <i
                  class="fa-solid fa-x"
                  onClick={() =>
                    setTodo(
                      todo.filter((t, currentIndex) => index != currentIndex)
                    )
                  }
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        {todo.length !== 0 ? "" : "no tasks - add a task"}
      </div>
    </div>
  );
};

export default Home;
