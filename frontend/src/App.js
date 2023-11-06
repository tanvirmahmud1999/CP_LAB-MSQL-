import React, { Component } from "react";
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./res/Nav/Nav";
import CFstat from "./res/CFStat/CFStat";
import Registratration from "./Registration/Registration";
import MentorRegistration from "./MentorRegistration/MentorRegistration";
import CFViz from "./CFViz/CFViz";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import CreatePost from "./Createpost/CreatePost";
import PostList from "./PostList/PostList";
import Post from "./Post/Post";
import ContestList from "./ContestList/ContestList";
import Users from "./Users/Users";
import Contest from "./Contest/Contest";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/profile" element={<Profile></Profile>} />
            <Route
              path="/registration"
              element={<Registratration></Registratration>}
            />
            <Route
              path="/registration/admin"
              element={<MentorRegistration></MentorRegistration>}
            />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/cfviz" element={<CFViz></CFViz>} />
            <Route path="/createpost" element={<CreatePost></CreatePost>} />
            <Route path="/forum" element={<PostList></PostList>} />
            <Route path="/post" element={<Post></Post>} />
            <Route path="/contests" element={<ContestList></ContestList>} />
            <Route path="/users" element={<Users></Users>} />
            <Route path="/contest" element={<Contest></Contest>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
