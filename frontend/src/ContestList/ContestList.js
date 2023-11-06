import React from "react";
import { Component } from "react";
import {
  getPosts,
  decodePost,
  isLoggedIn,
  addNationalContest,
  getNationalContests,
} from "../helper";
import "./ContestList.css";
import { Navigate } from "react-router-dom";
import FadeScroll from "../res/FadeScroll/FadeScroll";
import CreateContest from "../CreateContest/CreateContest";
import ContestListItem from "../res/ContestListItem/ContestListItem";
class ContestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloggedIn: 0,
      contests: [],
    };
  }
  addContest = (name, date) => {
    addNationalContest(name, date);
  };
  componentDidMount() {
    isLoggedIn().then((res) => {
      console.log(res);
      if (res === 1) {
        this.setState({
          isLoggedIn: -1,
        });
      } else {
        if (res.userType === 1) {
          console.log(res);
          this.setState(
            {
              isloggedIn: 1,
            },
            () => {
              console.log(this.state);
            }
          );
        } else {
          this.setState({
            isloggedIn: -1,
          });
        }
      }
    });
    getNationalContests().then((res) => {
      this.setState({
        contests: res,
      });
    });
  }
  render() {
    return (
      <div className="ContestList">
        {this.state.isloggedIn === 1 ? (
          <FadeScroll>
            <CreateContest addContest={this.addContest}></CreateContest>
          </FadeScroll>
        ) : (
          ""
        )}
        <h1>List of contests : </h1>
        {this.state.contests.map((data, index) => {
          let contest = data;
          contest.time = contest.time.split("T")[0];
          return (
            <FadeScroll key={index}>
              <ContestListItem contest={contest}></ContestListItem>
            </FadeScroll>
          );
        })}
      </div>
    );
  }
}
export default ContestList;
