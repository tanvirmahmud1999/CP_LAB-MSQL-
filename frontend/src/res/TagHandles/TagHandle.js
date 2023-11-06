import { Axios } from "axios";
import React, { Component } from "react";
import crossIcon from "../../Image/cross.png";
import "./TagHandle.css";
import { updateHandles } from "../../helper";
class TagHandle extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.tagInp = React.createRef();
    this.state = {
      tags: props.handles,
    };
  }
  eraseTag = (tag) => {
    console.log(tag);
    let tags = this.state.tags;
    tags = tags.filter((x, index) => x !== tag);
    this.setState({
      tags: tags,
    });
  };
  updateHandleList = () => {
    let tags = this.state.tags;
    updateHandles(this.state.tags)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
        window.location.reload(false);
      });
    console.log(tags);
  };
  addTag = () => {
    if (
      this.tagInp.current.value !== null &&
      this.tagInp.current.value !== undefined &&
      this.tagInp.current.value.length > 1
    ) {
      let tags = this.state.tags;
      tags = tags.filter((x, index) => x !== this.tagInp.current.value);
      tags.push(this.tagInp.current.value);
      this.setState({ tags: tags });
      this.tagInp.current.value = "";
    }
  };
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.addTag();
    }
  };
  render() {
    return (
      <div className="TagHandle">
        {this.state.tags.map((tag) => {
          return (
            <div key={tag} className="Tag">
              <div className="TagText">{tag}</div>
              <div
                onClick={() => {
                  this.eraseTag(tag);
                }}
                className="TagImg"
              >
                <img src={crossIcon} />
              </div>
            </div>
          );
        })}
        <input
          className="TagInput"
          placeholder="Add Handle"
          ref={this.tagInp}
          onKeyPress={this.handleKeyPress}
        ></input>
        <div className="TagBtn" onClick={this.updateHandleList}>
          Apply Changes
        </div>
      </div>
    );
  }
}

export default TagHandle;
