import { FC } from "react";

import useTextArea, { TextAreaProps } from "./useTextArea";

import classes from "styles/Chat/Form.module.scss";

const TextArea: FC<TextAreaProps> = ({ value, setValue, onKeyPress }) => {
  const { handleChange, keyDownHandler, rows } = useTextArea({
    value,
    setValue,
    onKeyPress,
  });

  return (
    <textarea
      onKeyDown={keyDownHandler}
      rows={rows}
      className={classes.Input}
      placeholder={"Write a message..."}
      value={value}
      onChange={handleChange}
    />
  );
};
export default TextArea;
