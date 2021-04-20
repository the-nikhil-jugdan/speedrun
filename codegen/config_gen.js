const fs = require("fs");

const config_gen = (gen_dir, apiObj) => {
  const dbOptions = {};
  dbOptions.username = apiObj.username;
  dbOptions.password = apiObj.password;
  dbOptions.database = apiObj.database;
  dbOptions.host = apiObj.host;
  dbOptions.dialect = apiObj.dialect;
  const content = `{
  "development": {
    "username": "${dbOptions.username}",
    "password": "${dbOptions.password}",
    "database": "${dbOptions.database}",
    "host": "${dbOptions.host}",
    "dialect": "${dbOptions.dialect}"
  }
}`;
  fs.writeFileSync(gen_dir + "config.json", content, (err) => {
    console.log(err);
  });
};

module.exports = config_gen;
