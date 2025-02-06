import { useContext } from "react";
import CreatePost from "./CreatePost";
import { PostsContext } from "../store/PostsContext";
import Welcome from "./Welcome";
import Loader from "./Loader";
function PostsList() {
  let { Posts, fetching } = useContext(PostsContext);
  if (fetching) return <Loader></Loader>;
  if (Posts.length == 0) {
    return <Welcome></Welcome>;
  } else {
    return (
      <>
        {Posts.map((Post) => {
          return <CreatePost key={Post.id} Post={Post}></CreatePost>;
        })}
      </>
    );
  }
}
export default PostsList;
