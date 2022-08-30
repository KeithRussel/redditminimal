import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Search from "./features/searchFilter/Search";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Search />
          <Content />
        </div>
      </div>
    </Router>
  );
}

export default App;
