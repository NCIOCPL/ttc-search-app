const getOTTData = require('./getOTTData.js');
const createRSSchannel = require('./createRSSchannel.js');
const createRSSItem = require('./createRSSItem.js');
const writeRSSFile = require('./writeRSSFile.js');

async function generateRSSFile(rssFile) {
	const { title, description, link } = rssFile;
	const { hits } = await getOTTData(rssFile.facetFilterFields);

	var doc = await createRSSchannel(title, description, link);

	for (let x = 0; x < hits.length; x++) {
		await createRSSItem(hits[x], rssFile.link, doc);
	}

	await writeRSSFile(doc, rssFile.title);
}

module.exports = generateRSSFile;
