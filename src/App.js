import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";
import Header from "./components/Header";
import WizardForm from "./components/WizardForm";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="d-flex align-items-center">
        <div className="container">
          <WizardForm />
        </div>
      </main>
    </div>
  );
}

export default App;
