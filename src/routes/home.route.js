// Import
const Router = require("express").Router();

// Middleware
Router.get("/", async (_, res) => res.status(200).send("Server running"));

module.exports = Router;
