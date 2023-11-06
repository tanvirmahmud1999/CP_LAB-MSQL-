const express = require("express");
const router = express.Router();
const queries = require("../queries");
const helper = require("../helper");
require("dotenv").config();
router.get("/", (req, res) => {
  res.send({ data: "that's what you get" });
});
router.post("/", (req, res) => {
  let token = req.body.token;
  let data = helper.decryptData(token, process.env.SECRET_KEY);

  if (data) res.send(data);
  else res.send("1");
});
module.exports = router;
