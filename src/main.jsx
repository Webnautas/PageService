import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="886975490267-kva3j3jshlomhhrotrdaap2fe89arooc.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    ;
  </StrictMode>
);
