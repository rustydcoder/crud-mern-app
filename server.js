const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  MongoClient = require("mongodb").MongoClient;
port = 8080;

// Middlewares
app.use(express.static("static"));
app.use(bodyParser.json());

// Data
const issues = [
  {
    id: 1,
    status: "Open",
    owner: "Ravan",
    created: new Date("2016-08-15"),
    effort: 5,
    completionDate: undefined,
    title: "Error in console when clicking add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    created: new Date("2016-08-16"),
    effort: 14,
    completionDate: new Date("2016-08-30"),
    title: "Missing bottom border on panel",
  },
];

// Schema For Validation
const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};
const issueFieldType = {
  status: "required",
  owner: "required",
  effort: "optional",
  created: "required",
  completionDate: "optional",
  title: "required",
};

// Validation function
function validateIssue(issue) {
  for (const field in issueFieldType) {
    if (issueFieldType.hasOwnProperty(field)) {
      const type = issueFieldType[field];
      if (!type) {
        delete issue[field];
      } else if (type === "required" && !issue[field]) {
        return `${field} is required`;
      }
    }
  }

  if (!validIssueStatus[issue.status]) {
    return `${issue.status} is not a valid status`;
  }
}

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
  const err = validateIssue(newIssue);
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
