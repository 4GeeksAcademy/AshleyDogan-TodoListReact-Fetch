import React, { useEffect, useState } from "react";

import "../../styles/index.css";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);

  // useEffect(() => {
  //   fetch("https://playground.4geeks.com/todo/users/ashdogan")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Error: ");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => setTodo(data))
  //     .catch((error) => console.error(error));
  // }, []);
  useEffect(() => {
    // const fetchTasks = () => {
    fetch("https://playground.4geeks.com/todo/users/ashdogan")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data.todos)) {
          setTodo(data.todos);
        } else {
          setTodo([]);
        }
      })
      .catch((error) => console.error(error));
  }, []);
//   fetchTasks(); 
// }, [todo]);

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

  const deleteTask = (taskId) => {
    fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting task");
        }
        return response.json();
      })
      .then(() => {

        fetch("https://playground.4geeks.com/todo/users/ashdogan")
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data.todos)) {
              setTodo(data.todos);
            } else {
              setTodo([]);
            }
          })
          .catch((error) => console.error("Error fetching updated list:", error));
      })
      .catch((error) => console.error(error));
  };
  const clearUser = () => {
    fetch(`https://playground.4geeks.com/todo/users/ashdogan`, {
      method: "DELETE",
    })
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
