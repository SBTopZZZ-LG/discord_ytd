// Setup
require("dotenv").config();

// Import
const assert = require("assert");
const { Client } = require("discord.js");
const discordCommands = require("../utils/discord.bot.slash.commands.util");

// Middleware
async function discordBotSetupCommands(client) {
    assert(client instanceof Client);

    for (const discordCommand of discordCommands)
        client.application.commands.create(discordCommand.get());
}

module.exports = {
    discordBotSetupCommands,
};
