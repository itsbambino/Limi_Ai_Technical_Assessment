import React, { useEffect, useState } from "react";
import "./HistoryTable.css";

const HistoryTable = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = () => {
      fetch("http://localhost:5000/sensor_data")
        .then((res) => res.json())
        .then((data) => setHistory(data))
        .catch((err) => console.log(err));
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="history-container">
      <div className="history-title">
        <span>SYSTEM LOGS</span>
        <span className="live-tag">● LIVE_FEED</span>
      </div>
      <table className="log-table">
        <thead>
          <tr>
            <th>TIMESTAMP</th>
            <th>NODE_ID</th>
            <th>STATUS</th>
            <th>GAS_LEVEL</th>
          </tr>
        </thead>
        <tbody>
          {history.map((row, idx) => (
            <tr key={idx} className={row.status === "critical" ? "row-critical" : ""}>
              <td className="text-mono">{new Date(row.time).toLocaleString()}</td>
              <td>{row.node}</td>
              <td style={{ color: row.status === "Normal" ? "#64ffda" : "#ff4d4d", fontWeight: "bold" }}>
                {row.status.toUpperCase()}
              </td>
              <td className="text-mono">{row.gas_level}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;