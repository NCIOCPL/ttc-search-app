var libxmljs = require('libxmljs');
const { promises } = require('fs');
const { join } = require('path');

async function writeRSSFile(doc, filename) {
	const publicFolderPath = join(process.cwd(), 'public');
	try {
		await promises.access(publicFolderPath);
	} catch (error) {
		promises.mkdir(publicFolderPath);
	}

	const toWrite = libxmljs.parseXml(doc.toString());
	return promises.writeFile(
		`${publicFolderPath}/${filename}.xml`,
		toWrite.toString(),
		{ flag: 'w+' }
	);
}

module.exports = writeRSSFile;
