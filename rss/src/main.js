// some random environment stuff is in .env
require('dotenv').config();

// all channels configuration is kept in the rss-files-config.js
// so go there if you want to add a new RSS file to process
const rssFiles = require('./rss-files-config.js');

const generateRSSFile = require('./generateRSSFile.js');
const generateStaticFiles = require('./generateStaticFiles.js');
const uploadToAkamai = require('./uploadToAkamai.js');

(async () => {
	for (let i = 0; i < rssFiles.length; i++) {
		await generateRSSFile(rssFiles[i]);
	}
	uploadToAkamai('public/rss', 'public/rss.zip');

	await generateStaticFiles();
	await uploadToAkamai('public/html', 'public/available-technologies.zip');
})();
