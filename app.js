// Start express server
require("./src/scripts/start.express.script");

// Discord bot login
const client = require("./src/utils/connect.discord.bot.util");

// Error logging
client.on('error', (error) => console.error("[app]", error));

// Discord bot setup
client.once('ready', async () => {
    // Setup discord bot commands, if needed
    // await require("./src/scripts/setup.discord.bot.script").discordBotSetupCommands(client);

    // Update discord bot activity
    await require("./src/scripts/setup.discord.bot.script").discordBotUpdateActivity(client);

    // Setup interactions
    const discordCommands = require("./src/utils/discord.bot.slash.commands.util");
    const discordInteractions = require("./src/utils/discord.bot.interactions.util");
    client.on('interactionCreate', async ic => {
        try {
            if (!ic.customId) {
                // Slash command

                const commandName = ic.commandName;

                const discordCommand = discordCommands.find(discordCommand => discordCommand.get().name === commandName);
                if (discordCommand === undefined) return;

                const options = ic.options._hoistedOptions.reduce((obj, option) => {
                    obj[option.name] = option;
                    return obj;
                }, {});
                return await discordCommand.execute(ic, options);
            } else {
                // Embed interaction

                const customId = ic.customId;

                const discordInteraction = discordInteractions.find(interaction => interaction.regex.test(customId));
                if (discordInteraction === undefined) return;

                return await discordInteraction.execute(ic);
            }
        } catch (error) {
            console.error("[app]", error);
        }
    });
});
