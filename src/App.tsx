import React from "react";
import "./App.css";
import MultiSelect from "./components/MultiSelect";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { ErrorContextProvider } from "./context/ErrorContext/error.context";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ErrorContextProvider>
          <ErrorMessage />
          <MultiSelect />
        </ErrorContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
