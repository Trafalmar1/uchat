import { FC, useContext } from "react";
import { FireContext } from "App";
import classes from "styles/Button/Button.module.scss";

export const SignIn: FC = () => {
  const { auth, firebase } = useContext(FireContext);
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <button className={classes.Button} onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
};

export const SignOut: FC = () => {
  const { auth } = useContext(FireContext);
  return (
    auth.currentUser && (
      <button className={classes.Button} onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
};
