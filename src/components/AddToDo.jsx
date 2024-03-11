import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const AddToDo = ({ create }) => {
  const [post, setPost] = useState({ title: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: "" });
  };

  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="ToDo"
      />
      <MyButton onClick={addNewPost}>Сохранить</MyButton>
    </form>
  );
};

export default AddToDo;
