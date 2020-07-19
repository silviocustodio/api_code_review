import { Switch, Route } from "react-router-dom";
import React from "react";
import "./App.css";

import { withStyles } from "@material-ui/core/styles";

import Header from "./Components/Header";
import SubHeader from "./Components/SubHeader"; // import CircularUnderLoad from "./LoaderSpinner";
import GameList from "./Components/GameList";
import AllReviews from "./Components/AllReviews";
import TopTrends from "./Components/TopTrends";

import CssBaseline from "@material-ui/core/CssBaseline";
class App extends React.Component {
  render() {
    return (
        <React.Fragment>
          <Header />
          <SubHeader />
          <CssBaseline />
                <Switch>
                  <Route exact path="/" component={GameList} />
                  <Route path="/home" component={GameList} />
                  <Route path="/allreviews" component={AllReviews} />
                  <Route path="/toptrends" component={TopTrends} />
                  <Route path="/test/gamelist" component={GameList} />
                </Switch>
        </React.Fragment>
    );
  }
}

export default (App);
