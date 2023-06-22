const getOTTData = require('./getOTTData.js');
const createRSSchannel = require('./createRSSchannel.js');
const createRSSItem = require('./createRSSItem.js');
const writeRSSFile = require('./writeFile.js');
const libxmljs = require('libxmljs');

async function generateRSSFile(rssFile) {
	const { title, description, link } = rssFile;
	const { hits } = await getOTTData(rssFile.filters);

	var doc = await createRSSchannel(title, description, link);

	for (const hit of hits) {
		await createRSSItem(hit, rssFile.link, doc);
	}

	await writeRSSFile(
		libxmljs.parseXml(doc.toString()),
		rssFile.title + '.xml',
		'public/rss'
	);
}

module.exports = generateRSSFile;
