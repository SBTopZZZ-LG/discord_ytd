// Import
const {
    SlashCommandBuilder,
    SlashCommandStringOption,
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
    SelectMenuOptionBuilder,
} = require("discord.js");
const { DiscordSlashCommand } = require("../models/discord.slash.command.model");
const { YouTubeVideo } = require("../models/youtube.video.model");
const discordBot = require("../configs/discord.bot.json");

// Constants
const youtubeUrlRegex = /^https?\:\/\/(?:www\.)?youtube\.com\/watch\?v\=(?<code>.{11})$/i;

// Middleware
function getYoutubeVideoInfo() {
    const command = new SlashCommandBuilder()
        .setName("info")
        .setDescription("Fetches the download options for a YouTube video")
        .addStringOption(
            new SlashCommandStringOption()
                .setName("url")
                .setDescription("YouTube video url")
                .setRequired(true)
        );

    const execute = async (ic, options) => {
        const { url } = options;
        const trimmed = url.value.trim();
        const code = youtubeUrlRegex.exec(trimmed).groups["code"];

        if (!youtubeUrlRegex.test(trimmed))
            return ic.reply("Provided url is invalid");

        const video = new YouTubeVideo(trimmed);
        await video.load();

        return ic.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(discordBot["bot.color"])
                    .setAuthor({ name: video.getAuthor() })
                    .setTitle(video.getTitle())
                    .setImage(video.getThumbnail().url)
                    .setDescription(`${video.getShortDescription(150)}`)
                    .setURL(trimmed)
                    .setFooter({ text: `Duration: ${video.getDuration()}` })
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder({
                        custom_id: `info_select_mode_${code}`,
                        customId: `info_select_mode_${code}`,
                        placeholder: "Select a quality",
                    }).addOptions(
                        ...video.getFormats().map((format, i) => {
                            const isVideo = format.mimeType["type"] === "video";

                            return new SelectMenuOptionBuilder()
                                .setDefault(false)
                                .setLabel(`${isVideo ? "📹 Video" : "🎶 Audio"} - ${isVideo ? `${format.quality} ${format.fps}fps` : `${format.audioBitrate} kbps`} ${format.mimeType["format"].toUpperCase()} (${format.mimeType["codecs"]})`)
                                .setValue(i.toString());
                        }),
                    ),
                ),
            ],
        });
    };

    return new DiscordSlashCommand(command, execute);
}

function helpCommand() {
    const command = new SlashCommandBuilder()
        .setName("help")
        .setDescription("Display help");

    const execute = async ic => ic.reply({
        embeds: [
            new EmbedBuilder()
                .setColor(discordBot["bot.color"])
                .setAuthor({ name: discordBot["bot.name"] })
                .setTitle("Bot commands")
                .setDescription(`Here are some slash commands that can be used with ${discordBot["bot.name"]}.`)
                .addFields(
                    {
                        name: "/info",
                        value: "Fetches the download options for a YouTube video",
                    },
                ),
        ],
    });

    return new DiscordSlashCommand(command, execute);
}

module.exports = [
    getYoutubeVideoInfo(),
    helpCommand(),
];
