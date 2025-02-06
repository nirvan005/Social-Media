import "./App.css";
import Footer from "./components/Footer";
import HeaderApp from "./components/HeaderApp";
import Sidebar from "./components/Sidebar";
import ContextProvider from "./store/PostsContext";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  let [tab, setTab] = useState("Home");
  const handleTabClick = (newTab) => {
    setTab(newTab);
  };
  return (
    <>
      <ContextProvider tab={tab}>
        <div className="app-container d-flex">
          <Sidebar handleTabClick={handleTabClick}></Sidebar>
          <div className="main-page">
            <HeaderApp></HeaderApp>
            {/* {tab == "Home" ? <PostsList></PostsList> : null}
            {tab == "Create Post" ? <NewPost></NewPost> : null} */}
            <Outlet></Outlet>
            <Footer></Footer>
          </div>
        </div>
      </ContextProvider>
    </>
  );
}

export default App;
