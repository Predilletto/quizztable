import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import { getAuth, signInAnonymously, signOut } from "firebase/auth";

export default function LoginIcon() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const loginHandle = () => {
    const newWindow = window.open(
      "/",
      "firebase-login",
      "width=500,height=600"
    )!;
    newWindow.addEventListener("beforeunload", () => {
      console.log("Window closed");
    });
  };

  const logoutHandle = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      await signInAnonymously(auth);
      navigate("/home");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <div className="login-icon">
      <button onClick={user?.isAnonymous ? loginHandle : logoutHandle}>
        {user?.isAnonymous ? "Login" : "Logout"}{" "}
      </button>
    </div>
  );
}
