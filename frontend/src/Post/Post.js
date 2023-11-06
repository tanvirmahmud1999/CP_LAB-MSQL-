import { Component, React } from "react";
import {
  getPost,
  decodePost,
  isLoggedIn,
  getChildComments,
  commentToServer,
} from "../helper";
import "./Post.css";
import calenderIcon from "../Image/calender.png";
import clockIcon from "../Image/clock.png";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import RichTextEditor from "../res/RichTextEditor/RichTextEditor";
import { postToServer } from "../helper";
import { Navigate } from "react-router-dom";
import FadeScroll from "../res/FadeScroll/FadeScroll";
import Comment from "../res/Comment/Comment";
class Post extends Component {
  constructor(props) {
    super(props);
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    if (id === null || id === undefined) id = -1;
    this.state = {
      done: 0,
      isLoggedIn: 0,
      postid: id,
      post: "",
      author: "",
      title: "",
      time: "",
      comments: [],
    };
    this.commentContent = "";
  }
  submitComment = () => {
    let content = this.commentContent;
    let org = convertFromRaw(content);
    console.log(org);
    if (org.hasText()) {
      commentToServer(this.state.postid, content).then((res) => {
        window.location.reload(false);
      });
    }
  };
  getPostContent = (content) => {
    this.commentContent = content;
    console.log(content);
  };
  componentDidMount() {
    let data = this.state;
    getPost(data.postid)
      .then((res) => {
        if (res !== 1) {
          res.content = decodePost(res.content);
          data.post = res.content;
          data.author = res.author;
          data.title = res.title;
          data.time = res.time.replace(".000Z", "");
          this.setState(data);
          isLoggedIn().then((res) => {
            data.isLoggedIn = -1;
            if (res === 1) {
              this.setState(data);
            } else {
              data.isLoggedIn = 1;
              this.setState(data);
              console.log(this.state);
            }
          });
        }
      })
      .catch(() => {});
    getChildComments(this.state.postid).then((res) => {
      let data = this.state;
      for (let i = 0; i < res.length; i++) {
        res[i].content = decodePost(res[i].content);
        data.comments.push(res[i]);
      }
      console.log(data);
      this.setState(data);
    });
  }
  render() {
    return (
      <div className="Post">
        <div className="PostTop">
          <div className="PostTitle">{this.state.title}</div>
          <div
            className="PostContent"
            dangerouslySetInnerHTML={{ __html: this.state.post }}
          ></div>
          <div className="bottomBar">
            <div className="PostTime">
              <img src={calenderIcon}></img>
              <span>{this.state.time.split("T")[0]}</span>
            </div>

            <div className="PostTime">
              <img src={clockIcon}></img>
              <span>{this.state.time.split("T")[1]}</span>
            </div>
            <div className="PostAuthor">
              Posted By:
              <a href={"profile?username=" + this.state.author}>
                {this.state.author}
              </a>
            </div>
          </div>
        </div>
        <div className="comment-section">
          {this.state.isLoggedIn === 1 ? (
            <div className="WriteComment">
              <div className="TextEditor">
                <RichTextEditor
                  sendContent={this.getPostContent}
                ></RichTextEditor>
              </div>
              <div className="commentButton" onClick={this.submitComment}>
                Comment
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="Comments">
            {console.log(this.state.comments)}
            {this.state.comments.map((data, index) => {
              let comment = data;
              comment.time = comment.time.replace(".000Z", "");
              return (
                <FadeScroll key={index}>
                  <Comment comment={comment}></Comment>
                </FadeScroll>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Post;
