import './App.css';

import React from "react";
import MainPage from "./pages/MainPage";
import AppStateProvider from "./AppState";


function App() {
  return (
    <AppStateProvider>
      <div className="App">
        <MainPage />
      </div>
    </AppStateProvider>
  );
}

export default App;
