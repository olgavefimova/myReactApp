import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const EditToDo = ({ edit, postItemTitle }) => {
  const [post, setPost] = useState({ title: "" });

  const editToDo = (e) => {
    console.log(post.title);
    console.log(postItemTitle);
    e.preventDefault();
    edit(post.title);
    setPost({ title: "" });
  };

  return (
    <form>
      <MyInput
        value={postItemTitle ? postItemTitle : post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="ToDo"
      />
      <MyButton onClick={editToDo}>Сохранить</MyButton>
    </form>
  );
};

export default EditToDo;
