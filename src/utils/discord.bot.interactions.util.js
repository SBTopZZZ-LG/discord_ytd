// Import
const { YouTubeVideo } = require("../models/youtube.video.model");
const { tinyUrl } = require("../utils/tinyurl.util");

// Middleware
function getYouTubeVideoDownloadUrl() {
    const customIdRegex = /^info_select_mode_(?<code>.{11})$/i;
    const execute = async (ic) => {
        const { code } = customIdRegex.exec(ic.customId).groups;
        const url = "https://www.youtube.com/watch?v=" + code;
        const value = parseInt(ic.values[0]);

        const video = new YouTubeVideo(url);
        await video.load();

        const formats = video.getFormats();
        if (value >= formats.length) return;

        const downloadUrl = await tinyUrl(formats[value].url);
        return ic.reply({
            content: `Here's the link: ${downloadUrl}`,
            ephemeral: true,
        });
    };

    return {
        regex: customIdRegex,
        execute,
    };
}

module.exports = [
    getYouTubeVideoDownloadUrl(),
];
