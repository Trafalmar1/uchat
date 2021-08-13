import { FC, useContext } from "react";
import { FireContext } from "../App";
import classes from "../styles/Button.module.scss";

const SignIn: FC = () => {
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
export default SignIn;
