import React from "react";
import "./Node.css";

const Node = ({ name, status }) => {
  const isOk = status === "Normal" || status === "Online";

  return (
    <div className={`node-card ${!isOk ? "error" : ""}`}>
      <div className="status-indicator">
        <span className={`dot ${!isOk ? "blink" : ""}`}></span>
        <span className="status-meta">{isOk ? "SECURE" : "WARNING"}</span>
      </div>

      <h3 className="node-name">{name}</h3>

      <div className="status-label">
        {status.toUpperCase()}
      </div>

      {!isOk && (
        <div className="error-alert">LINK_LOST_RETRYING...</div>
      )}
    </div>
  );
};

export default Node;