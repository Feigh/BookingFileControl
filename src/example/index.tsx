import Application from "./containers/Application";
import configureStore from "./store/";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.scss";

const store = configureStore({
  enthusiasmLevel: 1,
  languageName: "Meep"
});

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
