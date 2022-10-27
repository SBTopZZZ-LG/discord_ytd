// Setup
require("dotenv").config();

// Import
const express = require("express");
const cors = require("cors");

// Constants
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log("[start.express.script] Server listening on port", PORT));

// Routes
app.use(require("../routes/home.route"));
