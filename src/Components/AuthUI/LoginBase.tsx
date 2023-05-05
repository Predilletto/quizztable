import React, { useContext, useEffect, useState } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../../utils/Storage";
import { AuthContext } from "../../Contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";

firebase.initializeApp(firebaseConfig);

export function LoginBase() {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(".firebase-auth-container", {
      signInFlow: "popup",
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: "/home",
    });
  }, []);

  return <div className="firebase-auth-container"> </div>;
}
