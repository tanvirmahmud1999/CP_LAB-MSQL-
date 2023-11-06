import React from "react";
import { Component } from "react";
import { getPosts, decodePost } from "../helper";
import "./CreateContest.css";
import { Navigate } from "react-router-dom";
import FadeScroll from "../res/FadeScroll/FadeScroll";
import WavyText from "../res/WavyText/WavyText";
class CreateContest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.nameRef = React.createRef();
    this.dateRef = React.createRef();
  }
  createContest = () => {
    let name = this.nameRef.current.value;
    let date = this.dateRef.current.value;
    if (name === null || name === undefined || name.length === 0) {
      this.nameRef.current.reportValidity();
      return;
    }

    if (date === null || date === undefined || date.length === 0) {
      this.dateRef.current.reportValidity();
      return;
    }
    this.props.addContest(name, date);
  };
  componentDidMount() {}
  render() {
    return (
      <div className="CreateContest">
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
          <WavyText>Contest Date</WavyText>
          <input
            className="contestDateInp"
            type="date"
            ref={this.dateRef}
            required
          ></input>
        </div>
        <div className="createContestBtn" onClick={this.createContest}>
          Add Contest
        </div>
      </div>
    );
  }
}
export default CreateContest;
