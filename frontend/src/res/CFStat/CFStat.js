import { Component } from "react";
import React from "react";
import Axios from "axios";
import "./CFStat.css";
import PieChart from "../Charts/PieChart/PieChart";
import DoughnutChart from "../Charts/DoughnutChart/DoughnutChart";
import FadeScroll from "../FadeScroll/FadeScroll";
import WavyText from "../WavyText/WavyText";
import BarChart from "../Charts/BarChart/BarChart";
import ScatterChart from "../Charts/ScatterChart/ScatterChart";

class CFstat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handles: this.props.handles,
      maxRating: 0,
      submissions: [],
      problemsSolved: new Set(),
      diffCount: new Map(),
      catCount: new Map(),
      verCount: new Map(),
      langCount: new Map(),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
    };
  }
  async getStat() {
    let data = {
      handles: this.props.handles,
      maxRating: 0,
      submissions: [],
      problemsSolved: [],
      diffCount: new Map(),
      catCount: new Map(),
      verCount: new Map(),
      langCount: new Map(),
      backgroundColor: [
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
    };
    let st = new Map();
    for (let i = 0; i < this.props.handles.length; i++) {
      let handle = this.props.handles[i];
      let url1 = "https://codeforces.com/api/user.info?handles=" + handle;
      let url2 = "https://codeforces.com/api/user.status?handle=" + handle;
      try {
        const response = await Axios.get(url1);
        if (data.maxRating < response.data.result[0].maxRating)
          data.maxRating = response.data.result[0].maxRating;
      } catch (err) {
        await console.error(err);
      }

      try {
        const response = await Axios.get(url2);
        for (let j = 0; j < response.data.result.length; j++) {
          data.submissions.push(response.data.result[j]);
          data.verCount.set(
            response.data.result[j].verdict,
            data.verCount.has(response.data.result[j].verdict)
              ? data.verCount.get(response.data.result[j].verdict) + 1
              : 1
          );
          data.langCount.set(
            response.data.result[j].programmingLanguage,
            data.langCount.has(response.data.result[j].programmingLanguage)
              ? data.langCount.get(
                  response.data.result[j].programmingLanguage
                ) + 1
              : 1
          );
          if (
            response.data.result[j].verdict == "OK" &&
            !st.has(response.data.result[j].problem.name)
          ) {
            data.problemsSolved.push(response.data.result[j].problem);
            st.set(response.data.result[j].problem.name, 1);
            if (response.data.result[j].problem.rating == 3000) {
              // console.log(response.data.result[j].problem);
            }
          }
        }
      } catch (err) {
        await console.error(err);
      }
    }
    for (const problem of data.problemsSolved) {
      data.diffCount.set(
        problem.rating,
        data.diffCount.has(problem.rating)
          ? data.diffCount.get(problem.rating) + 1
          : 1
      );
      for (const catagory of problem.tags)
        data.catCount.set(
          catagory,
          data.catCount.has(catagory) ? data.catCount.get(catagory) + 1 : 1
        );
    }
    data.verCount = new Map(
      [...data.verCount.entries()].sort((a, b) => b[1] - a[1])
    );
    data.langCount = new Map(
      [...data.langCount.entries()].sort((a, b) => b[1] - a[1])
    );
    data.catCount = new Map(
      [...data.catCount.entries()].sort((a, b) => b[1] - a[1])
    );
    // console.log(data);
    this.setState(data);
  }
  async componentDidMount() {
    await this.getStat();
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.handles != this.props.handles) await this.getStat();
  }
  getVerData = () => {
    let data = {
      labels: [],
      datasets: [
        {
          label: "# of Verdicts",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    };
    let i = 0;
    for (let [verdict, cnt] of this.state.verCount) {
      data.labels.push(verdict);
      data.datasets[0].data.push(cnt);
      data.datasets[0].backgroundColor.push(this.state.backgroundColor[i % 6]);
      data.datasets[0].borderColor.push(this.state.borderColor[i % 6]);
      i++;
    }

    return data;
  };
  getLangData = () => {
    let data = {
      labels: [],
      datasets: [
        {
          label: "# of submissions in languages",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    };
    let i = 0;
    for (let [lang, cnt] of this.state.langCount) {
      data.labels.push(lang);
      data.datasets[0].data.push(cnt);
      data.datasets[0].backgroundColor.push(this.state.backgroundColor[i % 6]);
      data.datasets[0].borderColor.push(this.state.borderColor[i % 6]);
      i++;
    }
    return data;
  };
  getDifData = () => {
    let data = {
      labels: [],
      datasets: [
        {
          label: "Difficulty wise problem count",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Cumulative",
          data: [],
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          hidden: true,
        },
      ],
    };
    let i = 0;
    for (let dif = 800; dif <= 3500; dif += 100) {
      data.labels.push(dif);
      let val = 0;
      if (this.state.diffCount.has(dif)) val = this.state.diffCount.get(dif);
      data.datasets[0].data.push(val);
      data.datasets[1].data.push(val);
      i++;
    }
    i--;
    while (i > 0) {
      i--;
      data.datasets[1].data[i] =
        data.datasets[1].data[i] + data.datasets[1].data[i + 1];
    }
    return data;
  };
  getCatData = () => {
    let data = {
      labels: [],
      datasets: [
        {
          label: "Catagory wise problem count",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    };
    for (let [cat, cnt] of this.state.catCount) {
      data.labels.push(cat);
      data.datasets[0].data.push(cnt);
    }
    this.getScatterData();
    return data;
  };
  getScatterData = () => {
    let data = {
      datasets: [
        {
          label: "Y - Difficulty & X - time",
          data: [],
          backgroundColor: "rgba(153, 102, 255, 0.5)",
        },
      ],
    };
    let mn = 1000000;
    for (let submission of this.state.submissions) {
      if (mn > Math.round(submission.creationTimeSeconds / 86400))
        mn = Math.round(submission.creationTimeSeconds / 86400);
    }
    for (let submission of this.state.submissions) {
      if (submission.verdict == "OK" && submission.problem.rating != undefined)
        data.datasets[0].data.push({
          x: Math.round(submission.creationTimeSeconds / 86400) - mn,
          y: submission.problem.rating,
        });
    }
    // console.log(data);
    return data;
  };

  render() {
    return (
      <div className="CFStat">
        <FadeScroll>
          <div className="cf-sec-1">
            <div className="cf-sec-lft">
              <h1>
                <WavyText>Verdicts</WavyText>
              </h1>
              <PieChart data={this.getVerData()}></PieChart>
            </div>
            <div className="cf-sec-rht">
              <h1>
                <WavyText>Languages</WavyText>
              </h1>
              <DoughnutChart data={this.getLangData()}></DoughnutChart>
            </div>
          </div>
        </FadeScroll>
        <FadeScroll>
          <div className="cf-sec-2">
            <div className="cf-sec-single">
              <BarChart data={this.getDifData()}></BarChart>
            </div>
          </div>
        </FadeScroll>
        <FadeScroll>
          <div className="cf-sec-2">
            <div className="cf-sec-single">
              <BarChart data={this.getCatData()}></BarChart>
            </div>
          </div>
        </FadeScroll>
        <FadeScroll>
          <div className="cf-sec-2">
            <div className="cf-sec-single">
              <ScatterChart data={this.getScatterData()}></ScatterChart>
            </div>
          </div>
        </FadeScroll>
      </div>
    );
  }
}
CFstat.defaultProps = {
  handles: [],
};
export default CFstat;
