// Setup
require("dotenv").config();

// Import
const assert = require("assert");
const { Client, ActivityType, PresenceUpdateStatus } = require("discord.js");
const discordBot = require("../configs/discord.bot.json");
const discordCommands = require("../utils/discord.bot.slash.commands.util");

// Middleware
async function discordBotSetupCommands(client) {
    assert(client instanceof Client);

    for (const discordCommand of discordCommands)
        client.application.commands.create(discordCommand.get());
}

async function discordBotUpdateActivity(client) {
    assert(client instanceof Client);

    client.user.setPresence({
        activities: [
            {
                name: "/help",
                type: ActivityType.Listening,
                url: discordBot["bot.oauth"],
            },
        ],
        status: PresenceUpdateStatus.Online,
    });
}

module.exports = {
    discordBotSetupCommands,
    discordBotUpdateActivity,
};
