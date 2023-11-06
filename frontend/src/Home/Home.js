import React from "react";
import { Component } from "react";
import Nav from "../res/Nav/Nav";
import "./Home.css";
import WavyText from "../res/WavyText/WavyText";
import BorderAnimation from "../res/BorderAnimation/BorderAnimation";
import FadeScroll from "../res/FadeScroll/FadeScroll";
import Gallary from "../res/Gallary/Gallary";
import CFstat from "../res/CFStat/CFStat";
class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="welcome-wrapper">
          <div className="welcome">
            <div className="welcome-lft">
              <WavyText>WelcomeTo</WavyText>
              <BorderAnimation>
                <p className="CP">CP</p>
                <p className="Lab">Lab</p>
              </BorderAnimation>
            </div>
            <div className="welcome-rht">
              <Gallary></Gallary>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
