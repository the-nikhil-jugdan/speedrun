import React from "react";
import { Switch, Route } from "react-router";
import Home from "../components/home";
import ModelView from "../components/modelView";
import AddModel from "../components/addModel";

export default function index() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Home props={props} />} />
      <Route
        exact
        path="/models"
        render={(props) => <ModelView props={props} />}
      />
      <Route
        exact
        path="/model/:name"
        render={(props) => <AddModel {...props} />}
      />
    </Switch>
  );
}
