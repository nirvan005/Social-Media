import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NewPost, { createPostAction } from "./components/NewPost.jsx";
import PostsList from "./components/PostsList.jsx";
const router = createBrowserRouter([
  {
    path: "/Social-Media",
    element: <App />,
    children: [
      { path: "/", element: <PostsList /> },
      { path: "/new-post", element: <NewPost />, action: createPostAction },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
