const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { TennisSchema } = require("./schema");
const { GetDatabaseData } = require("./utils/getDatabaseData");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@reddit-news.d07dt.mongodb.net/reddit-news?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;

    console.log("Successfully connected to MongodDB");
  }
);

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get("/get", async (req, res) => {
  const databaseData = await GetDatabaseData();
  await res.send(databaseData);
});

app.post("/post", async (req, res) => {
  const { player1, score1, player2, score2 } = req.body;

  if (
    typeof player1 != "string" ||
    typeof score1 != "number" ||
    typeof player2 != "string" ||
    typeof score2 != "number"
  ) {
    res.sendStatus(400);
    return;
  }

  await TennisSchema.updateMany(
    { player1: player1 },
    { $set: { player2: player2, score1: score1, score2: score2 } },
    { upsert: true }
  );
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
