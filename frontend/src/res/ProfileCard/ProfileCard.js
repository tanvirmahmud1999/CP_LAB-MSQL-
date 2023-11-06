import Axios from "axios";
import React, { Component } from "react";
import FadeScroll from "../FadeScroll/FadeScroll";
import TagHandle from "../TagHandles/TagHandle";
import "./ProfileCard.css";
import { timeSince } from "../../helper";
class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxRatting: 0,
      contribution: 0,
      lastActive: 0,
      registered: Date.now(),
      frinedsOf: 0,
    };
  }
  async componentDidMount() {
    let data = this.state;
    let cnt = this.props.user.handles.length;
    for (let i = 0; i < this.props.user.handles.length; i++) {
      let element = this.props.user.handles[i];
      let url = "https://codeforces.com/api/user.info?handles=" + element;
      try {
        const response = await Axios.get(url);
        cnt--;
        if (data.maxRatting < response.data.result[0].maxRating) {
          data.maxRatting = response.data.result[0].maxRating;
        }
        if (data.frinedsOf < response.data.result[0].friendOfCount) {
          data.frinedsOf = response.data.result[0].friendOfCount;
        }
        data.contribution += response.data.result[0].contribution;
        console.log(response.data.result);
        if (response.data.result[0].lastOnlineTimeSeconds > data.lastActive)
          data.lastActive = response.data.result[0].lastOnlineTimeSeconds;
        if (response.data.result[0].registrationTimeSeconds < data.registered)
          data.registered = response.data.result[0].registrationTimeSeconds;
        if (cnt === 0) {
          this.setState(data);
          this.props.parentReady();
        }
      } catch (err) {
        cnt--;
        console.error(err);
      }
    }
  }
  render() {
    return (
      <FadeScroll>
        <div className="ProfileCard">
          <div className="profile-card-lft">
            <div className="profile-card-userName">
              {this.props.user.userName}
            </div>
            <div className="profile-card-info">
              Full Name : {this.props.user.name}
            </div>
            {this.props.user.userType === 0 ? (
              <div className="profile-card-info">
                Registratin No : {this.props.user.reg}
              </div>
            ) : (
              ""
            )}
            <div className="profile-card-info">
              Email : {this.props.user.email}
            </div>
            <div className="profile-card-info">
              Phone No : {this.props.user.phone}
            </div>
            {/* <div className="profile-card-info">{this.props.user.name}</div> */}
          </div>
          <div className="profile-card-rht">
            {this.props.isOwn === 1 ? (
              <TagHandle handles={this.props.user.handles}></TagHandle>
            ) : (
              ""
            )}
            <div className="profile-card-info">
              Max Ratting : {this.state.maxRatting}
            </div>
            <div className="profile-card-info">
              Contributions : {this.state.contribution}
            </div>
            <div className="profile-card-info">
              Last Active : {timeSince(this.state.lastActive)}
            </div>

            <div className="profile-card-info">
              Registered : {timeSince(this.state.registered)}
            </div>

            <div className="profile-card-info">
              Friends of : {this.state.frinedsOf} Users
            </div>
          </div>
        </div>
      </FadeScroll>
    );
  }
}

export default ProfileCard;
