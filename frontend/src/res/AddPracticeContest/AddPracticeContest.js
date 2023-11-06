import React from "react";
import { Component } from "react";
import "./AddPracticeContest.css";
import WavyText from "../WavyText/WavyText";
class AddPracticeContest extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.linkRef = React.createRef();
  }
  createPracticeContest = () => {
    let name = this.nameRef.current.value;
    let link = this.linkRef.current.value;
    if (name === null || name === undefined || name.length === 0) {
      this.nameRef.current.reportValidity();
      return;
    }

    if (link === null || link === undefined || link.length === 0) {
      this.linkRef.current.reportValidity();
      return;
    }
    this.props.createPracticeContest(name, link);
  };
  render() {
    return (
      <div className="AddPracticeContest">
        <div className="contestInpContainer">
          <WavyText>Contest Name</WavyText>
          <input
            className="contestNameInp"
            type="text"
            ref={this.nameRef}
            required
          ></input>
        </div>
        <div className="contestInpContainer">
          <WavyText>Contest Link</WavyText>
          <input
            className="contestLinkInp"
            type="text"
            ref={this.linkRef}
            required
          ></input>
        </div>
        <div className="createContestBtn" onClick={this.createPracticeContest}>
          Add Practice Contest
        </div>
      </div>
    );
  }
}
export default AddPracticeContest;
