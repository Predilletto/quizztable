import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ isAnon, children }: any) {
  if (isAnon) {
    alert("Precisa estar logado para acessar essa pagina ");
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;
