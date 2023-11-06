const express = require("express");
const router = express.Router();
const queries = require("../queries");
const helper = require("../helper");
require("dotenv").config();
router.get("/", (req, res) => {
  res.send({ data: "that's what you get" });
});
router.post("/postToServer", async (req, res) => {
  let token = req.body.token;
  let data = helper.decryptData(token, process.env.SECRET_KEY);
  if (data) {
    queries
      .addPost(data.userName, req.body.title, req.body.post)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send("1"));
  } else res.send("1");
});
router.post("/getPosts", async (req, res) => {
  queries
    .getPosts()
    .then((result) => {
      let posts = [];
      result = Object.values(JSON.parse(JSON.stringify(result)));
      result.forEach((element) => {
        posts.push({
          id: element.id,
          author: element.author,
          title: element.title,
          content: element.content,
          time: element.time,
        });
      });
      res.send(posts);
    })
    .catch((err) => res.send(err));
});
router.post("/getPost", async (req, res) => {
  let id = req.body.id;
  queries
    .getPost(id)
    .then((result) => {
      if (result.length > 0) {
        let post = {
          id: result[0].id,
          author: result[0].author,
          title: result[0].title,
          content: result[0].content,
          time: result[0].time,
        };
        res.send(post);
      } else res.send("1");
    })
    .catch((err) => res.send("1"));
});
router.post("/addComment", async (req, res) => {
  let token = req.body.token;
  let data = helper.decryptData(token, process.env.SECRET_KEY);
  let comment = req.body.comment;
  let parent = req.body.parent;
  if (data) {
    queries
      .addComment(data.userName, comment, parent)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  } else {
    res.send("1");
  }
});
router.post("/getComment", async (req, res) => {
  let id = req.body.id;
  queries
    .getComment(id)
    .then((result) => {
      let comment = {
        id: result.id,
        author: result.author,
        content: result.content,
        time: result.time,
        parent: result.parent,
      };
      res.send(comment);
    })
    .catch((err) => res.send(err));
});
router.post("/addReply", async (req, res) => {
  let token = req.body.token;
  let data = helper.decryptData(token, process.env.SECRET_KEY);
  let reply = req.body.reply;
  let parent = req.body.parent;
  if (data) {
    queries
      .addReply(data.userName, reply, parent)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  } else res.send("1");
});
router.post("/getReply", async (req, res) => {
  let id = req.body.id;
  queries
    .getReply(id)
    .then((res) => {
      let reply = {
        id: result.id,
        author: result.author,
        content: result.content,
        time: result.time,
        parent: result.parent,
      };
      res.send(reply);
    })
    .catch((err) => res.send(err));
});
router.post("/getChildlComments", async (req, res) => {
  let parent = req.body.parent;

  queries
    .getChildComments(parent)
    .then((result) => {
      let comments = [];
      result = Object.values(JSON.parse(JSON.stringify(result)));
      result.forEach((element) => {
        comments.push({
          id: element.id,
          author: element.author,
          content: element.content,
          time: element.time,
        });
      });
      res.send(comments);
    })
    .catch((err) => res.send(err));
});
router.post("/getChildlReplies", async (req, res) => {
  let par = req.body.par;

  queries
    .getChildReplies(par)
    .then((result) => {
      let replies = [];
      result = Object.values(JSON.parse(JSON.stringify(result)));
      result.forEach((element) => {
        replies.push({
          id: element.id,
          author: element.author,
          content: element.content,
          time: element.time,
        });
      });
      res.send(replies);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
