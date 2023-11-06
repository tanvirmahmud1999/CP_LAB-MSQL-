import React from "react";
import { Component } from "react";
import CFstat from "../res/CFStat/CFStat";
import "./Profile.css";
import { isLoggedIn, getUser } from "../helper";
import ProfileCard from "../res/ProfileCard/ProfileCard";
class Profile extends Component {
  constructor(props) {
    super(props);
    let url = new URL(window.location.href);
    let user = url.searchParams.get("username");
    console.log(user);
    this.state = {
      urlUser: user,
      //0 means not decided, 1 means logged in, -1 means not logged in
      isLoggedIn: 0,
      user: null,
      //0 means no error,1 means user not found, 2 means server error
      error: 0,
      //Is Profile Card loaded
      isReady: 0,
      isOwn: 0,
    };
  }
  makeReady = () => {
    this.setState({
      isReady: 1,
    });
  };
  componentDidMount() {
    isLoggedIn().then((res) => {
      if (res === 1) {
        //not logged in
        let tmpstate = {
          isLoggedIn: -1,
          user: null,
          error: 0,
        };
        if (this.state.urlUser !== null) {
          //url query is not empty
          getUser(this.state.urlUser)
            .then((result) => {
              if (result === 1) {
                //user not found
                tmpstate.error = 1;
              } else if (result === 3) {
                //error in backend
                tmpstate.error = 2;
              } else {
                //User found
                tmpstate.user = result;
              }
              this.setState(tmpstate);
            })
            .catch(() => {
              //error in backend
              tmpstate.error = 2;
              this.setState(tmpstate);
            });
        } else {
          this.setState(tmpstate);
        }
      } else {
        //logged in
        let tmpstate = {
          isLoggedIn: 1,
          user: res,
          error: 0,
        };
        if (this.state.urlUser !== null) {
          //Username provided in url
          console.log("url user is " + this.state.urlUser);
          getUser(this.state.urlUser)
            .then((result) => {
              console.log(result);
              if (result === 1) {
                tmpstate.error = 1;
              } else if (result === 3) {
                tmpstate.error = 2;
              } else {
                tmpstate.user = result;
              }
              this.setState(tmpstate);
            })
            .catch(() => {
              tmpstate.error = 2;
              this.setState(tmpstate);
            });
        } else {
          tmpstate.isOwn = 1;
          getUser(res.userName)
            .then((result) => {
              if (result === 1) {
                tmpstate.error = 1;
              } else if (result === 3) {
                tmpstate.error = 2;
              } else {
                tmpstate.user = result;
              }
              this.setState(tmpstate);
            })
            .catch(() => {
              tmpstate.error = 2;
              this.setState(tmpstate);
            });
        }
      }
    });
  }
  render() {
    let content = "";
    if (this.state.error === 1)
      content = (
        <div className="Profile">
          <h1>User not found</h1>
        </div>
      );
    else if (this.state.error === 2)
      content = (
        <div className="Profile">
          <h1>Error connecting database</h1>
        </div>
      );
    else if (this.state.user !== null)
      content = (
        <div className="Profile">
          <ProfileCard
            user={this.state.user}
            parentReady={this.makeReady}
            isOwn={this.state.isOwn}
          ></ProfileCard>
          <CFstat
            handles={this.state.isReady === 1 ? this.state.user.handles : []}
          ></CFstat>
        </div>
      );
    return content;
  }
}
export default Profile;
