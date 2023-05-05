import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../Pages/Home/Home";
import CreateQuizPage from "../Pages/CreateQuizPage/CreateQuizPage";
import ListQuizPage from "../Pages/List-Quiz/ListQuizPage";
import PlayMatch from "../Pages/Play-Match/PlayMatch";
import Login from "../Pages/Login/Login";

export function Approutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
        <Route path="/list-quiz" element={<ListQuizPage />} />
        <Route path="/match/:id" element={<PlayMatch />} />
      </Routes>
    </Router>
  );
}
