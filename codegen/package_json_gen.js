const fs = require("fs");
const template = (name) => `{
  "name": "${name}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "mariadb": "^2.5.3",
    "mssql": "^6.3.1",
    "mysql": "^2.18.1",
    "mysql2": "^2.2.5",
    "nodemon": "^2.0.7",
    "pg": "^8.6.0",
    "sequelize": "^6.3.5"
  },
  "scripts": {
    "devStart": "nodemon main.js",
    "start": "node ."
  }
}
`;

const pkg_gen = (gen_dir, apiObj) => {
  fs.writeFileSync(gen_dir + "package.json", template(apiObj.name), (err) => {
    console.log(`Error in creating Index`);
  });
};

module.exports = pkg_gen;
