import { FC, useContext } from "react";
import { FireContext } from "../App";
import classes from "../styles/Button.module.scss";

const SignOut: FC = () => {
  const { auth } = useContext(FireContext);
  return (
    auth.currentUser && (
      <button className={classes.Button} onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
};
export default SignOut;
