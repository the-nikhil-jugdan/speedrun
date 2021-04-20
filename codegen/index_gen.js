const fs = require("fs");

const index_template = `const express = require("express");
const app = express();
const db = require("./src/models/index");

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

`;

const camelToSnakeCase = (str) => {
  const str2 = str.charAt(0).toLowerCase() + str.slice(1);
  return str2.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

const index_gen = (gen_dir, apiObj) => {
  let gen_str = index_template;

  for (const model in apiObj.models) {
    const m_name = camelToSnakeCase(model);
    gen_str += `app.use("/api/${m_name}", require("./src/routes/${m_name}")(db));\n`;
  }

  gen_str += `
const PORT = process.env.PORT || 3050;
app.listen(PORT);`;

  fs.writeFileSync(gen_dir + "index.js", gen_str, (err) => {
    console.log(`Error in creating Index`);
  });
};

module.exports = index_gen;
