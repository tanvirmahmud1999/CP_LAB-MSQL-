import React from "react";
import { Component } from "react";
import "./PostListItem.css";
import clockIcon from "../../Image/clock.png";
import calenderIcon from "../../Image/calender.png";
class PostListItem extends Component {
  render() {
    return (
      <div className="PostListItem">
        <div className="PostListTitle">
          <a href={"post?id=" + this.props.post.id}>{this.props.post.title}</a>
        </div>
        <div className="PostListBottom">
          <div className="PostListTime">
            <img src={calenderIcon}></img>
            <span>{this.props.post.time.split("T")[0]}</span>
          </div>

          <div className="PostListTime">
            <img src={clockIcon}></img>
            <span>{this.props.post.time.split("T")[1]}</span>
          </div>
          <div className="PostTitleAuthor">
            Posted By:
            <a href={"profile?username=" + this.props.post.author}>
              {this.props.post.author}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default PostListItem;
