import './App.css';

import React from "react";
import MainPage from "./pages/MainPage";
import AppStateProvider from "./AppState";


function App() {
  return (
    <div className="App">
      <AppStateProvider>
        <MainPage />
      </AppStateProvider>
    </div>
  );
}

export default App;
