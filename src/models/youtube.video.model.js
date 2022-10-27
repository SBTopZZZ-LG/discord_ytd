// Import
const assert = require("assert");
const ytdl = require("ytdl-core");

// Middleware
class YouTubeVideo {
    /*
        .formats = [{
            .mimeType: "[video,audio]/<format>; codecs=\"<codecs>\""
            .qualityLabel?
            .bitrate
            .audioBitrate
            .url: <downloadUrl>
            .fps
        }]
        .videoDetails = {
            .title
            .lengthSeconds
            .thumbnails = [{
                .url: <imageUrl>
                .width
                .height
            }]
        }
    */

    constructor(url) {
        assert(typeof url === "string");

        this.url = url;

        this.mimeTypeRegex = /^(?<type>video|audio)\/(?<format>.+); *codecs="(?<codecs>.+)"$/i;
    }

    async load() {
        this.info = await ytdl.getInfo(this.url);
        this.info.formats = [
            ...ytdl.filterFormats(this.info.formats, "videoandaudio"),
            ...ytdl.filterFormats(this.info.formats, "audioonly"),
        ];
        return this.info;
    }

    getTitle() {
        return this.info.videoDetails.title;
    }

    getAuthor() {
        return this.info.videoDetails.author.name;
    }

    getShortDescription(length) {
        assert(typeof length === "number");

        const description = this.info.videoDetails.description;
        if (!description)
            return "";
        if (description.length <= length)
            return description;

        return `${description.substring(0, length)}...`;
    }

    getDuration() {
        const { lengthSeconds } = this.info.videoDetails;
        const lengthSeconds2 = parseInt(lengthSeconds);

        return `${Math.floor(lengthSeconds2 / 60)}:${lengthSeconds2 - Math.floor(lengthSeconds2 / 60) * 60}`;
    }

    getThumbnail() {
        const { thumbnails } = this.info.videoDetails;

        if (thumbnails.length === 1)
            return thumbnails[0];

        return thumbnails.sort((x, y) => y.width * y.height - x.width * x.height)[1];
    }

    getFormats() {
        const formats = this.info.formats;

        return formats.map(format => ({
            mimeType: !format.mimeType ? undefined : this.mimeTypeRegex.exec(format.mimeType).groups ?? undefined,
            quality: format.qualityLabel,
            bitrate: format.bitrate,
            audioBitrate: format.audioBitrate,
            url: format.url,
            fps: format.fps,
        }));
    }
}

module.exports = { YouTubeVideo };
