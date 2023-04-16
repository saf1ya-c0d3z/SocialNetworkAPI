const { getMaxListeners } = require("../models/Thoughts");

const users = [
  { userName: "billyjoe123", email: "billyjoe123@gmail.com", thoughts: [] },
  { userName: "niitasoline321", email: "niitasoline321@gmail.com", thoughts: [] },
  { userName: "ToriJone", email: "torijone@gmail.com", thoughts: [] },
];

const thoughts = [
  { thoughtText: "hello billy", userName: "niitasoline321", reactions: [{reactionBody: "hello niita, how are you?", userName: "billyjoe123"}] },
  { thoughtText: "whats up niita", userName: "ToriJone", reactions: [{reactionBody: "not much Tori, hbu?", userName: "niitasoline321"}] },
  { thoughtText: "goodnight", userName: "billyjoe123", reactions: [{reactionBody: "goodnight billy", userName: "ToriJone"}] },
];

module.exports = { users, thoughts };
