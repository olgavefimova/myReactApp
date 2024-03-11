import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import ToDoList from "../pages/ToDoListPage";

export const privateRoutes = [
  { path: "/about", component: <About /> },
  { path: "*", component: <Posts /> },
  { path: "/posts/:id", component: <PostIdPage /> },
  { path: "/todo", component: <ToDoList /> },
];

export const publicRoutes = [{ path: "*", component: <Login /> }];
