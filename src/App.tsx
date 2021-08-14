import "styles/App.scss";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";

import { SignIn, SignOut } from "components/Authentication";
import Chat from "components/Chat";
import { createContext } from "react";

import { firebaseConfig } from "firebaseConfig";

import classes from "styles/Chat/Chat.module.scss";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const contextConfig = {
  auth,
  firestore,
  firebase,
  analytics,
};
export const FireContext = createContext(contextConfig);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <FireContext.Provider value={contextConfig}>
          {!user ? (
            <SignIn />
          ) : (
            <div className={classes.ChatWrapper}>
              <SignOut />
              <Chat />
            </div>
          )}
        </FireContext.Provider>
      </header>
    </div>
  );
}

export default App;
