import { MdDelete } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { useContext, useState } from "react";
import { PostsContext } from "../store/PostsContext";
import { SlDislike } from "react-icons/sl";
import { FaEye } from "react-icons/fa";
function CreatePost({ Post }) {
  let { deletePost } = useContext(PostsContext);
  const handleonClick = () => {
    deletePost(Post.id);
  };
  let l = 0,
    d = 0;
  const handleLikes = () => {
    if (l == 0) {
      l = 1;
      setLikes(++likes);
    } else {
      l = 0;
      setLikes(--likes);
    }
  };
  const handleDisLikes = () => {
    if (d == 0) {
      d = 1;
      setDisLikes(++dislikes);
    } else {
      d = 0;
      setLikes(--dislikes);
    }
  };
  let [likes, setLikes] = useState(Post.reactions.likes);
  let [dislikes, setDisLikes] = useState(Post.reactions.dislikes);
  let views = Post.views;
  return (
    <>
      <div className="card mt-4 mb-2 mx-auto" style={{ width: "36rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {Post.title}
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              onClick={handleonClick}
            >
              <MdDelete />
            </span>
          </h5>
          <p className="card-text">{Post.body}</p>
          {Post.tags.map((tag) => (
            <span
              key={tag}
              className="hashTags badge text-bg-primary rounded-pill mx-2 mb-2"
            >
              {"#" + tag}
            </span>
          ))}
          <br />
          <span className="like me-3" onClick={handleLikes}>
            <AiOutlineLike /> {likes}{" "}
          </span>
          <span className="share me-3" onClick={handleDisLikes}>
            <SlDislike /> {dislikes}{" "}
          </span>
          <span className="comment me-3">
            <FaEye /> {views}{" "}
          </span>
        </div>
      </div>
    </>
  );
}
export default CreatePost;
