import React, { Component } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Fabric>
        <div className="main-app">
          <div className="player">
            <em>player</em>
          </div>

          <div className="sidebar">
            <Header />
            <Sidebar />
          </div>
          <div className="main">
            <em>main</em>
          </div>
        </div>
      </Fabric>
    );
  }
}

export default App;
