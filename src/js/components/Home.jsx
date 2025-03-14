import React, { useEffect, useState } from "react";

import "../../styles/index.css";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);

  async function createTodoList() {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await fetch(
      "https://playground.4geeks.com/todo/users/ashdogan",
      options
    );
    if (response.status !== 201) {
      alert("your todo list was not successfully created");
    } else {
      fetchTasks();
    }
  }

  const fetchTasks = async () => {
    let response = await fetch(
      "https://playground.4geeks.com/todo/users/ashdogan"
    );
    if (response.status === 404) {
      createTodoList();
    } else if (response.status === 200) {
      let data = await response.json();
      setTodo(data.todos);
    } else {
      alert("Your Todos are temporaily unavailable, please try again later");
    }
  };

  const addTask = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTask = { label: inputValue, done: false };

      fetch("https://playground.4geeks.com/todo/todos/ashdogan", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.id) {
            setTodo([...todo, data]);
          }
          setInputValue("");
        })
        .catch((error) => console.error(error));
    }
  };

  const deleteTask = async (taskId) => {
    try {
      let response = await fetch(
        `https://playground.4geeks.com/todo/todos/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 204) {
        throw new Error("Error deleting task");
      } else {
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearUser = () => {
    fetch(`https://playground.4geeks.com/todo/users/ashdogan`, {
      method: "DELETE",
    })
      .then(() => setTodo([]))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
                addTask(e);
              }
            }}
            placeholder="What needs to be done?"
          ></input>
        </div>
        {todo.map((task, index) => (
          <div className="inline-row" key={index}>
            <div id="hoverText">
              {task.label}{" "}
              <div id="hidden">
                <i
                  className="fa-solid fa-x"
                  onClick={() => deleteTask(task.id)}
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
