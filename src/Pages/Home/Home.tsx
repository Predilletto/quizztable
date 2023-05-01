import React from "react";
import Header from "../../Components/Header/Header";
import "./Home.css";
import Menu from "../../Components/Menu/Menu";

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <Menu />
    </div>
  );
}
