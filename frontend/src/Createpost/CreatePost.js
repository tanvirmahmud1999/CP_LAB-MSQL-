import React from "react";
import { Component } from "react";
import "./CreatePost.css";
import { isLoggedIn } from "../helper";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import RichTextEditor from "../res/RichTextEditor/RichTextEditor";
import { postToServer } from "../helper";
import { Navigate } from "react-router-dom";
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.onChange = (editorState) => this.setState({ editorState });
    this.state = {
      isLoggedIn: 0,
      done: 0,
    };
    this.titleRef = React.createRef();
    this.postContent = "";
  }
  submitPost = () => {
    let content = this.postContent;
    let s = this.titleRef.current.value;
    let org = convertFromRaw(content);
    if (s !== undefined && s !== "" && org.hasText()) {
      postToServer(s, content).then(() => {
        this.setState({
          done: 1,
        });
      });
    }
  };
  getPostContent = (content) => {
    this.postContent = content;
    console.log(content);
  };
  componentDidMount() {
    isLoggedIn().then((res) => {
      console.log(res);
      if (res === 1) {
        this.setState({
          isLoggedIn: -1,
        });
      } else {
        this.setState({
          isLoggedIn: 1,
        });
      }
    });
  }
  render() {
    let content = "";
    if (this.state.done === 1) content = <Navigate to="/forum" />;
    else if (this.state.isLoggedIn === -1) content = <Navigate to="/login" />;
    else if (this.state.isLoggedIn === 1)
      content = (
        <div className="CreatePost">
          <input
            type="text"
            className="titleInp"
            ref={this.titleRef}
            placeholder="blog title"
          ></input>
          <div className="Editor">
            <RichTextEditor sendContent={this.getPostContent}></RichTextEditor>
          </div>
          <div className="postBtn" onClick={this.submitPost}>
            Post
          </div>
        </div>
      );
    return content;
  }
}
export default CreatePost;
