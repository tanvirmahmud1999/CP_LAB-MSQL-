const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const queries = require("../queries");
const helper = require("../helper");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: "",
  database: process.env.DB_NAME,
});
router.get("/userExists", (req, res) => {
  let username = req.query.username;
  res.send(userExists(username));
});
router.post("/", (req, res) => {
  let user = req.body;
  let userExists = queries.getlogininfoByUsername(user.userName);
  userExists
    .then((result) => {
      if (result.length === 0) {
        let emailExists = queries.getlogininfoByEmail(user.email);
        emailExists
          .then((result) => {
            if (result.length === 0) {
              helper
                .hashPassword(user.password, process.env.SALT_ROUNDS)
                .then((hash) => {
                  queries.insertLoginInfo(user.userName, hash, user.email, 0);
                  queries.insertStudentInfo(
                    user.userName,
                    user.reg,
                    user.name,
                    user.phone
                  );
                  let data = {
                    userName: user.userName,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    reg: user.reg,
                  };
                  console.log("reg is done ****");
                  console.log(data);
                  res.send(helper.encryptData(data, process.env.SECRET_KEY));
                })
                .catch((err) => {
                  console.log("hashing error");
                  res.send("3");
                });
            } else {
              res.send("2");
            }
          })
          .catch((err) => {
            console.log(err);
            res.send("3");
          });
      } else {
        res.send("1");
      }
    })
    .catch((err) => {
      console.log("dhurru");
      res.send("3");
    });
});

router.post("/admin", (req, res) => {
  let user = req.body;
  console.log(user.password);
  let userExists = queries.getlogininfoByUsername(user.userName);
  userExists
    .then((result) => {
      if (result.length === 0) {
        let emailExists = queries.getlogininfoByEmail(user.email);
        emailExists
          .then((result) => {
            if (result.length === 0) {
              helper
                .hashPassword(user.password, process.env.SALT_ROUNDS)
                .then((hash) => {
                  queries.insertLoginInfo(user.userName, hash, user.email, 2);
                  queries.insertMentorInfo(
                    user.userName,
                    user.name,
                    user.phone
                  );
                  let data = {
                    userName: user.userName,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                  };
                  console.log("reg is done ****");
                  console.log(data);
                  res.send(helper.encryptData(data, process.env.SECRET_KEY));
                })
                .catch((err) => {
                  console.log("hashing error");
                  res.send("3");
                });
            } else {
              res.send("2");
            }
          })
          .catch((err) => {
            console.log(err);
            res.send("3");
          });
      } else {
        res.send("1");
      }
    })
    .catch((err) => {
      console.log("dhurru");
      res.send("3");
    });
});
module.exports = router;
