import React from "react";
import Selector from "./Selector";
import "../styles/App.css";

function App() {
  const testPrefecture = { prefectures: ["a", "b", "c"] };

  return (
    <div className="App">
      <Selector {...testPrefecture} />
    </div>
  );
}

export default App;
