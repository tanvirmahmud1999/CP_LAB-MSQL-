import Axios from "axios";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
//Stores data into local storage
export function storeData(name, data) {
  localStorage.setItem(name, data);
}
//Access data from local storage
export function getData(name) {
  return localStorage.getItem(name);
}
//Erases data from local storage
export function eraseData(name) {
  console.log(localStorage.getItem(name));
  localStorage.removeItem(name);
}

//Returns ture if val is alphanumeric
export function alphanumeric(val) {
  return (
    (val >= "a".charCodeAt(0) && val <= "z".charCodeAt(0)) ||
    (val >= "A".charCodeAt(0) && val <= "Z".charCodeAt("0")) ||
    (val >= "0".charCodeAt(0) && val <= "9".charCodeAt(0))
  );
}
//Converts content into html
export function decodePost(post) {
  let data = JSON.parse(post);
  data = convertFromRaw(data);
  data = stateToHTML(data);
  return data;
}
//Returns 1 if user not defined or null
export async function isLoggedIn() {
  let user = getData("current_user");
  if (user === null || user === undefined) return 1;
  else
    return await Axios.post("http://localhost:3001/auth", {
      token: getData("current_user"),
    }).then((response) => response.data);
}

//Returns 1 if user not defined or null
//Returns 3 if database error occurs
export async function getUser(username) {
  if (username === null || username === undefined) return 1;
  else
    return await Axios.post("http://localhost:3001/api/getUser", {
      user: username,
    }).then((response) => response.data);
}
export async function getStudents() {
  return await Axios.post("http://localhost:3001/api/getStudents").then(
    (response) => response.data
  );
}

export async function updateHandles(handles) {
  if (handles === null || handles === undefined) return 1;
  else
    return await Axios.post("http://localhost:3001/api/updateHandles", {
      handles: handles,
      token: getData("current_user"),
    }).then((response) => response.data);
}

export async function postToServer(title, post) {
  return await Axios.post("http://localhost:3001/forum/postToServer", {
    title: title,
    post: JSON.stringify(post),
    token: getData("current_user"),
  }).then((response) => response.data);
}
export async function getPosts() {
  return await Axios.post("http://localhost:3001/forum/getPosts").then(
    (response) => response.data
  );
}
export async function commentToServer(parent, comment) {
  return await Axios.post("http://localhost:3001/forum/addComment", {
    comment: JSON.stringify(comment),
    token: getData("current_user"),
    parent: parent,
  }).then((response) => response.data);
}
export async function getPost(postid) {
  return await Axios.post("http://localhost:3001/forum/getPost", {
    id: postid,
  }).then((response) => response.data);
}
export async function getChildComments(id) {
  console.log(id);
  return await Axios.post("http://localhost:3001/forum/getChildlComments", {
    parent: id,
  }).then((response) => response.data);
}
export async function getChildReplies(id) {
  console.log(id);
  return await Axios.post("http://localhost:3001/forum/getChildlReplies", {
    parent: id,
  }).then((response) => response.data);
}
export async function getNationalContest(id) {
  return await Axios.post("http://localhost:3001/contests/getNationalContest", {
    id: id,
  }).then((response) => response.data);
}
export async function getNationalContests() {
  return await Axios.post(
    "http://localhost:3001/contests/getNationalContests",
    {}
  ).then((response) => response.data);
}
export async function addNationalContest(name, time) {
  return await Axios.post("http://localhost:3001/contests/addNationalContest", {
    token: getData("current_user"),
    name: name,
    time: time,
  }).then((response) => response.data);
}
export async function createTeam(
  name,
  member1,
  member2,
  member3,
  coach,
  contest
) {
  return await Axios.post("http://localhost:3001/contests/createTeam", {
    token: getData("current_user"),
    name: name,
    member1: member1,
    member2: member2,
    member3: member3,
    coach: coach,
    contest: contest,
  }).then((response) => response.data);
}
export async function getTeams(contest) {
  return await Axios.post("http://localhost:3001/contests/getTeams", {
    contest: contest,
  }).then((response) => response.data);
}

export async function getPracticeContests(contest) {
  return await Axios.post(
    "http://localhost:3001/contests/getPracticeContests",
    { contest: contest }
  ).then((response) => response.data);
}
export async function addPracticeContest(name, contest, link) {
  return await Axios.post("http://localhost:3001/contests/addPracticeContest", {
    token: getData("current_user"),
    name: name,
    contest: contest,
    link: link,
  }).then((response) => response.data);
}

export function timeSince(time) {
  let cur = Date.now();
  cur = Math.floor(cur / 1000);
  let dif = cur - time;
  console.log(dif);
  dif = Math.floor(dif / 60);
  if (dif <= 120) {
    return dif + " minutes ago";
  } else {
    dif = Math.round(dif / 60);
    if (dif <= 48) {
      return dif + " hours ago";
    } else {
      dif = Math.round(dif / 24);
      if (dif <= 360) return dif + " days ago";
    }
  }
  dif = Math.round(dif / 360);
  return dif + " years ago";
}
