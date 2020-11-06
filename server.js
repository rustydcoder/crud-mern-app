const express = require("express");

const app = express();

const port = 8080;

app.use(express.static("static"));

app.get("/hello", (req, res) => {
  res.send("Hello Word");
});

app.listen(port, () => console.log("running on http://localhost:" + port));
