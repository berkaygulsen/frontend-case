import { ErrorContext, ErrorContextData } from "./error.context";
import { useContext } from "react";

export const useError = (): ErrorContextData => useContext(ErrorContext);
