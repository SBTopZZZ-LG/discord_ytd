// Setup
require("dotenv").config();

// Import
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { exec } = require("child_process");

// Constants
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
    ],
});
const { DISCORD_BOT_AUTH_TOKEN } = process.env;
const CONNECTION_TIMEOUT = 60;
let connectionTimeout = null;

// Middleware
connectionTimeout = setTimeout(() => {
    try {
        exec("kill 1");
    } catch (error) {
        console.error("[connect.discord.bot.util]", error);
    }
}, CONNECTION_TIMEOUT * 1000);
client.login(DISCORD_BOT_AUTH_TOKEN)
    .then(() => {
        clearTimeout(connectionTimeout);
        connectionTimeout = null;

        console.log("[connect.discord.bot.util] Discord bot logged in");
    })
    .catch(error => {
        console.error("[connect.discord.bot.util]", error);
        process.exit(1);
    });

module.exports = client;
