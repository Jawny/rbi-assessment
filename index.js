const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { TennisSchema } = require("./schema");
const { GetDatabaseData } = require("./utils/getDatabaseData");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

// Connect to mongoDB
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.a09hu.mongodb.net/rbi?retryWrites=true&w=majority`,
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

// READ: return all documents in database
app.get("/get", async (req, res) => {
  const databaseData = await GetDatabaseData();
  await res.send(databaseData);
});

// CREATE: create a new document with scores [0,0] and return the document data
app.post("/create", async (req, res) => {
  TennisSchema.create({ scores: [0, 0] }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

// UPDATE: update document by id. Update the scores in database from request.
app.post("/post", async (req, res) => {
  const { scores, id } = req.body;
  console.log(scores, id);

  TennisSchema.findOneAndUpdate(
    { _id: id },
    { scores },
    { upsert: true, new: true }
  ).then((result) => {
    res.status(200).json(result);
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
