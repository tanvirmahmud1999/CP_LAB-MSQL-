import React from "react";
import { Component } from "react";
import "./TeamCard.css";
class TeamCard extends Component {
  render() {
    return (
      <div className="TeamCard">
        <div className="TeamName">{this.props.team.name}</div>
        <a
          className="teamMember"
          href={"profile?username=" + this.props.team.member1}
        >
          {this.props.team.member1}
        </a>
        <a
          className="teamMember"
          href={"profile?username=" + this.props.team.member2}
        >
          {this.props.team.member2}
        </a>
        <a
          className="teamMember"
          href={"profile?username=" + this.props.team.member3}
        >
          {this.props.team.member3}
        </a>
        <a className="coach" href={"profile?username=" + this.props.team.coach}>
          {this.props.team.coach}
        </a>
      </div>
    );
  }
}
export default TeamCard;
