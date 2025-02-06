import { redirect, Form } from "react-router-dom";
import { useContext, useRef } from "react";
import { PostsContext } from "../store/PostsContext";
function NewPost() {
  const { addPost } = useContext(PostsContext);
  let title = useRef();
  let body = useRef();
  let tags = useRef();
  let userId = useRef();
  const handleSubmit = () => {
    let post = {
      userId: userId.current.value,
      title: title.current.value,
      body: body.current.value,
      tags: tags.current.value.split(" "),
      reactions: {
        likes: 0,
        dislikes: 0,
      },
      views: 0,
    };
    addPost(post);
  };
  return (
    <>
      <Form method="POST" onSubmit={handleSubmit}>
        <div className="mb-3 col-8 mx-auto mt-5">
          <label htmlFor="userID" className="form-label">
            Enter your User ID Here.
          </label>
          <input
            type="text"
            className="form-control"
            id="userID"
            placeholder="User ID"
            name="userId"
            ref={userId}
          />
        </div>
        <div className="mb-3 col-8 mx-auto">
          <label htmlFor="postTitle" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            id="postTitle"
            placeholder="Post Title"
            name="postTitle"
            ref={title}
          />
        </div>
        <div className="mb-3 col-8 mx-auto">
          <label htmlFor="postContent" className="form-label">
            Post Content
          </label>
          <textarea
            className="form-control"
            id="postContent"
            rows="4"
            name="postContent"
            ref={body}
          ></textarea>
        </div>
        <div className="mb-3 col-8 mx-auto">
          <label htmlFor="hashTags" className="form-label">
            HashTags
          </label>
          <textarea
            className="form-control"
            id="hashTags"
            rows="2"
            name="hashTags"
            ref={tags}
          ></textarea>
        </div>
        <div className="row">
          <button
            type="submit"
            className="btn btn-success float-end submit"
            style={{ width: "5rem", marginLeft: "13.5rem" }}
          >
            Post
          </button>
        </div>
      </Form>
    </>
  );
}

export async function createPostAction(data) {
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((post) => (postData["id"] = post.id));
  console.log(postData);
  return redirect("/");
}
export default NewPost;
