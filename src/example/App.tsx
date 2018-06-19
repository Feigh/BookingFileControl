import * as React from "react";
import "./App.scss";
import Hello from "./components/Hello";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to React</h2>
      </div>
      <Hello name="Bambi" />
    </div>
  );
}

export default App;
