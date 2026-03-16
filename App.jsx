import React from "react";
import NetworkMap from "./components/NetworkMap";
import HistoryTable from "./components/HistoryTable";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Limi Guardian</h1>
        <p className="dashboard-subtitle">Hardware Connectivity & Safety Monitor</p>
      </header>

      <main className="dashboard-content">
        <NetworkMap />
        <HistoryTable />
      </main>
    </div>
  );
}

export default App;