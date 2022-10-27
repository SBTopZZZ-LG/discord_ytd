// Setup
require("dotenv").config();

// Import
const { Client, GatewayIntentBits, Partials } = require("discord.js");

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

// Middleware
client.login(DISCORD_BOT_AUTH_TOKEN)
    .then(() => console.log("[connect.discord.bot.util] Discord bot logged in"))
    .catch(error => {
        console.error("[connect.discord.bot.util]", error);
        process.exit(1);
    });

module.exports = client;
