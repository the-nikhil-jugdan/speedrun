const fs = require("fs");

const model_template = (modelName, model_rep) => {
  let model_str = "{\n";

  for (const field in model_rep) {
    const fieldObj = model_rep[field];
    model_str += `  ${field}: {\n`;
    model_str += `  type: ${fieldObj["type"]},\n`;
    for (const prop in fieldObj) {
      if (prop === "type") continue;
      if (prop === "defaultValue") {
        if (fieldObj["type"] === "DataTypes.STRING") {
          model_str += `  defaultValue: "${fieldObj["defaultValue"]}",\n`;
          continue;
        }
        let defaultValue = "";
        if (fieldObj["type"] === "DataTypes.BOOLEAN") {
          const val = fieldObj["defaultValue"];
          if (val.toLowerCase() === "true") defaultValue = true;
          else defaultValue = false;
          continue;
        }
        model_str += `  defaultValue: ${defaultValue},\n`;
        continue;
      }
      if (prop === "references") {
        model_str += `  references: {\n`;
        for (const key in fieldObj[prop]) {
          model_str += `    ${key}: "${fieldObj[prop][key]}",\n`;
        }
        model_str += "  },\n";
        continue;
      }
      model_str += `  ${prop}: ${fieldObj[prop]},\n`;
    }
    model_str += "},\n";
  }

  model_str += "}";

  return (
    `const {Model} = require("sequelize");

class ${modelName} extends Model {}

module.exports = (sequelize, DataTypes) => 
  ${modelName}.init(` +
    model_str +
    `,{
  sequelize,
  modelName: "${modelName}",
  tableName: "${modelName}",
  }
);
    `
  );
};

const camelToSnakeCase = (str) => {
  const str2 = str.charAt(0).toLowerCase() + str.slice(1);
  return str2.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

const index = `
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
  );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
`;

const model_gen = (gen_dir, apiObj) => {
  const model_dir = gen_dir + "src/models/";
  fs.mkdirSync(model_dir);

  fs.writeFileSync(model_dir + "index.js", index, (err) => {
    console.log(`Error in creating Index`);
  });

  for (const model in apiObj.models) {
    const model_rep = {};
    const modelObj = apiObj.models[model];
    if (modelObj.primaryKey === "") {
      model_rep["id"] = {
        type: "DataTypes.INTEGER",
        primaryKey: true,
        autoIncrement: true,
      };
    }
    for (const field in modelObj.fields) {
      const fieldObj = modelObj.fields[field];
      const field_rep = {};
      field_rep.type = fieldObj.type;

      if (fieldObj.references !== null) {
        field_rep.references = { ...fieldObj.references };
      }

      if (fieldObj.defaultValue !== "") {
        field_rep.defaultValue = fieldObj.defaultValue;
      }

      if (fieldObj.unique === true) {
        field_rep.unique = true;
      }

      if (fieldObj.allowNull === true) {
        field_rep.allowNull = true;
      }

      if (fieldObj.fieldName === modelObj.primaryKey) {
        field_rep.primaryKey = true;
        if (field_rep.type === "DataTypes.INTEGER") {
          field_rep.autoIncrement = true;
        }
      }
      model_rep[field] = field_rep;
    }
    fs.writeFileSync(
      model_dir + `${camelToSnakeCase(model)}.js`,
      model_template(model, model_rep),
      (err) => {
        console.log(`Error in creating Model ${model}`);
      }
    );
  }
};

module.exports = model_gen;
