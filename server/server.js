const express = require("express"),
  bodyParser = require("body-parser"),
  MongoClient = require("mongodb").MongoClient;

const Issue = require("./issue.js");

const app = express(),
  port = 3000;

// Middlewares
app.use(express.static("static"));
app.use(bodyParser.json());

// Request Made
app.get("/api/issues", (req, res) => {
  db.collection("issues")
    .find()
    .toArray()
    .then((issues) => {
      const metadata = { total_count: issues.length };
      res.json({ _metadata: metadata, records: issues });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.post("/api/issues", (req, res) => {
  const newIssue = req.body;

  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = "New";

  // error handling or 400 status code
  const err = Issue.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: ` Invalid request, ${err}` });
    return;
  }

  db.collection("issues")
    .insertOne(newIssue)
    .then((result) =>
      db.collection("issues").find({ _id: result.insertedId }).limit(1).next()
    )
    .then((newIssue) => res.json(newIssue))
    .catch((err) =>
      res.status(500).json({ message: ` Internal Server Error, ${err}` })
    );
});

let db;
MongoClient.connect("mongodb://localhost/issuetracker")
  .then((connection) => {
    db = connection;
    app.listen(port, () => {
      console.log("running on http://localhost:" + port);
    });
  })
  .catch((error) => {
    console.log("ERROR:", error);
  });
