import { useMemo } from "react";

export const useSortedTodo = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort === "all" || sort === "") {
      return posts;
    } else {
      return [...posts].filter(
        (data) => data.completed === (sort.toLowerCase() === "true")
      );
    }
  }, [sort, posts]);

  return sortedPosts;
};

export const useToDo = (posts, sort, query) => {
  const sortedPosts = useSortedTodo(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};
