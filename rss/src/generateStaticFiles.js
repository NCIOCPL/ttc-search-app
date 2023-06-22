const getOTTData = require('./getOTTData.js');
const createStaticFile = require('./createStaticFile.js');
const createSitemap = require('./createSitemap.js');
const writeFile = require('./writeFile.js');
const libxmljs = require('libxmljs');

async function generateStaticFiles() {
	const { hits } = await getOTTData('field_ics:NCI');

	for (const hit of hits) {
		const staticFile = await createStaticFile(hit);
		await writeFile(
			staticFile,
			hit.field_data_source_id + '.html',
			'public/html'
		);
	}

	const sitemap = await createSitemap(hits);
	await writeFile(
		libxmljs.parseXml(sitemap.toString()),
		'sitemap-abstracts.xml',
		'public/html'
	);
}

module.exports = generateStaticFiles;
