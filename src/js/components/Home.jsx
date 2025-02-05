import React, { useState } from "react";

//include images into your bundl
import "../../styles/index.css";
//create your first component

const Home = () => {
  const [inputValue, setInputValue] = useState("");

  const [todo, setTodo] = useState([]);

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
