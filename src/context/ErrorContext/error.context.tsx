import React, { createContext, FC, useState } from "react";

export type ErrorContextData = {
  error: string | null;
  setError: (error: string | null) => void;
  removeError: () => void;
};

export type ErrorContextProviderProps = {
  children: React.ReactNode;
};

export const ErrorContext = createContext<ErrorContextData>({
  error: null,
  setError: () => {},
  removeError: () => {},
});

export const ErrorContextProvider: FC<ErrorContextProviderProps> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);
  const removeError = () => setError(null);

  const value = {
    error,
    setError,
    removeError,
  };
  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
