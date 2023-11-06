import React from "react";
import { Component } from "react";
import "./Users.css";
import { getStudents } from "../helper";
import FadeScroll from "../res/FadeScroll/FadeScroll";
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    getStudents().then((res) => {
      this.setState({
        users: res,
      });
    });
  }
  render() {
    return (
      <div className="Users">
        {this.state.users.map((data, index) => {
          return (
            <FadeScroll key={index}>
              <div className="userListItem">
                <a
                  className="userName"
                  href={"profile?username=" + data.username}
                >
                  {data.username}
                </a>
                <div className="userReg">{data.reg}</div>
                <div className="userPhone">{data.phone}</div>
              </div>
            </FadeScroll>
          );
        })}
      </div>
    );
  }
}
export default Users;
