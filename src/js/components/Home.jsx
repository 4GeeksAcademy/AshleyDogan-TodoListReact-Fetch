import React, { useState } from "react";

//include images into your bundl
import "../../styles/index.css";
//create your first component

const Home = () => {
  const [inputValue, setInputValue] = useState("");

  const [todo, setTodo] = useState([]);

  return (
    <div className="container justify-content-center">
      <h1>to do list</h1>
      <ul>
        <li>
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
        </li>
        {todo.map((item, index) => (
          <li>
            {item}{" "}
            <i
              class="fa-solid fa-x"
              onClick={() =>
                setTodo(todo.filter((t, currentIndex) => index != currentIndex))
              }
            ></i>
          </li>
        ))}
        <li>{todo.length !== 0 ? "" : "no task - add a task"}</li>
      </ul>
    </div>
  );
};

export default Home;
