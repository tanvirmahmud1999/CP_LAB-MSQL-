const express = require("express");
const router = express.Router();
const queries = require("../queries");
const helper = require("../helper");
const e = require("express");
require("dotenv").config();

router.post("/getNationalContests", async (req, res) => {
  queries
    .getNationalContests()
    .then((result) => {
      let contests = [];
      result = Object.values(JSON.parse(JSON.stringify(result)));
      result.forEach((element) => {
        contests.push({
          id: element.id,
          name: element.name,
          time: element.time,
        });
      });
      res.send(contests);
    })
    .catch((err) => res.send(err));
});
router.post("/getNationalContest", async (req, res) => {
  queries
    .getNationalContest(req.body.id)
    .then((result) => {
      let contests = [];
      result = Object.values(JSON.parse(JSON.stringify(result)));
      result.forEach((element) => {
        contests.push({
          id: element.id,
          name: element.name,
          time: element.time,
        });
      });
      if (contests.length === 0) res.send("1");
      else res.send(contests[0]);
    })
    .catch((err) => res.send(err));
});
router.post("/addNationalContest", async (req, res) => {
  let token = req.body.token;
  let data = helper.decryptData(token, process.env.SECRET_KEY);
  if (data) {
    queries
      .addNationalContest(req.body.name, req.body.time)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send("1"));
  } else res.send("1");
});
router.post("/createTeam", async (req, res) => {
  let token = req.body.token;
  let data = helper.decryptData(token, process.env.SECRET_KEY);
  let name = req.body.name;
  let member1 = req.body.member1;
  let member2 = req.body.member2;
  let member3 = req.body.member3;
  let coach = req.body.coach;
  let contest = req.body.contest;
  console.log(member1);
  if (data) {
    queries
      .getStudentInfo(member1)
      .then((resm1) => {
        if (resm1.length === 0) {
          res.send("1");
        } else {
          queries
            .getStudentInfo(member2)
            .then((resm2) => {
              if (resm2.length === 0) {
                res.send("2");
              } else {
                queries
                  .getStudentInfo(member3)
                  .then((resm3) => {
                    if (resm3.length === 0) {
                      res.send("3");
                    } else {
                      queries
                        .getMentorInfo(coach)
                        .then((resc) => {
                          if (resc.length === 0) {
                            res.send("4");
                          } else {
                            queries
                              .createTeam(
                                name,
                                member1,
                                member2,
                                member3,
                                coach,
                                contest
                              )
                              .then(() => {
                                res.send("0");
                              })
                              .catch(() => {
                                res.send("5");
                              });
                          }
                        })
                        .catch(() => {
                          res.send("5");
                        });
                    }
                  })
                  .catch(() => {
                    res.send("5");
                  });
              }
            })
            .catch(() => {
              res.send("5");
            });
        }
      })
      .catch(() => {
        res.send("5");
      });
  } else res.send("5");
});
router.post("/getTeams", async (req, res) => {
  queries
    .getTeams(req.body.contest)
    .then((result) => {
      let teams = [];
      result = Object.values(JSON.parse(JSON.stringify(result)));
      result.forEach((element) => {
        teams.push({
          id: element.id,
          name: element.name,
          member1: element.member1,
          member2: element.member2,
          member3: element.member3,
          coach: element.coach,
          contest: element.contest,
        });
      });
      res.send(teams);
    })
    .catch((err) => res.send(err));
});

router.post("/addPracticeContest", async (req, res) => {
  let token = req.body.token;
  let data = helper.decryptData(token, process.env.SECRET_KEY);
  if (data) {
    queries
      .addPracticeContest(req.body.name, req.body.contest, req.body.link)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send("1"));
  } else res.send("1");
});
router.post("/getPracticeContests", async (req, res) => {
  console.log(req.body);
  queries
    .getPracticeContests(req.body.contest)
    .then((result) => {
      let contests = [];
      result = Object.values(JSON.parse(JSON.stringify(result)));
      result.forEach((element) => {
        contests.push({
          id: element.id,
          name: element.name,
          nationalcontest: element.nationalcontest,
          link: element.link,
        });
      });
      res.send(contests);
    })
    .catch((err) => res.send(err));
});
module.exports = router;
