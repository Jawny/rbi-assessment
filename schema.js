const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  player: String,
  score: Number,
});

module.exports.TennisSchema = mongoose.model("score", schema);
