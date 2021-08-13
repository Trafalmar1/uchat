import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { FC, useContext, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FireContext } from "../App";

import classes from "../styles/Chat.module.scss";

interface MsgProps {
  message: { text: string; uid: string; photoURL: string };
}

const ChatMessage: FC<MsgProps> = ({ message }) => {
  const { auth } = useContext(FireContext);
  const { text, uid, photoURL } = message;

  const messageClass = uid === auth?.currentUser?.uid ? "" : classes.Received;
  return (
    <div className={`${classes.Message} ${messageClass}`}>
      <p>{text}</p>
      <img src={photoURL} alt="avatar" />
    </div>
  );
};

const Chat: FC = () => {
  const { firestore, auth, firebase } = useContext(FireContext);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query);
  const [formValue, setFormValue] = useState<string>("");
  const bottomDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const textInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValue(e.currentTarget.value);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser as {
      uid: string;
      photoURL: string;
    };
    if (formValue.trim() === "") return;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
    setFormValue("");
  };

  return (
    <div className={classes.Chat}>
      <div className={classes.Messages}>
        {!!messages &&
          messages.map((msg: any) => (
            <ChatMessage key={msg.createdAt} message={msg} />
          ))}
        <div ref={bottomDiv} />
      </div>
      <form onSubmit={sendMessage} className={classes.FormControls}>
        <input
          className={classes.Input}
          placeholder={"Write a message..."}
          value={formValue}
          onChange={textInputHandler}
        />
        <button className={classes.SendButton} type={"submit"}>
          Send
        </button>
      </form>
    </div>
  );
};
export default Chat;
