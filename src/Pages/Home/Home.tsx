import React, { useContext } from "react";
import Header from "../../Components/Header/Header";
import "./Home.css";
import Menu from "../../Components/Menu/Menu";
import { LoginBase } from "../../Components/AuthUI/LoginBase";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <Menu />
    </div>
  );
}
