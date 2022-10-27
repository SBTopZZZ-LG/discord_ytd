// Import
const fetch = require("node-fetch");

// Middleware
async function hide(url) {
    const response = await fetch("https://hideuri.com/api/v1/shorten", {
        method: 'post',
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' }
    });

    const body = await response.json();
    if (body.error) {
        console.error("[hideuri.util] Cannot hide url", body.error);
        return url;
    }

    return body["result_url"];
}

module.exports = {
    hide
};
