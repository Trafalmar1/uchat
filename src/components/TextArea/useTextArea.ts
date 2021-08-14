import { useEffect, useState } from "react";

export interface TextAreaProps {
  value: string;
  setValue: (v: string) => void;
  onKeyPress: VoidFunction;
}

const useTextArea = ({ value, setValue, onKeyPress }: TextAreaProps) => {
  const [textArea, setTextArea] = useState({
    value: value,
    rows: 1,
    minRows: 1,
    maxRows: 5,
  });

  useEffect(() => {
    if (value === "") {
      setTextArea((prev) => ({ ...prev, rows: 1 }));
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 30;
    const { minRows, maxRows } = textArea;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }
    setValue(event.target.value);
    setTextArea((prev) => ({
      ...prev,
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    }));
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.shiftKey && event.key === "Enter") {
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      onKeyPress();
    }
  };

  return {
    value: textArea.value,
    rows: textArea.rows,
    handleChange,
    keyDownHandler,
  };
};
export default useTextArea;
