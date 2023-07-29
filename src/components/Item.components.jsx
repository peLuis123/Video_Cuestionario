import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/item.css";

function TodoItem(props) {
  const [triangleClicked, setTriangleClicked] = useState(false);

  const handleTriangleClick = () => {
    setTriangleClicked(!triangleClicked);
  };

  return (
    <div className="TodoItem">
      <div className="TodoItem-top">
        <Link to={`/questions/camara/${props.text}`} target="_self">
          <div className="play-button" onClick={handleTriangleClick}>
            <div className="triangle"></div>
          </div>
        </Link>
      </div>
      <div className="TodoItem-content">
        <p
          className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}
        >
          {props.text}
        </p>
      </div>
    </div>
  );
}

export { TodoItem };
