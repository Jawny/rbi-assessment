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
  const { player, score } = req.body;
  console.log(player, score);

  if (typeof player != String && typeof score != Number) {
    res.sendStatus(400);
    return;
  }

  await TennisSchema.updateMany(
    { player: player },
    { $set: { score: score } },
    { upsert: true }
  );
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
