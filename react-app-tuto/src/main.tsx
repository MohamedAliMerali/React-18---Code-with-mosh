import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

// Here we are using ReactDOM to render the component tree down below
// inside the element of the id of the root
ReactDOM.createRoot(document.getElementById("root")!).render(
  // we can also render this component tree in a mobile app using
  // another library called React Native
  <React.StrictMode>
    {/* this is the component tree*/}
    {/* This one of the built-in components in React, 
    // doesn't have a visual representation,
    // Its purpose is to identify any potential problem */}
    <App />
  </React.StrictMode>
  // we're taking this tree in rendering or displaying it
  // inside an element with the id of root using ReactDOM library
);
