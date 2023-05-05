import React from "react";
import "./App.css";
import { Approutes } from "./Routes/AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Approutes />{" "}
      </AuthProvider>
    </div>
  );
}

export default App;
