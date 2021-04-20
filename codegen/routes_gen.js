const fs = require("fs");

const routes = (modelName) => `
const express = require("express");
const router = express.Router();
const { Op, Sequelize } = require("sequelize");

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const objs = await db.${modelName}.findAll();
      res.status(200).send(objs);
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  });

  router.get("/:pk", async (req, res) => {
    try {
      const obj = await db.${modelName}.findByPK(req.params.pk);
      if (obj === null) {
        res.status(404).send();
      } else res.status(200).send(obj);
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  });

  router.post("", async (req, res) => {
    try {
      await db.${modelName}.create(req.body);
      res.status(201);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      const obj = await db.${modelName}.findByPK(req.params.id);
      for (const prop in req.body) {
        obj[prop] = req.body[prop];
      }
      await obj.save();
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const obj = await db.${modelName}.findByPK(req.params.id);
      await obj.destroy();
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  });

  return router;
};
`;

const camelToSnakeCase = (str) => {
  const str2 = str.charAt(0).toLowerCase() + str.slice(1);
  return str2.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

const routes_gen = (gen_dir, apiObj) => {
  const routes_dir = gen_dir + "src/routes/";
  fs.mkdirSync(routes_dir);
  for (const model in apiObj.models) {
    fs.writeFileSync(
      routes_dir + `${camelToSnakeCase(model)}.js`,
      routes(model),
      (err) => {
        console.log(err);
      }
    );
  }
};

module.exports = routes_gen;
