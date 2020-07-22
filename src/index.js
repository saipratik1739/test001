import "babel-polyfill"; // this need to be at first position always otherwise app will NOT load in IE 11.
import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";

import "./index.scss";
import DefaultTheme from "./theme.json";

const theme = createMuiTheme(DefaultTheme);

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
