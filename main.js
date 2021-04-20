const express = require("express");
const app = express();
const fs = require("fs");
const config_gen = require("./codegen/config_gen");
const model_gen = require("./codegen/model_gen");
const routes_gen = require("./codegen/routes_gen");

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
  const apiObj = req.body;
  const models = apiObj.models;
  const gen_dir = "./gen/";
  if (fs.existsSync(gen_dir)) {
    fs.rmdirSync(gen_dir, { recursive: true });
  }
  fs.mkdirSync(gen_dir);
  config_gen(gen_dir, apiObj);
  model_gen(gen_dir, apiObj);
  routes_gen(gen_dir, apiObj);
});

const PORT = 3003;
app.listen(PORT);
