const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

// Remove the onerror handler so jsdom prints the real error
let cleanHtml = html.replace(/window\.onerror = function[\s\S]*?<\/script>/, '</script>');

const dom = new JSDOM(cleanHtml, { 
    runScripts: "dangerously", 
    resources: "usable",
    url: "file:///" + __dirname.replace(/\\/g, '/') + "/index.html"
});

dom.window.document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
});

dom.window.addEventListener("error", (event) => {
    console.error("DOM ERROR:", event.error);
});
