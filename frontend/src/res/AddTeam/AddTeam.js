import React from "react";
import { Component } from "react";
import "./AddTeam.css";
import WavyText from "../WavyText/WavyText";
import FadeScroll from "../FadeScroll/FadeScroll";
class AddTeam extends Component {
  constructor(props) {
    super(props);
  }
  createTeam = () => {
    let name = this.props.nameRef.current.value;
    let member1 = this.props.member1Ref.current.value;
    let member2 = this.props.member2Ref.current.value;
    let member3 = this.props.member3Ref.current.value;
    let coach = this.props.coachRef.current.value;
    this.props.nameRef.current.setCustomValidity("");
    this.props.member1Ref.current.setCustomValidity("");
    this.props.member2Ref.current.setCustomValidity("");
    this.props.member3Ref.current.setCustomValidity("");
    this.props.coachRef.current.setCustomValidity("");
    if (name === null || name === undefined || name.length === 0) {
      this.props.nameRef.current.setCustomValidity("This field is required");
      this.props.nameRef.current.reportValidity();
      return;
    }
    if (member1 === null || member1 === undefined || member1.length === 0) {
      this.props.member1Ref.current.setCustomValidity("This field is required");
      this.props.member1Ref.current.reportValidity();
      return;
    }
    if (member2 === null || member2 === undefined || member2.length === 0) {
      this.props.member2Ref.current.setCustomValidity("This field is required");
      this.props.member2Ref.current.reportValidity();
      return;
    }
    if (member3 === null || member3 === undefined || member3.length === 0) {
      this.props.member3Ref.current.setCustomValidity("This field is required");
      this.props.member3Ref.current.reportValidity();
      return;
    }

    if (coach === null || coach === undefined || coach.length === 0) {
      this.props.coachRef.current.setCustomValidity("This field is required");
      this.props.coachRef.current.reportValidity();
      return;
    }

    this.props.addTeam(name, member1, member2, member3, coach);
  };
  render() {
    return (
      <div className="AddTeam">
        <div className="TeamInpContainer">
          <WavyText>Team Name</WavyText>
          <input
            className="TeamNameInp"
            type="text"
            ref={this.props.nameRef}
            required
          ></input>
        </div>
        <div className="TeamInpContainer">
          <WavyText>Member 1</WavyText>
          <input
            className="member1Inp"
            type="text"
            ref={this.props.member1Ref}
            required
          ></input>
        </div>

        <div className="TeamInpContainer">
          <WavyText>Member 2</WavyText>
          <input
            className="member1Inp"
            type="text"
            ref={this.props.member2Ref}
            required
          ></input>
        </div>
        <div className="TeamInpContainer">
          <WavyText>Member 3</WavyText>
          <input
            className="member1Inp"
            type="text"
            ref={this.props.member3Ref}
            required
          ></input>
        </div>
        <div className="TeamInpContainer">
          <WavyText>Coach</WavyText>
          <input
            className="member1Inp"
            type="text"
            ref={this.props.coachRef}
            required
          ></input>
        </div>

        <div className="createTeamBtn" onClick={this.createTeam}>
          CreateTeam
        </div>
      </div>
    );
  }
}
export default AddTeam;
