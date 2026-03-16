const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const sensorSchema = new mongoose.Schema({
  node: String,
  status: String,
  gas_level: Number,
  time: Date,
});

const Sensor = mongoose.model("Sensor", sensorSchema, "sensor_data");

mongoose.connect(
  "mongodb+srv://javeria:march2004@cluster0.wdwvqko.mongodb.net/limi_ai?retryWrites=true&w=majority"
)
  .then(() => console.log("MongoDB connected to limi_ai"))
  .catch(err => console.log("MongoDB connection error:", err));

app.get("/sensor_data", async (req, res) => {
  try {
    console.log("Request received for sensor_data");

    const data = await Sensor.find().sort({ time: -1 }).limit(50);

    console.log("Data from MongoDB:", data);

    const formatted = data.map(doc => ({
      node: doc.node || "Unknown",
      status: doc.status ? doc.status.toLowerCase() : "unknown",
      gas_level: doc.gas_level || 0,
      time: doc.time ? doc.time.toISOString() : new Date().toISOString(),
    }));

    console.log("Sending formatted data:", formatted);

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching sensor data:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));