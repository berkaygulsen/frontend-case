import React from "react";
import { useError } from "../../context/ErrorContext/error.hooks";
import "./ErrorMessage.css";

const ErrorMessage = () => {
  const { error } = useError();
  if (!error) return null;
  return (
    <div className="errorContainer">
      <div className="error">{error}</div>
    </div>
  );
};

export default ErrorMessage;
