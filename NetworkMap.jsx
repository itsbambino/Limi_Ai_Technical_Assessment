import React, { useEffect, useState } from "react";
import Node from "./Node";

const nodesList = ["Ceiling", "Floor", "Wall", "Table"];

const NetworkMap = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch("http://localhost:5000/sensor_data")
      .then((res) => res.json())
      .then((data) => {
        setSensorData(data);
        setLoading(false);
      })
      .catch((err) => console.error("Network Map Fetch Error:", err));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px"
  };

  if (loading) return <div className="loading-text">Synchronizing Network...</div>;

  return (
    <section>
      <h2 style={{ textAlign: "center", color: "#64ffda", marginBottom: "30px" }}>Live Connectivity Map</h2>
      <div style={containerStyle}>
        {nodesList.map((nodeName) => {
          const latestRecord = sensorData.find((d) => d.node === nodeName);
          const displayStatus = latestRecord ? "Online" : "Offline";
          return <Node key={nodeName} name={nodeName} status={displayStatus} />;
        })}
      </div>
    </section>
  );
};

export default NetworkMap;