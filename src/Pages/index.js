import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import CreateUser from "./User";
import CreateItem from "./Item";
import EditItem from "./EditItem";
import ItemsList from "./Items";

export default class index extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <br />
          <Switch>
            <Route exact path="/">
              <ItemsList />
            </Route>
            <Route path="/create">
              <CreateItem />
            </Route>
            <Route
              path="/update/:id"
              render={(props) => <EditItem {...props} />}
            />
            <Route path="/user">
              <CreateUser />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
