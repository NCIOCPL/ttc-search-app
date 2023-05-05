var libxmljs = require('libxmljs');
const { promises } = require('fs');

async function writeRSSFile(doc, filename) {
	const toWrite = libxmljs.parseXml(doc.toString());
	return promises.writeFile(
		`${process.cwd()}/public/${filename}.xml`,
		toWrite.toString(),
		{ flag: 'w+' }
	);
}

module.exports = writeRSSFile;
