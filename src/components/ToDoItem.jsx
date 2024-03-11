import React from "react";
import MyButton from "./UI/button/MyButton";

const ToDoItem = (props) => {
  return (
    <div className="post">
      <input
        type="checkbox"
        checked={props.post.completed}
        onChange={() => props.setCheckedToDo(props.post)}
      />
      <div
        className={
          props.post.completed ? "todo__content todo_checked" : "todo__content"
        }
      >
        <strong>{props.post.title}</strong>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => props.editToDo(props.post)}>
          Редактировать
        </MyButton>
        <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default ToDoItem;
