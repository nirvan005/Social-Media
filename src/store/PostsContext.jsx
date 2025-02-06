import { createContext, useEffect, useReducer, useState } from "react";
export const PostsContext = createContext({
  tab: "",
  fetching: true,
  Posts: [],
  addPost: () => {},
  deletePost: () => {},
});
function ContextProvider({ children, tab }) {
  let [fetching, setFetching] = useState(true);
  const reducerFunction = (currState, action) => {
    let newState = currState;
    if (action.type == "DELETE_POST") {
      newState = currState.filter((post) => {
        return post.id != action.payload.id;
      });
    } else if (action.type == "ADD_POST") {
      newState = [action.payload, ...currState];
    } else if (action.type == "FETCH_POSTS") {
      newState = action.payload;
    }
    return newState;
  };
  const addPost = (Post) => {
    let newAction = {
      type: "ADD_POST",
      payload: Post,
    };
    dispatchPosts(newAction);
  };
  const deletePost = (postId) => {
    let newAction = {
      type: "DELETE_POST",
      payload: { id: postId },
    };
    dispatchPosts(newAction);
  };
  const fetchPost = (posts) => {
    let newAction = {
      type: "FETCH_POSTS",
      payload: posts,
    };
    dispatchPosts(newAction);
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", signal)
      .then((res) => res.json())
      .then((data) => {
        fetchPost(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);
  let [Posts, dispatchPosts] = useReducer(reducerFunction, []);
  return (
    <PostsContext.Provider
      value={{ tab, fetching, Posts, addPost, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
}
export default ContextProvider;
