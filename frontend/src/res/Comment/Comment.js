import { React, Component } from "react";
import { isLoggedIn, getChildReplies, decodePost } from "../../helper";
import clockIcon from "../../Image/clock.png";
import calenderIcon from "../../Image/calender.png";
import "./Comment.css";
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: 0,
      replies: [],
    };
  }
  componentDidMount() {
    let data = this.state;

    isLoggedIn().then((res) => {
      data.isLoggedIn = -1;
      if (res === 1) {
        this.setState(data);
      } else {
        data.isLoggedIn = 1;
        this.setState(data);
      }
    });
    getChildReplies(this.props.comment.id).then((res) => {
      let data = this.state;
      for (let i = 0; i < res.length; i++) {
        res[i].content = decodePost(res[i].content);
        data.replies.push(res[i]);
      }
      console.log(data);
      this.setState(data);
    });
  }
  render() {
    return (
      <div className="Comment">
        <div
          className="CommentTop"
          dangerouslySetInnerHTML={{ __html: this.props.comment.content }}
        ></div>
        <div className="CommentBottom">
          <div className="CommentTime">
            <img src={calenderIcon}></img>
            <span>{this.props.comment.time.split("T")[0]}</span>
          </div>
          <div className="CommentTime">
            <img src={clockIcon}></img>
            <span>{this.props.comment.time.split("T")[1]}</span>
          </div>
          <div className="CommentAuthor">
            <a href={"profile?username=" + this.props.comment.author}>
              {this.props.comment.author}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
