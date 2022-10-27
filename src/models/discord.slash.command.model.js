// Import
const assert = require("assert")
const { SlashCommandBuilder } = require("discord.js")

// Middleware
class DiscordSlashCommand {
    constructor(command, callback) {
        assert(command instanceof SlashCommandBuilder);

        this.command = command;
        this.callback = callback;
    }

    get() { return this.command; }

    async execute(interaction, options) {
        return this.callback(interaction, options);
    }
}

module.exports = { DiscordSlashCommand };
