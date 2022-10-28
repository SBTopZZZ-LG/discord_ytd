// Setup
require("dotenv").config();

// Import
const fetch = require("node-fetch");
const { TINYURL_OAUTH_TOKEN } = process.env;

// Middleware
async function tinyUrl(url) {
    try {
        const response = await fetch(`https://api.tinyurl.com/create?api_token=${TINYURL_OAUTH_TOKEN}`, {
            method: 'post',
            body: JSON.stringify({ url }),
            headers: { 'Content-Type': 'application/json' }
        });

        const body = await response.json();
        if (body.code !== 0) {
            console.error("[tinyurl.util] Cannot shorten url", body.errors);
            return url;
        }

        return body.data["tiny_url"];
    } catch (error) {
        console.error("[tinyurl.util]", error);
        return url;
    }
}

module.exports = { tinyUrl };
