import React from "react";
import ToDoItem from "./ToDoItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ToDoListComponent = ({
  posts,
  title,
  remove,
  setCheckedToDo,
  editToDo,
}) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Задачи не найдены!</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <ToDoItem
              setCheckedToDo={setCheckedToDo}
              editToDo={editToDo}
              remove={remove}
              post={post}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ToDoListComponent;
