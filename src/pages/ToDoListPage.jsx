import React, { useEffect, useRef, useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/myModal/MyModal";
import AddToDo from "../components/AddToDo";
import ToDoList from "../components/ToDoListComponent";
import Pagination from "../components/UI/pagination/Pagination";
import PosrService from "../API/PostService";
import { useFetching } from "../hooks/useFetch";
import { getPageCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import Loader from "../components/UI/loader/Loader";
import { usePosts } from "../hooks/usePosts";
import PostFilter from "../components/PostFilter";
import MySelect from "../components/UI/select/MySelect";
import EditToDo from "../components/EditToDo";

function ToDoListPage() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
  const [editedPost, setEditedPost] = useState([]);

  const [fetchPost, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PosrService.getAllToDo(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPost(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  const editToDo = (post) => {
    console.log(post);
    setEditedPost(post);
    setEditModal(true);
  };

  const editToDoFunk = (post) => {
    setPosts(
      [...posts].filter((item) => {
        if (item.id === editedPost.id) {
          item.title = post;
        }
        return item;
      })
    );
    setEditModal(false);
  };

  const setCheckedToDo = (post) => {
    setPosts(
      [...posts].filter((item) => {
        if (item.id === post.id) {
          item.completed = !item.completed;
        }
        return item;
      })
    );
  };

  return (
    <div className="todo">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Добавить задачу
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <AddToDo create={createPost} postItemTitle={editedPost.title} />
      </MyModal>
      <MyModal visible={editModal} setVisible={setEditModal}>
        <EditToDo edit={editToDoFunk} />
      </MyModal>
      <hr style={{ margin: "15px 0px" }} />
      {/*       <PostFilter filter={filter} setFilter={setFilter} /> */}
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Количество элементов"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Показать всё" },
        ]}
      />
      {postError && <h1>Произошла ошибка {postError}</h1>}
      <ToDoList
        setCheckedToDo={setCheckedToDo}
        editToDo={editToDo}
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Задачи"
      />
      <div ref={lastElement}></div>
      {isPostLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default ToDoListPage;
