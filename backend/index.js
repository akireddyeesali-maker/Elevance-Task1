const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { connect } = require("./db");
const router = require("./Routes/index");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, this is Internshala Backend");
});

app.use("/api", router);

// Connect Database
connect();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});