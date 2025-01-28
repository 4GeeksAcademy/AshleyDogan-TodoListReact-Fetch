import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/index.css";
import { renderToNodeStream } from "react-dom/server";
//create your first component

const Home = () => {
  const [inputValue, setInputValue] = useState("");

  const [todo, setTodo] = useState("");
  return (
    <div className="container justify-content-center">
      <h1>to do list</h1>
      <div className="container bg-light">
        <div className="row">
          <input
            type="text"
            placeholder="What needs to be done?"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onSubmit={(e) => {
              setTodo(todo.concat(e.target.inputValue));
            }}
          ></input>
        </div>
      </div>
      <div>number of tasks</div>
    </div>
  );
};

export default Home;
