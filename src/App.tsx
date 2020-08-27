import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Dashboard } from "./routes/Dashboard";
import { Home } from "./routes/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path={["/projects/:id", "/projects"]} component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
