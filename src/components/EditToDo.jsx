import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const EditToDo = ({ edit, postItemTitle }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(postItemTitle);
  }, [postItemTitle]);

  const editToDo = (e) => {
    console.log("postItemTitle " + postItemTitle);
    e.preventDefault();
    edit(title);
    setTitle("");
  };

  return (
    <form>
      <MyInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Edit ToDo"
      />
      <MyButton onClick={editToDo}>Сохранить</MyButton>
    </form>
  );
};

export default EditToDo;
