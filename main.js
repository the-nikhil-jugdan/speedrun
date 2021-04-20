const express = require("express");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res, next) => {
  res.send("SERVER RUNNING SUCCESSFULLY");
});

app.post("/", (req, res, next) => {
  console.log(req.body);
});

const PORT = 3003;
app.listen(PORT);
