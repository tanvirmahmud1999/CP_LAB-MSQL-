const express = require("express");
const router = express.Router();
const queries = require("../queries");
router.get("/", (req, res) => {
  res.send({ data: "that's what you get" });
});

module.exports = router;
