const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./Routes/user");
const registrationRoute = require("./Routes/registration");
const loginRoute = require("./Routes/login");
const authRoute = require("./Routes/auth");
const apiRoute = require("./Routes/api");
const forumRoute = require("./Routes/forum");
const contestsRoute = require("./Routes/contests");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/registration", registrationRoute);
app.use("/login", loginRoute);
app.use("/auth", authRoute);
app.use("/forum", forumRoute);
app.use("/api", apiRoute);
app.use("/contests", contestsRoute);

app.listen(3001, () => {
  console.log("Yo bro,running server");
});
