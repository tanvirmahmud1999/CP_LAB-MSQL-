import React from "react";
import { Component } from "react";
import "./Contest.css";
import AddPracticeContest from "../res/AddPracticeContest/AddPracticeContest";
import AddTeam from "../res/AddTeam/AddTeam";
import {
  isLoggedIn,
  getPracticeContests,
  addPracticeContest,
  createTeam,
  getTeams,
  getNationalContest,
} from "../helper";
import FadeScroll from "../res/FadeScroll/FadeScroll";
import TeamCard from "../res/TeamCard/TeamCard";
class Contest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloggidIn: 0,
      practiceContests: [],
      teams: [],
      contest: {
        name: "",
      },
    };
    let url = new URL(window.location.href);
    this.id = url.searchParams.get("id");
    if (this.id === null || this.id === undefined) this.id = -1;
    this.nameRef = React.createRef();
    this.member1Ref = React.createRef();
    this.member2Ref = React.createRef();
    this.member3Ref = React.createRef();
    this.coachRef = React.createRef();
  }
  createPracticeContest = (name, link) => {
    addPracticeContest(name, this.id, link)
      .then(() => {
        window.location.reload(false);
      })
      .catch(() => {
        window.location.reload(false);
      });
  };
  addTeam = (name, member1, member2, member3, coach) => {
    createTeam(name, member1, member2, member3, coach, this.id).then(
      (response) => {
        if (response === 1) {
          this.member1Ref.current.setCustomValidity("Student doesn't exist");
          this.member1Ref.current.reportValidity();
        } else if (response === 2) {
          this.member2Ref.current.setCustomValidity("Student doesn't exist");
          this.member2Ref.current.reportValidity();
        } else if (response === 3) {
          this.member3Ref.current.setCustomValidity("Student doesn't exist");
          this.member3Ref.current.reportValidity();
        } else if (response === 4) {
          this.coachRef.current.setCustomValidity("Mentor doesn't exist");
          this.coachRef.current.reportValidity();
        } else if (response == 4) {
          alert("Error accessing database");
        } else {
          window.location.reload(false);
        }
      }
    );
  };
  componentDidMount() {
    isLoggedIn().then((res) => {
      console.log(res);
      if (res === 1) {
        let data = this.state;
        data.isloggidIn = -1;
        this.setState(data);
      } else {
        if (res.userType === 1) {
          let data = this.state;
          data.isloggidIn = 1;
          this.setState(data);
        } else {
          let data = this.state;
          data.isloggidIn = -1;
          this.setState(data);
        }
      }
    });
    getNationalContest(this.id).then((res) => {
      let data = this.state;
      data.contest = res;
      this.setState(data);
    });
    getPracticeContests(this.id).then((res) => {
      let data = this.state;
      data.practiceContests = res;
      this.setState(data);
    });
    getTeams(this.id).then((res) => {
      let data = this.state;
      data.teams = res;
      this.setState(data);
    });
  }
  render() {
    return (
      <div className="Contest">
        <div className="contestTitle">{this.state.contest.name}</div>
        {this.state.isloggidIn === 1 ? (
          <div>
            <FadeScroll>
              <AddPracticeContest
                createPracticeContest={this.createPracticeContest}
              ></AddPracticeContest>
            </FadeScroll>
            <FadeScroll>
              <AddTeam
                addTeam={this.addTeam}
                nameRef={this.nameRef}
                member1Ref={this.member1Ref}
                member2Ref={this.member2Ref}
                member3Ref={this.member3Ref}
                coachRef={this.coachRef}
              ></AddTeam>
            </FadeScroll>
          </div>
        ) : (
          ""
        )}
        <div className="practiceContestSection">
          <div className="sectionHeader">Practice Conests : </div>
          <div className="practiceContestContainer">
            {this.state.practiceContests.map((data, index) => {
              let contest = data;
              return (
                <a key={index} className="practiceContest" href={contest.link}>
                  {contest.name}
                </a>
              );
            })}
          </div>
        </div>
        <div className="teamSection">
          <div className="teamsContainer">
            {this.state.teams.map((data, index) => {
              let team = data;
              return <TeamCard key={index} team={team}></TeamCard>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Contest;
