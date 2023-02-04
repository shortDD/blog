import React, { useEffect } from "react";
import { Routes } from "./routes";
import { initTheme } from "./utils";
function App() {
  useEffect(() => {
    initTheme();
  }, []);
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
