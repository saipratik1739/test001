import React, { Component } from "react";
import AppProvider from "./app/state/app.state.management";
import AppRouter from "./app/routing/app.router";
import NavbarComponent from "./app/components/nav-bar/navbar.component";

class App extends Component {
  render() {
    return (
      <div>
        <AppProvider>
          <NavbarComponent />
          <AppRouter />
        </AppProvider>
      </div>
    );
  }
}

export default App;
