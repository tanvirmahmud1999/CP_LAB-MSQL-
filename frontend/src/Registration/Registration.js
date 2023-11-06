import React, { Component } from "react";
import Form from "../res/Form/Form";
import WavyText from "../res/WavyText/WavyText";
import "./Registration.css";
import Axios from "axios";
import { storeData, getData, alphanumeric, isLoggedIn } from "../helper";
import { Navigate } from "react-router-dom";
class Registratration extends Component {
  constructor(props) {
    super(props);
    this.usernameInp = React.createRef();
    this.nameInp = React.createRef();
    this.passwordInp = React.createRef();
    this.cpasswordInp = React.createRef();
    this.emailInp = React.createRef();
    this.phoneInp = React.createRef();
    this.regInp = React.createRef();
    this.state = { isLoggedIn: 0 };
  }
  checkUsername = () => {
    this.usernameInp.current.setCustomValidity("");
    let s = this.usernameInp.current.value;
    if (s === undefined || s === "") {
      this.usernameInp.current.setCustomValidity("Username is required");
      this.usernameInp.current.reportValidity();
      return false;
    }
    if (s.length < 3) {
      this.usernameInp.current.setCustomValidity("User name too short");
      this.usernameInp.current.reportValidity();
      return false;
    }

    for (let c of s) {
      let val = c.charCodeAt(0);
      let valid = alphanumeric(val) || val === "_".charCodeAt(0);
      if (!valid) {
        this.usernameInp.current.setCustomValidity(
          "Alphanumeric and underscores only"
        );
        this.usernameInp.current.reportValidity();
        return false;
      }
    }
    this.usernameInp.current.setCustomValidity("");
    return true;
  };
  checkName = () => {
    this.nameInp.current.setCustomValidity("");
    let s = this.nameInp.current.value;
    if (s === undefined || s === "") {
      this.nameInp.current.setCustomValidity("Name is required");
      this.nameInp.current.reportValidity();
      return false;
    }
    if (s.length < 3) {
      this.nameInp.current.setCustomValidity("Name too short");
      this.nameInp.current.reportValidity();
      return false;
    }
    this.nameInp.current.setCustomValidity("");
    return true;
  };
  checkPassword = () => {
    this.passwordInp.current.setCustomValidity("");
    let s = this.passwordInp.current.value;
    if (s === undefined || s === "") {
      this.passwordInp.current.setCustomValidity("Password is required");
      this.passwordInp.current.reportValidity();
      return false;
    }
    if (s.length < 3) {
      this.passwordInp.current.setCustomValidity("Password too short");
      this.passwordInp.current.reportValidity();
      return false;
    }
    this.passwordInp.current.setCustomValidity("");
    return true;
  };
  checkCpassword = () => {
    this.cpasswordInp.current.setCustomValidity("");
    let s = this.cpasswordInp.current.value;
    if (s === undefined || s === "") {
      this.cpasswordInp.current.setCustomValidity("Password is required");
      this.cpasswordInp.current.reportValidity();
      return false;
    }
    if (s.length < 3) {
      this.cpasswordInp.current.setCustomValidity("Password too short");
      this.cpasswordInp.current.reportValidity();
      return false;
    }
    if (s !== this.passwordInp.current.value) {
      this.cpasswordInp.current.setCustomValidity("Passwords didn't match");
      this.cpasswordInp.current.reportValidity();
      return false;
    }
    this.cpasswordInp.current.setCustomValidity("");
    return true;
  };
  checkEmail = () => {
    this.emailInp.current.reportValidity();
    setTimeout(() => {
      this.emailInp.current.setCustomValidity("");
    }, 5000);
    return this.emailInp.current.checkValidity();
  };
  checkPhone = () => {
    this.phoneInp.current.reportValidity();
    return this.phoneInp.current.checkValidity();
  };

  checkReg = () => {
    this.regInp.current.reportValidity();
    return this.regInp.current.checkValidity();
  };

  regreq = (user) => {
    console.log("requested");
    Axios.post("http://localhost:3001/registration", user).then((response) => {
      console.log(response.data);
      if (response.data === 1) {
        this.usernameInp.current.setCustomValidity("User name already exists");
        this.usernameInp.current.reportValidity();
      } else if (response.data === 2) {
        this.emailInp.current.setCustomValidity("Email already exists");
        this.emailInp.current.reportValidity();
      } else if (response.data === 3) {
        alert("Error connecting database, try again");
      } else {
        storeData("current_user", response.data);
        window.location.reload(false);
      }
    });
  };
  componentDidMount() {
    isLoggedIn().then((res) => {
      console.log(res);
      if (res === 1) {
        this.setState({
          isLoggedIn: -1,
        });
      } else {
        this.setState({
          isLoggedIn: 1,
        });
      }
    });
  }
  submit = () => {
    if (!this.checkUsername()) return;
    if (!this.checkName()) return;
    if (!this.checkEmail()) return;
    if (!this.checkPhone()) return;
    if (!this.checkReg()) return;
    if (!this.checkPassword()) return;
    if (!this.checkCpassword()) return;

    let user = {
      userName: this.usernameInp.current.value,
      name: this.nameInp.current.value,
      email: this.emailInp.current.value,
      phone: this.phoneInp.current.value,
      password: this.passwordInp.current.value,
      reg: this.regInp.current.value,
    };
    this.regreq(user);
  };

  render() {
    let content = (
      <div className="Registration">
        <Form>
          <div className="form-lft">
            <h2>
              <WavyText>Welcome to</WavyText>
            </h2>
            <h2>
              <WavyText>CP Lab</WavyText>
            </h2>
            <p>Already have an account?</p>
            <a href="/login">
              <WavyText>login</WavyText>
            </a>
          </div>
          <div className="form-rht">
            <h3>Registration</h3>
            <input
              className="inp"
              name="username"
              placeholder="User Name"
              type="text"
              ref={this.usernameInp}
              onChange={this.checkUsername}
            />
            <span></span>
            <input
              className="inp"
              name="name"
              placeholder="Full Name"
              type="text"
              ref={this.nameInp}
              onChange={this.checkName}
            />
            <span></span>
            <input
              className="inp"
              name="email"
              placeholder="email"
              type="text"
              required
              ref={this.emailInp}
              onChange={this.checkEmail}
            />
            <span></span>
            <input
              className="inp"
              name="phone"
              placeholder="Phone Number"
              type="tel"
              required
              pattern="[0-9]{11}"
              ref={this.phoneInp}
              onChange={this.checkPhone}
            />
            <span></span>
            <input
              className="inp"
              name="regNo"
              placeholder="Registration Number"
              type="number"
              required
              pattern="[0-9]{10}"
              ref={this.regInp}
              onChange={this.checkReg}
            />
            <span></span>
            <input
              className="inp"
              name="password"
              type="password"
              placeholder="password"
              ref={this.passwordInp}
              onChange={this.checkPassword}
            />
            <span></span>
            <input
              className="inp"
              name="c_password"
              type="password"
              placeholder="confirm password"
              ref={this.cpasswordInp}
              onChange={this.checkCpassword}
            />
            <span></span>

            <div className="submit_container">
              <div className="submit" onClick={this.submit}>
                Create Account
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
    if (this.state.isLoggedIn === 1) content = <Navigate to="/" />;
    else if (this.state.isLoggedIn === 0) content = "";
    return content;
  }
}
export default Registratration;
