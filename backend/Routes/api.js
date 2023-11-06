const express = require("express");
const router = express.Router();
const queries = require("../queries");
const helper = require("../helper");
require("dotenv").config();
router.get("/", (req, res) => {
  res.send({ data: "that's what you get" });
});
router.post("/getUser", (req, res) => {
  let username = req.body.user;
  let userExists = queries.getlogininfoByUsername(username);
  userExists
    .then(async (result) => {
      if (result.length === 0) {
        res.send("1");
      } else {
        if (result[0].userType === 0) {
          let studentinfo = queries.getStudentInfo(username);
          studentinfo
            .then((student) => {
              if (student.length === 0) {
                res.send("3");
              } else {
                let handles = queries.getHandles(username);
                handles
                  .then((cfhandles) => {
                    let user = {
                      userType: result[0].userType,
                      userName: result[0].username,
                      email: result[0].email,
                      name: student[0].name,
                      phone: student[0].phoneNo,
                      reg: student[0].regNo,
                      handles: [],
                    };
                    cfhandles = Object.values(
                      JSON.parse(JSON.stringify(cfhandles))
                    );
                    cfhandles.forEach((element) => {
                      user.handles.push(element.handle);
                    });
                    res.send(user);
                  })
                  .catch(() => {});
              }
            })
            .catch(() => {
              res.send("3");
            });
        } else {
          let mentorInfo = queries.getMentorInfo(username);
          mentorInfo
            .then((mentor) => {
              if (mentor.length === 0) {
                res.send("3");
              } else {
                let handles = queries.getHandles(username);
                handles
                  .then((cfhandles) => {
                    let user = {
                      userType: result[0].userType,
                      userName: result[0].username,
                      email: result[0].email,
                      name: mentor[0].name,
                      phone: mentor[0].phoneNo,
                      handles: [],
                    };
                    cfhandles = Object.values(
                      JSON.parse(JSON.stringify(cfhandles))
                    );
                    cfhandles.forEach((element) => {
                      user.handles.push(element.handle);
                    });
                    res.send(user);
                  })
                  .catch(() => {});
              }
            })
            .catch(() => {
              res.send("3");
            });
        }
      }
    })
    .catch((err) => {
      res.send("3");
    });
});
router.post("/getStudents", async (req, res) => {
  queries
    .getStudents()
    .then((result) => {
      let students = [];
      result = Object.values(JSON.parse(JSON.stringify(result)));
      result.forEach((element) => {
        students.push({
          username: element.username,
          reg: element.regNo,
          phone: element.phoneNo,
        });
      });
      res.send(students);
    })
    .catch((err) => res.send(err));
});
router.post("/updateHandles", async (req, res) => {
  let handles = req.body.handles;
  let token = req.body.token;
  let data = helper.decryptData(token, process.env.SECRET_KEY);
  let cnt = handles.length;
  if (data) {
    queries.clearHandle(data.userName);
    handles.forEach((handle) => {
      queries
        .insertHandle(data.userName, handle)
        .then((result) => {
          cnt--;
          if (cnt === 0) res.send("1");
        })
        .catch((err) => {
          cnt--;
          if (cnt == 0) res.send("1");
        });
    });
  }
  res.send("1");
});

module.exports = router;
