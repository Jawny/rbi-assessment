const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  scores: Array,
});

module.exports.TennisSchema = mongoose.model("score", schema);
