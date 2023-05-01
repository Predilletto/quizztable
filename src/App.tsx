import React from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import CreateQuizPage from "./Pages/CreateQuizPage/CreateQuizPage";
import { Approutes } from "./Routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <Approutes />
    </div>
  );
}

export default App;
