// all configuration is kept in the rss-files-config.js
// so go there if you want to add a new RSS file
const rssFiles = require('./rss-files-config.js');

const generateRSSFile = require('./generateRSSFile.js');

for (let i = 0; i < rssFiles.length; i++) {
	generateRSSFile(rssFiles[i]);
}
