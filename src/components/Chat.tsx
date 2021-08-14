import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { FC, useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FireContext } from "App";
import TextArea from "components/TextArea";

import classes from "styles/Chat/Chat.module.scss";
import { Fragment } from "react";

export type Message = {
  text: string;
  createdAt: Date;
  uid: string;
  photoURL: string;
  id: string;
};

const ChatMessage: FC<Message> = ({ text, uid, photoURL, id }) => {
  const { auth } = useContext(FireContext);

  const messageClass = uid === auth?.currentUser?.uid ? "" : classes.Received;
  return (
    <div className={`${classes.Message} ${messageClass}`}>
      <p>
        {text.split("\\n").map((text, index) => (
          <Fragment key={id + text + index}>
            {text}
            <br />
          </Fragment>
        ))}
      </p>
      <img src={photoURL} alt="avatar" />
    </div>
  );
};

const Chat: FC = () => {
  const { firestore, auth, firebase } = useContext(FireContext);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");
  const [messages] = useCollectionData<any>(query, { idField: "id" });
  const [loaded, setLoaded] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<string>("");
  const bottomDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages && !loaded) {
      bottomDiv.current?.scrollIntoView();
      setLoaded(true);
    } else {
      bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loaded]);

  const sendMessage = async () => {
    const { uid, photoURL } = auth.currentUser as {
      uid: string;
      photoURL: string;
    };

    if (formValue.trim() === "") return;
    const input = formValue.trim().replaceAll("\n", "\\n");
    setFormValue("");

    await messagesRef.add({
      text: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className={classes.Chat}>
      <div className={classes.Messages}>
        {!!messages &&
          messages.map((msg: Message) => <ChatMessage key={msg.id} {...msg} />)}
        <div ref={bottomDiv} />
      </div>
      <form onSubmit={submitHandler} className={classes.FormControls}>
        <TextArea
          setValue={setFormValue}
          value={formValue}
          onKeyPress={sendMessage}
        />
        <button className={classes.SendButton} type={"submit"}>
          Send
        </button>
      </form>
    </div>
  );
};
export default Chat;
