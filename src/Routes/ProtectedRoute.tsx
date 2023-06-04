import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Protected({ isAnon, children }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAnon) {
      alert("Precisa estar logado para acessar essa página");
      navigate("/");
    }
  }, [isAnon]);

  if (isAnon) {
    return null;
  }
  return children;
}
export default Protected;
