import DBObject from "./db_object";
class API {
  constructor() {
    this.name = "";
    this.models = new Map();
    const dbConnObj = new DBObject();
    this.username = dbConnObj.username;
    this.password = dbConnObj.password;
    this.database = dbConnObj.database;
    this.host = dbConnObj.host;
    this.dialect = dbConnObj.dialect;
  }
}

export default API;
