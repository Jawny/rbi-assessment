const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  player1: String,
  score1: Number,
  player2: String,
  score2: Number,
});

module.exports.TennisSchema = mongoose.model("score", schema);
