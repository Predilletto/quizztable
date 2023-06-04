import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import Home from "../Pages/Home/Home";
import CreateQuizPage from "../Pages/CreateQuizPage/CreateQuizPage";
import ListQuizPage from "../Pages/List-Quiz/ListQuizPage";
import PlayMatch from "../Pages/Play-Match/PlayMatch";
import Login from "../Pages/Login/Login";
import EditQuizPage from "../Pages/EditQuizPage/EditQuizPage";
import Protected from "./ProtectedRoute";
import { AuthContext } from "../Contexts/AuthContext";

export function Approutes() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/create-quiz"
          element={
            <Protected isAnon={user?.isAnonymous}>
              {" "}
              <CreateQuizPage />{" "}
            </Protected>
          }
        />
        <Route path="/list-quiz" element={<ListQuizPage />} />
        <Route path="/match/:id" element={<PlayMatch />} />
        <Route
          path="/edit/:id"
          element={
            <Protected isAnon={user?.isAnonymous}>
              <EditQuizPage />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
}
