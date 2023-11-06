import React from "react";
import { Component } from "react";
import { getPosts, decodePost } from "../helper";
import "./PostList.css";
import { Navigate } from "react-router-dom";
import PostListeItem from "../res/PostListItem/PostListItem";
import FadeScroll from "../res/FadeScroll/FadeScroll";
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    let data = this.state;
    getPosts().then((response) => {
      for (let i = 0; i < response.length; i++) {
        response[i].content = decodePost(response[i].content);
        data.posts.push(response[i]);
        console.log(data);
      }
      this.setState(data);
    });
  }
  render() {
    return (
      <div className="PostList">
        <div className="PostListHeader">
          <div className="RecentPosts">Recent Posts :</div>
          <a className="NewPostBtn" href="createpost">
            Write something
          </a>
        </div>
        {this.state.posts.map((data, index) => {
          let post = data;
          post.time = post.time.replace(".000Z", "");
          return (
            <FadeScroll key={index}>
              <PostListeItem post={post}></PostListeItem>
            </FadeScroll>
          );
        })}
      </div>
    );
  }
}
export default PostList;
